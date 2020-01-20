<template> 
  <tenantPayment-detail :is-edit='false'></tenantPayment-detail>
</template>
<script>
  import TenantPaymentDetail from './components/TenantPaymentDetail'
  export default {
    name: 'addTenantPayment',
    components: { TenantPaymentDetail }
  }
</script>
<style>
</style>


