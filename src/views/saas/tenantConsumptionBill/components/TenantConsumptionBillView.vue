<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantConsumptionBill" :rules="rules" ref="tenantConsumptionBillFrom" label-width="150px">
      <el-form-item label="租户账单ID：" prop="id">
        {{tenantConsumptionBill.id}}
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        {{tenantConsumptionBill.tenantName}}
      </el-form-item>
      <el-form-item label="账单类型：" prop="consumptionBillType">
        {{tenantConsumptionBill.consumptionBillType | formatConsumptionBillType}}
      </el-form-item>
      <el-form-item label="账单时间：" prop="consumptionBillTime">
        {{tenantConsumptionBill.consumptionBillTime}}
      </el-form-item>
      <el-form-item label="账单名称[账户充值/短信平台/...]：" prop="consumptionBillName">
      	{{tenantConsumptionBill.consumptionBillName}}
      </el-form-item>
      <el-form-item label="账单金额：" prop="consumptionBillMoney">
      	{{tenantConsumptionBill.consumptionBillMoney}}
      </el-form-item>
      <el-form-item label="租户账户余额：" prop="tenantBalance">
      	{{tenantConsumptionBill.tenantBalance}}
      </el-form-item>
      <el-form-item label="备注：" prop="consumptionBillRemark">
      	{{tenantConsumptionBill.consumptionBillRemark}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantConsumptionBill} from '@/api/tenantConsumptionBill'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';

  const defaultTenantConsumptionBill={
    tenantId: '',
    consumptionBillType: '',
    consumptionBillTime: '',
    consumptionBillName: '',
    consumptionBillMoney: null,
    tenantBalance: null,
    consumptionBillRemark: ''
  };
  const defaultConsumptionBillTypeOptions=[
    {
      value: 1,
      label: '充值'
    },
    {
      value: 2,
      label: '消费'
    }
  ];
  export default {
    name: 'TenantConsumptionBillView',
    data() {
      return {
        tenantConsumptionBill:Object.assign({}, defaultTenantConsumptionBill),
        consumptionBillTypeOptions: Object.assign({},defaultConsumptionBillTypeOptions),
        rules: {
        }
      }
    },
    created() {
      getTenantConsumptionBill(this.$route.query.id).then(response => {
	      let data = response.data;
	      data.consumptionBillTime = formatDate(new Date(data.consumptionBillTime), 'yyyy-MM-dd hh:mm:ss');
	      this.tenantConsumptionBill = data;
	      //this.tenantConsumptionBill = response.data;
      });
    },
    filters: {
      formatConsumptionBillType(consumptionBillType){
      	for(let i=0;i<defaultConsumptionBillTypeOptions.length;i++){
      		if(consumptionBillType===defaultConsumptionBillTypeOptions[i].value){
      			return defaultConsumptionBillTypeOptions[i].label;
      		}
      	}
      },
    },
    methods: {
    }
  }
</script>
<style>
</style>