<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantMeterReadLogCurrent" :rules="rules" ref="tenantMeterReadLogCurrentFrom" label-width="150px">
      <el-form-item label="抄表计划：" prop="id">
        {{tenantMeterReadLogCurrent.id}}
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        {{tenantMeterReadLogCurrent.tenantName}}
      </el-form-item>
      <el-form-item label="结算月份：" prop="readMonth">
        {{tenantMeterReadLogCurrent.readMonth}}
      </el-form-item>
      <el-form-item label="水表ID：" prop="meterId">
      	{{tenantMeterReadLogCurrent.meterId}}
      </el-form-item>
      <el-form-item label="结算前水表当年累计水量：" prop="meterYearTotalWatersBefore">
      	{{tenantMeterReadLogCurrent.meterYearTotalWatersBefore}}
      </el-form-item>
      <el-form-item label="结算开始时间：" prop="settleStartTime">
        {{tenantMeterReadLogCurrent.settleStartTime}}
      </el-form-item>
      <el-form-item label="结算开始指针：" prop="settleStartPointer">
      	{{tenantMeterReadLogCurrent.settleStartPointer}}
      </el-form-item>
      <el-form-item label="本次抄表时间：" prop="currentReadTime">
        {{tenantMeterReadLogCurrent.currentReadTime}}
      </el-form-item>
      <el-form-item label="本次抄表指针：" prop="currentReadPointer">
      	{{tenantMeterReadLogCurrent.currentReadPointer}}
      </el-form-item>
      <el-form-item label="抄表员ID：" prop="readEmployeeId">
      	{{tenantMeterReadLogCurrent.readEmployeeId}}
      </el-form-item>
      <el-form-item label="表次抄表状况：" prop="meterStatusId">
      	{{tenantMeterReadLogCurrent.meterStatusId}}
      </el-form-item>
      <el-form-item label="应结算水量：" prop="settleWaters">
      	{{tenantMeterReadLogCurrent.settleWaters}}
      </el-form-item>
      <el-form-item label="应收水量：" prop="receivableWaters">
      	{{tenantMeterReadLogCurrent.receivableWaters}}
      </el-form-item>
      <el-form-item label="抄表来源：" prop="readSource">
        {{tenantMeterReadLogCurrent.readSource | formatReadSource}}
      </el-form-item>
      <el-form-item label="抄表状态：" prop="readStatus">
        {{tenantMeterReadLogCurrent.readStatus | formatReadStatus}}
      </el-form-item>
      <el-form-item label="检查结果：" prop="checkResult">
        {{tenantMeterReadLogCurrent.checkResult | formatCheckResult}}
      </el-form-item>
      <el-form-item label="处理结果：" prop="processReault">
        {{tenantMeterReadLogCurrent.processReault | formatProcessReault}}
      </el-form-item>
      <el-form-item label="处理人：" prop="processEmployeeId">
      	{{tenantMeterReadLogCurrent.processEmployeeId}}
      </el-form-item>
      <el-form-item label="处理时间：" prop="processTime">
        {{tenantMeterReadLogCurrent.processTime}}
      </el-form-item>
      <el-form-item label="处理方式：" prop="processType">
        {{tenantMeterReadLogCurrent.processType | formatProcessType}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantMeterReadLogCurrent} from '@/api/tenantMeterReadLogCurrent'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';

  const defaultTenantMeterReadLogCurrent={
    tenantId: '',
    readMonth: '',
    meterId: '',
    meterYearTotalWatersBefore: null,
    settleStartTime: '',
    settleStartPointer: null,
    currentReadTime: '',
    currentReadPointer: null,
    readEmployeeId: '',
    meterStatusId: '',
    settleWaters: null,
    receivableWaters: null,
    readSource: '',
    readStatus: '',
    checkResult: '',
    processReault: '',
    processEmployeeId: '',
    processTime: '',
    processType: ''
  };
  const defaultReadSourceOptions=[
    {
      value: 1,
      label: '移动抄表'
    },
    {
      value: 2,
      label: '人工入账'
    },
    {
      value: 3,
      label: '远传表导入'
    },
    {
      value: 4,
      label: '远传表接口'
    }
  ];
  const defaultReadStatusOptions=[
    {
      value: 0,
      label: '未抄'
    },
    {
      value: 1,
      label: '已抄'
    }
  ];
  const defaultCheckResultOptions=[
    {
      value: 0,
      label: '正常'
    },
    {
      value: 1,
      label: '异常'
    }
  ];
  const defaultProcessReaultOptions=[
    {
      value: 1,
      label: '已处理'
    },
    {
      value: 2,
      label: '未处理'
    }
  ];
  const defaultProcessTypeOptions=[
    {
      value: 1,
      label: '重新抄表'
    },
    {
      value: 2,
      label: '通过'
    }
  ];
  export default {
    name: 'TenantMeterReadLogCurrentView',
    data() {
      return {
        tenantMeterReadLogCurrent:Object.assign({}, defaultTenantMeterReadLogCurrent),
        readSourceOptions: Object.assign({},defaultReadSourceOptions),
        readStatusOptions: Object.assign({},defaultReadStatusOptions),
        checkResultOptions: Object.assign({},defaultCheckResultOptions),
        processReaultOptions: Object.assign({},defaultProcessReaultOptions),
        processTypeOptions: Object.assign({},defaultProcessTypeOptions),
        rules: {
        }
      }
    },
    created() {
      getTenantMeterReadLogCurrent(this.$route.query.id).then(response => {
	      let data = response.data;
	      data.readMonth = formatDate(new Date(data.readMonth), 'yyyy-MM-dd');
	      data.settleStartTime = formatDate(new Date(data.settleStartTime), 'yyyy-MM-dd hh:mm:ss');
	      data.currentReadTime = formatDate(new Date(data.currentReadTime), 'yyyy-MM-dd hh:mm:ss');
	      data.processTime = formatDate(new Date(data.processTime), 'yyyy-MM-dd hh:mm:ss');
	      this.tenantMeterReadLogCurrent = data;
	      //this.tenantMeterReadLogCurrent = response.data;
      });
    },
    filters: {
      formatReadSource(readSource){
      	for(let i=0;i<defaultReadSourceOptions.length;i++){
      		if(readSource===defaultReadSourceOptions[i].value){
      			return defaultReadSourceOptions[i].label;
      		}
      	}
      },
      formatReadStatus(readStatus){
      	for(let i=0;i<defaultReadStatusOptions.length;i++){
      		if(readStatus===defaultReadStatusOptions[i].value){
      			return defaultReadStatusOptions[i].label;
      		}
      	}
      },
      formatCheckResult(checkResult){
      	for(let i=0;i<defaultCheckResultOptions.length;i++){
      		if(checkResult===defaultCheckResultOptions[i].value){
      			return defaultCheckResultOptions[i].label;
      		}
      	}
      },
      formatProcessReault(processReault){
      	for(let i=0;i<defaultProcessReaultOptions.length;i++){
      		if(processReault===defaultProcessReaultOptions[i].value){
      			return defaultProcessReaultOptions[i].label;
      		}
      	}
      },
      formatProcessType(processType){
      	for(let i=0;i<defaultProcessTypeOptions.length;i++){
      		if(processType===defaultProcessTypeOptions[i].value){
      			return defaultProcessTypeOptions[i].label;
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