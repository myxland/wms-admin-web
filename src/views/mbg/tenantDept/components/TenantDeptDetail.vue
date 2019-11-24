<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantDept" :rules="rules" ref="tenantDeptFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        <el-input v-model="tenantDept.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="上级部门：" prop="parentDeptId">
        <el-input v-model="tenantDept.parentDeptId"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="tenantDept.tenantId" placeholder="请选择租户" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门名称：" prop="deptName">
        <el-input v-model="tenantDept.deptName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantDeptFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantDeptFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantDept, getTenantDept, updateTenantDept} from '@/api/tenantDept'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantDept={
    parentDeptId: '',
    tenantId: '',
    deptName: ''
  };
  export default {
    name: 'TenantDeptDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantDept:Object.assign({}, defaultTenantDept),
        tenantInfoOptions:[],
        rules: {
          tenantId: [
            {required: true, message: '请输入租户编号', trigger: 'blur'}
          ],
          deptName: [
            {required: true, message: '请输入部门名称', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getTenantDept(this.$route.query.id).then(response => {
          this.tenantDept = response.data;
        });
      }else{
        this.tenantDept = Object.assign({},defaultTenantDept);
      }
      this.getTenantInfoList();
    },
    methods: {
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
                updateTenantDept(this.$route.query.id, this.tenantDept).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantDept(this.tenantDept).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantDept = Object.assign({},defaultTenantDept);
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
        this.tenantDept = Object.assign({},defaultTenantDept);
      }
    }
  }
</script>
<style>
</style>


