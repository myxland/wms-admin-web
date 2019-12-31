<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="moduleInfo" :rules="rules" ref="moduleInfoFrom" label-width="150px">
      <el-form-item label="模块ID：" prop="id">
        {{moduleInfo.id}}
      </el-form-item>
      <el-form-item label="模块名称：" prop="moduleName">
      	{{moduleInfo.moduleName}}
      </el-form-item>
      <el-form-item label="开放对象：" prop="openTarget">
        {{moduleInfo.openTarget | formatOpenTarget}}
      </el-form-item>
      <el-form-item label="运行环境：" prop="runEnv">
        {{moduleInfo.runEnv | formatRunEnv}}
      </el-form-item>
      <el-form-item label="依赖模块ID：" prop="relyModuleId">
        {{moduleInfo.relyModuleName}}
      </el-form-item>
      <el-form-item label="计费模式：" prop="billingMode">
        {{moduleInfo.billingMode | formatBillingMode}}
      </el-form-item>
      <el-form-item label="计费周期：" prop="billingCycle">
        {{moduleInfo.billingCycle | formatBillingCycle}}
      </el-form-item>
      <el-form-item label="基础版：" prop="basicEditionOn">
        <el-switch
          v-model="moduleInfo.basicEditionOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="高级版：" prop="advanceEditionOn">
        <el-switch
          v-model="moduleInfo.advanceEditionOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="旗舰版：" prop="ultimateEditionOn">
        <el-switch
          v-model="moduleInfo.ultimateEditionOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="发布状态：" prop="moduleOn">
        <el-switch
          v-model="moduleInfo.moduleOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="应用APPID：" prop="moduleAppid">
      	{{moduleInfo.moduleAppid}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getModuleInfo} from '@/api/moduleInfo'
  import {fetchList as fetchModuleInfoList} from '@/api/moduleInfo';

  const defaultModuleInfo={
    moduleName: '',
    openTarget: '',
    runEnv: '',
    relyModuleId: '',
    billingMode: '',
    billingCycle: '',
    basicEditionOn: 1,
    advanceEditionOn: 1,
    ultimateEditionOn: 1,
    moduleOn: 1,
    moduleAppid: ''
  };
  const defaultOpenTargetOptions=[
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
  const defaultRunEnvOptions=[
    {
      value: 1,
      label: 'PC端'
    },
    {
      value: 2,
      label: '移动端'
    },
    {
      value: 3,
      label: '微信端'
    },
    {
      value: 4,
      label: '支付宝端'
    },
    {
      value: 5,
      label: 'API接口'
    },
    {
      value: 6,
      label: '自助终端'
    }
  ];
  const defaultBillingModeOptions=[
    {
      value: 1,
      label: '默认开通'
    },
    {
      value: 2,
      label: '免费'
    },
    {
      value: 3,
      label: '按量付费'
    },
    {
      value: 4,
      label: '固定价格'
    },
    {
      value: 5,
      label: '阶梯价格'
    }
  ];
  const defaultBillingCycleOptions=[
    {
      value: 1,
      label: '实时'
    },
    {
      value: 2,
      label: '按天'
    },
    {
      value: 3,
      label: '按月'
    },
    {
      value: 4,
      label: '按年'
    }
  ];
  export default {
    name: 'ModuleInfoView',
    data() {
      return {
        moduleInfo:Object.assign({}, defaultModuleInfo),
        openTargetOptions: Object.assign({},defaultOpenTargetOptions),
        runEnvOptions: Object.assign({},defaultRunEnvOptions),
        billingModeOptions: Object.assign({},defaultBillingModeOptions),
        billingCycleOptions: Object.assign({},defaultBillingCycleOptions),
        rules: {
        }
      }
    },
    created() {
      getModuleInfo(this.$route.query.id).then(response => {
	      this.moduleInfo = response.data;
      });
    },
    filters: {
      formatOpenTarget(openTarget){
      	for(let i=0;i<defaultOpenTargetOptions.length;i++){
      		if(openTarget===defaultOpenTargetOptions[i].value){
      			return defaultOpenTargetOptions[i].label;
      		}
      	}
      },
      formatRunEnv(runEnv){
      	for(let i=0;i<defaultRunEnvOptions.length;i++){
      		if(runEnv===defaultRunEnvOptions[i].value){
      			return defaultRunEnvOptions[i].label;
      		}
      	}
      },
      formatBillingMode(billingMode){
      	for(let i=0;i<defaultBillingModeOptions.length;i++){
      		if(billingMode===defaultBillingModeOptions[i].value){
      			return defaultBillingModeOptions[i].label;
      		}
      	}
      },
      formatBillingCycle(billingCycle){
      	for(let i=0;i<defaultBillingCycleOptions.length;i++){
      		if(billingCycle===defaultBillingCycleOptions[i].value){
      			return defaultBillingCycleOptions[i].label;
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