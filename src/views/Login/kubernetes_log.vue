<template>
    <div>
        <!--<div :id="tableData.item" v-for="(key,value) in tableData.item ">-->
               <!--</div>-->
        <el-badge :value="100"
                  :class=item
                  class="pull-left"
                  type="primary">
  <el-button size="small">现有报错pod数量</el-button>
</el-badge>

        <el-input v-model="tableData.username" id="username" placeholder="输入查找的pod名字" type="mini"></el-input>
        <el-button type="danger" @click="k8slog_b"> 查询</el-button>&nbsp;
         <el-link type="primary"   > <font size="3" color="red"> 查看ingress </font></el-link>
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
                    width="250">
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
import {reactive, ref, isRef, toRefs, onMounted} from '@vue/composition-api';
import { k8slog,LogInfo } from "../../api/getinfo"
import Dilog_ShowLog from "./Dilog_ShowLog.vue"
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
        const tableData = reactive({
            // item: [],
            username:'',
            currentItems: []    //定义列表分页
        })
        const dialog_info_add = ref(false)  //弹框传值
        const infoPod = ref("")
        const loading = ref(false)
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
        const k8slog_b = () => {
            loading.value=true   //拼命加载
            k8slog().then((response) => {
                let data = response.data
                tableData.item = data.data
                tableData.currentItems =data.data
                handleTableChange()
                console.log("pod", tableData.item)
            }).cache(error => {
            })
        }
        const handleTableChange = ()=>{
        console.log('tableChange - page', page);
        const {item = []} = tableData;
        console.log("测试",tableData)  //显示总条数，当前分页数量
        const {username = ''} = tableData;
        let tempItems = item;   //所有页面列表条数
        if (username) { //如果查到了把内容塞给tempItems 重新计算长度展示
            tempItems = item.filter(i=>i.pod.indexOf(username)>-1);   //在input输入值后进入删选查找
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
        console.log('==tableChange - tableData==', tableData.currentItems);
    };
        //catlog
        const Cat_Log=(pod)=>{
            infoPod.value=pod
            console.log("查看pod_name",infoPod.value)
            dialog_info_add.value=true;
            }
        return{
            tableData,
            k8slog_b,
            total,
            paginationPageSizes,handleSizeChange,handleCurrentChange,handleTableChange,
            Cat_Log,
            dialog_info_add,infoPod,loading
        }
    }
}
</script>
<style scoped>

.item {
  margin-top: 10px;
  margin-right: 40px;
}

</style>