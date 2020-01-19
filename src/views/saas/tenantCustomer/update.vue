<template> 
  <tenantCustomer-detail :is-edit='true'></tenantCustomer-detail>
</template>
<script>
  import TenantCustomerDetail from './components/TenantCustomerDetail'
  export default {
    name: 'updateTenantCustomer',
    components: { TenantCustomerDetail }
  }
</script>
<style>
</style>


