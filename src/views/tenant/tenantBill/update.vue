<template> 
  <tenantBill-detail :is-edit='true'></tenantBill-detail>
</template>
<script>
  import TenantBillDetail from './components/TenantBillDetail'
  export default {
    name: 'updateTenantBill',
    components: { TenantBillDetail }
  }
</script>
<style>
</style>


