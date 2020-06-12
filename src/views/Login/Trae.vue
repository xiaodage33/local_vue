<template>
    <div>

        <el-input v-model="tableData.username" id="username" placeholder="关键词查找ingress服务" type="mini"></el-input>
        <p  style="align:center;margin: 13px"  > <font size="5" face="arial" color="red"> Ingress 列表  </font> </p>
        <el-button type="danger" @click="getinfo"  > 查询</el-button>
        <br/>
        <br/>
           <el-link type="primary"  href="http://127.0.0.1:8080/k8slog"  > 返回k8slog</el-link>
            <br/>
                   <el-link type="primary"  href="http://127.0.0.1:8080/login"  > 测试下学生管理</el-link>


           <el-table
        :data="tableData.currentItems"
      style="width: 100%;margin: 2px" >
         <el-table-column
            type="index"
            label="当前页编码"
            width="180"/>
      <el-table-column
        prop="ingress"
        label="当前暴露的Ingress"
        width="180">
      </el-table-column>
         <el-table-column
            label="操作" >
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click='del_message(scope.row.id)' disabled>删除</el-button>
                    <el-button type="success" size="mini" :id="infoId" @click=editInfo(scope.row.id) disabled>编辑</el-button>
                </template>
                 </el-table-column>
     </el-table>


        <!--//创建分页-->
        <el-row>
            <!--<el-col :span="12">-->
                <!--<el-button size="medium" @click="deleteAll">批量删除</el-button>-->
            <!--</el-col>-->
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
    </div>
</template>
<script>
    import {reactive, ref, isRef, toRefs, onMounted} from '@vue/composition-api';
    import { Getinfo } from "../../api/getinfo";
    export default {
        name: "Trae",
        setup(props, {}) {
       const tableData= reactive({    // 定义table表的数据 是一个数组
           username:'',     //表单内input输入
           item:[],
            currentItems: []    //定义列表分页
        });
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
            getinfo();
        }
       //获取所有； 点击后返回值,使用函数表达式写
        const getinfo= async ()=>{    //async async 表示函数里有异步操作
            // let resquestData = {
            //     pageNumber: page.pageNumber,  //以后传值使用到后端服务器用
            //     pageSize: page.pageSize
            // };
            console.log('1');
            await loadData(()=>{
                console.log('2')
            });
        }
        const loadData = (call = ()=>{})=>{
            return Getinfo().then((response = {})=>{
                let data = response.data.data;
                // console.log("哈哈",data)   //data是列表所有
                tableData.item = data;
                console.log('3');
                handleTableChange();
                call()
            }).catch(error =>{
                // loadingData.value = false
            })
        };
        const handleTableChange = ()=>{
            console.log('tableChange - page', page);
            const {item = []} = tableData;
            console.log("测试",tableData)  //显示总条数，当前分页数量
            const {username = ''} = tableData;
            let tempItems = item;   //所有页面列表条数
            if (username) { //如果查到了把内容塞给tempItems 重新计算长度展示
                tempItems = item.filter(i=>i.ingress.indexOf(username)>-1);   //在input输入值后进入删选查找
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
            console.log('==tableChange - tableData==', tableData.currentItems);
        };
            return {
                getinfo,tableData,
                total,paginationPageSizes,
                handleSizeChange,handleCurrentChange,
            }
        }
    }
</script>
<style scoped>

</style>