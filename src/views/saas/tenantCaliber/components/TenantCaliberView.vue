<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantCaliber" :rules="rules" ref="tenantCaliberFrom" label-width="150px">
      <el-form-item label="口径ID：" prop="id">
        {{tenantCaliber.id}}
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        {{tenantCaliber.tenantName}}
      </el-form-item>
      <el-form-item label="口径名称：" prop="caliberName">
      	{{tenantCaliber.caliberName}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantCaliber} from '@/api/tenantCaliber'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';

  const defaultTenantCaliber={
    tenantId: '',
    caliberName: ''
  };
  export default {
    name: 'TenantCaliberView',
    data() {
      return {
        tenantCaliber:Object.assign({}, defaultTenantCaliber),
        rules: {
        }
      }
    },
    created() {
      getTenantCaliber(this.$route.query.id).then(response => {
	      this.tenantCaliber = response.data;
      });
    },
    filters: {
    },
    methods: {
    }
  }
</script>
<style>
</style>