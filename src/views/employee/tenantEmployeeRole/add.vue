<template> 
  <tenantEmployeeRole-detail :is-edit='false'></tenantEmployeeRole-detail>
</template>
<script>
  import TenantEmployeeRoleDetail from './components/TenantEmployeeRoleDetail'
  export default {
    name: 'addTenantEmployeeRole',
    components: { TenantEmployeeRoleDetail }
  }
</script>
<style>
</style>


