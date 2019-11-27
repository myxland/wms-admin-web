<template> 
  <tenantInvoice-detail :is-edit='true'></tenantInvoice-detail>
</template>
<script>
  import TenantInvoiceDetail from './components/TenantInvoiceDetail'
  export default {
    name: 'updateTenantInvoice',
    components: { TenantInvoiceDetail }
  }
</script>
<style>
</style>


