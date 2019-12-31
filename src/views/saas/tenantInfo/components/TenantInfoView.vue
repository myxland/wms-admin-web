<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantInfo" :rules="rules" ref="tenantInfoFrom" label-width="150px">
      <el-form-item label="租户ID：" prop="id">
        {{tenantInfo.id}}
      </el-form-item>
      <el-form-item label="租户名称：" prop="tenantName">
      	{{tenantInfo.tenantName}}
      </el-form-item>
      <el-form-item label="账户余额：" prop="tenantBalance">
      	{{tenantInfo.tenantBalance}}
      </el-form-item>
      <el-form-item label="透支额度：" prop="teanantOverdraw">
      	{{tenantInfo.teanantOverdraw}}
      </el-form-item>
      <el-form-item label="租户显示名称：" prop="tenantDisplayName">
      	{{tenantInfo.tenantDisplayName}}
      </el-form-item>
      <el-form-item label="省：" prop="tenantProvince">
      	{{tenantInfo.tenantProvince}}
      </el-form-item>
      <el-form-item label="市：" prop="tenantCity">
      	{{tenantInfo.tenantCity}}
      </el-form-item>
      <el-form-item label="区/县：" prop="tenantCountyTown">
      	{{tenantInfo.tenantCountyTown}}
      </el-form-item>
      <el-form-item label="联系地址：" prop="tenantLinkAddress">
      	{{tenantInfo.tenantLinkAddress}}
      </el-form-item>
      <el-form-item label="联系人：" prop="tenantLinkman">
      	{{tenantInfo.tenantLinkman}}
      </el-form-item>
      <el-form-item label="手机号码：" prop="tenantLinkmanMobile">
      	{{tenantInfo.tenantLinkmanMobile}}
      </el-form-item>
      <el-form-item label="单位电话：" prop="tenantLinkmanTel">
      	{{tenantInfo.tenantLinkmanTel}}
      </el-form-item>
      <el-form-item label="邮箱：" prop="tenantLinkmanEmail">
      	{{tenantInfo.tenantLinkmanEmail}}
      </el-form-item>
      <el-form-item label="QQ号码：" prop="tenantLinkmanQq">
      	{{tenantInfo.tenantLinkmanQq}}
      </el-form-item>
      <el-form-item label="租户类型：" prop="tenantType">
        {{tenantInfo.tenantType | formatTenantType}}
      </el-form-item>
      <el-form-item label="注册时间：" prop="tenantRegisterTime">
        {{tenantInfo.tenantRegisterTime}}
      </el-form-item>
      <el-form-item label="开票类别：" prop="invoiceType">
        {{tenantInfo.invoiceType | formatInvoiceType}}
      </el-form-item>
      <el-form-item label="开票名称：" prop="invoiceName">
      	{{tenantInfo.invoiceName}}
      </el-form-item>
      <el-form-item label="税号：" prop="invoiceTaxNo">
      	{{tenantInfo.invoiceTaxNo}}
      </el-form-item>
      <el-form-item label="开票地址：" prop="invoiceAddress">
      	{{tenantInfo.invoiceAddress}}
      </el-form-item>
      <el-form-item label="开票电话：" prop="invoiceTel">
      	{{tenantInfo.invoiceTel}}
      </el-form-item>
      <el-form-item label="开户行行号：" prop="invoiceBankCode">
      	{{tenantInfo.invoiceBankCode}}
      </el-form-item>
      <el-form-item label="开户行名称：" prop="invoiceBankName">
      	{{tenantInfo.invoiceBankName}}
      </el-form-item>
      <el-form-item label="开户账号：" prop="invoiceBankAccountNo">
      	{{tenantInfo.invoiceBankAccountNo}}
      </el-form-item>
      <el-form-item label="租户KEY：" prop="tenantAccesskey">
      	{{tenantInfo.tenantAccesskey}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantInfo} from '@/api/tenantInfo'
  import {formatDate} from '@/utils/date';

  const defaultTenantInfo={
    tenantName: '',
    tenantBalance: null,
    teanantOverdraw: null,
    tenantDisplayName: '',
    tenantProvince: '',
    tenantCity: '',
    tenantCountyTown: '',
    tenantLinkAddress: '',
    tenantLinkman: '',
    tenantLinkmanMobile: '',
    tenantLinkmanTel: '',
    tenantLinkmanEmail: '',
    tenantLinkmanQq: '',
    tenantType: '',
    tenantRegisterTime: '',
    invoiceType: '',
    invoiceName: '',
    invoiceTaxNo: '',
    invoiceAddress: '',
    invoiceTel: '',
    invoiceBankCode: '',
    invoiceBankName: '',
    invoiceBankAccountNo: '',
    tenantAccesskey: ''
  };
  const defaultTenantTypeOptions=[
    {
      value: 1,
      label: '使用单位'
    },
    {
      value: 2,
      label: '水表厂商'
    },
    {
      value: 3,
      label: '代收机构'
    },
    {
      value: 4,
      label: '内部运营'
    },
    {
      value: 5,
      label: '分销商'
    }
  ];
  const defaultInvoiceTypeOptions=[
    {
      value: 1,
      label: '普通纸制发票'
    },
    {
      value: 2,
      label: '普通电子发票'
    },
    {
      value: 3,
      label: '专用纸制发票'
    }
  ];
  export default {
    name: 'TenantInfoView',
    data() {
      return {
        tenantInfo:Object.assign({}, defaultTenantInfo),
        tenantTypeOptions: Object.assign({},defaultTenantTypeOptions),
        invoiceTypeOptions: Object.assign({},defaultInvoiceTypeOptions),
        rules: {
        }
      }
    },
    created() {
      getTenantInfo(this.$route.query.id).then(response => {
	      let data = response.data;
	      data.tenantRegisterTime = formatDate(new Date(data.tenantRegisterTime), 'yyyy-MM-dd hh:mm:ss');
	      this.tenantInfo = data;
	      //this.tenantInfo = response.data;
      });
    },
    filters: {
      formatTenantType(tenantType){
      	for(let i=0;i<defaultTenantTypeOptions.length;i++){
      		if(tenantType===defaultTenantTypeOptions[i].value){
      			return defaultTenantTypeOptions[i].label;
      		}
      	}
      },
      formatInvoiceType(invoiceType){
      	for(let i=0;i<defaultInvoiceTypeOptions.length;i++){
      		if(invoiceType===defaultInvoiceTypeOptions[i].value){
      			return defaultInvoiceTypeOptions[i].label;
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