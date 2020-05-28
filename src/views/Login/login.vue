<template>


    <div>
   <el-button type="danger" @click="getinfo()"> 点击 </el-button>
    </div>


</template>

<script>
    // import service from '../../utils/request'  //测试的
    import axios from 'axios'
    import {Getinfo} from '../../api/getinfo'
    import { reactive, ref, isRef, toRefs, onMounted } from '@vue/composition-api';
//, { refs, root }
    export default {
        name: "Login",
    setup(props) {

        //点击后返回值,使用函数表达式写
        const getinfo=(()=>{
            // alert(222) //return后测试能否弹窗
           Getinfo() //在这里触发点击

        })

       //点击提交
        onMounted(()=>{
            // Getinfo()
        })
        return{
            getinfo
        }
    }
    }

</script>

<style scoped>

</style>