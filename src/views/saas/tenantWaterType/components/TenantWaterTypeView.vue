<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantWaterType" :rules="rules" ref="tenantWaterTypeFrom" label-width="150px">
      <el-form-item label="用水类别ID：" prop="id">
        {{tenantWaterType.id}}
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        {{tenantWaterType.tenantName}}
      </el-form-item>
      <el-form-item label="用水类别名称：" prop="waterTypeName">
      	{{tenantWaterType.waterTypeName}}
      </el-form-item>
      <el-form-item label="上级用水类别编号：" prop="waterTypeParentId">
      	{{tenantWaterType.waterTypeParentId}}
      </el-form-item>
      <el-form-item label="默认价格分类ID：" prop="defaultPriceTypeId">
      	{{tenantWaterType.defaultPriceTypeId}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantWaterType} from '@/api/tenantWaterType'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';

  const defaultTenantWaterType={
    tenantId: '',
    waterTypeName: '',
    waterTypeParentId: '',
    defaultPriceTypeId: ''
  };
  export default {
    name: 'TenantWaterTypeView',
    data() {
      return {
        tenantWaterType:Object.assign({}, defaultTenantWaterType),
        rules: {
        }
      }
    },
    created() {
      getTenantWaterType(this.$route.query.id).then(response => {
	      this.tenantWaterType = response.data;
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