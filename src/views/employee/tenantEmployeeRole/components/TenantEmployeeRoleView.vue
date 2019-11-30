<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantEmployeeRole" :rules="rules" ref="tenantEmployeeRoleFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        {{tenantEmployeeRole.id}}
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        {{tenantEmployeeRole.tenantName}}
      </el-form-item>
      <el-form-item label="员工编号：" prop="empId">
      	{{tenantEmployeeRole.empId}}
      </el-form-item>
      <el-form-item label="角色编号：" prop="roleId">
      	{{tenantEmployeeRole.roleId}}
      </el-form-item>
      <el-form-item label="开放：" prop="empRoleOn">
        <el-switch
          v-model="tenantEmployeeRole.empRoleOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantEmployeeRole} from '@/api/tenantEmployeeRole'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';

  const defaultTenantEmployeeRole={
    tenantId: '',
    empId: '',
    roleId: '',
    empRoleOn: 1
  };
  export default {
    name: 'TenantEmployeeRoleView',
    data() {
      return {
        tenantEmployeeRole:Object.assign({}, defaultTenantEmployeeRole),
        rules: {
        }
      }
    },
    created() {
      getTenantEmployeeRole(this.$route.query.id).then(response => {
	      this.tenantEmployeeRole = response.data;
      });
    },
    filters: {
    },
    methods: {
    }
  }
</script>
<style>
</style>