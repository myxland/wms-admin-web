<template> 
  <tenantEmployee-detail :is-edit='true'></tenantEmployee-detail>
</template>
<script>
  import TenantEmployeeDetail from './components/TenantEmployeeDetail'
  export default {
    name: 'updateTenantEmployee',
    components: { TenantEmployeeDetail }
  }
</script>
<style>
</style>


