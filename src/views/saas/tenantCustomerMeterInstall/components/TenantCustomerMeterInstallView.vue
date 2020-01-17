<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantCustomerMeterInstall" :rules="rules" ref="tenantCustomerMeterInstallFrom" label-width="150px">
      <el-form-item label="水表立户ID：" prop="id">
        {{tenantCustomerMeterInstall.id}}
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        {{tenantCustomerMeterInstall.tenantName}}
      </el-form-item>
      <el-form-item label="已经立户的水表ID：" prop="meterId">
      	{{tenantCustomerMeterInstall.meterId}}
      </el-form-item>
      <el-form-item label="已经立户的水表代码：" prop="meterCode">
      	{{tenantCustomerMeterInstall.meterCode}}
      </el-form-item>
      <el-form-item label="用户名称：" prop="custName">
      	{{tenantCustomerMeterInstall.custName}}
      </el-form-item>
      <el-form-item label="水表地址：" prop="meterAddress">
      	{{tenantCustomerMeterInstall.meterAddress}}
      </el-form-item>
      <el-form-item label="表身号码[钢印号等]：" prop="meterMachineCode">
      	{{tenantCustomerMeterInstall.meterMachineCode}}
      </el-form-item>
      <el-form-item label="厂商ID：" prop="manufactorId">
      	{{tenantCustomerMeterInstall.manufactorId}}
      </el-form-item>
      <el-form-item label="水表类型：" prop="meterType">
        {{tenantCustomerMeterInstall.meterType | formatMeterType}}
      </el-form-item>
      <el-form-item label="水表口径ID：" prop="caliberId">
      	{{tenantCustomerMeterInstall.caliberId}}
      </el-form-item>
      <el-form-item label="用水分类ID：" prop="waterTypeId">
      	{{tenantCustomerMeterInstall.waterTypeId}}
      </el-form-item>
      <el-form-item label="价格分类ID：" prop="priceTypeId">
      	{{tenantCustomerMeterInstall.priceTypeId}}
      </el-form-item>
      <el-form-item label="采集系统编号：" prop="meterIotCode">
      	{{tenantCustomerMeterInstall.meterIotCode}}
      </el-form-item>
      <el-form-item label="水表安装日期：" prop="meterInstallDate">
        {{tenantCustomerMeterInstall.meterInstallDate}}
      </el-form-item>
      <el-form-item label="最后一次结算时间：" prop="meterLastSettleTime">
        {{tenantCustomerMeterInstall.meterLastSettleTime}}
      </el-form-item>
      <el-form-item label="最后一次结算指针：" prop="meterLastSettlePointer">
      	{{tenantCustomerMeterInstall.meterLastSettlePointer}}
      </el-form-item>
      <el-form-item label="联系人手机号码：" prop="linkmanMobile">
      	{{tenantCustomerMeterInstall.linkmanMobile}}
      </el-form-item>
      <el-form-item label="用户身份证编号：" prop="custmerIdNo">
      	{{tenantCustomerMeterInstall.custmerIdNo}}
      </el-form-item>
      <el-form-item label="老系统编号：" prop="oldCode">
      	{{tenantCustomerMeterInstall.oldCode}}
      </el-form-item>
      <el-form-item label="录入方式：" prop="inputType">
        {{tenantCustomerMeterInstall.inputType | formatInputType}}
      </el-form-item>
      <el-form-item label="录入日期：" prop="inputTime">
        {{tenantCustomerMeterInstall.inputTime}}
      </el-form-item>
      <el-form-item label="是否已经立户：" prop="createOn">
        <el-switch
          v-model="tenantCustomerMeterInstall.createOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantCustomerMeterInstall} from '@/api/tenantCustomerMeterInstall'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';

  const defaultTenantCustomerMeterInstall={
    tenantId: '',
    meterId: '',
    meterCode: '',
    custName: '',
    meterAddress: '',
    meterMachineCode: '',
    manufactorId: '',
    meterType: '',
    caliberId: '',
    waterTypeId: '',
    priceTypeId: '',
    meterIotCode: '',
    meterInstallDate: '',
    meterLastSettleTime: '',
    meterLastSettlePointer: null,
    linkmanMobile: '',
    custmerIdNo: '',
    oldCode: '',
    inputType: '',
    inputTime: '',
    createOn: 1
  };
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
  const defaultInputTypeOptions=[
    {
      value: 1,
      label: '手工录入'
    },
    {
      value: 2,
      label: '文件导入'
    }
  ];
  export default {
    name: 'TenantCustomerMeterInstallView',
    data() {
      return {
        tenantCustomerMeterInstall:Object.assign({}, defaultTenantCustomerMeterInstall),
        meterTypeOptions: Object.assign({},defaultMeterTypeOptions),
        inputTypeOptions: Object.assign({},defaultInputTypeOptions),
        rules: {
        }
      }
    },
    created() {
      getTenantCustomerMeterInstall(this.$route.query.id).then(response => {
	      let data = response.data;
	      data.meterInstallDate = formatDate(new Date(data.meterInstallDate), 'yyyy-MM-dd');
	      data.meterLastSettleTime = formatDate(new Date(data.meterLastSettleTime), 'yyyy-MM-dd hh:mm:ss');
	      data.inputTime = formatDate(new Date(data.inputTime), 'yyyy-MM-dd hh:mm:ss');
	      this.tenantCustomerMeterInstall = data;
	      //this.tenantCustomerMeterInstall = response.data;
      });
    },
    filters: {
      formatMeterType(meterType){
      	for(let i=0;i<defaultMeterTypeOptions.length;i++){
      		if(meterType===defaultMeterTypeOptions[i].value){
      			return defaultMeterTypeOptions[i].label;
      		}
      	}
      },
      formatInputType(inputType){
      	for(let i=0;i<defaultInputTypeOptions.length;i++){
      		if(inputType===defaultInputTypeOptions[i].value){
      			return defaultInputTypeOptions[i].label;
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