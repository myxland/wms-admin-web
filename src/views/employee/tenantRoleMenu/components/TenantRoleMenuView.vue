<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantRoleMenu" :rules="rules" ref="tenantRoleMenuFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        {{tenantRoleMenu.id}}
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        {{tenantRoleMenu.tenantName}}
      </el-form-item>
      <el-form-item label="角色编号：" prop="roleId">
      	{{tenantRoleMenu.roleId}}
      </el-form-item>
      <el-form-item label="模块：" prop="moduleId">
        {{tenantRoleMenu.moduleName}}
      </el-form-item>
      <el-form-item label="菜单编号：" prop="menuId">
      	{{tenantRoleMenu.menuId}}
      </el-form-item>
      <el-form-item label="开放：" prop="roleMenuOn">
        <el-switch
          v-model="tenantRoleMenu.roleMenuOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantRoleMenu} from '@/api/tenantRoleMenu'
  import {fetchList as fetchModuleInfoList} from '@/api/moduleInfo';
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';

  const defaultTenantRoleMenu={
    tenantId: '',
    roleId: '',
    moduleId: '',
    menuId: '',
    roleMenuOn: 1
  };
  export default {
    name: 'TenantRoleMenuView',
    data() {
      return {
        tenantRoleMenu:Object.assign({}, defaultTenantRoleMenu),
        rules: {
        }
      }
    },
    created() {
      getTenantRoleMenu(this.$route.query.id).then(response => {
	      this.tenantRoleMenu = response.data;
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