<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="moduleMenu" :rules="rules" ref="moduleMenuFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        <el-input v-model="moduleMenu.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="父菜单：" prop="parentMenuId">
        <el-input v-model="moduleMenu.parentMenuId"></el-input>
      </el-form-item>
      <el-form-item label="模块：" prop="moduleId">
        <el-select v-model="moduleMenu.moduleId" placeholder="请选择模块" :disabled="this.$route.query.moduleId?true:false" clearable>
                <el-option
                  v-for="item in moduleInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单名称：" prop="menuName">
        <el-input v-model="moduleMenu.menuName"></el-input>
      </el-form-item>
      <el-form-item label="菜单排序：" prop="menuOrder">
        <el-input-number v-model="moduleMenu.menuOrder" :min="0" placeholder="菜单排序"></el-input-number>
      </el-form-item>
      <el-form-item label="菜单图标：" prop="menuIcon">
        <el-input v-model="moduleMenu.menuIcon"></el-input>
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
        <el-input v-model="moduleMenu.basicUrl"></el-input>
      </el-form-item>
      <el-form-item label="高级版链接地址：" prop="advanceUrl">
        <el-input v-model="moduleMenu.advanceUrl"></el-input>
      </el-form-item>
      <el-form-item label="旗舰版链接地址：" prop="ultimateUrl">
        <el-input v-model="moduleMenu.ultimateUrl"></el-input>
      </el-form-item>
      <el-form-item label="授权：" prop="perms">
        <el-input v-model="moduleMenu.perms"></el-input>
      </el-form-item>
      <el-form-item label="菜单类型：" prop="menuType" clearable>
        <el-select
          v-model="moduleMenu.menuType"
          placeholder="请选择菜单类型">
          <el-option
            v-for="item in menuTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item>
        <el-button type="primary" @click="onSubmit('moduleMenuFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('moduleMenuFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createModuleMenu, getModuleMenu, updateModuleMenu} from '@/api/moduleMenu'
  import {fetchList as fetchModuleInfoList} from '@/api/moduleInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
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
    name: 'ModuleMenuDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        moduleMenu:Object.assign({}, defaultModuleMenu, this.$route.query),
        moduleInfoOptions:[],
        menuTypeOptions: Object.assign({},defaultMenuTypeOptions),
        rules: {
          moduleId: [
            {required: true, message: '请输入模块编号', trigger: 'blur'}
          ],
          menuName: [
            {required: true, message: '请输入菜单名称', trigger: 'blur'}
          ],
          menuIcon: [
            {required: true, message: '请输入菜单图标', trigger: 'blur'}
          ],
          basicOn: [
            {required: true, message: '请选择开放基础版', trigger: 'blur'}
          ],
          advanceOn: [
            {required: true, message: '请选择开放高级版', trigger: 'blur'}
          ],
          ultimateOn: [
            {required: true, message: '请选择开放旗舰版', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getModuleMenu(this.$route.query.id).then(response => {
	          this.moduleMenu = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getModuleMenuByTenantId(this.$route.query.tenantId).then(response => {
	          this.moduleMenu = response.data;
        	});
        }
        
      }else{
        this.moduleMenu = Object.assign({},defaultModuleMenu,this.$route.query);
      }
      this.getModuleInfoList();
    },
    methods: {
      getModuleInfoList() {
        fetchModuleInfoList({pageNum:1,pageSize:500}).then(response => {
          this.moduleInfoOptions = [];
          let moduleInfoList = response.data.list;
          for(let i=0;i<moduleInfoList.length;i++){
            this.moduleInfoOptions.push({label:moduleInfoList[i].moduleName,value:moduleInfoList[i].id});
          }
        });
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateModuleMenu(this.$route.query.id, this.moduleMenu).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createModuleMenu(this.moduleMenu).then(response => {
                  this.$refs[formName].resetFields();
                  this.moduleMenu = Object.assign({},defaultModuleMenu);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.moduleMenu = Object.assign({},defaultModuleMenu);
      }
    }
  }
</script>
<style>
</style>


