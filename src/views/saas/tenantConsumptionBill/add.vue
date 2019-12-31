<template> 
  <tenantConsumptionBill-detail :is-edit='false'></tenantConsumptionBill-detail>
</template>
<script>
  import TenantConsumptionBillDetail from './components/TenantConsumptionBillDetail'
  export default {
    name: 'addTenantConsumptionBill',
    components: { TenantConsumptionBillDetail }
  }
</script>
<style>
</style>


