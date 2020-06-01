<template>
    <div>
<el-input v-model="ruleForm.username" id="username" placeholder="输入username"></el-input>
   <el-button type="danger" @click="Sousuo()"> 搜索 </el-button>
        <el-button type="danger" @click="getinfo()"> 查询 </el-button>

     <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
        <el-table-column
        prop="sex"
        label="性别">
      </el-table-column>
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
            username:''
        })


        const tableData= reactive([{
                         date: '2016-05-02',
                         name: '王小虎',
                         address: '上海市普陀区金沙江路 1518 弄',
                         sex: '男'
                     }, {
                         date: '2016-05-04',
                         name: '王小虎',
                         address: '上海市普陀区金沙江路 1517 弄',
                         sex: '男'

                     }, {
                         date: '2016-05-01',
                         name: '王小虎',
                         address: '上海市普陀区金沙江路 1519 弄',
                        sex: '男'

                     }, {
                         date: '2016-05-03',
                         name: '王小虎',
                         address: '上海市普陀区金沙江路 1516 弄',
                         sex: '女'

                     }])


        //点击后返回值,使用函数表达式写
        const getinfo=(()=>{
            Getinfo()
        })
        const Sousuo=(()=>{
            if(ruleForm.username == '')
                root.$message.error('输入内容不能为空')
                Getinfo1({username:ruleForm.username}).then(response => {
                  console.log("哈哈：==",response.data.stu_name)
                  const data = response;
                  root.$message({
                      message: {"返回值":data.data.stu_name,"id":data.data.id},
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
            getinfo,
            ruleForm,
            Sousuo,
            tableData
    }}}

</script>

<style scoped>

</style>