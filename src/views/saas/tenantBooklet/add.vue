<template> 
  <tenantBooklet-detail :is-edit='false'></tenantBooklet-detail>
</template>
<script>
  import TenantBookletDetail from './components/TenantBookletDetail'
  export default {
    name: 'addTenantBooklet',
    components: { TenantBookletDetail }
  }
</script>
<style>
</style>


