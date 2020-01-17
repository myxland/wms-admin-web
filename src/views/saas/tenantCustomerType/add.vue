<template> 
  <tenantCustomerType-detail :is-edit='false'></tenantCustomerType-detail>
</template>
<script>
  import TenantCustomerTypeDetail from './components/TenantCustomerTypeDetail'
  export default {
    name: 'addTenantCustomerType',
    components: { TenantCustomerTypeDetail }
  }
</script>
<style>
</style>


