<template>
    <div>

        <!--<div :id="tableData.item" v-for="(key,value) in tableData.item ">-->
               <!--</div>-->

        <el-button type="danger" @click="k8slog_b"> 查询</el-button>

        <el-table
                :data="tableData.currentItems"
                style="width: 100%;border: 5px;">
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
                    <el-button type="danger" size="mini" @click='del_message(scope.row.id)' >删除</el-button>
                    <el-button type="success" size="mini"  @click=editInfo(scope.row.id)>编辑</el-button>
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
import { k8slog } from "../../api/getinfo"
    export default {
        name: "kubernetes_log",
    setup(props) {
        const tableData = reactive({
            item: [],
            currentItems: []    //定义列表分页
        })


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
        console.log('==tableChange - tableData==', tableData.currentItems);
    };

        return{
            tableData,
            k8slog_b,
            total,
            paginationPageSizes,handleSizeChange,handleCurrentChange,handleTableChange
        }
    }
}
</script>

<style scoped>

</style>