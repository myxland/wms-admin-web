<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantModule" :rules="rules" ref="tenantModuleFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        {{tenantModule.id}}
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        {{tenantModule.tenantName}}
      </el-form-item>
      <el-form-item label="模块：" prop="moduleId">
        {{tenantModule.moduleName}}
      </el-form-item>
      <el-form-item label="模块显示名称：" prop="moduleDisplayName">
      	{{tenantModule.moduleDisplayName}}
      </el-form-item>
      <el-form-item label="模块排序：" prop="moduleOrder">
      	{{tenantModule.moduleOrder}}
      </el-form-item>
      <el-form-item label="开通版本：" prop="moduleEdition" clearable>
        {{tenantModule.moduleEdition | formatModuleEdition}}
      </el-form-item>      
      <el-form-item label="模块状态：" prop="moduleStatus">
        <el-switch
          v-model="tenantModule.moduleStatus"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="价格体系：" prop="modulePriceType" clearable>
        {{tenantModule.modulePriceType | formatModulePriceType}}
      </el-form-item>      
      <el-form-item label="开通时间：" prop="moduleOpenDate">
        {{tenantModule.moduleOpenDate}}
      </el-form-item>
      <el-form-item label="到期时间：" prop="moduleEndDate">
        {{tenantModule.moduleEndDate}}
      </el-form-item>
      <el-form-item label="开始计费日期：" prop="moduleStartChargeDate">
        {{tenantModule.moduleStartChargeDate}}
      </el-form-item>
      <el-form-item label="欠费金额：" prop="moduleArrears">
      	{{tenantModule.moduleArrears}}
      </el-form-item>
      <el-form-item label="透支额度：" prop="moduleOverdraft">
      	{{tenantModule.moduleOverdraft}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantModule} from '@/api/tenantModule'
  import {fetchList as fetchModuleInfoList} from '@/api/moduleInfo';
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';

  const defaultTenantModule={
    tenantId: '',
    moduleId: '',
    moduleDisplayName: '',
    moduleOrder: 0,
    moduleEdition: '',
    moduleStatus: 1,
    modulePriceType: '',
    moduleOpenDate: '',
    moduleEndDate: '',
    moduleStartChargeDate: '',
    moduleArrears: null,
    moduleOverdraft: null
  };
  const defaultModuleEditionOptions=[
    {
      value: 1,
      label: '基础版'
    },
    {
      value: 2,
      label: '高级版'
    },
    {
      value: 3,
      label: '旗舰版'
    }
  ];
  const defaultModulePriceTypeOptions=[
    {
      value: 1,
      label: '标准价格'
    },
    {
      value: 2,
      label: '指定价格'
    }
  ];
  export default {
    name: 'TenantModuleView',
    data() {
      return {
        tenantModule:Object.assign({}, defaultTenantModule),
        moduleEditionOptions: Object.assign({},defaultModuleEditionOptions),
        modulePriceTypeOptions: Object.assign({},defaultModulePriceTypeOptions),
        rules: {
        }
      }
    },
    created() {
      getTenantModule(this.$route.query.id).then(response => {
	      let data = response.data;
	      data.moduleOpenDate = formatDate(new Date(data.moduleOpenDate), 'yyyy-MM-dd hh:mm:ss');
	      data.moduleEndDate = formatDate(new Date(data.moduleEndDate), 'yyyy-MM-dd hh:mm:ss');
	      data.moduleStartChargeDate = formatDate(new Date(data.moduleStartChargeDate), 'yyyy-MM-dd');
	      this.tenantModule = data;
	      //this.tenantModule = response.data;
      });
    },
    filters: {
      formatModuleEdition(moduleEdition){
      	for(let i=0;i<defaultModuleEditionOptions.length;i++){
      		if(moduleEdition===defaultModuleEditionOptions[i].value){
      			return defaultModuleEditionOptions[i].label;
      		}
      	}
      },
      formatModulePriceType(modulePriceType){
      	for(let i=0;i<defaultModulePriceTypeOptions.length;i++){
      		if(modulePriceType===defaultModulePriceTypeOptions[i].value){
      			return defaultModulePriceTypeOptions[i].label;
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