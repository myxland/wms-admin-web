<template> 
  <tenantEmployeeRole-detail :is-edit='true'></tenantEmployeeRole-detail>
</template>
<script>
  import TenantEmployeeRoleDetail from './components/TenantEmployeeRoleDetail'
  export default {
    name: 'updateTenantEmployeeRole',
    components: { TenantEmployeeRoleDetail }
  }
</script>
<style>
</style>


