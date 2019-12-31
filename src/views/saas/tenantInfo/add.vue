<template> 
  <tenantInfo-detail :is-edit='false'></tenantInfo-detail>
</template>
<script>
  import TenantInfoDetail from './components/TenantInfoDetail'
  export default {
    name: 'addTenantInfo',
    components: { TenantInfoDetail }
  }
</script>
<style>
</style>


