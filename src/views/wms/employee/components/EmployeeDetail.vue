<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="employee" :rules="rules" ref="employeeFrom" label-width="150px">
      <el-form-item label="名称：" prop="empName">
        <el-input v-model="employee.empName"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="empPassword">
        <el-input v-model="employee.empPassword"></el-input>
      </el-form-item>
      <el-form-item label="能否登录：" prop="loginOn">
        <el-select v-model="employee.loginOn" clearable>
          <el-option
            v-for="item in loginOnOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态：" prop="empStatus">
        <el-select v-model="employee.empStatus" clearable>
          <el-option
            v-for="item in empStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="员工手机号：" prop="empMobile">
        <el-input v-model="employee.empMobile"></el-input>
      </el-form-item>
      <el-form-item label="员工邮箱：" prop="empEmail">
        <el-input v-model="employee.empEmail"></el-input>
      </el-form-item>
      <el-form-item label="个人微信：" prop="empPersonalWx">
        <el-input v-model="employee.empPersonalWx"></el-input>
      </el-form-item>
      <el-form-item label="企业微信：" prop="empEnterpriceWx">
        <el-input v-model="employee.empEnterpriceWx"></el-input>
      </el-form-item>
      <el-form-item label="创建时间：" prop="empCreateTime">
        <el-input v-model="employee.empCreateTime"></el-input>
      </el-form-item>
      <el-form-item label="更新时间：" prop="empUpdateTime">
        <el-input v-model="employee.empUpdateTime"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('employeeFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('employeeFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createEmployee, getEmployee, updateEmployee} from '@/api/employee'
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultEmployee={
    empName: '',
    empPassword: '',
    loginOn: 0,
    empStatus: 0,
    empMobile: '',
    empEmail: '',
    empPersonalWx: '',
    empEnterpriceWx: '',
    empCreateTime: '',
    empUpdateTime: ''
  };
  const defaultLoginOnOptions=[
    {
      value: 0,
      label: '不能登录'
    },
    {
      value: 1,
      label: '可登录'
    }
  ];
  const defaultEmpStatusOptions=[
    {
      value: 0,
      label: '禁用'
    },
    {
      value: 1,
      label: '在职'
    },
    {
      value: 2,
      label: '离职'
    }
  ];
  export default {
    name: 'EmployeeDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        employee:Object.assign({}, defaultEmployee),
        rules: {
          empName: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ],
          empPassword: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          loginOn: [
            {required: true, message: '请选择能否登录', trigger: 'blur'}
          ],
          empStatus: [
            {required: true, message: '请选择状态', trigger: 'blur'}
          ],
          empMobile: [
            {required: true, message: '请输入员工手机号', trigger: 'blur'}
          ],
          empEmail: [
            {required: true, message: '请输入员工邮箱', trigger: 'blur'}
          ],
          empPersonalWx: [
            {required: true, message: '请输入个人微信', trigger: 'blur'}
          ],
          empEnterpriceWx: [
            {required: true, message: '请输入企业微信', trigger: 'blur'}
          ],
          empCreateTime: [
            {required: true, message: '请输入创建时间', trigger: 'blur'}
          ],
          empUpdateTime: [
            {required: true, message: '请输入更新时间', trigger: 'blur'}
          ]
        },
        loginOnOptions: Object.assign({},defaultLoginOnOptions),
        empStatusOptions: Object.assign({},defaultEmpStatusOptions)
      }
    },
    created() {
      if (this.isEdit) {
        getEmployee(this.$route.query.id).then(response => {
          this.employee = response.data;
        });
      }else{
        this.employee = Object.assign({},defaultEmployee);
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
                updateEmployee(this.$route.query.id, this.employee).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createEmployee(this.employee).then(response => {
                  this.$refs[formName].resetFields();
                  this.employee = Object.assign({},defaultEmployee);
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
        this.employee = Object.assign({},defaultEmployee);
      }
    }
  }
</script>
<style>
</style>


