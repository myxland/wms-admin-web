<template> 
  <userInfo-detail :is-edit='true'></userInfo-detail>
</template>
<script>
  import UserInfoDetail from './components/UserInfoDetail'
  export default {
    name: 'updateUserInfo',
    components: { UserInfoDetail }
  }
</script>
<style>
</style>


