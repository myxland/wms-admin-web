<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantRoleModule" :rules="rules" ref="tenantRoleModuleFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        {{tenantRoleModule.id}}
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        {{tenantRoleModule.tenantName}}
      </el-form-item>
      <el-form-item label="角色编号：" prop="roleId">
      	{{tenantRoleModule.roleId}}
      </el-form-item>
      <el-form-item label="模块：" prop="moduleId">
        {{tenantRoleModule.moduleName}}
      </el-form-item>
      <el-form-item label="开放：" prop="roleModuleOn">
        <el-switch
          v-model="tenantRoleModule.roleModuleOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantRoleModule} from '@/api/tenantRoleModule'
  import {fetchList as fetchModuleInfoList} from '@/api/moduleInfo';
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';

  const defaultTenantRoleModule={
    tenantId: '',
    roleId: '',
    moduleId: '',
    roleModuleOn: 1
  };
  export default {
    name: 'TenantRoleModuleView',
    data() {
      return {
        tenantRoleModule:Object.assign({}, defaultTenantRoleModule),
        rules: {
        }
      }
    },
    created() {
      getTenantRoleModule(this.$route.query.id).then(response => {
	      this.tenantRoleModule = response.data;
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