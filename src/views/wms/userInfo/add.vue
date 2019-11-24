<template> 
  <userInfo-detail :is-edit='false'></userInfo-detail>
</template>
<script>
  import UserInfoDetail from './components/UserInfoDetail'
  export default {
    name: 'addUserInfo',
    components: { UserInfoDetail }
  }
</script>
<style>
</style>


