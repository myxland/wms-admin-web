<template> 
  <tenantInfo-detail :is-edit='true'></tenantInfo-detail>
</template>
<script>
  import TenantInfoDetail from './components/TenantInfoDetail'
  export default {
    name: 'updateTenantInfo',
    components: { TenantInfoDetail }
  }
</script>
<style>
</style>


