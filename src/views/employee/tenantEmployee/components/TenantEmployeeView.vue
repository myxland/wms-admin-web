<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantEmployee" :rules="rules" ref="tenantEmployeeFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        {{tenantEmployee.id}}
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        {{tenantEmployee.tenantName}}
      </el-form-item>
      <el-form-item label="员工名称：" prop="empName">
      	{{tenantEmployee.empName}}
      </el-form-item>
      <el-form-item label="登录密码：" prop="empPassword">
      	{{tenantEmployee.empPassword}}
      </el-form-item>
      <el-form-item label="员工部门：" prop="deptId">
      	{{tenantEmployee.deptName}}
      </el-form-item>
      <el-form-item label="可登录系统：" prop="loginOn">
        <el-switch
          v-model="tenantEmployee.loginOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="员工状态：" prop="empStatus" clearable>
        {{tenantEmployee.empStatus | formatEmpStatus}}
      </el-form-item>      
      <el-form-item label="员工手机号：" prop="empMobile">
      	{{tenantEmployee.empMobile}}
      </el-form-item>
      <el-form-item label="员工邮箱：" prop="empEmail">
      	{{tenantEmployee.empEmail}}
      </el-form-item>
      <el-form-item label="员工个人微信号：" prop="empPersonalWx">
      	{{tenantEmployee.empPersonalWx}}
      </el-form-item>
      <el-form-item label="员工企业微信号：" prop="empEnterpriceWx">
      	{{tenantEmployee.empEnterpriceWx}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantEmployee} from '@/api/tenantEmployee'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';

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
    name: 'TenantEmployeeView',
    data() {
      return {
        tenantEmployee:Object.assign({}, defaultTenantEmployee),
        empStatusOptions: Object.assign({},defaultEmpStatusOptions),
        rules: {
        }
      }
    },
    created() {
      getTenantEmployee(this.$route.query.id).then(response => {
	      this.tenantEmployee = response.data;
      });
    },
    filters: {
      formatEmpStatus(empStatus){
      	for(let i=0;i<defaultEmpStatusOptions.length;i++){
      		if(empStatus===defaultEmpStatusOptions[i].value){
      			return defaultEmpStatusOptions[i].label;
      		}
      	}
      },
    },
    methods: {
    }
  }
</script>
<style>
</style>