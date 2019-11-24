<template> 
  <tenantRole-detail :is-edit='false'></tenantRole-detail>
</template>
<script>
  import TenantRoleDetail from './components/TenantRoleDetail'
  export default {
    name: 'addTenantRole',
    components: { TenantRoleDetail }
  }
</script>
<style>
</style>


