<template> 
  <tenantAccount-detail :is-edit='true'></tenantAccount-detail>
</template>
<script>
  import TenantAccountDetail from './components/TenantAccountDetail'
  export default {
    name: 'updateTenantAccount',
    components: { TenantAccountDetail }
  }
</script>
<style>
</style>


