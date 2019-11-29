<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantEmployee" :rules="rules" ref="tenantEmployeeFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        <el-input v-model="tenantEmployee.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="tenantEmployee.tenantId" placeholder="请选择租户" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="员工名称：" prop="empName">
        <el-input v-model="tenantEmployee.empName"></el-input>
      </el-form-item>
      <el-form-item label="登录密码：" prop="empPassword">
        <el-input v-model="tenantEmployee.empPassword"></el-input>
      </el-form-item>
      <el-form-item label="员工部门：" prop="deptId">
        <el-select v-model="tenantEmployee.deptId" placeholder="请选择员工部门" :disabled="this.$route.query.deptId?true:false" clearable>
                <el-option
                  v-for="item in tenantDeptOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="可登录系统：" prop="loginOn">
        <el-switch
          v-model="tenantEmployee.loginOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="员工状态：" prop="empStatus" clearable>
        <el-select
          v-model="tenantEmployee.empStatus"
          placeholder="请选择员工状态">
          <el-option
            v-for="item in empStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="员工手机号：" prop="empMobile">
        <el-input v-model="tenantEmployee.empMobile"></el-input>
      </el-form-item>
      <el-form-item label="员工邮箱：" prop="empEmail">
        <el-input v-model="tenantEmployee.empEmail"></el-input>
      </el-form-item>
      <el-form-item label="员工个人微信号：" prop="empPersonalWx">
        <el-input v-model="tenantEmployee.empPersonalWx"></el-input>
      </el-form-item>
      <el-form-item label="员工企业微信号：" prop="empEnterpriceWx">
        <el-input v-model="tenantEmployee.empEnterpriceWx"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantEmployeeFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantEmployeeFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantEmployee, getTenantEmployee, updateTenantEmployee} from '@/api/tenantEmployee'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {fetchList as fetchTenantDeptList} from '@/api/tenantDept';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantEmployee={
    tenantId: '',
    empName: '',
    empPassword: '',
    deptId: '',
    loginOn: 1,
    empStatus: '',
    empMobile: '',
    empEmail: '',
    empPersonalWx: '',
    empEnterpriceWx: ''
  };
  const defaultEmpStatusOptions=[
    {
      value: 1,
      label: '在职'
    },
    {
      value: 2,
      label: '离职'
    },
    {
      value: 3,
      label: '禁用'
    }
  ];
  export default {
    name: 'TenantEmployeeDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantEmployee:Object.assign({}, defaultTenantEmployee, this.$route.query),
        tenantInfoOptions:[],
        tenantDeptOptions:[],
        empStatusOptions: Object.assign({},defaultEmpStatusOptions),
        rules: {
          tenantId: [
            {required: true, message: '请输入租户编号', trigger: 'blur'}
          ],
          empName: [
            {required: true, message: '请输入员工名称', trigger: 'blur'}
          ],
          empMobile: [
            {required: true, message: '请输入员工手机号', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantEmployee(this.$route.query.id).then(response => {
	          this.tenantEmployee = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantEmployeeByTenantId(this.$route.query.tenantId).then(response => {
	          this.tenantEmployee = response.data;
        	});
        }
        
      }else{
        this.tenantEmployee = Object.assign({},defaultTenantEmployee,this.$route.query);
      }
      this.getTenantInfoList();
      this.getTenantDeptList();
    },
    methods: {
      getTenantInfoList() {
        fetchTenantInfoList({pageNum:1,pageSize:500}).then(response => {
          this.tenantInfoOptions = [];
          let tenantInfoList = response.data.list;
          for(let i=0;i<tenantInfoList.length;i++){
            this.tenantInfoOptions.push({label:tenantInfoList[i].tenantName,value:tenantInfoList[i].id});
          }
        });
      },
      getTenantDeptList() {
        fetchTenantDeptList({pageNum:1,pageSize:500}).then(response => {
          this.tenantDeptOptions = [];
          let tenantDeptList = response.data.list;
          for(let i=0;i<tenantDeptList.length;i++){
            this.tenantDeptOptions.push({label:tenantDeptList[i].deptName,value:tenantDeptList[i].id});
          }
        });
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateTenantEmployee(this.$route.query.id, this.tenantEmployee).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantEmployee(this.tenantEmployee).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantEmployee = Object.assign({},defaultTenantEmployee);
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
        this.tenantEmployee = Object.assign({},defaultTenantEmployee);
      }
    }
  }
</script>
<style>
</style>


