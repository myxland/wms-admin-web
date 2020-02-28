<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantConfigWx" :rules="rules" ref="tenantConfigWxFrom" label-width="150px">
      <el-form-item label="微信配置ID：" prop="id">
        <el-input v-model="tenantConfigWx.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        <el-select v-model="tenantConfigWx.tenantId" placeholder="请选择租户ID" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="微信公众号APPID：" prop="wxAppid">
        <el-input v-model="tenantConfigWx.wxAppid"></el-input>
      </el-form-item>
      <el-form-item label="微信公众号AppSecret：" prop="wxAppsecret">
        <el-input v-model="tenantConfigWx.wxAppsecret"></el-input>
      </el-form-item>
      <el-form-item label="微信商户ID：" prop="wxAccountId">
        <el-input v-model="tenantConfigWx.wxAccountId"></el-input>
      </el-form-item>
      <el-form-item label="微信商户API密钥：" prop="wxAccountApiKey">
        <el-input v-model="tenantConfigWx.wxAccountApiKey"></el-input>
      </el-form-item>
      <el-form-item label="微信公众号首页显示图片名称：" prop="wxTitlePictureFileName">
        <el-input v-model="tenantConfigWx.wxTitlePictureFileName"></el-input>
      </el-form-item>
      <el-form-item label="微信公众号显示服务电话：" prop="wxServiceTel">
        <el-input v-model="tenantConfigWx.wxServiceTel"></el-input>
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
        <el-input v-model="tenantConfigWx.wxReceivableNoticeTemplate"></el-input>
      </el-form-item>
      <el-form-item label="付款微信通知模板：" prop="wxPaymentNoticeTemplate">
        <el-input v-model="tenantConfigWx.wxPaymentNoticeTemplate"></el-input>
      </el-form-item>
      <el-form-item label="用户预存款变动微信通知模板：" prop="wxBalanceMoneyChangeNoticeTemplate">
        <el-input v-model="tenantConfigWx.wxBalanceMoneyChangeNoticeTemplate"></el-input>
      </el-form-item>
      <el-form-item label="欠费催缴微信通知模板：" prop="wxArrearsNoticeTemplate">
        <el-input v-model="tenantConfigWx.wxArrearsNoticeTemplate"></el-input>
      </el-form-item>
      <el-form-item label="进入催缴的欠费天数：" prop="wxArrearsDays">
        <el-input-number v-model="tenantConfigWx.wxArrearsDays" :min="0" placeholder="进入催缴的欠费天数"></el-input-number>
      </el-form-item>
      <el-form-item label="每月多少号进行欠费催缴：" prop="wxArrearsNoticeDay">
        <el-input-number v-model="tenantConfigWx.wxArrearsNoticeDay" :min="0" placeholder="每月多少号进行欠费催缴"></el-input-number>
      </el-form-item>
      <el-form-item label="欠费催缴开始时间：" prop="wxArrearsNoticeStartTime">
        <el-date-picker
                class="input-width"
                v-model="tenantConfigWx.wxArrearsNoticeStartTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择欠费催缴开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="欠费催缴结束时间：" prop="wxArrearsNoticeEndTime">
        <el-date-picker
                class="input-width"
                v-model="tenantConfigWx.wxArrearsNoticeEndTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择欠费催缴结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantConfigWxFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantConfigWxFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantConfigWx, getTenantConfigWx, updateTenantConfigWx} from '@/api/tenantConfigWx'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  import SingleUpload from '@/components/Upload/singleUpload'
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
    name: 'TenantConfigWxDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantConfigWx:Object.assign({}, defaultTenantConfigWx, this.$route.query),
        tenantInfoOptions:[],
        rules: {
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantConfigWx(this.$route.query.id).then(response => {
	          let data = response.data;
	          data.wxArrearsNoticeStartTime = formatDate(new Date(data.wxArrearsNoticeStartTime), 'yyyy-MM-dd hh:mm:ss');
	          data.wxArrearsNoticeEndTime = formatDate(new Date(data.wxArrearsNoticeEndTime), 'yyyy-MM-dd hh:mm:ss');
	          this.tenantConfigWx = data;
	          //this.tenantConfigWx = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantConfigWxByTenantId(this.$route.query.tenantId).then(response => {
	          let data = response.data;
	          data.wxArrearsNoticeStartTime = formatDate(new Date(data.wxArrearsNoticeStartTime), 'yyyy-MM-dd hh:mm:ss');
	          data.wxArrearsNoticeEndTime = formatDate(new Date(data.wxArrearsNoticeEndTime), 'yyyy-MM-dd hh:mm:ss');
	          this.tenantConfigWx = data;
	          //this.tenantConfigWx = response.data;
        	});
        }
        
      }else{
        this.tenantConfigWx = Object.assign({},defaultTenantConfigWx,this.$route.query);
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
                updateTenantConfigWx(this.$route.query.id, this.tenantConfigWx).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantConfigWx(this.tenantConfigWx).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantConfigWx = Object.assign({},defaultTenantConfigWx);
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
        this.tenantConfigWx = Object.assign({},defaultTenantConfigWx);
      }
    }
  }
</script>
<style>
</style>


