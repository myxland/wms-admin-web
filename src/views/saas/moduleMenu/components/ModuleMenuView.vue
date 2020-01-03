<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="moduleMenu" :rules="rules" ref="moduleMenuFrom" label-width="150px">
      <el-form-item label="菜单ID：" prop="id">
        {{moduleMenu.id}}
      </el-form-item>
      <el-form-item label="服务模块ID：" prop="moduleId">
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
      <el-form-item label="父菜单ID：" prop="menuParentId">
      	{{moduleMenu.menuParentId}}
      </el-form-item>
      <el-form-item label="开放基础版：" prop="basicEditionOn">
        <el-switch
          v-model="moduleMenu.basicEditionOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="开放高级版：" prop="advanceEditionOn">
        <el-switch
          v-model="moduleMenu.advanceEditionOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="开放旗舰版：" prop="ultimateEditionOn">
        <el-switch
          v-model="moduleMenu.ultimateEditionOn"
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
    </el-form>
  </el-card>
</template>
<script>
  import {getModuleMenu} from '@/api/moduleMenu'
  import {fetchList as fetchModuleInfoList} from '@/api/moduleInfo';

  const defaultModuleMenu={
    moduleId: '',
    menuName: '',
    menuOrder: 0,
    menuIcon: '',
    menuParentId: '',
    basicEditionOn: 1,
    advanceEditionOn: 1,
    ultimateEditionOn: 1,
    basicUrl: '',
    advanceUrl: '',
    ultimateUrl: ''
  };
  export default {
    name: 'ModuleMenuView',
    data() {
      return {
        moduleMenu:Object.assign({}, defaultModuleMenu),
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
    },
    methods: {
    }
  }
</script>
<style>
</style>