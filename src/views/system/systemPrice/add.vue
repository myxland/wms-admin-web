<template> 
  <systemPrice-detail :is-edit='false'></systemPrice-detail>
</template>
<script>
  import SystemPriceDetail from './components/SystemPriceDetail'
  export default {
    name: 'addSystemPrice',
    components: { SystemPriceDetail }
  }
</script>
<style>
</style>


