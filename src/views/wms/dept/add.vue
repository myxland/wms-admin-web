<template> 
  <dept-detail :is-edit='false'></dept-detail>
</template>
<script>
  import DeptDetail from './components/DeptDetail'
  export default {
    name: 'addDept',
    components: { DeptDetail }
  }
</script>
<style>
</style>


