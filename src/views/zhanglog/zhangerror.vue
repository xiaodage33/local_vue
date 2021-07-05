<template>
    <div>
         <div>

        <el-button type="primary" @click="geterror"> 签章错误日志 </el-button>
         <el-button type="primary" @click="getserviceSystemLog"> 签章serviceSystemLog </el-button>
            <div class="block" >
            <span class="demonstration"> 字体大小</span>
            <el-slider :max="29" :min="12" v-model="value1" @change="modelFontSize" ></el-slider>

            </div>

        <div><textarea class="text-1" v-bind:style="{fontSize: fontSize + 'px'}" >  {{ infook }}  </textarea>  </div>
    </div>
    </div>
</template>

<script>
    import {reactive, ref, watchEffect} from '@vue/composition-api';

    import {getZjerror,serviceSystemLog} from "../../api/getinfo"

    export default {
        name: "zhangerror",
        setup(props, {root}) {

            const infook =ref('')
            const geterror = () => {
                getZjerror().then((res) => {
                    const data = res.data
                    infook.value = data.data
                    console.log("error", data)
                })
            }

            const getserviceSystemLog =()=>{
                serviceSystemLog().then((res)=>{
                    infook.value = ''
                    const data = res.data
                    infook.value = data.data
                    console.log("error", data)
                })
            }

 const fontSize = ref(10)

            watchEffect(()=>{
                console.log("aaaa",fontSize.value)
            })


            //滑块
            const value1 = ref(12)
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
                infook,value1,fontSize,
                //方法
                geterror,getserviceSystemLog,modelFontSize,
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
