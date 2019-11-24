<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="tenantInfoForm" label-width="120px" style="width: 600px" size="small">
      <el-form-item label="省：" prop="tenantProvince">
        <el-input v-model="value.tenantProvince"></el-input>
      </el-form-item>
      <el-form-item label="市：" prop="tenantCity">
        <el-input v-model="value.tenantCity"></el-input>
      </el-form-item>
      <el-form-item label="区/县：" prop="tenantArea">
        <el-input v-model="value.tenantArea"></el-input>
      </el-form-item>
      <el-form-item label="联系地址：" prop="tenantAddress">
        <el-input v-model="value.tenantAddress"></el-input>
      </el-form-item>
      <el-form-item label="联系人：" prop="tenantLinkman">
        <el-input v-model="value.tenantLinkman"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：" prop="tenantMobile">
        <el-input v-model="value.tenantMobile"></el-input>
      </el-form-item>
      <el-form-item label="单位电话：" prop="tenantPhone">
        <el-input v-model="value.tenantPhone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="tenantEmail">
        <el-input v-model="value.tenantEmail"></el-input>
      </el-form-item>
      <el-form-item label="QQ号码：" prop="tenantQq">
        <el-input v-model="value.tenantQq"></el-input>
      </el-form-item>      
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，填写基础信息</el-button>
        <el-button type="primary" size="medium" @click="handleNext('tenantInfoForm')">下一步，填写配置信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>  
  import {getTenantInfo} from '@/api/tenantInfo';

  export default {
    name: "TenantLinkDetail",
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
      //租户的编号
      tenantInfoId(){
        return this.value.id;
      }
    },
    watch: {
      tenantInfoId:function(newValue){
        if(!this.isEdit)return;
        if(this.hasEditCreated)return;
        if(newValue===undefined||newValue==null||newValue===0)return;
        this.handleEditCreated();
      }
    },
    methods: {
      //处理编辑逻辑
      handleEditCreated(){
        this.hasEditCreated=true;
      },
      handlePrev(){
        this.$emit('prevStep')
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
