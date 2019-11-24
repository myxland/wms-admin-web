<template> 
  <devRecList-detail :is-edit='false'></devRecList-detail>
</template>
<script>
  import DevRecListDetail from './components/DevRecListDetail'
  export default {
    name: 'addDevRecList',
    components: { DevRecListDetail }
  }
</script>
<style>
</style>


