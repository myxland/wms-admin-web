<template> 
  <tenantModule-detail :is-edit='false'></tenantModule-detail>
</template>
<script>
  import TenantModuleDetail from './components/TenantModuleDetail'
  export default {
    name: 'addTenantModule',
    components: { TenantModuleDetail }
  }
</script>
<style>
</style>


