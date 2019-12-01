<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="moduleMenu" :rules="rules" ref="moduleMenuFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        {{moduleMenu.id}}
      </el-form-item>
      <el-form-item label="父菜单：" prop="parentMenuId">
      	{{moduleMenu.parentMenuId}}
      </el-form-item>
      <el-form-item label="模块：" prop="moduleId">
        {{moduleMenu.moduleName}}
      </el-form-item>
      <el-form-item label="菜单名称：" prop="menuName">
      	{{moduleMenu.menuName}}
      </el-form-item>
      <el-form-item label="菜单排序：" prop="menuOrder">
      	{{moduleMenu.menuOrder}}
      </el-form-item>
      <el-form-item label="菜单图标：" prop="menuIcon">
      	{{moduleMenu.menuIcon}}
      </el-form-item>
      <el-form-item label="开放基础版：" prop="basicOn">
        <el-switch
          v-model="moduleMenu.basicOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="开放高级版：" prop="advanceOn">
        <el-switch
          v-model="moduleMenu.advanceOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="开放旗舰版：" prop="ultimateOn">
        <el-switch
          v-model="moduleMenu.ultimateOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="基础版链接地址：" prop="basicUrl">
      	{{moduleMenu.basicUrl}}
      </el-form-item>
      <el-form-item label="高级版链接地址：" prop="advanceUrl">
      	{{moduleMenu.advanceUrl}}
      </el-form-item>
      <el-form-item label="旗舰版链接地址：" prop="ultimateUrl">
      	{{moduleMenu.ultimateUrl}}
      </el-form-item>
      <el-form-item label="授权：" prop="perms">
      	{{moduleMenu.perms}}
      </el-form-item>
      <el-form-item label="菜单类型：" prop="menuType" clearable>
        {{moduleMenu.menuType | formatMenuType}}
      </el-form-item>      
    </el-form>
  </el-card>
</template>
<script>
  import {getModuleMenu} from '@/api/moduleMenu'
  import {fetchList as fetchModuleInfoList} from '@/api/moduleInfo';

  const defaultModuleMenu={
    parentMenuId: '',
    moduleId: '',
    menuName: '',
    menuOrder: 0,
    menuIcon: '',
    basicOn: 1,
    advanceOn: 1,
    ultimateOn: 1,
    basicUrl: '',
    advanceUrl: '',
    ultimateUrl: '',
    perms: '',
    menuType: ''
  };
  const defaultMenuTypeOptions=[
    {
      value: 0,
      label: '目录'
    },
    {
      value: 1,
      label: '菜单'
    },
    {
      value: 2,
      label: '按钮'
    }
  ];
  export default {
    name: 'ModuleMenuView',
    data() {
      return {
        moduleMenu:Object.assign({}, defaultModuleMenu),
        menuTypeOptions: Object.assign({},defaultMenuTypeOptions),
        rules: {
        }
      }
    },
    created() {
      getModuleMenu(this.$route.query.id).then(response => {
	      this.moduleMenu = response.data;
      });
    },
    filters: {
      formatMenuType(menuType){
      	for(let i=0;i<defaultMenuTypeOptions.length;i++){
      		if(menuType===defaultMenuTypeOptions[i].value){
      			return defaultMenuTypeOptions[i].label;
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