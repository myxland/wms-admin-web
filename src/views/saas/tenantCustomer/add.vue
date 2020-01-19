<template> 
  <tenantCustomer-detail :is-edit='false'></tenantCustomer-detail>
</template>
<script>
  import TenantCustomerDetail from './components/TenantCustomerDetail'
  export default {
    name: 'addTenantCustomer',
    components: { TenantCustomerDetail }
  }
</script>
<style>
</style>


