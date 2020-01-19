<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantMeter" :rules="rules" ref="tenantMeterFrom" label-width="150px">
      <el-form-item label="水表ID：" prop="id">
        {{tenantMeter.id}}
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        {{tenantMeter.tenantName}}
      </el-form-item>
      <el-form-item label="用户ID：" prop="customerId">
      	{{tenantMeter.customerId}}
      </el-form-item>
      <el-form-item label="水表表册ID：" prop="meterBookletId">
      	{{tenantMeter.meterBookletId}}
      </el-form-item>
      <el-form-item label="上级水表ID：" prop="meterParentId">
      	{{tenantMeter.meterParentId}}
      </el-form-item>
      <el-form-item label="水表编号：" prop="meterCode">
      	{{tenantMeter.meterCode}}
      </el-form-item>
      <el-form-item label="水表地址：" prop="meterAddress">
      	{{tenantMeter.meterAddress}}
      </el-form-item>
      <el-form-item label="家庭人数：" prop="meterPeoples">
      	{{tenantMeter.meterPeoples}}
      </el-form-item>
      <el-form-item label="表身号码[钢印号等]：" prop="meterMachineCode">
      	{{tenantMeter.meterMachineCode}}
      </el-form-item>
      <el-form-item label="用途：" prop="meterUseType">
        {{tenantMeter.meterUseType | formatMeterUseType}}
      </el-form-item>
      <el-form-item label="厂商ID：" prop="meterManufactorId">
      	{{tenantMeter.meterManufactorId}}
      </el-form-item>
      <el-form-item label="水表类型：" prop="meterType">
        {{tenantMeter.meterType | formatMeterType}}
      </el-form-item>
      <el-form-item label="水表口径ID：" prop="caliberId">
      	{{tenantMeter.caliberId}}
      </el-form-item>
      <el-form-item label="用水分类ID：" prop="meterWaterTypeId">
      	{{tenantMeter.meterWaterTypeId}}
      </el-form-item>
      <el-form-item label="价格分类ID：" prop="priceTypeId">
      	{{tenantMeter.priceTypeId}}
      </el-form-item>
      <el-form-item label="采集系统代码：" prop="meterIotCode">
      	{{tenantMeter.meterIotCode}}
      </el-form-item>
      <el-form-item label="水表安装日期：" prop="meterInstallDate">
        {{tenantMeter.meterInstallDate}}
      </el-form-item>
      <el-form-item label="水表建档日期：" prop="meterRegisterTime">
        {{tenantMeter.meterRegisterTime}}
      </el-form-item>
      <el-form-item label="水表状态：" prop="meterStatus">
        {{tenantMeter.meterStatus | formatMeterStatus}}
      </el-form-item>
      <el-form-item label="年累计用水量：" prop="meterYearTotalWaters">
      	{{tenantMeter.meterYearTotalWaters}}
      </el-form-item>
      <el-form-item label="最后一次结算日期：" prop="meterLastSettleTime">
        {{tenantMeter.meterLastSettleTime}}
      </el-form-item>
      <el-form-item label="最后一次结算指针：" prop="meterLastSettlePointer">
      	{{tenantMeter.meterLastSettlePointer}}
      </el-form-item>
      <el-form-item label="水表欠费总金额：" prop="meterArrearsMoney">
      	{{tenantMeter.meterArrearsMoney}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantMeter} from '@/api/tenantMeter'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';

  const defaultTenantMeter={
    tenantId: '',
    customerId: '',
    meterBookletId: '',
    meterParentId: '',
    meterCode: '',
    meterAddress: '',
    meterPeoples: 0,
    meterMachineCode: '',
    meterUseType: '',
    meterManufactorId: '',
    meterType: '',
    caliberId: '',
    meterWaterTypeId: '',
    priceTypeId: '',
    meterIotCode: '',
    meterInstallDate: '',
    meterRegisterTime: '',
    meterStatus: '',
    meterYearTotalWaters: null,
    meterLastSettleTime: '',
    meterLastSettlePointer: null,
    meterArrearsMoney: null
  };
  const defaultMeterUseTypeOptions=[
    {
      value: 1,
      label: '水费结算'
    },
    {
      value: 2,
      label: '水量考核'
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
  const defaultMeterStatusOptions=[
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
      label: '拆表'
    }
  ];
  export default {
    name: 'TenantMeterView',
    data() {
      return {
        tenantMeter:Object.assign({}, defaultTenantMeter),
        meterUseTypeOptions: Object.assign({},defaultMeterUseTypeOptions),
        meterTypeOptions: Object.assign({},defaultMeterTypeOptions),
        meterStatusOptions: Object.assign({},defaultMeterStatusOptions),
        rules: {
        }
      }
    },
    created() {
      getTenantMeter(this.$route.query.id).then(response => {
	      let data = response.data;
	      data.meterInstallDate = formatDate(new Date(data.meterInstallDate), 'yyyy-MM-dd');
	      data.meterRegisterTime = formatDate(new Date(data.meterRegisterTime), 'yyyy-MM-dd hh:mm:ss');
	      data.meterLastSettleTime = formatDate(new Date(data.meterLastSettleTime), 'yyyy-MM-dd hh:mm:ss');
	      this.tenantMeter = data;
	      //this.tenantMeter = response.data;
      });
    },
    filters: {
      formatMeterUseType(meterUseType){
      	for(let i=0;i<defaultMeterUseTypeOptions.length;i++){
      		if(meterUseType===defaultMeterUseTypeOptions[i].value){
      			return defaultMeterUseTypeOptions[i].label;
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
      formatMeterStatus(meterStatus){
      	for(let i=0;i<defaultMeterStatusOptions.length;i++){
      		if(meterStatus===defaultMeterStatusOptions[i].value){
      			return defaultMeterStatusOptions[i].label;
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