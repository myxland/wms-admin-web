<template> 
  <tenantBill-detail :is-edit='false'></tenantBill-detail>
</template>
<script>
  import TenantBillDetail from './components/TenantBillDetail'
  export default {
    name: 'addTenantBill',
    components: { TenantBillDetail }
  }
</script>
<style>
</style>


