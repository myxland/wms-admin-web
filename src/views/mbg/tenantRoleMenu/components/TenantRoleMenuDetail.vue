<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantRoleMenu" :rules="rules" ref="tenantRoleMenuFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        <el-input v-model="tenantRoleMenu.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="tenantRoleMenu.tenantId" placeholder="请选择租户" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色编号：" prop="roleId">
        <el-input v-model="tenantRoleMenu.roleId"></el-input>
      </el-form-item>
      <el-form-item label="模块：" prop="sysId">
        <el-select v-model="tenantRoleMenu.sysId" placeholder="请选择模块" clearable>
                <el-option
                  v-for="item in systemDesignOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单编号：" prop="menuId">
        <el-input v-model="tenantRoleMenu.menuId"></el-input>
      </el-form-item>
      <el-form-item label="开放：" prop="roleMenuOn">
        <el-switch
          v-model="tenantRoleMenu.roleMenuOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantRoleMenuFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantRoleMenuFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantRoleMenu, getTenantRoleMenu, updateTenantRoleMenu} from '@/api/tenantRoleMenu'
  import {fetchList as fetchSystemDesignList} from '@/api/systemDesign';
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantRoleMenu={
    tenantId: '',
    roleId: '',
    sysId: '',
    menuId: '',
    roleMenuOn: 1
  };
  export default {
    name: 'TenantRoleMenuDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantRoleMenu:Object.assign({}, defaultTenantRoleMenu),
        systemDesignOptions:[],
        tenantInfoOptions:[],
        rules: {
          tenantId: [
            {required: true, message: '请输入租户编号', trigger: 'blur'}
          ],
          roleId: [
            {required: true, message: '请输入角色编号', trigger: 'blur'}
          ],
          sysId: [
            {required: true, message: '请输入模块编号', trigger: 'blur'}
          ],
          menuId: [
            {required: true, message: '请输入菜单编号', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getTenantRoleMenu(this.$route.query.id).then(response => {
          this.tenantRoleMenu = response.data;
        });
      }else{
        this.tenantRoleMenu = Object.assign({},defaultTenantRoleMenu);
      }
      this.getSystemDesignList();
      this.getTenantInfoList();
    },
    methods: {
      getSystemDesignList() {
        fetchSystemDesignList({pageNum:1,pageSize:100}).then(response => {
          this.systemDesignOptions = [];
          let systemDesignList = response.data.list;
          for(let i=0;i<systemDesignList.length;i++){
            this.systemDesignOptions.push({label:systemDesignList[i].moduleName,value:systemDesignList[i].id});
          }
        });
      },
      getTenantInfoList() {
        fetchTenantInfoList({pageNum:1,pageSize:100}).then(response => {
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
                updateTenantRoleMenu(this.$route.query.id, this.tenantRoleMenu).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantRoleMenu(this.tenantRoleMenu).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantRoleMenu = Object.assign({},defaultTenantRoleMenu);
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
        this.tenantRoleMenu = Object.assign({},defaultTenantRoleMenu);
      }
    }
  }
</script>
<style>
</style>


