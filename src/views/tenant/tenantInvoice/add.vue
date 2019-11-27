<template> 
  <tenantInvoice-detail :is-edit='false'></tenantInvoice-detail>
</template>
<script>
  import TenantInvoiceDetail from './components/TenantInvoiceDetail'
  export default {
    name: 'addTenantInvoice',
    components: { TenantInvoiceDetail }
  }
</script>
<style>
</style>


