<template> 
  <employee-detail :is-edit='true'></employee-detail>
</template>
<script>
  import EmployeeDetail from './components/EmployeeDetail'
  export default {
    name: 'updateEmployee',
    components: { EmployeeDetail }
  }
</script>
<style>
</style>


