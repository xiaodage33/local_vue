<template>
    <!--<el-button type="text" @click="dialogVisible">点击打开 Dialog</el-button>-->

    <el-dialog
  title="提示"
  :visible.sync="data.dialog_info_flag"
  width="30%"
  @opened="openDialog">
  <span>3333</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="close">确 定</el-button>
  </span>
</el-dialog>

</template>

<script>
    import { reactive, ref, watch } from '@vue/composition-api';
    import { LogInfo } from "../../api/getinfo";

    export default {
        name: "Dilog_ShowLog",
        props: {
            flag: {
                type: Boolean,
                default: false
            },
            id: {
            type: String,
            default: ""
        }
        },
    setup(props,{emit,root}) {

        const data = reactive({
            dialog_info_flag: false,   //弹窗标记
        })

        const dialogVisible = ref(false)
        const handleClose=(done)=>
        {
            root.$confirm('确认关闭？')
                .then(_ => {
                    emit("update:flag", false);
                    done();
                })
                .catch(_ => {
                });
        }

        watch(() => {data.dialog_info_flag = props.flag   });

        const close = () => {
            data.dialog_info_flag=false;
            emit("update:flag", false);   //emit更新prop flag
        }

        const openDialog = () => {
            console.log("openDialog=",props.id)
            getLog()   //查日志
        }

        const getLog=()=>{
            let requestData = {pod:props.pod}
            LogInfo(requestData).then(response =>{
                let showdata = response.data.data
            })

        }


      return {
        dialogVisible,
          data,close,handleClose,openDialog
      }
    }
    }
</script>

<style scoped>

</style>