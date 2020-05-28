<template>


    <div>
   <el-button type="danger" @click="submitForm"> 点击 </el-button>
    </div>


</template>

<script>
    import service from '../../utils/request'
    import axios from 'axios'
    import {Getinfo} from '../../api/getinfo'
    // import { reactive, ref, isRef, toRefs, onMounted } from '@vue/composition-api';
//, { refs, root }
    export default {
        name: "Login",
    setup(props,{root}) {

        const submitForm=()=>{
            alert(111)
            Getinfo().then(response=>{
                let data = response.data;
                console.log(data)
            })
        }
        return{
            submitForm,

        }
    }
    }

</script>

<style scoped>

</style>