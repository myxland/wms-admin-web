<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantDepartment" :rules="rules" ref="tenantDepartmentFrom" label-width="150px">
      <el-form-item label="部门ID：" prop="id">
        <el-input v-model="tenantDepartment.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        <el-select v-model="tenantDepartment.tenantId" placeholder="请选择租户ID" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门名称：" prop="departmentName">
        <el-input v-model="tenantDepartment.departmentName"></el-input>
      </el-form-item>
      <el-form-item label="上级部门ID：" prop="departmentParentId">
        <el-input v-model="tenantDepartment.departmentParentId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantDepartmentFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantDepartmentFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantDepartment, getTenantDepartment, updateTenantDepartment} from '@/api/tenantDepartment'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantDepartment={
    tenantId: '',
    departmentName: '',
    departmentParentId: ''
  };
  export default {
    name: 'TenantDepartmentDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantDepartment:Object.assign({}, defaultTenantDepartment, this.$route.query),
        tenantInfoOptions:[],
        rules: {
          tenantId: [
            {required: true, message: '请输入租户ID', trigger: 'blur'}
          ],
          departmentName: [
            {required: true, message: '请输入部门名称', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantDepartment(this.$route.query.id).then(response => {
	          this.tenantDepartment = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantDepartmentByTenantId(this.$route.query.tenantId).then(response => {
	          this.tenantDepartment = response.data;
        	});
        }
        
      }else{
        this.tenantDepartment = Object.assign({},defaultTenantDepartment,this.$route.query);
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
                updateTenantDepartment(this.$route.query.id, this.tenantDepartment).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantDepartment(this.tenantDepartment).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantDepartment = Object.assign({},defaultTenantDepartment);
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
        this.tenantDepartment = Object.assign({},defaultTenantDepartment);
      }
    }
  }
</script>
<style>
</style>


