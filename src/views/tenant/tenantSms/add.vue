<template> 
  <tenantSms-detail :is-edit='false'></tenantSms-detail>
</template>
<script>
  import TenantSmsDetail from './components/TenantSmsDetail'
  export default {
    name: 'addTenantSms',
    components: { TenantSmsDetail }
  }
</script>
<style>
</style>


