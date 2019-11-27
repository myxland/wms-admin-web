<template> 
  <tenantConfig-detail :is-edit='true'></tenantConfig-detail>
</template>
<script>
  import TenantConfigDetail from './components/TenantConfigDetail'
  export default {
    name: 'updateTenantConfig',
    components: { TenantConfigDetail }
  }
</script>
<style>
</style>


