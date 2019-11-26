<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantSms" :rules="rules" ref="tenantSmsFrom" label-width="150px">
      <el-form-item label="编号ID：" prop="id">
        <el-input v-model="tenantSms.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="tenantSms.tenantId" placeholder="请选择租户" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="签名：" prop="smsSignature">
        <el-input v-model="tenantSms.smsSignature"></el-input>
      </el-form-item>
      <el-form-item label="SP服务商：" prop="smsSpService">
        <el-input v-model="tenantSms.smsSpService"></el-input>
      </el-form-item>
      <el-form-item label="启用抄表账单通知：" prop="smsReadSendOn">
        <el-switch
          v-model="tenantSms.smsReadSendOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="启用缴费成功通知：" prop="smsChargeSendOn">
        <el-switch
          v-model="tenantSms.smsChargeSendOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="启用欠费通知：" prop="smsQfSendOn">
        <el-switch
          v-model="tenantSms.smsQfSendOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="欠费通知短信发送间隔天数：" prop="smsQfSendAfterDays">
        <el-input-number v-model="tenantSms.smsQfSendAfterDays" :min="0" placeholder="欠费通知短信发送间隔天数"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantSmsFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantSmsFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantSms, getTenantSms, updateTenantSms} from '@/api/tenantSms'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantSms={
    tenantId: '',
    smsSignature: '',
    smsSpService: '',
    smsReadSendOn: 1,
    smsChargeSendOn: 1,
    smsQfSendOn: 1,
    smsQfSendAfterDays: 0
  };
  export default {
    name: 'TenantSmsDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantSms:Object.assign({}, defaultTenantSms),
        tenantInfoOptions:[],
        rules: {
        }
      }
    },
    created() {
      if (this.isEdit) {
        getTenantSms(this.$route.query.id).then(response => {
          this.tenantSms = response.data;
        });
      }else{
        this.tenantSms = Object.assign({},defaultTenantSms);
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
                updateTenantSms(this.$route.query.id, this.tenantSms).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantSms(this.tenantSms).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantSms = Object.assign({},defaultTenantSms);
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
        this.tenantSms = Object.assign({},defaultTenantSms);
      }
    }
  }
</script>
<style>
</style>


