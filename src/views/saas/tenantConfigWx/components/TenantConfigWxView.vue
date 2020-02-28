<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantConfigWx" :rules="rules" ref="tenantConfigWxFrom" label-width="150px">
      <el-form-item label="微信配置ID：" prop="id">
        {{tenantConfigWx.id}}
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        {{tenantConfigWx.tenantName}}
      </el-form-item>
      <el-form-item label="微信公众号APPID：" prop="wxAppid">
      	{{tenantConfigWx.wxAppid}}
      </el-form-item>
      <el-form-item label="微信公众号AppSecret：" prop="wxAppsecret">
      	{{tenantConfigWx.wxAppsecret}}
      </el-form-item>
      <el-form-item label="微信商户ID：" prop="wxAccountId">
      	{{tenantConfigWx.wxAccountId}}
      </el-form-item>
      <el-form-item label="微信商户API密钥：" prop="wxAccountApiKey">
      	{{tenantConfigWx.wxAccountApiKey}}
      </el-form-item>
      <el-form-item label="微信公众号首页显示图片名称：" prop="wxTitlePictureFileName">
      	{{tenantConfigWx.wxTitlePictureFileName}}
      </el-form-item>
      <el-form-item label="微信公众号显示服务电话：" prop="wxServiceTel">
      	{{tenantConfigWx.wxServiceTel}}
      </el-form-item>
      <el-form-item label="开启出账微信通知：" prop="wxReceivableNoticeOn">
        <el-switch
          v-model="tenantConfigWx.wxReceivableNoticeOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="开启付款微信通知：" prop="wxPaymentNoticeOn">
        <el-switch
          v-model="tenantConfigWx.wxPaymentNoticeOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="开启用户预存款变动微信通知：" prop="wxBalanceMoneyChangeNoticeOn">
        <el-switch
          v-model="tenantConfigWx.wxBalanceMoneyChangeNoticeOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="开启欠费催缴微信通知：" prop="wxArrearsNoticeOn">
        <el-switch
          v-model="tenantConfigWx.wxArrearsNoticeOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="出账微信通知模板：" prop="wxReceivableNoticeTemplate">
      	{{tenantConfigWx.wxReceivableNoticeTemplate}}
      </el-form-item>
      <el-form-item label="付款微信通知模板：" prop="wxPaymentNoticeTemplate">
      	{{tenantConfigWx.wxPaymentNoticeTemplate}}
      </el-form-item>
      <el-form-item label="用户预存款变动微信通知模板：" prop="wxBalanceMoneyChangeNoticeTemplate">
      	{{tenantConfigWx.wxBalanceMoneyChangeNoticeTemplate}}
      </el-form-item>
      <el-form-item label="欠费催缴微信通知模板：" prop="wxArrearsNoticeTemplate">
      	{{tenantConfigWx.wxArrearsNoticeTemplate}}
      </el-form-item>
      <el-form-item label="进入催缴的欠费天数：" prop="wxArrearsDays">
      	{{tenantConfigWx.wxArrearsDays}}
      </el-form-item>
      <el-form-item label="每月多少号进行欠费催缴：" prop="wxArrearsNoticeDay">
      	{{tenantConfigWx.wxArrearsNoticeDay}}
      </el-form-item>
      <el-form-item label="欠费催缴开始时间：" prop="wxArrearsNoticeStartTime">
        {{tenantConfigWx.wxArrearsNoticeStartTime}}
      </el-form-item>
      <el-form-item label="欠费催缴结束时间：" prop="wxArrearsNoticeEndTime">
        {{tenantConfigWx.wxArrearsNoticeEndTime}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantConfigWx} from '@/api/tenantConfigWx'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';

  const defaultTenantConfigWx={
    tenantId: '',
    wxAppid: '',
    wxAppsecret: '',
    wxAccountId: '',
    wxAccountApiKey: '',
    wxTitlePictureFileName: '',
    wxServiceTel: '',
    wxReceivableNoticeOn: 1,
    wxPaymentNoticeOn: 1,
    wxBalanceMoneyChangeNoticeOn: 1,
    wxArrearsNoticeOn: 1,
    wxReceivableNoticeTemplate: '',
    wxPaymentNoticeTemplate: '',
    wxBalanceMoneyChangeNoticeTemplate: '',
    wxArrearsNoticeTemplate: '',
    wxArrearsDays: 0,
    wxArrearsNoticeDay: 0,
    wxArrearsNoticeStartTime: '',
    wxArrearsNoticeEndTime: ''
  };
  export default {
    name: 'TenantConfigWxView',
    data() {
      return {
        tenantConfigWx:Object.assign({}, defaultTenantConfigWx),
        rules: {
        }
      }
    },
    created() {
      getTenantConfigWx(this.$route.query.id).then(response => {
	      let data = response.data;
	      data.wxArrearsNoticeStartTime = formatDate(new Date(data.wxArrearsNoticeStartTime), 'yyyy-MM-dd hh:mm:ss');
	      data.wxArrearsNoticeEndTime = formatDate(new Date(data.wxArrearsNoticeEndTime), 'yyyy-MM-dd hh:mm:ss');
	      this.tenantConfigWx = data;
	      //this.tenantConfigWx = response.data;
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