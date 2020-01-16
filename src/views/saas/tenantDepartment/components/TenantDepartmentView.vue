<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantDepartment" :rules="rules" ref="tenantDepartmentFrom" label-width="150px">
      <el-form-item label="部门ID：" prop="id">
        {{tenantDepartment.id}}
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        {{tenantDepartment.tenantName}}
      </el-form-item>
      <el-form-item label="部门名称：" prop="departmentName">
      	{{tenantDepartment.departmentName}}
      </el-form-item>
      <el-form-item label="上级部门ID：" prop="departmentParentId">
      	{{tenantDepartment.departmentParentId}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantDepartment} from '@/api/tenantDepartment'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';

  const defaultTenantDepartment={
    tenantId: '',
    departmentName: '',
    departmentParentId: ''
  };
  export default {
    name: 'TenantDepartmentView',
    data() {
      return {
        tenantDepartment:Object.assign({}, defaultTenantDepartment),
        rules: {
        }
      }
    },
    created() {
      getTenantDepartment(this.$route.query.id).then(response => {
	      this.tenantDepartment = response.data;
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