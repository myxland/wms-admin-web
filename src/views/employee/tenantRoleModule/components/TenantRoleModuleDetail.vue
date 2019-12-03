<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantRoleModule" :rules="rules" ref="tenantRoleModuleFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        <el-input v-model="tenantRoleModule.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="tenantRoleModule.tenantId" placeholder="请选择租户" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色编号：" prop="roleId">
        <el-input v-model="tenantRoleModule.roleId"></el-input>
      </el-form-item>
      <el-form-item label="模块：" prop="moduleId">
        <el-select v-model="tenantRoleModule.moduleId" placeholder="请选择模块" :disabled="this.$route.query.moduleId?true:false" clearable>
                <el-option
                  v-for="item in moduleInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开放：" prop="roleModuleOn">
        <el-switch
          v-model="tenantRoleModule.roleModuleOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantRoleModuleFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantRoleModuleFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantRoleModule, getTenantRoleModule, updateTenantRoleModule} from '@/api/tenantRoleModule'
  import {fetchList as fetchModuleInfoList} from '@/api/moduleInfo';
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantRoleModule={
    tenantId: '',
    roleId: '',
    moduleId: '',
    roleModuleOn: 1
  };
  export default {
    name: 'TenantRoleModuleDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantRoleModule:Object.assign({}, defaultTenantRoleModule, this.$route.query),
        moduleInfoOptions:[],
        tenantInfoOptions:[],
        rules: {
          tenantId: [
            {required: true, message: '请输入租户编号', trigger: 'blur'}
          ],
          roleId: [
            {required: true, message: '请输入角色编号', trigger: 'blur'}
          ],
          moduleId: [
            {required: true, message: '请输入模块编号', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantRoleModule(this.$route.query.id).then(response => {
	          this.tenantRoleModule = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantRoleModuleByTenantId(this.$route.query.tenantId).then(response => {
	          this.tenantRoleModule = response.data;
        	});
        }
        
      }else{
        this.tenantRoleModule = Object.assign({},defaultTenantRoleModule,this.$route.query);
      }
      this.getModuleInfoList();
      this.getTenantInfoList();
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
      getTenantInfoList() {
        fetchTenantInfoList({pageNum:1,pageSize:500}).then(response => {
          this.tenantInfoOptions = [];
          let tenantInfoList = response.data.list;
          for(let i=0;i<tenantInfoList.length;i++){
            this.tenantInfoOptions.push({label:tenantInfoList[i].tenantName,value:tenantInfoList[i].id});
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
                updateTenantRoleModule(this.$route.query.id, this.tenantRoleModule).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantRoleModule(this.tenantRoleModule).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantRoleModule = Object.assign({},defaultTenantRoleModule);
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
        this.tenantRoleModule = Object.assign({},defaultTenantRoleModule);
      }
    }
  }
</script>
<style>
</style>


