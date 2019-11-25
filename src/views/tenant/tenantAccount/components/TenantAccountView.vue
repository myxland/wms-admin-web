<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantAccount" :rules="rules" ref="tenantAccountFrom" label-width="150px">
      <el-form-item label="编号ID：" prop="id">
        {{tenantAccount.id}}
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">       
        {{tenantAccount.tenantName}}
      </el-form-item>
      <el-form-item label="账户余额：" prop="accountBalance">
        {{tenantAccount.accountBalance}}
      </el-form-item>      
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantAccount} from '@/api/tenantAccount'
  const defaultTenantAccount={
    id:'',
    tenantId: '',
    accountBalance: ''
  };
  export default {
    name: 'TenantAccountView',
    data() {
      return {
        tenantAccount:Object.assign({}, defaultTenantAccount),
        rules: {
        }
      }
    },
    created() {
      getTenantAccount(this.$route.query.id).then(response => {
        this.tenantAccount = response.data;
      });
    },
    methods: {      
    }
  }
</script>
<style>
</style>


