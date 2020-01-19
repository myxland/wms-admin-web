<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantReceivable" :rules="rules" ref="tenantReceivableFrom" label-width="150px">
      <el-form-item label="应收账ID：" prop="id">
        {{tenantReceivable.id}}
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        {{tenantReceivable.tenantName}}
      </el-form-item>
      <el-form-item label="应收账状态：" prop="receivableStatus">
        {{tenantReceivable.receivableStatus | formatReceivableStatus}}
      </el-form-item>
      <el-form-item label="应收类型：" prop="receivableType">
        {{tenantReceivable.receivableType | formatReceivableType}}
      </el-form-item>
      <el-form-item label="部门ID：" prop="departmentId">
      	{{tenantReceivable.departmentId}}
      </el-form-item>
      <el-form-item label="表册ID：" prop="bookletId">
      	{{tenantReceivable.bookletId}}
      </el-form-item>
      <el-form-item label="表册代码：" prop="bookletCode">
      	{{tenantReceivable.bookletCode}}
      </el-form-item>
      <el-form-item label="用户ID：" prop="customerId">
      	{{tenantReceivable.customerId}}
      </el-form-item>
      <el-form-item label="用户代码：" prop="customerCode">
      	{{tenantReceivable.customerCode}}
      </el-form-item>
      <el-form-item label="用户名称：" prop="customerName">
      	{{tenantReceivable.customerName}}
      </el-form-item>
      <el-form-item label="用户地址：" prop="customerAddress">
      	{{tenantReceivable.customerAddress}}
      </el-form-item>
      <el-form-item label="水表ID：" prop="meterId">
      	{{tenantReceivable.meterId}}
      </el-form-item>
      <el-form-item label="水表代码：" prop="meterCode">
      	{{tenantReceivable.meterCode}}
      </el-form-item>
      <el-form-item label="表具地址：" prop="meterAddress">
      	{{tenantReceivable.meterAddress}}
      </el-form-item>
      <el-form-item label="抄表员ID：" prop="readEmployeeId">
      	{{tenantReceivable.readEmployeeId}}
      </el-form-item>
      <el-form-item label="应收账时间：" prop="receivableTime">
        {{tenantReceivable.receivableTime}}
      </el-form-item>
      <el-form-item label="结算开始时间：" prop="settleStartTime">
        {{tenantReceivable.settleStartTime}}
      </el-form-item>
      <el-form-item label="结算开始指针：" prop="settleStartPointer">
      	{{tenantReceivable.settleStartPointer}}
      </el-form-item>
      <el-form-item label="结算截止时间：" prop="settleEndTime">
        {{tenantReceivable.settleEndTime}}
      </el-form-item>
      <el-form-item label="结算截止指针：" prop="settleEndPointer">
      	{{tenantReceivable.settleEndPointer}}
      </el-form-item>
      <el-form-item label="应结算水量：" prop="settleWaters">
      	{{tenantReceivable.settleWaters}}
      </el-form-item>
      <el-form-item label="价格类别ID：" prop="priceTypeId">
      	{{tenantReceivable.priceTypeId}}
      </el-form-item>
      <el-form-item label="应收水量：" prop="receivableWaters">
      	{{tenantReceivable.receivableWaters}}
      </el-form-item>
      <el-form-item label="应收金额：" prop="receivableMoney">
      	{{tenantReceivable.receivableMoney}}
      </el-form-item>
      <el-form-item label="欠费金额：" prop="arrearsMoney">
      	{{tenantReceivable.arrearsMoney}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantReceivable} from '@/api/tenantReceivable'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';

  const defaultTenantReceivable={
    tenantId: '',
    receivableStatus: '',
    receivableType: '',
    departmentId: '',
    bookletId: '',
    bookletCode: '',
    customerId: '',
    customerCode: '',
    customerName: '',
    customerAddress: '',
    meterId: '',
    meterCode: '',
    meterAddress: '',
    readEmployeeId: '',
    receivableTime: '',
    settleStartTime: '',
    settleStartPointer: null,
    settleEndTime: '',
    settleEndPointer: null,
    settleWaters: null,
    priceTypeId: '',
    receivableWaters: null,
    receivableMoney: null,
    arrearsMoney: null
  };
  const defaultReceivableStatusOptions=[
    {
      value: 1,
      label: '正常'
    },
    {
      value: 2,
      label: '被冲正'
    },
    {
      value: 3,
      label: '冲正负记录'
    }
  ];
  const defaultReceivableTypeOptions=[
    {
      value: 1,
      label: '抄表'
    },
    {
      value: 2,
      label: '换表'
    },
    {
      value: 3,
      label: '追补'
    }
  ];
  export default {
    name: 'TenantReceivableView',
    data() {
      return {
        tenantReceivable:Object.assign({}, defaultTenantReceivable),
        receivableStatusOptions: Object.assign({},defaultReceivableStatusOptions),
        receivableTypeOptions: Object.assign({},defaultReceivableTypeOptions),
        rules: {
        }
      }
    },
    created() {
      getTenantReceivable(this.$route.query.id).then(response => {
	      let data = response.data;
	      data.receivableTime = formatDate(new Date(data.receivableTime), 'yyyy-MM-dd hh:mm:ss');
	      data.settleStartTime = formatDate(new Date(data.settleStartTime), 'yyyy-MM-dd hh:mm:ss');
	      data.settleEndTime = formatDate(new Date(data.settleEndTime), 'yyyy-MM-dd hh:mm:ss');
	      this.tenantReceivable = data;
	      //this.tenantReceivable = response.data;
      });
    },
    filters: {
      formatReceivableStatus(receivableStatus){
      	for(let i=0;i<defaultReceivableStatusOptions.length;i++){
      		if(receivableStatus===defaultReceivableStatusOptions[i].value){
      			return defaultReceivableStatusOptions[i].label;
      		}
      	}
      },
      formatReceivableType(receivableType){
      	for(let i=0;i<defaultReceivableTypeOptions.length;i++){
      		if(receivableType===defaultReceivableTypeOptions[i].value){
      			return defaultReceivableTypeOptions[i].label;
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