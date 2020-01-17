<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantPriceType" :rules="rules" ref="tenantPriceTypeFrom" label-width="150px">
      <el-form-item label="价格类别ID：" prop="id">
        {{tenantPriceType.id}}
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        {{tenantPriceType.tenantName}}
      </el-form-item>
      <el-form-item label="价格类别名称：" prop="priceTypeName">
      	{{tenantPriceType.priceTypeName}}
      </el-form-item>
      <el-form-item label="启用保底水量：" prop="bottomOn">
        <el-switch
          v-model="tenantPriceType.bottomOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="保底水量：" prop="bottomWaters">
      	{{tenantPriceType.bottomWaters}}
      </el-form-item>
      <el-form-item label="启用封顶水量：" prop="topOn">
        <el-switch
          v-model="tenantPriceType.topOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="封顶水量：" prop="topWaters">
      	{{tenantPriceType.topWaters}}
      </el-form-item>
      <el-form-item label="启用固定减免：" prop="reduceOn">
        <el-switch
          v-model="tenantPriceType.reduceOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="固定减免水量：" prop="reduceWaters">
      	{{tenantPriceType.reduceWaters}}
      </el-form-item>
      <el-form-item label="固定减免水量下限：" prop="reduceLowerlimit">
      	{{tenantPriceType.reduceLowerlimit}}
      </el-form-item>
      <el-form-item label="启用固定水量征收：" prop="fixedOn">
        <el-switch
          v-model="tenantPriceType.fixedOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="固定征收水量：" prop="fixedWaters">
      	{{tenantPriceType.fixedWaters}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantPriceType} from '@/api/tenantPriceType'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';

  const defaultTenantPriceType={
    tenantId: '',
    priceTypeName: '',
    bottomOn: 1,
    bottomWaters: null,
    topOn: 1,
    topWaters: null,
    reduceOn: 1,
    reduceWaters: null,
    reduceLowerlimit: null,
    fixedOn: 1,
    fixedWaters: null
  };
  export default {
    name: 'TenantPriceTypeView',
    data() {
      return {
        tenantPriceType:Object.assign({}, defaultTenantPriceType),
        rules: {
        }
      }
    },
    created() {
      getTenantPriceType(this.$route.query.id).then(response => {
	      this.tenantPriceType = response.data;
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