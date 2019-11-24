<template> 
  <tenantAccount-detail :is-edit='false'></tenantAccount-detail>
</template>
<script>
  import TenantAccountDetail from './components/TenantAccountDetail'
  export default {
    name: 'addTenantAccount',
    components: { TenantAccountDetail }
  }
</script>
<style>
</style>


