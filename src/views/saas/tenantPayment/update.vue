<template> 
  <tenantPayment-detail :is-edit='true'></tenantPayment-detail>
</template>
<script>
  import TenantPaymentDetail from './components/TenantPaymentDetail'
  export default {
    name: 'updateTenantPayment',
    components: { TenantPaymentDetail }
  }
</script>
<style>
</style>


