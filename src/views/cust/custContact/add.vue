<template> 
  <custContact-detail :is-edit='false'></custContact-detail>
</template>
<script>
  import CustContactDetail from './components/CustContactDetail'
  export default {
    name: 'addCustContact',
    components: { CustContactDetail }
  }
</script>
<style>
</style>


