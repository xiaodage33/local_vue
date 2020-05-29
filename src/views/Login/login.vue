<template>
    <div>
<el-input v-model="ruleForm.username" id="username" placeholder="输入username"></el-input>
   <el-button type="danger" @click="Sousuo()"> 搜索 </el-button>
           <el-button type="danger" @click="getinfo()"> 查询 </el-button>
    </div>
</template>
<script>
    // import service from '../../utils/request'  //测试的
    import axios from 'axios'
    import {Getinfo,Getinfo1} from '../../api/getinfo'
    import { reactive, ref, isRef, toRefs, onMounted } from '@vue/composition-api';
//, { refs, root }
    export default {
        name: "Login",
    setup(props) {

        const ruleForm=reactive({
            username:''
        })
        //点击后返回值,使用函数表达式写

        const getinfo=(()=>{
            Getinfo()
        })
        const Sousuo=(()=>{
            // let data={
            //     username:ruleForm.username
            // }
            Getinfo1({username:ruleForm.username})
            console.log((ruleForm.username))
        })
        console.log(ruleForm.username)
       //点击提交
        onMounted(()=>{
            // Getinfo()
        })
        return{
            getinfo,
            ruleForm,
            Sousuo

        }
    }
    }

</script>

<style scoped>

</style>