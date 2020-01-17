<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantPriceItem" :rules="rules" ref="tenantPriceItemFrom" label-width="150px">
      <el-form-item label="费用项目ID：" prop="id">
        {{tenantPriceItem.id}}
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        {{tenantPriceItem.tenantName}}
      </el-form-item>
      <el-form-item label="费用项目名称：" prop="priceItemName">
      	{{tenantPriceItem.priceItemName}}
      </el-form-item>
      <el-form-item label="税率：" prop="priceItemTaxRate">
      	{{tenantPriceItem.priceItemTaxRate}}
      </el-form-item>
      <el-form-item label="对应税控项目编号：" prop="priceItemTaxId">
      	{{tenantPriceItem.priceItemTaxId}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantPriceItem} from '@/api/tenantPriceItem'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';

  const defaultTenantPriceItem={
    tenantId: '',
    priceItemName: '',
    priceItemTaxRate: null,
    priceItemTaxId: ''
  };
  export default {
    name: 'TenantPriceItemView',
    data() {
      return {
        tenantPriceItem:Object.assign({}, defaultTenantPriceItem),
        rules: {
        }
      }
    },
    created() {
      getTenantPriceItem(this.$route.query.id).then(response => {
	      this.tenantPriceItem = response.data;
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