<template>
    <el-dialog title="新增" :visible.sync="data.dialog_info_flag" @close="close" width="580px" @opened="openDialog">
        <el-form :model="data.form" ref="addInfoForm">
            <!--<el-form-item label="输入信息：" :label-width="data.formLabelWidth" prop="category">-->
                <!--&lt;!&ndash;<el-select v-model="data.form.category" placeholder="请选择活动区域">&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-option&ndash;&gt;-->
                    <!--&lt;!&ndash;v-for="item in data.category"&ndash;&gt;-->
                    <!--&lt;!&ndash;:key="item.id"&ndash;&gt;-->
                    <!--&lt;!&ndash;:label="item.category_name"&ndash;&gt;-->
                    <!--&lt;!&ndash;:value="item.id">&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-option>&ndash;&gt;-->
                <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
            <!--</el-form-item>-->
            <el-form-item label="姓名：" :label-width="data.formLabelWidth" prop="title">
                <el-input v-model="data.form.stu_name" placehoder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="班级：" :label-width="data.formLabelWidth" prop="content">
                <el-input type="textarea" v-model="data.form.stu_cls_id" placehoder="请输入班级"></el-input>
            </el-form-item>

            <el-form-item label="性别：" :label-width="data.formLabelWidth" prop="content">
                <el-input type="textarea" v-model="data.form.stu_sex" placehoder="请输入性别"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="danger" :loading="data.submitLoading" @click="submit">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {Getinfo,Getinfo1,addinfo,delinfo,editinfo} from '../../api/getinfo'
import { reactive, ref, watchEffect } from '@vue/composition-api';
// import { editInfo } from './login'

export default {
    name: 'Add',
    props: {
        flag: {
            type: Boolean,
            default: false
        },
        category: {
            type: Array,
            default: () => []
        },
        id: {
            type: String,
            default: ""
        }
    },
    // vue2.0
    // data(){
    //     return  {
    //         dialog_info_flag: false,
    //         formLabelWidth: '70px',
    //         form: {
    //             category: '',
    //             title: '',
    //             content: ''
    //         },
    //         categoryOption: [],
    //         submitLoading: false
    //     }
    // },
    setup(props, { emit, root, refs }){
        /**
         * 数据
         */
        const data = reactive({
            dialog_info_flag: false,  // 弹窗标记
            formLabelWidth: '100px',
            form: {
                stu_name: '',
                stu_sex: '',
                stu_cls_id: ''
            },
            // 分类下拉
            // categoryOption: [],
            // 按钮加载
            submitLoading: false
        });
        // watch
        watchEffect(() => data.dialog_info_flag = props.flag);
        /**
         * vue2.0 methods
         */
        const close = () => {
            data.dialog_info_flag = false;
            resetForm()
            emit("update:flag", false);
        }

        const openDialog = () => {
            // data.categoryOption = props.category
            // console.log(props.id)
            Getinfo()
            data.submitLoading = false
            resetForm()


        }



        // ========================================================

        const resetForm = () => {
            // refs.addInfoForm.resetFields();
            data.form.stu_name = ''
            data.form.stu_sex = ''
            data.form.stu_cls_id = ''
        }


        const submit = () => {
            let requestData = {
                stu_name: data.form.stu_name,
                stu_sex: data.form.stu_sex,
                stu_cls_id: data.form.stu_cls_id,
            }

            console.log('哈哈==',requestData)
            if (requestData.id) {
                root.$message({
                    message: '分类不能为空！！',
                    type: 'error'
                })
                return false;
            }

            addinfo(requestData).then(response=>{
                console.log("添加弹窗",response)
                    root.$message({
                        message:"填加成功 ："+data.form.stu_name,
                        type: "success"
                    })
                data.submitLoading = true

                // 重置表单

                resetForm()

            }).cache(error=>{
               data.submitLoading = false

            })
        }


            // data.submitLoading = true

                /**
                 * 两种刷新数据方式
                 * 1、暴力型，直接刷新接口
                 * 2、返回列表，手动修改指定的数据
                 */
                // emit("getListEmit");
                // 重置表单
                // resetForm()
                // root.$refs['addInfoForm'].resetFields();


        //
        //            const submit =()=>{
        //         let data={
        //             stu_name:form.stu_name,
        //             stu_sex:form.stu_sex,
        //             stu_cls_id:form.stu_cls_id,
        //         }
        //         addinfo(data).then(response=>{
        //             console.log(response)
        //             root.$message({
        //                 message:"填加成功 ："+form.stu_name,
        //                 type: "success"
        //             })
        //         }).cache(error=>{
        //         })
        //     }
        //     return{
        //         form,
        //         submit
        //     }
        // }



        return {
            data,
            // methods
            close, openDialog, submit,Getinfo
        }
    }
}
</script>
<style scoped>

</style>
