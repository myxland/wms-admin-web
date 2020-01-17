<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantMeterStatus" :rules="rules" ref="tenantMeterStatusFrom" label-width="150px">
      <el-form-item label="表况ID：" prop="id">
        {{tenantMeterStatus.id}}
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        {{tenantMeterStatus.tenantName}}
      </el-form-item>
      <el-form-item label="表况名称：" prop="meterStatusName">
      	{{tenantMeterStatus.meterStatusName}}
      </el-form-item>
      <el-form-item label="水量计算方式：" prop="usenumCalcType">
        {{tenantMeterStatus.usenumCalcType | formatUsenumCalcType}}
      </el-form-item>
      <el-form-item label="生成工单类型：" prop="workBillType">
        {{tenantMeterStatus.workBillType | formatWorkBillType}}
      </el-form-item>
      <el-form-item label="创建方式：" prop="createType">
      	{{tenantMeterStatus.createType}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantMeterStatus} from '@/api/tenantMeterStatus'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';

  const defaultTenantMeterStatus={
    tenantId: '',
    meterStatusName: '',
    usenumCalcType: '',
    workBillType: '',
    createType: ''
  };
  const defaultUsenumCalcTypeOptions=[
    {
      value: 1,
      label: '自动计算'
    },
    {
      value: 2,
      label: '手工输入'
    }
  ];
  const defaultWorkBillTypeOptions=[
    {
      value: 0,
      label: '不生成'
    },
    {
      value: 1,
      label: '故障换表'
    },
    {
      value: 3,
      label: '周期换表'
    }
  ];
  export default {
    name: 'TenantMeterStatusView',
    data() {
      return {
        tenantMeterStatus:Object.assign({}, defaultTenantMeterStatus),
        usenumCalcTypeOptions: Object.assign({},defaultUsenumCalcTypeOptions),
        workBillTypeOptions: Object.assign({},defaultWorkBillTypeOptions),
        rules: {
        }
      }
    },
    created() {
      getTenantMeterStatus(this.$route.query.id).then(response => {
	      this.tenantMeterStatus = response.data;
      });
    },
    filters: {
      formatUsenumCalcType(usenumCalcType){
      	for(let i=0;i<defaultUsenumCalcTypeOptions.length;i++){
      		if(usenumCalcType===defaultUsenumCalcTypeOptions[i].value){
      			return defaultUsenumCalcTypeOptions[i].label;
      		}
      	}
      },
      formatWorkBillType(workBillType){
      	for(let i=0;i<defaultWorkBillTypeOptions.length;i++){
      		if(workBillType===defaultWorkBillTypeOptions[i].value){
      			return defaultWorkBillTypeOptions[i].label;
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