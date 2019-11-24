<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="tenantInfoForm" label-width="120px" style="width: 600px" size="small">
      <el-form-item label="租户名称：" prop="tenantName">
        <el-input v-model="value.tenantName"></el-input>
      </el-form-item>
      <el-form-item label="账户余额：" prop="tenantBalance">
        <el-input v-model="value.tenantBalance"></el-input>
      </el-form-item>
      <el-form-item label="显示名称：" prop="tenantDisplayName">
        <el-input v-model="value.tenantDisplayName"></el-input>
      </el-form-item>
      <el-form-item label="开户行行号：" prop="bankNo">
        <el-input v-model="value.bankNo"></el-input>
      </el-form-item>
      <el-form-item label="开户行名称：" prop="bankName">
        <el-input v-model="value.bankName"></el-input>
      </el-form-item>
      <el-form-item label="开户账号：" prop="bankAccount">
        <el-input v-model="value.bankAccount"></el-input>
      </el-form-item>      
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('tenantInfoForm')">下一步，填写联系信息</el-button>
      </el-form-item>      
    </el-form>    
  </div>
</template>

<script>  
  import {getTenantInfo} from '@/api/tenantInfo';

  export default {
    name: "TenantBasicDetail",
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {        
        hasEditCreated:false,        
        rules: {
          
        }
      };
    },
    created() {
           
    },
    computed:{
      
    },
    watch: {
      
    },
    methods: {
      //处理编辑逻辑
      handleEditCreated(){
        this.hasEditCreated=true;
      },      
      handleNext(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('nextStep');
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
</style>
