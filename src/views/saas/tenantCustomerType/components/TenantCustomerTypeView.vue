<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantCustomerType" :rules="rules" ref="tenantCustomerTypeFrom" label-width="150px">
      <el-form-item label="用户类别ID：" prop="id">
        {{tenantCustomerType.id}}
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        {{tenantCustomerType.tenantName}}
      </el-form-item>
      <el-form-item label="用户类别名称：" prop="customerTypeName">
      	{{tenantCustomerType.customerTypeName}}
      </el-form-item>
      <el-form-item label="上级用户类别ID：" prop="customerTypeParentId">
      	{{tenantCustomerType.customerTypeParentId}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantCustomerType} from '@/api/tenantCustomerType'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';

  const defaultTenantCustomerType={
    tenantId: '',
    customerTypeName: '',
    customerTypeParentId: ''
  };
  export default {
    name: 'TenantCustomerTypeView',
    data() {
      return {
        tenantCustomerType:Object.assign({}, defaultTenantCustomerType),
        rules: {
        }
      }
    },
    created() {
      getTenantCustomerType(this.$route.query.id).then(response => {
	      this.tenantCustomerType = response.data;
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