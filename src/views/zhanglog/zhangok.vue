<template>
    <div>
        <el-button type="primary" @click="getzjok"> 签章成功日志 </el-button>
        <el-button type="primary" @click="getcatalinalog"> 签章catalina日志 </el-button>
          <div class="block" >
            <span class="demonstration"> 字体大小</span>
            <el-slider :max="29" :min="12" v-model="value1" @change="modelFontSize" ></el-slider>

            </div>


        <div><textarea class="text-1" v-bind:style="{fontSize: fontSize + 'px'}">  {{ infook}}  </textarea>  </div>
    </div>
</template>
<script>
        import { reactive, ref, watchEffect } from '@vue/composition-api';
        import {getZjok, getCatalina} from "../../api/getinfo"
    export default {
        name: "zhangok",
        setup(props,{root}){
            const infook = ref('')

            const getzjok =()=>{
                getZjok().then((res)=>{
                    const data = res.data
                     // console.log("重金日志",data)
                    infook.value = data.data
                       root.$message({
                        showClose: true,
                        message: data.message,
                        type: 'success'
                    })
                })
            }

            const getcatalinalog =()=>{
                getCatalina().then((res)=>{
                    const data = res.data
                     console.log("重金日志",data)
                    infook.value = data.data
                       root.$message({
                        showClose: true,
                        message: data.message,
                        type: 'success'
                    })
                })
            }
            const fontSize = ref(10)

            watchEffect(()=>{
                console.log("aaaa",fontSize.value)
            })


            //滑块
            const value1 = ref(10)
            // const formatTooltip=(val)=>{
            //      console.log("大小", val)
            //      return val / 100
            // }
            //滑块方法
            const modelFontSize = (val)=>{
                fontSize.value = val
                console.log("val",val)
            }

            return {
                //数据
                infook,fontSize,value1,
            //方法
                getzjok,getcatalinalog,modelFontSize
            }
        }
    }
</script>

<style scoped>
.block{
        font-size: 15px;
    /* margin-top: 14px; */
    width: 200px;
    margin: 14px auto
}
    .text-1{
        width: 1100px;
        height:  400px;
    }

</style>
