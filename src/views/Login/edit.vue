<template>
    <el-dialog title="修改" :visible.sync="data.dialog_info_flag" @close="close" width="580px" @opened="openDialog">
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
            <el-form-item label="班级：" :label-width="data.formLabelWidth" prop="contreactiveent">
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
import { reactive, ref, watch } from '@vue/composition-api';
// import { editInfo } from './login'

export default {
    name: 'dialogInfo',
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
        watch(() => data.dialog_info_flag = props.flag);
        /**
         * vue2.0 methods
         */
        const close = () => {
            data.dialog_info_flag = false;
            resetForm()
            emit("update:flag", false);
        }

        const openDialog = () => {
            data.categoryOption = props.category
            console.log(props.id)
            Getinfo()
        }



        // ========================================================
        const Getinfo = () => {
            let requestData = {
                // pageNumber: 1,
                // pageSize: 1,
                id: props.id
            }
            Getinfo1(requestData).then(response => {
                console.log("修改",response)
                let responseData = response.data
                data.form = {
                    stu_name: responseData.stu_name,
                    stu_cls_id: responseData.stu_cls_id,
                    stu_sex: responseData.stu_sex
                }
            })
        }
        const resetForm = () => {
            // refs.addInfoForm.resetFields();
            data.form.stu_name = ''
            data.form.stu_sex = ''
            data.form.stu_cls_id = ''
        }
        const submit = () => {
            let requestData = {
                id: props.id,
                stu_name: data.form.stu_name,
                stu_sex: data.form.stu_sex,
                stu_cls_id: data.form.stu_cls_id,
            }
            console.log("edit-submit",requestData)
            if(data.form.category) {
                root.$message({
                    message: '分类不能为空！！',
                    type: 'error'
                })
                return false;
            }
            data.submitLoading = true
            editinfo(requestData).then(response => {
                let responseData = response.data
                console.log("he",responseData)
                root.$message({
                    message: responseData.data,
                    type: 'success'
                })
                data.submitLoading = false
                /**
                 * 两种刷新数据方式
                 * 1、暴力型，直接刷新接口
                 * 2、返回列表，手动修改指定的数据
                 */
                // emit("getListEmit");
                // 重置表单
                resetForm()
                root.$refs['addInfoForm'].resetFields();
            }).catch(error => {
                data.submitLoading = false
            })
        }
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