<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantManufactor" :rules="rules" ref="tenantManufactorFrom" label-width="150px">
      <el-form-item label="制造商ID：" prop="id">
        {{tenantManufactor.id}}
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        {{tenantManufactor.tenantName}}
      </el-form-item>
      <el-form-item label="制造商名称：" prop="manufactorName">
      	{{tenantManufactor.manufactorName}}
      </el-form-item>
      <el-form-item label="远传表接入APIKEY：" prop="manufactorApikey">
      	{{tenantManufactor.manufactorApikey}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantManufactor} from '@/api/tenantManufactor'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';

  const defaultTenantManufactor={
    tenantId: '',
    manufactorName: '',
    manufactorApikey: ''
  };
  export default {
    name: 'TenantManufactorView',
    data() {
      return {
        tenantManufactor:Object.assign({}, defaultTenantManufactor),
        rules: {
        }
      }
    },
    created() {
      getTenantManufactor(this.$route.query.id).then(response => {
	      this.tenantManufactor = response.data;
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