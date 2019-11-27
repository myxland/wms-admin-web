<template> 
  <tenantConfig-detail :is-edit='false'></tenantConfig-detail>
</template>
<script>
  import TenantConfigDetail from './components/TenantConfigDetail'
  export default {
    name: 'addTenantConfig',
    components: { TenantConfigDetail }
  }
</script>
<style>
</style>


