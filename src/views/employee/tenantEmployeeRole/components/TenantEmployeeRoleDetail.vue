<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantEmployeeRole" :rules="rules" ref="tenantEmployeeRoleFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        <el-input v-model="tenantEmployeeRole.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="tenantEmployeeRole.tenantId" placeholder="请选择租户" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="员工编号：" prop="empId">
        <el-input v-model="tenantEmployeeRole.empId"></el-input>
      </el-form-item>
      <el-form-item label="角色编号：" prop="roleId">
        <el-input v-model="tenantEmployeeRole.roleId"></el-input>
      </el-form-item>
      <el-form-item label="开放：" prop="empRoleOn">
        <el-switch
          v-model="tenantEmployeeRole.empRoleOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantEmployeeRoleFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantEmployeeRoleFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantEmployeeRole, getTenantEmployeeRole, updateTenantEmployeeRole} from '@/api/tenantEmployeeRole'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantEmployeeRole={
    tenantId: '',
    empId: '',
    roleId: '',
    empRoleOn: 1
  };
  export default {
    name: 'TenantEmployeeRoleDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantEmployeeRole:Object.assign({}, defaultTenantEmployeeRole, this.$route.query),
        tenantInfoOptions:[],
        rules: {
          tenantId: [
            {required: true, message: '请输入租户编号', trigger: 'blur'}
          ],
          empId: [
            {required: true, message: '请输入员工编号', trigger: 'blur'}
          ],
          roleId: [
            {required: true, message: '请输入角色编号', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantEmployeeRole(this.$route.query.id).then(response => {
	          this.tenantEmployeeRole = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantEmployeeRoleByTenantId(this.$route.query.tenantId).then(response => {
	          this.tenantEmployeeRole = response.data;
        	});
        }
        
      }else{
        this.tenantEmployeeRole = Object.assign({},defaultTenantEmployeeRole,this.$route.query);
      }
      this.getTenantInfoList();
    },
    methods: {
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
                updateTenantEmployeeRole(this.$route.query.id, this.tenantEmployeeRole).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantEmployeeRole(this.tenantEmployeeRole).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantEmployeeRole = Object.assign({},defaultTenantEmployeeRole);
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
        this.tenantEmployeeRole = Object.assign({},defaultTenantEmployeeRole);
      }
    }
  }
</script>
<style>
</style>


