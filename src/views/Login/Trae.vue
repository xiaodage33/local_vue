<template>
    <div>
        <!--:id="data_get.data"   v-model 和 id 都可以绑定   v-for="(key,value) in data_get.tra"-->

        <div id="data_get.tra" v-for="(key,value) in data_get.tra">


              <table   width="100%" cellspacing="10">
                  <tr> <td>
                      {{ value  }}  </td>
                      <td cellspacing="10" v-for="aa in key.servers">{{ aa }}  </td>
                      <td> <a src="#" />修改 </td>
                  </tr>

              </table>
        </div>


        <el-button type="danger" @click="getinfo()"> 查询</el-button>

        <!--<el-table  :data="data_get.tra" >-->

        <!--</el-table>-->


    </div>
</template>
<script>
    import {reactive, ref, isRef, toRefs, onMounted} from '@vue/composition-api';
    import { Getinfo } from "../../api/getinfo";

    export default {
        name: "Trae",
        setup(props, {}) {
            const date1 = ref('');
            const data_get = reactive({
                data: '',
                tra:[],
                trb:[],
            });
            const getinfo = () => {
                console.log(date1.value)
                Getinfo().then((request)=>{
                     data_get.tra = request.data.kubernetes.backends
                    console.log("哈哈",data_get.tra)
                }).cache(error=>{

                })
            }

            return {
                getinfo,
                date1,
                data_get
            }
        }
    }
</script>
<style scoped>

</style>