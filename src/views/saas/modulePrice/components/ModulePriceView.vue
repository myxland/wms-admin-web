<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="modulePrice" :rules="rules" ref="modulePriceFrom" label-width="150px">
      <el-form-item label="模块价格ID：" prop="id">
        {{modulePrice.id}}
      </el-form-item>
      <el-form-item label="模块ID：" prop="moduleId">
        {{modulePrice.moduleName}}
      </el-form-item>
      <el-form-item label="模块版本：" prop="moduleEdition">
        {{modulePrice.moduleEdition | formatModuleEdition}}
      </el-form-item>
      <el-form-item label="起始量：" prop="startNum">
      	{{modulePrice.startNum}}
      </el-form-item>
      <el-form-item label="终止量：" prop="endNum">
      	{{modulePrice.endNum}}
      </el-form-item>
      <el-form-item label="价格：" prop="priceMoney">
      	{{modulePrice.priceMoney}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getModulePrice} from '@/api/modulePrice'
  import {fetchList as fetchModuleInfoList} from '@/api/moduleInfo';

  const defaultModulePrice={
    moduleId: '',
    moduleEdition: '',
    startNum: 0,
    endNum: 0,
    priceMoney: null
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
  export default {
    name: 'ModulePriceView',
    data() {
      return {
        modulePrice:Object.assign({}, defaultModulePrice),
        moduleEditionOptions: Object.assign({},defaultModuleEditionOptions),
        rules: {
        }
      }
    },
    created() {
      getModulePrice(this.$route.query.id).then(response => {
	      this.modulePrice = response.data;
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
    },
    methods: {
    }
  }
</script>
<style>
</style>