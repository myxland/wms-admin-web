<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="tenantInfoForm" label-width="120px" style="width: 600px" size="small">
      <el-form-item label="租户类型：" prop="tenantType">
        <el-select v-model="value.tenantType" clearable>
          <el-option
            v-for="item in tenantTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="租户状态：" prop="tenantStatus">
        <el-select v-model="value.tenantStatus" clearable>
          <el-option
            v-for="item in tenantStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，填写联系人信息</el-button>
        <el-button type="primary" size="medium" @click="handleNext('tenantInfoForm')">下一步，填写系统信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>  
  import {getTenantInfo} from '@/api/tenantInfo';
  const defaultTenantTypeOptions=[
    {
      value: 1,
      label: '使用单位'
    },
    {
      value: 2,
      label: '供应单位'
    },
    {
      value: 3,
      label: '内部运营'
    }
  ];
  const defaultTenantStatusOptions=[
    {
      value: 1,
      label: '正式'
    },
    {
      value: 0,
      label: '试用'
    }
  ];
  const defaultPartChargeOnOptions=[
    {
      value: 1,
      label: '启用'
    },
    {
      value: 0,
      label: '不启用'
    }
  ];
  const defaultFineOnOptions=[
    {
      value: 1,
      label: '启用'
    },
    {
      value: 0,
      label: '不启用'
    }
  ];

  export default {
    name: "TenantConfigDetail",
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
          
        },
        tenantTypeOptions: Object.assign({},defaultTenantTypeOptions),
        tenantStatusOptions: Object.assign({},defaultTenantStatusOptions),
        partChargeOnOptions: Object.assign({},defaultPartChargeOnOptions),
        fineOnOptions: Object.assign({},defaultFineOnOptions)
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
