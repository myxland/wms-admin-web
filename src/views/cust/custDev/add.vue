<template> 
  <custDev-detail :is-edit='false'></custDev-detail>
</template>
<script>
  import CustDevDetail from './components/CustDevDetail'
  export default {
    name: 'addCustDev',
    components: { CustDevDetail }
  }
</script>
<style>
</style>


