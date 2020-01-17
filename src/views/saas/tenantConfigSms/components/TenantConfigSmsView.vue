<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantConfigSms" :rules="rules" ref="tenantConfigSmsFrom" label-width="150px">
      <el-form-item label="短信配置ID：" prop="id">
        {{tenantConfigSms.id}}
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        {{tenantConfigSms.tenantName}}
      </el-form-item>
      <el-form-item label="短信签名：" prop="smsSignature">
      	{{tenantConfigSms.smsSignature}}
      </el-form-item>
      <el-form-item label="开启出账短信通知：" prop="smsReceivableNoticeOn">
        <el-switch
          v-model="tenantConfigSms.smsReceivableNoticeOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="开启付款短信通知：" prop="smsPaymentNoticeOn">
        <el-switch
          v-model="tenantConfigSms.smsPaymentNoticeOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="开启用户预存款变动短信通知：" prop="smsBalanceMoneyChangeNoticeOn">
        <el-switch
          v-model="tenantConfigSms.smsBalanceMoneyChangeNoticeOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="开启欠费催缴短信通知：" prop="smsArrearsNoticeOn">
        <el-switch
          v-model="tenantConfigSms.smsArrearsNoticeOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="出账短信通知模板：" prop="smsReceivableNoticeTemplate">
      	{{tenantConfigSms.smsReceivableNoticeTemplate}}
      </el-form-item>
      <el-form-item label="付款短信通知模板：" prop="smsPaymentNoticeTemplate">
      	{{tenantConfigSms.smsPaymentNoticeTemplate}}
      </el-form-item>
      <el-form-item label="用户预存款变动短信通知模板：" prop="smsBalanceMoneyChangeNoticeTemplate">
      	{{tenantConfigSms.smsBalanceMoneyChangeNoticeTemplate}}
      </el-form-item>
      <el-form-item label="欠费催缴短信通知模板：" prop="smsArrearsNoticeTemplate">
      	{{tenantConfigSms.smsArrearsNoticeTemplate}}
      </el-form-item>
      <el-form-item label="进入催缴的欠费天数：" prop="smsArrearsDays">
      	{{tenantConfigSms.smsArrearsDays}}
      </el-form-item>
      <el-form-item label="每月多少号进行欠费催缴：" prop="smsArrearsNoticeDay">
      	{{tenantConfigSms.smsArrearsNoticeDay}}
      </el-form-item>
      <el-form-item label="欠费催缴开始时间：" prop="smsArrearsNoticeStartTime">
        {{tenantConfigSms.smsArrearsNoticeStartTime}}
      </el-form-item>
      <el-form-item label="欠费催缴结束时间：" prop="smsArrearsNoticeEndTime">
        {{tenantConfigSms.smsArrearsNoticeEndTime}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantConfigSms} from '@/api/tenantConfigSms'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';

  const defaultTenantConfigSms={
    tenantId: '',
    smsSignature: '',
    smsReceivableNoticeOn: 1,
    smsPaymentNoticeOn: 1,
    smsBalanceMoneyChangeNoticeOn: 1,
    smsArrearsNoticeOn: 1,
    smsReceivableNoticeTemplate: '',
    smsPaymentNoticeTemplate: '',
    smsBalanceMoneyChangeNoticeTemplate: '',
    smsArrearsNoticeTemplate: '',
    smsArrearsDays: 0,
    smsArrearsNoticeDay: 0,
    smsArrearsNoticeStartTime: '',
    smsArrearsNoticeEndTime: ''
  };
  export default {
    name: 'TenantConfigSmsView',
    data() {
      return {
        tenantConfigSms:Object.assign({}, defaultTenantConfigSms),
        rules: {
        }
      }
    },
    created() {
      getTenantConfigSms(this.$route.query.id).then(response => {
	      let data = response.data;
	      data.smsArrearsNoticeStartTime = formatDate(new Date(data.smsArrearsNoticeStartTime), 'yyyy-MM-dd hh:mm:ss');
	      data.smsArrearsNoticeEndTime = formatDate(new Date(data.smsArrearsNoticeEndTime), 'yyyy-MM-dd hh:mm:ss');
	      this.tenantConfigSms = data;
	      //this.tenantConfigSms = response.data;
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