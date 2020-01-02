<template> 
  <modulePrice-detail :is-edit='false'></modulePrice-detail>
</template>
<script>
  import ModulePriceDetail from './components/ModulePriceDetail'
  export default {
    name: 'addModulePrice',
    components: { ModulePriceDetail }
  }
</script>
<style>
</style>


