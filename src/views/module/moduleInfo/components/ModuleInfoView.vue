<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="moduleInfo" :rules="rules" ref="moduleInfoFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        {{moduleInfo.id}}
      </el-form-item>
      <el-form-item label="依赖模块编码：" prop="relyId">
      	{{moduleInfo.relyId}}
      </el-form-item>
      <el-form-item label="模块名称：" prop="moduleName">
      	{{moduleInfo.moduleName}}
      </el-form-item>
      <el-form-item label="开放对象：" prop="openTenantType" clearable>
        {{moduleInfo.openTenantType | formatOpenTenantType}}
      </el-form-item>      
      <el-form-item label="运行环境：" prop="runEnvType" clearable>
        {{moduleInfo.runEnvType | formatRunEnvType}}
      </el-form-item>      
      <el-form-item label="价格政策：" prop="pricePolicyType" clearable>
        {{moduleInfo.pricePolicyType | formatPricePolicyType}}
      </el-form-item>      
      <el-form-item label="计费周期：" prop="billCycleType" clearable>
        {{moduleInfo.billCycleType | formatBillCycleType}}
      </el-form-item>      
      <el-form-item label="开放基础版：" prop="basicOn">
        <el-switch
          v-model="moduleInfo.basicOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="开放高级版：" prop="advanceOn">
        <el-switch
          v-model="moduleInfo.advanceOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="开放旗舰版：" prop="ultimateOn">
        <el-switch
          v-model="moduleInfo.ultimateOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="功能发布：" prop="moduleReleaseOn">
        <el-switch
          v-model="moduleInfo.moduleReleaseOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getModuleInfo} from '@/api/moduleInfo'

  const defaultModuleInfo={
    relyId: '',
    moduleName: '',
    openTenantType: '',
    runEnvType: '',
    pricePolicyType: '',
    billCycleType: '',
    basicOn: 1,
    advanceOn: 1,
    ultimateOn: 1,
    moduleReleaseOn: 1
  };
  const defaultOpenTenantTypeOptions=[
    {
      value: 1,
      label: '使用单位'
    },
    {
      value: 2,
      label: '供应单位'
    },
    {
      value: 3,
      label: '内部运营'
    }
  ];
  const defaultRunEnvTypeOptions=[
    {
      value: 1,
      label: 'PC'
    },
    {
      value: 2,
      label: '移动端'
    }
  ];
  const defaultPricePolicyTypeOptions=[
    {
      value: 0,
      label: '免费'
    },
    {
      value: 1,
      label: '按量付费'
    },
    {
      value: 2,
      label: '固定价格'
    }
  ];
  const defaultBillCycleTypeOptions=[
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
        openTenantTypeOptions: Object.assign({},defaultOpenTenantTypeOptions),
        runEnvTypeOptions: Object.assign({},defaultRunEnvTypeOptions),
        pricePolicyTypeOptions: Object.assign({},defaultPricePolicyTypeOptions),
        billCycleTypeOptions: Object.assign({},defaultBillCycleTypeOptions),
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
      formatOpenTenantType(openTenantType){
      	for(let i=0;i<defaultOpenTenantTypeOptions.length;i++){
      		if(openTenantType===defaultOpenTenantTypeOptions[i].value){
      			return defaultOpenTenantTypeOptions[i].label;
      		}
      	}
      },
      formatRunEnvType(runEnvType){
      	for(let i=0;i<defaultRunEnvTypeOptions.length;i++){
      		if(runEnvType===defaultRunEnvTypeOptions[i].value){
      			return defaultRunEnvTypeOptions[i].label;
      		}
      	}
      },
      formatPricePolicyType(pricePolicyType){
      	for(let i=0;i<defaultPricePolicyTypeOptions.length;i++){
      		if(pricePolicyType===defaultPricePolicyTypeOptions[i].value){
      			return defaultPricePolicyTypeOptions[i].label;
      		}
      	}
      },
      formatBillCycleType(billCycleType){
      	for(let i=0;i<defaultBillCycleTypeOptions.length;i++){
      		if(billCycleType===defaultBillCycleTypeOptions[i].value){
      			return defaultBillCycleTypeOptions[i].label;
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