<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantRole" :rules="rules" ref="tenantRoleFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        {{tenantRole.id}}
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        {{tenantRole.tenantName}}
      </el-form-item>
      <el-form-item label="角色名称：" prop="roleName">
      	{{tenantRole.roleName}}
      </el-form-item>
      <el-form-item label="角色说明：" prop="roleRemark">
      	{{tenantRole.roleRemark}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantRole} from '@/api/tenantRole'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';

  const defaultTenantRole={
    tenantId: '',
    roleName: '',
    roleRemark: ''
  };
  export default {
    name: 'TenantRoleView',
    data() {
      return {
        tenantRole:Object.assign({}, defaultTenantRole),
        rules: {
        }
      }
    },
    created() {
      getTenantRole(this.$route.query.id).then(response => {
	      this.tenantRole = response.data;
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