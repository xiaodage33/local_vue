<template>
<div>
    <!--<el-button type="text" @click="dialogVisible">点击打开 Dialog</el-button>-->
    <el-dialog class="el-dialog__headerbtn" btn-vvue
             :fullscreen="quanping"
            :visible.sync="data.dialog_info_flag"
            width="60%"
            top="5vh"
            @opened="openDialog"
            :pod="data.pod_log_info"
            :pod_name="data.pod_name"
            :before-close="handleDialogClose"  >
        <el-button class="pull-left" type="primary" @click="scrollTo(-1)" style="font-size: 5px" size="mini" :disabled="up_scrollTo" >上一个异常</el-button>
        <el-button class="pull-left" type="primary" @click="scrollTo(1)" style="font-size: 5px" size="mini" :disabled="up_scrollTo_down">下一个异常</el-button>

        <el-select style="padding-left: 10px;" class="pull-left" v-model=" data.sel_id  "    @change="handleBlur" clearable placeholder="请选择第几个错误位置" size="mini">
            <el-option
                    v-for="(item,index) in data.options" :key="index"
                    :value="index"  >
            </el-option>
        </el-select>


        <el-button class="pull-right" type="primary" @click="All_Quanping" style="font-size: 5px" size="mini">全屏</el-button>
        <el-button class="pull-right" type="primary" @click="Quanping_Rest" style="font-size: 5px;"  size="mini">还原</el-button>
        <el-button class="pull-right"  type="primary" @click="log_flush" v-loading="loading" style="font-size: 5px;"  size="mini">刷新</el-button>

        <el-button class="pull-right" type="primary"  @click="Cat_Trace(data.pod_name)" style="font-size: 5px;"  size="mini" v-show="false">查看链路</el-button>
<!--//输入查找错误关键字-->
        <div ref="messageBox" class="pod-content-box">
            <div class="pod-content-item" v-for="(item,index) of data.pod_log_arr" :key="index">
                <div class="pod-item-index">{{index}}</div>
                <div ref="exception" v-if="item.includes('Exception')" class="pod-item-text pod-item-text-color">{{item}}</div>
                <div v-else class="pod-item-text">{{item}}</div>
            </div>
        </div>
        <!--<span slot="footer" class="dialog-footer">-->
            <!--<el-button type="primary" @click="close">关闭</el-button>-->
            <!--<el-button type="primary" @click="log_flush" v-loading="loading">刷新</el-button>-->
        <!--</span>-->
    </el-dialog>
        <!--//显示错误链路-->
     <!--<Dilog_ShowTrace :flag.sync="dialog_show_detail"  :pod="infoPod"  />-->
</div>
</template>
<script>
    import { reactive, ref, watch,toRefs} from '@vue/composition-api';
    import { LogInfo } from "../../api/getinfo";
    import  Dilog_ShowTrace  from "./Dilog_ShowTrace";

    export default {
        name: "Dilog_ShowLog",
      components: { Dilog_ShowTrace },
        props: {
            flag: {
                type: Boolean,
                default: false
            },
            pod: {
            type: String,
            default: "" }
        },
      setup(props,{emit,root,refs}) {
        const data = reactive({
            dialog_info_flag: false,   //弹窗标记
            pod_log_info:"",
            pod_log_arr: [],
            pod_name:"",
            podname:"",
            yangshi_podname:"",
            exceptionList:[],    ////定义总的筛选数
            currentException:"",   //跳转当前的位置
            options:[],
            sel_id:'',
        })

        const dialogVisible = ref(false)
        const loading = ref(false)
        const quanping = ref(true)    //全屏默认true
        const dialog_show_detail = ref(false)  //弹框传值
        // const infoPod = ref("")   //错误的pod名字
        const guanjianzi = ref("")   //关键字数据

        const exceptionList =ref([])
        const currentException =ref("")


        const up_scrollTo = ref(false)   //是否可以点击false是可以点击
        const up_scrollTo_down = ref(false)

        watch(() => {data.dialog_info_flag = props.flag });
        const close = () => {
            data.dialog_info_flag=false;
            emit("update:flag", false);   //emit更新prop flag
            data.pod_log_arr ="";
            data.pod_name = " ";
        }
        const openDialog = () => {  //弹开后立即执行查日志
            getLog()
            handleBlur(0)
        }
        const getLog=()=>{
            let requestData = props.pod
            data.pod_name =requestData
            LogInfo(requestData).then(response =>{
                data.pod_log_info = response.data.data
                // console.log('resp',response.data.data)
                // console.log(str.indexOf(guanjianzi.value) !=-1)
                if(data.pod_log_info){
                    data.pod_log_arr = data.pod_log_info.split('\n');
                loading.value=false  //。。。
            }})
        }
        const handleDialogClose=()=>{ //右上角关闭按钮-重要
            data.pod_log_arr ="";
            data.pod_name = " "
            emit("update:flag", false);
        }
        const log_flush=()=>{     //点击刷新
            loading.value=true
            getLog()
            scrollTo()
        }
        const All_Quanping=()=>{
            quanping.value= true  //全屏
        }
        const Quanping_Rest=()=>{
            quanping.value= false   //还原全屏
        }
        const Cat_Trace=(pod)=>{  //点击后弹开traceid页面
            // infoPod.value=pod;
            dialog_show_detail.value=true;   //弹出dialog
            }
        const scrollTo=(value)=>{
            if(exceptionList.value.length === 0) {  //第一次数组就是空 0
                // console.log("data.exceptionList===",data.exceptionList)
                exceptionList.value = refs.exception
                // console.log("给赋值exceptionList.value",data.exceptionList)  //利用refs 给赋值别名为 exception这个数组
            }
            if (exceptionList.value.length === 0) {    //判断赋值后数组是否为空
                alert("没有错误关关键字")
                return
            }
            let resIndex = !currentException.value && currentException.value !== 0 ? 0 : currentException.value + value;  //三目运算
               //下面方法改三目运算 resIndex的值是多少 判断不为空 或不等于0赋值0 ，否则 值+ value（点击的是1 或 -1）
            const resEle = exceptionList.value[resIndex]  //要去的位置定义值
            if (resEle) {
                // console.log(resEle.clientHeight) //看当前位置像素
                resEle.scrollIntoView({behavior: "smooth",block:"center"})
                // refs.messageBox.scrollTop = resEle.offsetTop - resEle.clientHeight*2   //按照像素定位
                currentException.value = resIndex
                // console.log("==data.currentException=",data.currentException)
                //判断上下按钮是否可点
                if(currentException.value +1 >= exceptionList.value.length){
                    up_scrollTo_down.value = true
                }else if(currentException.value <1){
                    up_scrollTo.value = true
                }else{
                    up_scrollTo.value=false
                    up_scrollTo_down.value=false
                }
            }
        }
        const handleBlur=(sele)=>{
            console.log("jinlai")
            exceptionList.value = refs.exception
            data.options = exceptionList.value
              if (sele) {
                const resEle = exceptionList.value[sele]
                resEle.scrollIntoView()
                currentException.value = sele  //当前位置
                if(currentException.value +1 >= exceptionList.value.length){
                    up_scrollTo_down.value = true
                }else if(currentException.value <1){
                    up_scrollTo.value = true
                }else{
                    up_scrollTo.value=false
                    up_scrollTo_down.value=false
                }
            }

        }
      return {
        dialogVisible,
          data,close,openDialog,handleDialogClose,log_flush,scrollTo,up_scrollTo,up_scrollTo_down,handleBlur,exceptionList,currentException,
          loading,quanping,All_Quanping,Quanping_Rest,Cat_Trace,dialog_show_detail,guanjianzi
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
    .pod-item-text-color {
        color: red;
        background-color: yellow;
    }
</style>
<style>
    .el-dialog__headerbtn{position:absolute;top:5px;right:20px;padding:0;background:0 0;border:none;outline:0;cursor:pointer;font-size:30px}
    </style>