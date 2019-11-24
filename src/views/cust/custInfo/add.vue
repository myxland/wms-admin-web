<template> 
  <custInfo-detail :is-edit='false'></custInfo-detail>
</template>
<script>
  import CustInfoDetail from './components/CustInfoDetail'
  export default {
    name: 'addCustInfo',
    components: { CustInfoDetail }
  }
</script>
<style>
</style>


