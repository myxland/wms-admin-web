<template> 
  <dept-detail :is-edit='true'></dept-detail>
</template>
<script>
  import DeptDetail from './components/DeptDetail'
  export default {
    name: 'updateDept',
    components: { DeptDetail }
  }
</script>
<style>
</style>


