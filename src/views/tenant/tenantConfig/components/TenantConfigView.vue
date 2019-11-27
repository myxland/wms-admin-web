<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantConfig" :rules="rules" ref="tenantConfigFrom" label-width="150px">
      <el-form-item label="租户编号：" prop="id">
        {{tenantConfig.id}}
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        {{tenantConfig.tenantName}}
      </el-form-item>
      <el-form-item label="是否启用部分缴费：" prop="partChargeOn">
        <el-switch
          v-model="tenantConfig.partChargeOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="是否启用违约金：" prop="overDuefineOn">
        <el-switch
          v-model="tenantConfig.overDuefineOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="违约金宽限天数：" prop="overDuefineDay">
      	{{tenantConfig.overDuefineDay}}
      </el-form-item>
      <el-form-item label="违约金每天收取比例：" prop="overDuefineRatio">
      	{{tenantConfig.overDuefineRatio}}
      </el-form-item>
      <el-form-item label="违约金封顶比例：" prop="overDuefineTopRatio">
      	{{tenantConfig.overDuefineTopRatio}}
      </el-form-item>
      <el-form-item label="预存抵扣方式：" prop="ycdkType" clearable>
        {{tenantConfig.ycdkType | formatYcdkType}}
      </el-form-item>      
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantConfig} from '@/api/tenantConfig'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';

  const defaultTenantConfig={
    tenantId: '',
    partChargeOn: 1,
    overDuefineOn: 1,
    overDuefineDay: 0,
    overDuefineRatio: null,
    overDuefineTopRatio: null,
    ycdkType: ''
  };
  const defaultYcdkTypeOptions=[
    {
      value: 1,
      label: '抄表后即时抵扣'
    },
    {
      value: 2,
      label: '人工发起抵扣'
    }
  ];
  export default {
    name: 'TenantConfigView',
    data() {
      return {
        tenantConfig:Object.assign({}, defaultTenantConfig),
        ycdkTypeOptions: Object.assign({},defaultYcdkTypeOptions),
        rules: {
        }
      }
    },
    created() {
      getTenantConfig(this.$route.query.id).then(response => {
	      this.tenantConfig = response.data;
      });
    },
    filters: {
      formatYcdkType(ycdkType){
      	for(let i=0;i<defaultYcdkTypeOptions.length;i++){
      		if(ycdkType===defaultYcdkTypeOptions[i].value){
      			return defaultYcdkTypeOptions[i].label;
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