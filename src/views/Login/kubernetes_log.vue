<template>
    <div >
        <!--<div :id="tableData.item" v-for="(key,value) in tableData.item ">-->
               <!--</div>-->
        <el-badge :value="data.data_num"
                  class="pull-left"
                  type="primary">
             <el-button size="small" @click="errorNumLog" style="font-size: 13px;color: red" >仅限scf的pod错误，速度慢</el-button>
        </el-badge>

        <el-badge :value="data.data_num_file"
                  :class=""
                   class="pull-left"
                  type="primary"
                    style="margin-left:10px;">
            <el-button size="small" @click="errorNumLogfile" :loading="anniuwait_1" style="font-size: 13px" >查看现有报错pod数量速度较快</el-button>
        </el-badge>
        <br/><br/>
        <span v-for="err in data.data_podname" style="color:red ;padding: 0.1cm;margin-left:10px"  class="pull-left">

            <el-button type="danger" plain size="mini" :title="infoPod"    @click=Cat_Log(err.data_podname) slot="reference"  style="font-size: 15px;"  >{{ err.data_podname }}</el-button>
        </span>


        <el-input v-model="tableData.username" id="username" placeholder="输入查找的pod名字 关键字" type="mini"></el-input>
        <el-button type="primary" @click="k8slog_b" :loading="anniuwait_2"> 查询</el-button>&nbsp;
                <router-link to="trae">查看ingress | service</router-link>
        <el-table
            :data="tableData.currentItems"
             style="width: 100%;border: 5px;"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)" >
            <el-table-column
                    prop="pod"
                    label="集群pod"
                    width="350">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-popconfirm
                      title="你还没有权限？">
                        <el-button type="danger" size="mini" @click='del_message(scope.row.id)' slot="reference" >删除</el-button>
                        <el-button type="success" size="mini"  @click='editInfo(scope.row.id)' slot="reference" :loading="true">编辑</el-button>
                        <el-button type="success" size="mini" :title="infoPod"  @click=Cat_Log(scope.row.pod) slot="reference" >查看日志</el-button>
                         <!--scope.row.pod 可以这么传pod名字-->
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!--//创建分页-->
        <el-row>
            <el-col :span="12">
                <el-pagination
                        class="pull-right"
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="paginationPageSizes"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </el-col>
        </el-row>
<!--//显示日志页面-->
        <Dilog_ShowLog :flag.sync="dialog_info_add"  :pod="infoPod"  />
</div>
</template>
<script>
import {reactive, ref, isRef, toRefs, onMounted,onBeforeMount} from '@vue/composition-api';
import { k8slog,LogInfo,getError,getError_file } from "../../api/getinfo";
import { stripscript,validatePass } from "../../utils/validate";

import Dilog_ShowLog from "./Dilog_ShowLog.vue";
    export default {
        name: "kubernetes_log",
        components: { Dilog_ShowLog },
        props:{
            flag:{
                type: Boolean,
                default: false
            }
        },
    setup(props,{root}) {

      onBeforeMount(()=>{
          timer.value = setInterval(()=>{
              timer.value ++;
              errorNumLogfile()
          },5000);
      })

        const timer = ref(null)
        const tableData = reactive({
            item: [],
            username:'',
            currentItems: []    //定义列表分页
        })
        const data = reactive({
            data_num:'',
            data_podname:[],
            data_num_file:''    //文件pod取值快
        })
        const dialog_info_add = ref(false)  //弹框传值
        const infoPod = ref("")
        const loading = ref(false)
        const fullscreenLoading=ref(false)   //整页刷新
        const anniuwait_1 = ref(false)
        const anniuwait_2 = ref(false)
        const paginationPageSizes = ref([10, 20, 50, 100]);  //定义每页显示条数
        //页码
        const total =ref(0);
        const page=reactive({
            pageNumber:1,
            pageSize: paginationPageSizes.value[0]
        })
        const handleSizeChange = (val)=>{   //改变页面显示条数
            page.pageSize = val;  //10 ，20 ，30等
            handleTableChange();
        }
        const handleCurrentChange = (val)=>{
            page.pageNumber=val;
            handleTableChange();
            k8slog_b();
        }
        const k8slog_b = () => {     //获取所有pod名字和状态
            loading.value=true   //列表页面拼命加载
            anniuwait_2.value = true   //按钮不能点击
            k8slog().then((response) => {
                let data = response.data
                tableData.item = data.data
                tableData.currentItems =data.data
                handleTableChange()
                anniuwait_2.value = false
                // console.log("pod", tableData.item)
            }).cache(error => {
            })
        }
        const handleTableChange = ()=>{
        // console.log('tableChange - page', page);
        const {item = []} = tableData;
        // console.log("测试",tableData)  //显示总条数，当前分页数量
        let tempItems = item;   //所有页面列表条数
        const {username = ''} = tableData;
        if (username) { //如果查到了把内容塞给tempItems 重新计算长度展示
            let data = stripscipt(username)   //过滤
            // console.log(data)   //过滤特殊字符如 空格 等
            tempItems = item.filter(i=>i.pod.indexOf(data)>-1);   //在input输入值后进入删选查找
            // tempItems = item.filter(i=>i.pod.indexOf(username)>-1);   //在input输入值后进入删选查找
        }
        total.value = tempItems.length;   //如果没有输入值，查找所有的列表，有则是当前列表
        const {pageSize = paginationPageSizes[0], pageNumber = 1} = page; //显示条数和 当前页码
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize - 1;
        const currentItem = [];  //显示当前页数据0-9 数据。
        for(let index = 0;index < tempItems.length; index ++) {
            if (index >=startIndex && index <= endIndex) {
                currentItem.push(tempItems[index])
            }
        }
        tableData.currentItems = currentItem;
        loading.value=false    //拼命加载
        // console.log('==tableChange - tableData==', tableData.currentItems);
    };
        //catlog查看log弹窗到dialog
        const Cat_Log=(pod)=>{
            infoPod.value=pod;
            // console.log("查看pod_name",infoPod.value)
            dialog_info_add.value=true;   //弹出dialog
            anniuwait_1.value = false;   //按钮可以点击
            }
        //快速弹窗找错误pod文件中快
        const errorNumLogfile=()=>{
             anniuwait_1.value = true
            getError_file().then(response=>{
                data.data_num_file = response.data.data_num
                data.data_podname = response.data.data_podname
                 anniuwait_1.value=false
            }).catch(error=>{
            })
        }
        //慢速的点击报错到弹窗
        const errorNumLog=()=>{
            openFullScreen()
            // console.log("jinlai")
            getError().then(response=>{
                data.data_num = response.data.data_num
                data.data_podname = response.data.data_podname
                // for (var er=0;er<data.data_podname.length;er++){
                //     alert(data.data_podname[er].data_podname)
                // }
            }).cache(error =>{
            })
        }
        // 打开页面自动刷现有报错从文件查
       onMounted(() => {
            errorNumLogfile()
      })

        const openFullScreen=()=>{     //刷新等待
        const loading = root.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 13000);
      }
        return{
            tableData,
            k8slog_b,
            total,
            paginationPageSizes,handleSizeChange,handleCurrentChange,handleTableChange,
            Cat_Log,
            dialog_info_add,infoPod,loading,errorNumLog,data,fullscreenLoading,errorNumLogfile,anniuwait_1,anniuwait_2,
        }
    }
}
</script>
<style scoped>

</style>
