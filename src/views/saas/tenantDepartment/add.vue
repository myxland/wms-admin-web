<template> 
  <tenantDepartment-detail :is-edit='false'></tenantDepartment-detail>
</template>
<script>
  import TenantDepartmentDetail from './components/TenantDepartmentDetail'
  export default {
    name: 'addTenantDepartment',
    components: { TenantDepartmentDetail }
  }
</script>
<style>
</style>


