<template> 
  <custContact-detail :is-edit='true'></custContact-detail>
</template>
<script>
  import CustContactDetail from './components/CustContactDetail'
  export default {
    name: 'updateCustContact',
    components: { CustContactDetail }
  }
</script>
<style>
</style>


