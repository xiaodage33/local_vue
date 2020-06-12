<template>
    <!--<el-button type="text" @click="dialogVisible">点击打开 Dialog</el-button>-->

    <el-dialog
            title="展示日志"
            :visible.sync="data.dialog_info_flag"
            width="60%"
            top="5vh"
            @opened="openDialog"
            :pod="data.pod_log_info"
            :pod_name="data.pod_name"
            :before-close="handleDialogClose">
        <div class="pod-name">Pod名字：{{data.pod_name}}</div>
        <br/>

        <!--<textarea rows="30" cols="150">-->
            <!--{{ data.pod_log_info }}-->
        <!--</textarea> 　-->
        <div class="pod-content-box">
            <div class="pod-content-item" v-for="(item,index) of data.pod_log_arr">
                <div class="pod-item-index">{{index}}</div>
                <div class="pod-item-text">{{item}}</div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="close">关闭</el-button>
            <el-button type="primary" @click="log_flush" v-loading="loading">刷新</el-button>
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
            pod: {
            type: String,
            default: "" }
        },
    setup(props,{emit,root}) {
        const data = reactive({
            dialog_info_flag: false,   //弹窗标记
            pod_log_info:"",
            pod_log_arr: [],
            pod_name:""
        })
        const dialogVisible = ref(false)
        const loading = ref(false)
        watch(() => {data.dialog_info_flag = props.flag   });
        const close = () => {
            data.dialog_info_flag=false;
            emit("update:flag", false);   //emit更新prop flag
        }
        const openDialog = () => {
            getLog()   //查日志
        }
        const getLog=()=>{
            let requestData = props.pod
            data.pod_name =requestData
            console.log("deng",requestData)
            LogInfo(requestData).then(response =>{
                data.pod_log_info = response.data.data
                console.log('resp',response.data.data)
                if(data.pod_log_info) {
                    data.pod_log_arr = data.pod_log_info.split('\n');
                }
                console.log("日志：",data.pod_name)
                loading.value=false
            })
        }
        const handleDialogClose=()=>{    //右上角关闭按钮
            emit("update:flag", false);
        }
        const log_flush=()=>{     //点击刷新
            loading.value=true
            // loading_jiazai.value=true
            getLog()
        }
      return {
        dialogVisible,
          data,close,openDialog,handleDialogClose,log_flush,
          loading
      }
    }
    }
</script>
<style scoped>
    .pod-name {
        font-size: 6pt;
        color: red;
    }
    .pod-content-box {
        width: 100%;
        height: 60vh;
        padding: 12px;
        background-color: #fff;
        border: 2px solid #eee;
        box-sizing: border-box;
        overflow-y: auto;
    }
    .pod-content-item {
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #eee;
        text-align: left;
        line-height: 2;
    }
    .pod-item-index {
        width: 22px;
        padding-right: 4px;
        text-align: right;
        color: #999;
    }
    .pod-item-text {
        flex: 1;

    }
</style>