<template> 
  <tenantMeterStatus-detail :is-edit='false'></tenantMeterStatus-detail>
</template>
<script>
  import TenantMeterStatusDetail from './components/TenantMeterStatusDetail'
  export default {
    name: 'addTenantMeterStatus',
    components: { TenantMeterStatusDetail }
  }
</script>
<style>
</style>


