<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantDept" :rules="rules" ref="tenantDeptFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        {{tenantDept.id}}
      </el-form-item>
      <el-form-item label="上级部门：" prop="parentDeptId">
      	{{tenantDept.parentDeptId}}
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        {{tenantDept.tenantName}}
      </el-form-item>
      <el-form-item label="部门名称：" prop="deptName">
      	{{tenantDept.deptName}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantDept} from '@/api/tenantDept'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';

  const defaultTenantDept={
    parentDeptId: '',
    tenantId: '',
    deptName: ''
  };
  export default {
    name: 'TenantDeptView',
    data() {
      return {
        tenantDept:Object.assign({}, defaultTenantDept),
        rules: {
        }
      }
    },
    created() {
      getTenantDept(this.$route.query.id).then(response => {
	      this.tenantDept = response.data;
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