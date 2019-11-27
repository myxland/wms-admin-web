<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantAccount" :rules="rules" ref="tenantAccountFrom" label-width="150px">
      <el-form-item label="编号ID：" prop="id">
        <el-input v-model="tenantAccount.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="tenantAccount.tenantId" :disabled="true" placeholder="请选择租户" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账户余额：" prop="accountBalance">
        <el-input-number v-model="tenantAccount.accountBalance" :min="0" :precision="2" :disabled="true"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantAccountFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantAccountFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantAccount, getTenantAccount, getTenantAccountByTenantId, updateTenantAccount} from '@/api/tenantAccount'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantAccount={
    tenantId: '',
    accountBalance: ''
  };
  export default {
    name: 'TenantAccountDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantAccount:Object.assign({}, defaultTenantAccount),
        tenantInfoOptions:[],
        rules: {
        }
      }
    },
    created() {
      if (this.isEdit) {
        if (this.$route.query.id) {
          getTenantAccount(this.$route.query.id).then(response => {
            this.tenantAccount = response.data;
          });
        }
        if (this.$route.query.tenantId) {
          getTenantAccountByTenantId(this.$route.query.tenantId).then(response => {
            this.tenantAccount = response.data;
          });
        }        
      }else{
        this.tenantAccount = Object.assign({},defaultTenantAccount);
      }
      this.getTenantInfoList();
    },
    methods: {
      getTenantInfoList() {
        fetchTenantInfoList({pageNum:1,pageSize:1000}).then(response => {
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
                updateTenantAccount(this.$route.query.id, this.tenantAccount).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantAccount(this.tenantAccount).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantAccount = Object.assign({},defaultTenantAccount);
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
        this.tenantAccount = Object.assign({},defaultTenantAccount);
      }
    }
  }
</script>
<style>
</style>


