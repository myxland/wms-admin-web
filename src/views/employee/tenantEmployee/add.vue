<template> 
  <tenantEmployee-detail :is-edit='false'></tenantEmployee-detail>
</template>
<script>
  import TenantEmployeeDetail from './components/TenantEmployeeDetail'
  export default {
    name: 'addTenantEmployee',
    components: { TenantEmployeeDetail }
  }
</script>
<style>
</style>


