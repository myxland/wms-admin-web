<template> 
  <custInfo-detail :is-edit='true'></custInfo-detail>
</template>
<script>
  import CustInfoDetail from './components/CustInfoDetail'
  export default {
    name: 'updateCustInfo',
    components: { CustInfoDetail }
  }
</script>
<style>
</style>


