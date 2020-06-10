<template>
    <div>
<el-input v-model="ruleForm.username" id="username" placeholder="输入username" ></el-input>
   <el-button type="danger" @click="Sousuo()"> 搜索 </el-button>
        <el-button type="danger" @click="getinfo()"> 查询 </el-button>
        <el-button type="danger" @click="add_getinfo()"> 新增 </el-button>
     <el-table
        :data="tableData.currentItems"
      style="width: 100%">
         <el-table-column
            type="index"
            label="当前页编码"
            width="180"/>

      <el-table-column
        prop="id"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="stu_name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="stu_cls_id"
        label="班级">
      </el-table-column>
       <el-table-column
       prop="stu_sex"
        label="性别" >
       </el-table-column>

         <el-table-column
            label="操作" >
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click='del_message(scope.row.id)'>删除</el-button>
                    <el-button type="success" size="mini" :id="infoId" @click=editInfo(scope.row.id)>编辑</el-button>
                </template>

                 </el-table-column>

     </el-table>

        <!--底部分页-->
        <el-row>
            <el-col :span="12">
                <el-button size="medium" @click="deleteAll">批量删除</el-button>
            </el-col>
            <el-col :span="16">
                <el-pagination
                    class="pull-right"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="paginationPageSizes"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                >
                </el-pagination>
            </el-col>
        </el-row>


<!--新增页面-->
        <DialogAdd :flag.sync="dialog_info_add"   />

<!--修改页面  @getListEmit="getList"-->
        <DialogEditInfo :flag.sync="dialog_info_edit" :id="infoId"    />


    </div>
</template>
<script>
    // import service from '../../utils/request'  //测试的
    import axios from 'axios'
    import {Getinfo,Getinfo1,addinfo,delinfo,editinfo} from '../../api/getinfo'
    import { reactive, ref, isRef, toRefs, onMounted } from '@vue/composition-api';
    import DialogEditInfo from "./edit.vue";
    import DialogAdd from "../Add/Add.vue"


//, { refs, root }
    export default {
        name: "Login",
        components: {  DialogEditInfo,DialogAdd },

        props: {
        flag: {
            type: Boolean,
            default: false
        }
            },

    setup(props,{root}) {
        const ruleForm=reactive({
            username:'',
        })

        const infoId = ref("");  //赋值修改的id传入到edit
        const dialog_info_add = ref(false)  //点击添加弹窗的赋值打开和关闭
        const loadingData = ref(false);


        const dialog_info_edit = ref(false);   //点击修改弹窗与否

        const tableData= reactive({   // 定义table表的数据 是一个数组
            item:[],
            currentItems: []    //定义列表分页
        });
        const paginationPageSizes = ref([10, 20, 50, 100]);
        //页码
        const total =ref(0);
        const page=reactive({
            pageNumber:1,
            pageSize: paginationPageSizes.value[0]
        })
        const handleSizeChange = (val)=>{
            page.pageSize = val;
            handleTableChange();
            console.log(123)
            console.log(val)
        }
        const handleCurrentChange = (val)=>{
            page.pageNumber=val;
            handleTableChange();
            getinfo()
        }

        // const formatData = () => {
        //     let requestData = {
        //         pageNumber: page.pageNumber,
        //         pageSize: page.pageSize
        //     }
        // }
     //获取所有； 点击后返回值,使用函数表达式写
        const getinfo= async ()=>{    //async async 表示函数里有异步操作
            let resquestData = {
                pageNumber: page.pageNumber,
                pageSize: page.pageSize
            };
            console.log('1');
            await loadData(()=>{
                console.log('2')
            });
        }

        const loadData = (call = ()=>{})=>{
            return Getinfo().then((response = {})=>{
                let data = response.data.data;
                tableData.item = data;
                loadingData.value = false;
                console.log('3');
                handleTableChange();
                call()
            }).catch(error =>{
                loadingData.value = false
            })
        };

        const handleTableChange = ()=>{
            console.log('tableChange - page', page);
            const {item = []} = tableData;
            const {username = ''} = ruleForm;
            let tempItems = item;
            if (username) {
                tempItems = item.filter(i=>i.stu_name.indexOf(username)>-1);
            }
            total.value = tempItems.length;
            const {pageSize = paginationPageSizes[0], pageNumber = 1} = page;
            const startIndex = (pageNumber - 1) * pageSize;
            const endIndex = startIndex + pageSize - 1;
            const currentItem = [];
            for(let index = 0;index < tempItems.length; index ++) {
                if (index >=startIndex && index <= endIndex) {
                    currentItem.push(tempItems[index])
                }
            }
            tableData.currentItems = currentItem;
            console.log('tableChange - tableData', tableData);
        };

        //
        const Sousuo=(()=>{
            if(ruleForm.username == '')
                root.$message.error('输入内容不能为空')
                Getinfo1({username:ruleForm.username}).then((response ={} )=> {
                  console.log("哈哈：==",response.data.stu_name)
                  const data = response;
                  console.log("lele",data.data)
                  tableData.item=[data.data]
                  root.$message({
                      message: {"返回值" :data.data.stu_name,"id" :data.data.id},
                      type:'success'
                  });
                }).catch(error => {
                  console.log(error);
                })
        })
        const del_info=((id)=>{
            message_box()
            delinfo({id:id}).then(response=>{
                console.log("前端删除返回response",response)
            }).cache(error=>{
            })
        })
        const del_message=((id)=>{
            let data =id
            root.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
                delinfo({id:data}).then(response=>{
                console.log("前端删除返回response",response)
            },
            root.$message({
                type: 'success',
                message: '删除成功!'
              })  )
            }).catch(() => {
              root.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
      })

///编辑  ========================================
         const editInfo = (id) => {
            infoId.value = id;
            dialog_info_edit.value = true;   //true是打开弹框  这就传入div的<DialogEditInfo 进入到edit的弹窗中，id也传入了通过它:id="infoId"

        }
        const add_getinfo =()=>{
            dialog_info_add.value=true;
        }

        // const getList = () => {
        //     // 单独处理数据
        //     let requestData = formatData();
        //                 alert(requestData)
        //
        //     // 加载状态
        //     loadingData.value = true;
        //     alert(loadingData.value)
        //     GetList(requestData).then(response => {
        //         let data = response.data.data
        //         // 更新数据
        //        table_data.item = data.data
        //         // 页面统计数据
        //         total.value = data.total
        //         // 加载状态
        //         loadingData.value = false;
        //     }).catch(error => {
        //         loadingData.value = false;
        //     })
        // }


    //     const getInfoCategoryAll = () => {
    //     GetCategoryAll({}).then(response => {
    //         console.log(response)
    //         categoryItem.item = response.data.data
    //     }).catch(error => {})
    // }
    //
    //     const getInfoCategory = () => {
    //         root.$store.dispatch().then(response => {
    //             options.category = response
    //         })
    //     }


       //点击提交
        onMounted(()=>{
            // Getinfo()
        })
        return{
            ruleForm,
            Sousuo,
            tableData,
            getinfo,
            del_info,
            editInfo,
            del_message,
            infoId,
            dialog_info_edit,
            dialog_info_add,
            add_getinfo,
            total,
            handleSizeChange,
            handleCurrentChange,
            loadingData,
            paginationPageSizes
            // getList
            // getInfoCategory,
            // getInfoCategoryAll

    }}}
</script>
<style scoped>
</style>