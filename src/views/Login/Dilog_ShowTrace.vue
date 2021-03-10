<template>
    <!--<el-button type="text" @click="dialogVisible">点击打开 Dialog</el-button>-->

    <el-dialog class="el-dialog_title"
             :fullscreen="quanping"
            :title="'Pod名字：'+data.pod_name"
            :visible.sync="data.dialog_info_flag"
            width="60%"
            top="5vh"
            @opened="openDialog"
            :pod="data.pod_log_info"
            :pod_name="data.pod_name"
            :before-close="handleDialogClose"  >

        <el-button class="pull-right" type="primary" @click="all_quanping" style="font-size: 5px" size="mini">全屏</el-button>
        <el-button class="pull-right" type="primary" @click="quanpingrest" style="font-size: 5px;"  size="mini">还原全屏</el-button>

        <!--<div class="pod-content-box">-->
            <!--<div class="pod-content-item" v-for="(item,index) of data.trace_info "  :key="index">-->
                <!--<div class="pod-item-index">{{index}}</div>-->
                <!--<div class="pod-item-text">{{item}}-->
                <!--</div>-->
            <!--</div>-->
            <!--</div>-->
<div>

    <!--element-loading-text="拼命加载中"   element-loading-spinner="el-icon-loading"  v-loading="loading"  element-loading-background="rgba(0, 0, 0, 0.8)"-->

        <el-table
            :data="data.trace_info.data"
             style="width: 100%;border: 5px;" >
            <el-table-column
                    prop="traceId"
                    label="traceId"
                    width="350">
            </el-table-column>
            <el-table-column
                    prop="timestamp"
                    label="timestamp"
                    width="180"  :formatter="dateFormat">
            </el-table-column>
            <el-table-column
                    prop="kind"
                    label="kind"
                    width="180">
            </el-table-column>
              <el-table-column
                    prop="name"
                    label="路由"
                    width="180">
            </el-table-column>
             <el-table-column
                    prop="localEndpoint.serviceName"
                    label="pod的服务名调用"
                    width="180">
            </el-table-column>
                    <el-table-column
                    prop="tags.http\.method"
                    label="tags的服务名调用"
                    width="180">
            </el-table-column>
            <el-table-column prop="update_time" label="更新时间" :formatter="formatDate"/>

        </el-table>
    <div v-for="(index) in data.trace_info.data" :key="index">
        <div v-for=" (value,keys) in index.tags" >
            {{ value }} ==== {{keys}}
        </div>
    </div>
</div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="close">关闭</el-button>
            <!--<el-button type="primary" @click="log_flush" v-loading="loading">刷新</el-button>-->
        </span>
    </el-dialog>
</template>
<script>
    import { reactive, ref, watch } from '@vue/composition-api';
    import { getTraceId } from "../../api/getinfo";
    import moment from 'moment'//导入文件
      import {formatDate} from '../../utils/formattime'
    export default {
        name: "Dilog_ShowTrace",
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
            pod_name:"",
            trace_info : [],

        })
        const dialogVisible = ref(false)
        const loading = ref(false)
        const quanping = ref(false)


        watch(() => {data.dialog_info_flag = props.flag   });
        const close = () => {
            data.dialog_info_flag=false;
            emit("update:flag", false);   //emit更新prop flag
            data.pod_log_arr ="";
            data.pod_name = " ";
        }
        const openDialog = () => {
            gettrace()   //查日志
        }
        const gettrace=()=>{
            let requestData = props.pod
            data.pod_name =requestData
            console.log("AA",data.pod_name)

            getTraceId(requestData).then(response =>{

                console.log("AB",requestData)
                data.trace_info = response.data
                // console.log("haha ",data.trace_info)
                let nowDate=new Date()
                console.log("时间",nowDate)
            }).catch((error)=>{
            })
        }
        const handleDialogClose=()=>{ //右上角关闭按钮-重要
            data.pod_log_arr ="";
            data.pod_name = " "
            emit("update:flag", false);
        }
        const log_flush=()=>{     //点击刷新
            loading.value=true
            // loading_jiazai.value=true
            gettrace()
        }
        const all_quanping=()=>{
            quanping.value= true  //全屏

        }
        const quanpingrest=()=>{
            quanping.value= false   //还原全屏
        }

         const dateFormat=(row, column, cellValue, index)=> {   //格式化时间   //从el-table表中获取数据timestamp字段然后转时间unix
             time = row.timestamp.toString()
             let time = time.substring(0, 10) * 1000  //截取后没有秒10位的
             // let time = time.substring(0,13)  //截取后没有秒13位的
             let date = new Date(time)
             return formatDate(date, 'yyyy-MM-dd hh:mm')
         }
      return {
        dialogVisible,
          data,close,openDialog,handleDialogClose,log_flush,
          loading,quanping,all_quanping,quanpingrest,dateFormat
      }
    }
    }
</script>
<style scoped>
    /*.pod-name {*/
        /*font-size: 6pt;*/
        /*color: red;*/
    /*}*/
    .pod-content-box {
        width: 100%;
        height: 80vh;
        padding: 5px;
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
        width: 50px;
        padding-right: 2px;
        text-align: right;
        color: #999;
    }
    .pod-item-text {
        flex: 1;
    }
   .el-dialog_title {
    line-height: 24px;
    font-size: 18px;
    color: red;
}

</style>
