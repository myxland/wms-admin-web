<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantPayment" :rules="rules" ref="tenantPaymentFrom" label-width="150px">
      <el-form-item label="实收账ID：" prop="id">
        {{tenantPayment.id}}
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        {{tenantPayment.tenantName}}
      </el-form-item>
      <el-form-item label="内部生成的订单号：" prop="outTransno">
      	{{tenantPayment.outTransno}}
      </el-form-item>
      <el-form-item label="外部如微信支付宝传入的订单号：" prop="inTransno">
      	{{tenantPayment.inTransno}}
      </el-form-item>
      <el-form-item label="付款时间：" prop="payTime">
        {{tenantPayment.payTime}}
      </el-form-item>
      <el-form-item label="实收账状态：" prop="paymentStatus">
        {{tenantPayment.paymentStatus | formatPaymentStatus}}
      </el-form-item>
      <el-form-item label="用户ID：" prop="customerId">
      	{{tenantPayment.customerId}}
      </el-form-item>
      <el-form-item label="收款部门ID：" prop="chargeDepartmentId">
      	{{tenantPayment.chargeDepartmentId}}
      </el-form-item>
      <el-form-item label="收费员ID：" prop="chargeEmployeeId">
      	{{tenantPayment.chargeEmployeeId}}
      </el-form-item>
      <el-form-item label="付款途径：" prop="payChannels">
        {{tenantPayment.payChannels | formatPayChannels}}
      </el-form-item>
      <el-form-item label="付款方式：" prop="payMethod">
        {{tenantPayment.payMethod | formatPayMethod}}
      </el-form-item>
      <el-form-item label="用户上期预存余额：" prop="customerBalanceMoneyBefore">
      	{{tenantPayment.customerBalanceMoneyBefore}}
      </el-form-item>
      <el-form-item label="用户付款金额：" prop="customerPayMoney">
      	{{tenantPayment.customerPayMoney}}
      </el-form-item>
      <el-form-item label="用户预存发生值：" prop="customerBalanceMoneyHappen">
      	{{tenantPayment.customerBalanceMoneyHappen}}
      </el-form-item>
      <el-form-item label="所缴欠费金额：" prop="payTheArrearsMoney">
      	{{tenantPayment.payTheArrearsMoney}}
      </el-form-item>
      <el-form-item label="所缴违约金金额：" prop="payTheLateFeeMoney">
      	{{tenantPayment.payTheLateFeeMoney}}
      </el-form-item>
      <el-form-item label="用户本期预存余额：" prop="customerBalanceMoneyAfter">
      	{{tenantPayment.customerBalanceMoneyAfter}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantPayment} from '@/api/tenantPayment'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';

  const defaultTenantPayment={
    tenantId: '',
    outTransno: '',
    inTransno: '',
    payTime: '',
    paymentStatus: '',
    customerId: '',
    chargeDepartmentId: '',
    chargeEmployeeId: '',
    payChannels: '',
    payMethod: '',
    customerBalanceMoneyBefore: null,
    customerPayMoney: null,
    customerBalanceMoneyHappen: null,
    payTheArrearsMoney: null,
    payTheLateFeeMoney: null,
    customerBalanceMoneyAfter: null
  };
  const defaultPaymentStatusOptions=[
    {
      value: 1,
      label: '正常'
    },
    {
      value: 2,
      label: '被退款'
    },
    {
      value: 3,
      label: '退款记录'
    }
  ];
  const defaultPayChannelsOptions=[
    {
      value: 1,
      label: '柜台'
    },
    {
      value: 2,
      label: '银行'
    },
    {
      value: 3,
      label: '线上'
    },
    {
      value: 4,
      label: '走收'
    },
    {
      value: 5,
      label: '系统处理'
    }
  ];
  const defaultPayMethodOptions=[
    {
      value: 0,
      label: '预存抵扣'
    },
    {
      value: 1,
      label: '现金'
    },
    {
      value: 2,
      label: '支票'
    },
    {
      value: 3,
      label: '刷卡'
    },
    {
      value: 4,
      label: '电汇'
    },
    {
      value: 5,
      label: '代扣'
    },
    {
      value: 6,
      label: '托收'
    },
    {
      value: 7,
      label: '微信生活缴费'
    },
    {
      value: 8,
      label: '支付宝生活缴费'
    },
    {
      value: 9,
      label: '微信公众号'
    },
    {
      value: 10,
      label: '微信扫码[用户被扫]'
    },
    {
      value: 11,
      label: '支付宝扫码[用户被扫]'
    },
    {
      value: 12,
      label: '微信扫码[用户主扫]'
    },
    {
      value: 13,
      label: '支付宝扫码[用户主扫]'
    }
  ];
  export default {
    name: 'TenantPaymentView',
    data() {
      return {
        tenantPayment:Object.assign({}, defaultTenantPayment),
        paymentStatusOptions: Object.assign({},defaultPaymentStatusOptions),
        payChannelsOptions: Object.assign({},defaultPayChannelsOptions),
        payMethodOptions: Object.assign({},defaultPayMethodOptions),
        rules: {
        }
      }
    },
    created() {
      getTenantPayment(this.$route.query.id).then(response => {
	      let data = response.data;
	      data.payTime = formatDate(new Date(data.payTime), 'yyyy-MM-dd hh:mm:ss');
	      this.tenantPayment = data;
	      //this.tenantPayment = response.data;
      });
    },
    filters: {
      formatPaymentStatus(paymentStatus){
      	for(let i=0;i<defaultPaymentStatusOptions.length;i++){
      		if(paymentStatus===defaultPaymentStatusOptions[i].value){
      			return defaultPaymentStatusOptions[i].label;
      		}
      	}
      },
      formatPayChannels(payChannels){
      	for(let i=0;i<defaultPayChannelsOptions.length;i++){
      		if(payChannels===defaultPayChannelsOptions[i].value){
      			return defaultPayChannelsOptions[i].label;
      		}
      	}
      },
      formatPayMethod(payMethod){
      	for(let i=0;i<defaultPayMethodOptions.length;i++){
      		if(payMethod===defaultPayMethodOptions[i].value){
      			return defaultPayMethodOptions[i].label;
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