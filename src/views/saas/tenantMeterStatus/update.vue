<template> 
  <tenantMeterStatus-detail :is-edit='true'></tenantMeterStatus-detail>
</template>
<script>
  import TenantMeterStatusDetail from './components/TenantMeterStatusDetail'
  export default {
    name: 'updateTenantMeterStatus',
    components: { TenantMeterStatusDetail }
  }
</script>
<style>
</style>


