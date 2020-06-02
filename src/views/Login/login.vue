<template>
    <div>
<el-input v-model="ruleForm.username" id="username" placeholder="输入username" ></el-input>
   <el-button type="danger" @click="Sousuo()"> 搜索 </el-button>
        <el-button type="danger" @click="getinfo()"> 查询 </el-button>
       <div class="tableData.item" v-for="firstItem in tableData.item" :key="firstItem.id">
       </div>
     <el-table
      :data="tableData.item"
      style="width: 100%">
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
       <el-table-column  prop="stu_sex"
        label="性别" >  </el-table-column>
    </el-table>
    </div>
</template>
<script>
    // import service from '../../utils/request'  //测试的
    import axios from 'axios'
    import {Getinfo,Getinfo1,addinfo} from '../../api/getinfo'
    import { reactive, ref, isRef, toRefs, onMounted } from '@vue/composition-api';
//, { refs, root }
    export default {
        name: "Login",
    setup(props,{root}) {
        const ruleForm=reactive({
            username:'',
        })
        const tableData= reactive({
                     item:[
                     //     {  id: '1',
                     //    stu_name : '王小虎',
                     //     stu_sex: '上海市普陀区金沙江路 1518 弄',
                     //     stu_cls_id: '男'
                     // }, {
                     //     id: '2',
                     //     stu_name: '王小虎',
                     //     stu_sex: '上海市普陀区金沙江路 1517 弄',
                     //     stu_cls_id: '男'
                     //
                     // }, {
                     //     id: '3',
                     //     stu_name: '王小虎',
                     //     stu_sex: '上海市普陀区金沙江路 1519 弄',
                     //    stu_cls_id: '男'
                     // }
                     ]})
        //点击后返回值,使用函数表达式写
        const getinfo=(()=>{
            Getinfo({}).then((response = {})=>{
                let data = response.data;
                console.log("前端===", data.data)
                tableData.item = data.data;
            }).catch(error =>{
            })
        })
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
       //点击提交
        onMounted(()=>{
            // Getinfo()
        })
        return{
            ruleForm,
            Sousuo,
            tableData,
            getinfo
    }}}
</script>
<style scoped>
</style>