<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantSms" :rules="rules" ref="tenantSmsFrom" label-width="150px">
      <el-form-item label="编号ID：" prop="id">
        {{tenantSms.id}}
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        {{tenantSms.tenantName}}
      </el-form-item>
      <el-form-item label="签名：" prop="smsSignature">
      	{{tenantSms.smsSignature}}
      </el-form-item>
      <el-form-item label="SP服务商：" prop="smsSpService">
      	{{tenantSms.smsSpService}}
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
      	{{tenantSms.smsQfSendAfterDays}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantSms} from '@/api/tenantSms'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';

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
    name: 'TenantSmsView',
    data() {
      return {
        tenantSms:Object.assign({}, defaultTenantSms),
        rules: {
        }
      }
    },
    created() {
      getTenantSms(this.$route.query.id).then(response => {
	      this.tenantSms = response.data;
      });
    },
    filters: {
    },
    methods: {
    }
  }
</script>
<style>
</style>