<template> 
  <tenantCustType-detail :is-edit='false'></tenantCustType-detail>
</template>
<script>
  import TenantCustTypeDetail from './components/TenantCustTypeDetail'
  export default {
    name: 'addTenantCustType',
    components: { TenantCustTypeDetail }
  }
</script>
<style>
</style>


