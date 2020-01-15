<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantRole" :rules="rules" ref="tenantRoleFrom" label-width="150px">
      <el-form-item label="角色ID：" prop="id">
        {{tenantRole.id}}
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        {{tenantRole.tenantName}}
      </el-form-item>
      <el-form-item label="角色名称：" prop="roleName">
      	{{tenantRole.roleName}}
      </el-form-item>
      <el-form-item label="角色备注：" prop="roleRemark">
      	{{tenantRole.roleRemark}}
      </el-form-item>
      <el-form-item label="创建类型：" prop="createType">
        {{tenantRole.createType | formatCreateType}}
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
    roleRemark: '',
    createType: ''
  };
  const defaultCreateTypeOptions=[
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
    name: 'TenantRoleView',
    data() {
      return {
        tenantRole:Object.assign({}, defaultTenantRole),
        createTypeOptions: Object.assign({},defaultCreateTypeOptions),
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
      formatCreateType(createType){
      	for(let i=0;i<defaultCreateTypeOptions.length;i++){
      		if(createType===defaultCreateTypeOptions[i].value){
      			return defaultCreateTypeOptions[i].label;
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