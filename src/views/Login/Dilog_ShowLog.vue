<template>
<div>
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
        <el-button class="pull-left" type="primary" @click="goAnchor()" style="font-size: 5px" size="mini">查看错误首位置</el-button>
        <el-button class="pull-right" type="primary" @click="All_Quanping" style="font-size: 5px" size="mini">全屏</el-button>
        <el-button class="pull-right" type="primary" @click="Quanping_Rest" style="font-size: 5px;"  size="mini">还原</el-button>
        <el-button class="pull-right" type="primary" :title="infoPod" @click="Cat_Trace(data.pod_name)" style="font-size: 5px;"  size="mini">查看链路</el-button>
<!--//输入查找错误关键字-->
        <div><input type="text" v-model="keyword">
            <div class="match-num">{{ currentIdx }} / {{ matchCount }}</div>
            <button @click.stop="searchLast">上一个</button>
            <button @click.stop="searchNext">下一个</button>
        </div>

        <!--<textarea rows="30" cols="150">-->
            <!--{{ data.pod_log_info }}-->
        <!--</textarea> 　-->
        <div class="pod-content-box">
            <div class=""></div>
            <div class="pod-content-item" v-for="(item,index) of data.pod_log_arr" :key="index">
                <div class="pod-item-index">  {{index}}  </div>
                <div class="pod-item-text" v-if="item.includes('Exception')"><span
                        style="color: red;background-color: yellow" id="haha">{{item}} </span>
                    <search-highlight
                            class="search-highlight"
                            ref="search"
                            @current-change="currentChange"
                            @mactch-count-change="matchCountChange"
                            :content="{item}.item"
                            :keyword="keyword">
                    </search-highlight>
                </div>
     <!--//判断-->
                <div v-else class="pod-item-text">{{item}}</div>
            </div>

        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="close">关闭</el-button>
            <el-button type="primary" @click="log_flush" v-loading="loading">刷新</el-button>
        </span>
    </el-dialog>

        <!--//显示错误链路-->
     <Dilog_ShowTrace :flag.sync="dialog_show_detail"  :pod="infoPod"  />
</div>
</template>
<script>
    import { reactive, ref, watch,toRefs} from '@vue/composition-api';
    import { LogInfo } from "../../api/getinfo";
    import  Dilog_ShowTrace  from "./Dilog_ShowTrace";
    import SearchHighlight from '../../components/2.0SearchHighlight'


    export default {
        name: "Dilog_ShowLog",
      components: { Dilog_ShowTrace,SearchHighlight },

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
            yangshi_podname:""
        })
        const dialogVisible = ref(false)
        const loading = ref(false)
        const quanping = ref(false)
        const dialog_show_detail = ref(false)  //弹框传值
        const infoPod = ref("")   //错误的pod名字
        const guanjianzi = ref("")   //关键字数据

        watch(() => {data.dialog_info_flag = props.flag   });
        const close = () => {
            data.dialog_info_flag=false;
            emit("update:flag", false);   //emit更新prop flag
            data.pod_log_arr ="";
            data.pod_name = " ";
        }
        const openDialog = () => {
            getLog()   //查日志
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
            // loading_jiazai.value=true
            getLog()
        }
        const All_Quanping=()=>{
            quanping.value= true  //全屏

        }
        const Quanping_Rest=()=>{
            quanping.value= false   //还原全屏
        }
        const Cat_Trace=(pod)=>{  //点击后弹开traceid页面
            infoPod.value=pod;
            dialog_show_detail.value=true;   //弹出dialog
            }
            /**锚点
             * **/
        const  goAnchor=()=> {
            document.querySelector("#haha").scrollIntoView(true);
            return document.documentElement.scrollTop
    }


    /**锚点文本搜索**/
    const keyword =ref('')
    const currentIdx=ref(0)
    const matchCount=ref(0)

    const searchLast =()=> {
      refs.search.searchLast()
    }
    const searchNext= ()=> {
      refs.search.searchNext()
    }
    const matchCountChange= (count)=> {
      refs.matchCount = count
    }
    const currentChange= (idx)=> {
      refs.currentIdx = idx
    }

      return {
        dialogVisible, keyword,currentIdx,matchCount,searchLast,searchNext,matchCountChange,currentChange,
          data,close,openDialog,handleDialogClose,log_flush,goAnchor,
          loading,quanping,All_Quanping,Quanping_Rest,Cat_Trace,dialog_show_detail,infoPod,guanjianzi
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