<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantCustomerMeterChangeLog" :rules="rules" ref="tenantCustomerMeterChangeLogFrom" label-width="150px">
      <el-form-item label="变更日志ID：" prop="id">
        {{tenantCustomerMeterChangeLog.id}}
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        {{tenantCustomerMeterChangeLog.tenantName}}
      </el-form-item>
      <el-form-item label="用户ID：" prop="customerId">
      	{{tenantCustomerMeterChangeLog.customerId}}
      </el-form-item>
      <el-form-item label="新用户ID：" prop="csutomerIdNew">
      	{{tenantCustomerMeterChangeLog.csutomerIdNew}}
      </el-form-item>
      <el-form-item label="用户名称：" prop="customerName">
      	{{tenantCustomerMeterChangeLog.customerName}}
      </el-form-item>
      <el-form-item label="新用户名称：" prop="customerNameNew">
      	{{tenantCustomerMeterChangeLog.customerNameNew}}
      </el-form-item>
      <el-form-item label="用户地址：" prop="customerAddress">
      	{{tenantCustomerMeterChangeLog.customerAddress}}
      </el-form-item>
      <el-form-item label="新用户地址：" prop="customerAddressNew">
      	{{tenantCustomerMeterChangeLog.customerAddressNew}}
      </el-form-item>
      <el-form-item label="用户类别ID：" prop="customerTypeId">
      	{{tenantCustomerMeterChangeLog.customerTypeId}}
      </el-form-item>
      <el-form-item label="新用户类别ID：" prop="customerTypeIdNew">
      	{{tenantCustomerMeterChangeLog.customerTypeIdNew}}
      </el-form-item>
      <el-form-item label="用户状态：" prop="customerStatus">
        {{tenantCustomerMeterChangeLog.customerStatus | formatCustomerStatus}}
      </el-form-item>
      <el-form-item label="新用户状态：" prop="customerStatusNew">
        {{tenantCustomerMeterChangeLog.customerStatusNew | formatCustomerStatusNew}}
      </el-form-item>
      <el-form-item label="收费方式：" prop="customerPaymentMethod">
        {{tenantCustomerMeterChangeLog.customerPaymentMethod | formatCustomerPaymentMethod}}
      </el-form-item>
      <el-form-item label="新收费方式：" prop="customerPaymentMethodNew">
        {{tenantCustomerMeterChangeLog.customerPaymentMethodNew | formatCustomerPaymentMethodNew}}
      </el-form-item>
      <el-form-item label="开票类别：" prop="invoiceType">
        {{tenantCustomerMeterChangeLog.invoiceType | formatInvoiceType}}
      </el-form-item>
      <el-form-item label="新开票类别：" prop="invoiceTypeNew">
        {{tenantCustomerMeterChangeLog.invoiceTypeNew | formatInvoiceTypeNew}}
      </el-form-item>
      <el-form-item label="开票名称：" prop="invoiceName">
      	{{tenantCustomerMeterChangeLog.invoiceName}}
      </el-form-item>
      <el-form-item label="新开票名称：" prop="invoiceNameNew">
      	{{tenantCustomerMeterChangeLog.invoiceNameNew}}
      </el-form-item>
      <el-form-item label="税号：" prop="invoiceTaxNo">
      	{{tenantCustomerMeterChangeLog.invoiceTaxNo}}
      </el-form-item>
      <el-form-item label="新税号：" prop="invoiceTaxNoNew">
      	{{tenantCustomerMeterChangeLog.invoiceTaxNoNew}}
      </el-form-item>
      <el-form-item label="开票地址：" prop="invoiceAddress">
      	{{tenantCustomerMeterChangeLog.invoiceAddress}}
      </el-form-item>
      <el-form-item label="新开票地址：" prop="invoiceAddressNew">
      	{{tenantCustomerMeterChangeLog.invoiceAddressNew}}
      </el-form-item>
      <el-form-item label="开票电话：" prop="invoiceTel">
      	{{tenantCustomerMeterChangeLog.invoiceTel}}
      </el-form-item>
      <el-form-item label="新开票电话：" prop="invoiceTelNew">
      	{{tenantCustomerMeterChangeLog.invoiceTelNew}}
      </el-form-item>
      <el-form-item label="开户行行号：" prop="invoiceBankCode">
      	{{tenantCustomerMeterChangeLog.invoiceBankCode}}
      </el-form-item>
      <el-form-item label="新开户行行号：" prop="invoiceBankCodeNew">
      	{{tenantCustomerMeterChangeLog.invoiceBankCodeNew}}
      </el-form-item>
      <el-form-item label="开户行名称：" prop="invoiceBankName">
      	{{tenantCustomerMeterChangeLog.invoiceBankName}}
      </el-form-item>
      <el-form-item label="新开户行名称：" prop="invoiceBankNameNew">
      	{{tenantCustomerMeterChangeLog.invoiceBankNameNew}}
      </el-form-item>
      <el-form-item label="开户行账号：" prop="invoiceBankAccountNo">
      	{{tenantCustomerMeterChangeLog.invoiceBankAccountNo}}
      </el-form-item>
      <el-form-item label="新开户行账号：" prop="invoiceBankAccountNoNew">
      	{{tenantCustomerMeterChangeLog.invoiceBankAccountNoNew}}
      </el-form-item>
      <el-form-item label="水表ID：" prop="meterId">
      	{{tenantCustomerMeterChangeLog.meterId}}
      </el-form-item>
      <el-form-item label="价格分类ID：" prop="priceTypeId">
      	{{tenantCustomerMeterChangeLog.priceTypeId}}
      </el-form-item>
      <el-form-item label="新价格分类ID：" prop="priceTypeIdNew">
      	{{tenantCustomerMeterChangeLog.priceTypeIdNew}}
      </el-form-item>
      <el-form-item label="水表止码：" prop="meterLastSettlePointer">
      	{{tenantCustomerMeterChangeLog.meterLastSettlePointer}}
      </el-form-item>
      <el-form-item label="新水表止码：" prop="meterLastSettlePointerNew">
      	{{tenantCustomerMeterChangeLog.meterLastSettlePointerNew}}
      </el-form-item>
      <el-form-item label="水表厂商ID：" prop="manufactorId">
      	{{tenantCustomerMeterChangeLog.manufactorId}}
      </el-form-item>
      <el-form-item label="新水表厂商ID：" prop="manufactorIdNew">
      	{{tenantCustomerMeterChangeLog.manufactorIdNew}}
      </el-form-item>
      <el-form-item label="水表类型：" prop="meterType">
        {{tenantCustomerMeterChangeLog.meterType | formatMeterType}}
      </el-form-item>
      <el-form-item label="新水表类型：" prop="meterTypeNew">
        {{tenantCustomerMeterChangeLog.meterTypeNew | formatMeterTypeNew}}
      </el-form-item>
      <el-form-item label="水表口径ID：" prop="caliberId">
      	{{tenantCustomerMeterChangeLog.caliberId}}
      </el-form-item>
      <el-form-item label="新水表口径ID：" prop="caliberIdNew">
      	{{tenantCustomerMeterChangeLog.caliberIdNew}}
      </el-form-item>
      <el-form-item label="水表表身码：" prop="meterMachineCode">
      	{{tenantCustomerMeterChangeLog.meterMachineCode}}
      </el-form-item>
      <el-form-item label="新水表表身码：" prop="meterMachineCodeNew">
      	{{tenantCustomerMeterChangeLog.meterMachineCodeNew}}
      </el-form-item>
      <el-form-item label="远传系统编号：" prop="meterIotCode">
      	{{tenantCustomerMeterChangeLog.meterIotCode}}
      </el-form-item>
      <el-form-item label="新远传系统编号：" prop="meterIotCodeNew">
      	{{tenantCustomerMeterChangeLog.meterIotCodeNew}}
      </el-form-item>
      <el-form-item label="人口数：" prop="meterPeoples">
      	{{tenantCustomerMeterChangeLog.meterPeoples}}
      </el-form-item>
      <el-form-item label="新人口数：" prop="meterPeoplesNew">
      	{{tenantCustomerMeterChangeLog.meterPeoplesNew}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantCustomerMeterChangeLog} from '@/api/tenantCustomerMeterChangeLog'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';

  const defaultTenantCustomerMeterChangeLog={
    tenantId: '',
    customerId: '',
    csutomerIdNew: '',
    customerName: '',
    customerNameNew: '',
    customerAddress: '',
    customerAddressNew: '',
    customerTypeId: '',
    customerTypeIdNew: '',
    customerStatus: '',
    customerStatusNew: '',
    customerPaymentMethod: '',
    customerPaymentMethodNew: '',
    invoiceType: '',
    invoiceTypeNew: '',
    invoiceName: '',
    invoiceNameNew: '',
    invoiceTaxNo: '',
    invoiceTaxNoNew: '',
    invoiceAddress: '',
    invoiceAddressNew: '',
    invoiceTel: '',
    invoiceTelNew: '',
    invoiceBankCode: '',
    invoiceBankCodeNew: '',
    invoiceBankName: '',
    invoiceBankNameNew: '',
    invoiceBankAccountNo: '',
    invoiceBankAccountNoNew: '',
    meterId: '',
    priceTypeId: '',
    priceTypeIdNew: '',
    meterLastSettlePointer: null,
    meterLastSettlePointerNew: null,
    manufactorId: '',
    manufactorIdNew: '',
    meterType: '',
    meterTypeNew: '',
    caliberId: '',
    caliberIdNew: '',
    meterMachineCode: '',
    meterMachineCodeNew: '',
    meterIotCode: '',
    meterIotCodeNew: '',
    meterPeoples: 0,
    meterPeoplesNew: 0
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
  const defaultCustomerStatusNewOptions=[
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
  const defaultCustomerPaymentMethodNewOptions=[
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
  const defaultInvoiceTypeNewOptions=[
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
  const defaultMeterTypeOptions=[
    {
      value: 1,
      label: '机械表'
    },
    {
      value: 2,
      label: '远传表'
    },
    {
      value: 3,
      label: 'IC卡表'
    }
  ];
  const defaultMeterTypeNewOptions=[
    {
      value: 1,
      label: '机械表'
    },
    {
      value: 2,
      label: '远传表'
    },
    {
      value: 3,
      label: 'IC卡表'
    }
  ];
  export default {
    name: 'TenantCustomerMeterChangeLogView',
    data() {
      return {
        tenantCustomerMeterChangeLog:Object.assign({}, defaultTenantCustomerMeterChangeLog),
        customerStatusOptions: Object.assign({},defaultCustomerStatusOptions),
        customerStatusNewOptions: Object.assign({},defaultCustomerStatusNewOptions),
        customerPaymentMethodOptions: Object.assign({},defaultCustomerPaymentMethodOptions),
        customerPaymentMethodNewOptions: Object.assign({},defaultCustomerPaymentMethodNewOptions),
        invoiceTypeOptions: Object.assign({},defaultInvoiceTypeOptions),
        invoiceTypeNewOptions: Object.assign({},defaultInvoiceTypeNewOptions),
        meterTypeOptions: Object.assign({},defaultMeterTypeOptions),
        meterTypeNewOptions: Object.assign({},defaultMeterTypeNewOptions),
        rules: {
        }
      }
    },
    created() {
      getTenantCustomerMeterChangeLog(this.$route.query.id).then(response => {
	      this.tenantCustomerMeterChangeLog = response.data;
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
      formatCustomerStatusNew(customerStatusNew){
      	for(let i=0;i<defaultCustomerStatusNewOptions.length;i++){
      		if(customerStatusNew===defaultCustomerStatusNewOptions[i].value){
      			return defaultCustomerStatusNewOptions[i].label;
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
      formatCustomerPaymentMethodNew(customerPaymentMethodNew){
      	for(let i=0;i<defaultCustomerPaymentMethodNewOptions.length;i++){
      		if(customerPaymentMethodNew===defaultCustomerPaymentMethodNewOptions[i].value){
      			return defaultCustomerPaymentMethodNewOptions[i].label;
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
      formatInvoiceTypeNew(invoiceTypeNew){
      	for(let i=0;i<defaultInvoiceTypeNewOptions.length;i++){
      		if(invoiceTypeNew===defaultInvoiceTypeNewOptions[i].value){
      			return defaultInvoiceTypeNewOptions[i].label;
      		}
      	}
      },
      formatMeterType(meterType){
      	for(let i=0;i<defaultMeterTypeOptions.length;i++){
      		if(meterType===defaultMeterTypeOptions[i].value){
      			return defaultMeterTypeOptions[i].label;
      		}
      	}
      },
      formatMeterTypeNew(meterTypeNew){
      	for(let i=0;i<defaultMeterTypeNewOptions.length;i++){
      		if(meterTypeNew===defaultMeterTypeNewOptions[i].value){
      			return defaultMeterTypeNewOptions[i].label;
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