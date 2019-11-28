<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantCustType" :rules="rules" ref="tenantCustTypeFrom" label-width="150px">
      <el-form-item label="用户类型：" prop="id">
        {{tenantCustType.id}}
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        {{tenantCustType.tenantName}}
      </el-form-item>
      <el-form-item label="用户类别名称：" prop="custTypeName">
      	{{tenantCustType.custTypeName}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantCustType} from '@/api/tenantCustType'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';

  const defaultTenantCustType={
    tenantId: '',
    custTypeName: ''
  };
  export default {
    name: 'TenantCustTypeView',
    data() {
      return {
        tenantCustType:Object.assign({}, defaultTenantCustType),
        rules: {
        }
      }
    },
    created() {
      getTenantCustType(this.$route.query.id).then(response => {
	      this.tenantCustType = response.data;
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