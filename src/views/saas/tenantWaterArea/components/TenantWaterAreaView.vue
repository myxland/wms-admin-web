<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantWaterArea" :rules="rules" ref="tenantWaterAreaFrom" label-width="150px">
      <el-form-item label="供水区域ID：" prop="id">
        {{tenantWaterArea.id}}
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        {{tenantWaterArea.tenantName}}
      </el-form-item>
      <el-form-item label="供水区域名称：" prop="waterAreaName">
      	{{tenantWaterArea.waterAreaName}}
      </el-form-item>
      <el-form-item label="上级供水区域ID：" prop="waterAreaParentId">
      	{{tenantWaterArea.waterAreaParentId}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantWaterArea} from '@/api/tenantWaterArea'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';

  const defaultTenantWaterArea={
    tenantId: '',
    waterAreaName: '',
    waterAreaParentId: ''
  };
  export default {
    name: 'TenantWaterAreaView',
    data() {
      return {
        tenantWaterArea:Object.assign({}, defaultTenantWaterArea),
        rules: {
        }
      }
    },
    created() {
      getTenantWaterArea(this.$route.query.id).then(response => {
	      this.tenantWaterArea = response.data;
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