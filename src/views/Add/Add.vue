<template>
    <div>
<el-form ref="addinfoForm"  label-width="80px">
      <el-form-item prop="sut_name" label="姓名">
    <el-input v-model="form.stu_name"></el-input>
  </el-form-item>
      <el-form-item prop="stu_sec" label="性别">
    <el-input v-model="form.stu_sex"></el-input>
  </el-form-item>
          <el-form-item prop="stu_cls_id" label="班级">
    <el-input v-model="form.stu_cls_id"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>


    </div>
</template>

<script>
    import {addinfo} from "../../api/getinfo";
    import {reactive} from "@vue/composition-api";
    export default {
        name: "Add",
        setup(props,{root}){

            const form=reactive({
                stu_name:'',
                stu_sex:'',
                stu_cls_id:''

            })


            const submit =()=>{
                let data={
                    stu_name:form.stu_name,
                    stu_sex:form.stu_sex,
                    stu_cls_id:form.stu_cls_id,
                }
                addinfo(data).then(response=>{
                    console.log(response)
                    root.$message({
                        message:"填加成功 ："+form.stu_name,
                        type: "success"
                    })
                }).cache(error=>{

                })

            }
            return{
                form,
                submit
            }


        }


    //       data() {
    //
    //   return {
    //     form: {
    //       name: '',
    //       region: '',
    //       date1: '',
    //       date2: '',
    //       delivery: false,
    //       type: [],
    //       resource: '',
    //       desc: ''
    //     }
    //   }
    // },
    // methods: {
    //   submit() {
    //     console.log('submit!');
    //   }
    // }
    }
</script>

<style scoped>

</style>