<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="dept" :rules="rules" ref="deptFrom" label-width="150px">
      <el-form-item label="租户：" prop="tenantId">
        <el-input v-model="dept.tenantId"></el-input>
      </el-form-item>
      <el-form-item label="名称：" prop="deptName">
        <el-input v-model="dept.deptName"></el-input>
      </el-form-item>
      <el-form-item label="上级：" prop="parentDeptId">
        <el-input v-model="dept.parentDeptId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('deptFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('deptFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createDept, getDept, updateDept} from '@/api/dept'
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultDept={
    tenantId: 0,
    deptName: '',
    parentDeptId: ''
  };
  export default {
    name: 'DeptDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        dept:Object.assign({}, defaultDept),
        rules: {
          tenantId: [
            {required: true, message: '请输入租户', trigger: 'blur'}
          ],
          deptName: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ],
          parentDeptId: [
            {required: true, message: '请输入上级', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getDept(this.$route.query.id).then(response => {
          this.dept = response.data;
        });
      }else{
        this.dept = Object.assign({},defaultDept);
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateDept(this.$route.query.id, this.dept).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createDept(this.dept).then(response => {
                  this.$refs[formName].resetFields();
                  this.dept = Object.assign({},defaultDept);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.dept = Object.assign({},defaultDept);
      }
    }
  }
</script>
<style>
</style>


