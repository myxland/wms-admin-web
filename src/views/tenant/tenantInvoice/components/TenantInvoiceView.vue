<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantInvoice" :rules="rules" ref="tenantInvoiceFrom" label-width="150px">
      <el-form-item label="租户编号：" prop="id">
        {{tenantInvoice.id}}
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        {{tenantInvoice.tenantName}}
      </el-form-item>
      <el-form-item label="税号：" prop="creditNumber">
      	{{tenantInvoice.creditNumber}}
      </el-form-item>
      <el-form-item label="开票地址：" prop="invoiceAddress">
      	{{tenantInvoice.invoiceAddress}}
      </el-form-item>
      <el-form-item label="开户行行号：" prop="bankNo">
      	{{tenantInvoice.bankNo}}
      </el-form-item>
      <el-form-item label="开户行名称：" prop="bankName">
      	{{tenantInvoice.bankName}}
      </el-form-item>
      <el-form-item label="开户账号：" prop="accountNo">
      	{{tenantInvoice.accountNo}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantInvoice} from '@/api/tenantInvoice'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';

  const defaultTenantInvoice={
    tenantId: '',
    creditNumber: '',
    invoiceAddress: '',
    bankNo: '',
    bankName: '',
    accountNo: ''
  };
  export default {
    name: 'TenantInvoiceView',
    data() {
      return {
        tenantInvoice:Object.assign({}, defaultTenantInvoice),
        rules: {
        }
      }
    },
    created() {
      getTenantInvoice(this.$route.query.id).then(response => {
	      this.tenantInvoice = response.data;
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