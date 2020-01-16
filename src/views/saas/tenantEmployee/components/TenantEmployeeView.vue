<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantEmployee" :rules="rules" ref="tenantEmployeeFrom" label-width="150px">
      <el-form-item label="员工ID：" prop="id">
        {{tenantEmployee.id}}
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        {{tenantEmployee.tenantName}}
      </el-form-item>
      <el-form-item label="员工名称：" prop="employeeName">
      	{{tenantEmployee.employeeName}}
      </el-form-item>
      <el-form-item label="登录密码：" prop="employeePassword">
      	{{tenantEmployee.employeePassword}}
      </el-form-item>
      <el-form-item label="员工所属部门ID：" prop="employeeDepartmentId">
      	{{tenantEmployee.employeeDepartmentId}}
      </el-form-item>
      <el-form-item label="可登录系统：" prop="employeeLoginOn">
        <el-switch
          v-model="tenantEmployee.employeeLoginOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="员工状态：" prop="employeeStatus">
        {{tenantEmployee.employeeStatus | formatEmployeeStatus}}
      </el-form-item>
      <el-form-item label="员工手机号：" prop="employeeMobile">
      	{{tenantEmployee.employeeMobile}}
      </el-form-item>
      <el-form-item label="员工邮箱：" prop="employeeEmail">
      	{{tenantEmployee.employeeEmail}}
      </el-form-item>
      <el-form-item label="员工个人微信号：" prop="employeePersonalWx">
      	{{tenantEmployee.employeePersonalWx}}
      </el-form-item>
      <el-form-item label="员工企业微信号：" prop="employeeEnterpriceWx">
      	{{tenantEmployee.employeeEnterpriceWx}}
      </el-form-item>
      <el-form-item label="钉钉号：" prop="employeeDingding">
      	{{tenantEmployee.employeeDingding}}
      </el-form-item>
      <el-form-item label="操作员创建类型：" prop="employeeCreateType">
        {{tenantEmployee.employeeCreateType | formatEmployeeCreateType}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantEmployee} from '@/api/tenantEmployee'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';

  const defaultTenantEmployee={
    tenantId: '',
    employeeName: '',
    employeePassword: '',
    employeeDepartmentId: '',
    employeeLoginOn: 1,
    employeeStatus: '',
    employeeMobile: '',
    employeeEmail: '',
    employeePersonalWx: '',
    employeeEnterpriceWx: '',
    employeeDingding: '',
    employeeCreateType: ''
  };
  const defaultEmployeeStatusOptions=[
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
  const defaultEmployeeCreateTypeOptions=[
    {
      value: 1,
      label: '平台默认创建'
    },
    {
      value: 2,
      label: '租户自建'
    }
  ];
  export default {
    name: 'TenantEmployeeView',
    data() {
      return {
        tenantEmployee:Object.assign({}, defaultTenantEmployee),
        employeeStatusOptions: Object.assign({},defaultEmployeeStatusOptions),
        employeeCreateTypeOptions: Object.assign({},defaultEmployeeCreateTypeOptions),
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
      formatEmployeeStatus(employeeStatus){
      	for(let i=0;i<defaultEmployeeStatusOptions.length;i++){
      		if(employeeStatus===defaultEmployeeStatusOptions[i].value){
      			return defaultEmployeeStatusOptions[i].label;
      		}
      	}
      },
      formatEmployeeCreateType(employeeCreateType){
      	for(let i=0;i<defaultEmployeeCreateTypeOptions.length;i++){
      		if(employeeCreateType===defaultEmployeeCreateTypeOptions[i].value){
      			return defaultEmployeeCreateTypeOptions[i].label;
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