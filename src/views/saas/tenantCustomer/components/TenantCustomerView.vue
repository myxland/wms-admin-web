<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantCustomer" :rules="rules" ref="tenantCustomerFrom" label-width="150px">
      <el-form-item label="客户ID：" prop="id">
        {{tenantCustomer.id}}
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        {{tenantCustomer.tenantName}}
      </el-form-item>
      <el-form-item label="用户代码：" prop="customerCode">
      	{{tenantCustomer.customerCode}}
      </el-form-item>
      <el-form-item label="用户名称：" prop="customerName">
      	{{tenantCustomer.customerName}}
      </el-form-item>
      <el-form-item label="用户地址：" prop="customerAddress">
      	{{tenantCustomer.customerAddress}}
      </el-form-item>
      <el-form-item label="用户类别ID：" prop="customerTypeId">
      	{{tenantCustomer.customerTypeId}}
      </el-form-item>
      <el-form-item label="建档时间：" prop="customerRegisterTime">
        {{tenantCustomer.customerRegisterTime}}
      </el-form-item>
      <el-form-item label="用户状态：" prop="customerStatus">
        {{tenantCustomer.customerStatus | formatCustomerStatus}}
      </el-form-item>
      <el-form-item label="用户缴费方式：" prop="customerPaymentMethod">
        {{tenantCustomer.customerPaymentMethod | formatCustomerPaymentMethod}}
      </el-form-item>
      <el-form-item label="开票类别：" prop="invoiceType">
        {{tenantCustomer.invoiceType | formatInvoiceType}}
      </el-form-item>
      <el-form-item label="开票名称：" prop="invoiceName">
      	{{tenantCustomer.invoiceName}}
      </el-form-item>
      <el-form-item label="税号：" prop="invoiceTaxNo">
      	{{tenantCustomer.invoiceTaxNo}}
      </el-form-item>
      <el-form-item label="开票地址：" prop="invoiceAddress">
      	{{tenantCustomer.invoiceAddress}}
      </el-form-item>
      <el-form-item label="开票电话：" prop="invoiceTel">
      	{{tenantCustomer.invoiceTel}}
      </el-form-item>
      <el-form-item label="开户行行号：" prop="invoiceBankCode">
      	{{tenantCustomer.invoiceBankCode}}
      </el-form-item>
      <el-form-item label="开户行名称：" prop="invoiceBankName">
      	{{tenantCustomer.invoiceBankName}}
      </el-form-item>
      <el-form-item label="开户行账号：" prop="invoiceBankAccountNo">
      	{{tenantCustomer.invoiceBankAccountNo}}
      </el-form-item>
      <el-form-item label="用户预存余额：" prop="customerBalanceMoney">
      	{{tenantCustomer.customerBalanceMoney}}
      </el-form-item>
      <el-form-item label="用户欠费金额：" prop="customerArrearsMoney">
      	{{tenantCustomer.customerArrearsMoney}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantCustomer} from '@/api/tenantCustomer'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';

  const defaultTenantCustomer={
    tenantId: '',
    customerCode: '',
    customerName: '',
    customerAddress: '',
    customerTypeId: '',
    customerRegisterTime: '',
    customerStatus: '',
    customerPaymentMethod: '',
    invoiceType: '',
    invoiceName: '',
    invoiceTaxNo: '',
    invoiceAddress: '',
    invoiceTel: '',
    invoiceBankCode: '',
    invoiceBankName: '',
    invoiceBankAccountNo: '',
    customerBalanceMoney: null,
    customerArrearsMoney: null
  };
  const defaultCustomerStatusOptions=[
    {
      value: 1,
      label: '正常'
    },
    {
      value: 2,
      label: '暂停'
    },
    {
      value: 3,
      label: '消户'
    }
  ];
  const defaultCustomerPaymentMethodOptions=[
    {
      value: 1,
      label: '坐收'
    },
    {
      value: 2,
      label: '走收'
    },
    {
      value: 3,
      label: '代扣'
    },
    {
      value: 4,
      label: '托收'
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
    name: 'TenantCustomerView',
    data() {
      return {
        tenantCustomer:Object.assign({}, defaultTenantCustomer),
        customerStatusOptions: Object.assign({},defaultCustomerStatusOptions),
        customerPaymentMethodOptions: Object.assign({},defaultCustomerPaymentMethodOptions),
        invoiceTypeOptions: Object.assign({},defaultInvoiceTypeOptions),
        rules: {
        }
      }
    },
    created() {
      getTenantCustomer(this.$route.query.id).then(response => {
	      let data = response.data;
	      data.customerRegisterTime = formatDate(new Date(data.customerRegisterTime), 'yyyy-MM-dd hh:mm:ss');
	      this.tenantCustomer = data;
	      //this.tenantCustomer = response.data;
      });
    },
    filters: {
      formatCustomerStatus(customerStatus){
      	for(let i=0;i<defaultCustomerStatusOptions.length;i++){
      		if(customerStatus===defaultCustomerStatusOptions[i].value){
      			return defaultCustomerStatusOptions[i].label;
      		}
      	}
      },
      formatCustomerPaymentMethod(customerPaymentMethod){
      	for(let i=0;i<defaultCustomerPaymentMethodOptions.length;i++){
      		if(customerPaymentMethod===defaultCustomerPaymentMethodOptions[i].value){
      			return defaultCustomerPaymentMethodOptions[i].label;
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