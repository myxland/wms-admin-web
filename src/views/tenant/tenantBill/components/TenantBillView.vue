<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantBill" :rules="rules" ref="tenantBillFrom" label-width="150px">
      <el-form-item label="编号ID：" prop="id">
        {{tenantBill.id}}
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        {{tenantBill.tenantName}}
      </el-form-item>
      <el-form-item label="用户发票开具方式：" prop="billPrintType" clearable>
        {{tenantBill.billPrintType | formatBillPrintType}}
      </el-form-item>      
      <el-form-item label="发票备注定义：" prop="billRemark">
      	{{tenantBill.billRemark}}
      </el-form-item>
      <el-form-item label="电子发票服务商：" prop="billService">
      	{{tenantBill.billService}}
      </el-form-item>
      <el-form-item label="接入代码：" prop="billJrdm">
      	{{tenantBill.billJrdm}}
      </el-form-item>
      <el-form-item label="签名值参数：" prop="billQmcs">
      	{{tenantBill.billQmcs}}
      </el-form-item>
      <el-form-item label="税控盘编号：" prop="billSkpbh">
      	{{tenantBill.billSkpbh}}
      </el-form-item>
      <el-form-item label="税控盘口令：" prop="billSkpkl">
      	{{tenantBill.billSkpkl}}
      </el-form-item>
      <el-form-item label="税务数字证书密码：" prop="billKeypwd">
      	{{tenantBill.billKeypwd}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantBill} from '@/api/tenantBill'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';

  const defaultTenantBill={
    tenantId: '',
    billPrintType: '',
    billRemark: '',
    billService: '',
    billJrdm: '',
    billQmcs: '',
    billSkpbh: '',
    billSkpkl: '',
    billKeypwd: ''
  };
  const defaultBillPrintTypeOptions=[
    {
      value: 1,
      label: '按实收开票'
    },
    {
      value: 2,
      label: '按应收开票'
    }
  ];
  export default {
    name: 'TenantBillView',
    data() {
      return {
        tenantBill:Object.assign({}, defaultTenantBill),
        billPrintTypeOptions: Object.assign({},defaultBillPrintTypeOptions),
        rules: {
        }
      }
    },
    created() {
      getTenantBill(this.$route.query.id).then(response => {
	      this.tenantBill = response.data;
      });
    },
    filters: {
      formatBillPrintType(billPrintType){
      	for(let i=0;i<defaultBillPrintTypeOptions.length;i++){
      		if(billPrintType===defaultBillPrintTypeOptions[i].value){
      			return defaultBillPrintTypeOptions[i].label;
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