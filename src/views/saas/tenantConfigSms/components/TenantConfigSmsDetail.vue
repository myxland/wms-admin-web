<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantConfigSms" :rules="rules" ref="tenantConfigSmsFrom" label-width="150px">
      <el-form-item label="短信配置ID：" prop="id">
        <el-input v-model="tenantConfigSms.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        <el-select v-model="tenantConfigSms.tenantId" placeholder="请选择租户ID" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="短信签名：" prop="smsSignature">
        <el-input v-model="tenantConfigSms.smsSignature"></el-input>
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
        <el-input v-model="tenantConfigSms.smsReceivableNoticeTemplate"></el-input>
      </el-form-item>
      <el-form-item label="付款短信通知模板：" prop="smsPaymentNoticeTemplate">
        <el-input v-model="tenantConfigSms.smsPaymentNoticeTemplate"></el-input>
      </el-form-item>
      <el-form-item label="用户预存款变动短信通知模板：" prop="smsBalanceMoneyChangeNoticeTemplate">
        <el-input v-model="tenantConfigSms.smsBalanceMoneyChangeNoticeTemplate"></el-input>
      </el-form-item>
      <el-form-item label="欠费催缴短信通知模板：" prop="smsArrearsNoticeTemplate">
        <el-input v-model="tenantConfigSms.smsArrearsNoticeTemplate"></el-input>
      </el-form-item>
      <el-form-item label="进入催缴的欠费天数：" prop="smsArrearsDays">
        <el-input-number v-model="tenantConfigSms.smsArrearsDays" :min="0" placeholder="进入催缴的欠费天数"></el-input-number>
      </el-form-item>
      <el-form-item label="每月多少号进行欠费催缴：" prop="smsArrearsNoticeDay">
        <el-input-number v-model="tenantConfigSms.smsArrearsNoticeDay" :min="0" placeholder="每月多少号进行欠费催缴"></el-input-number>
      </el-form-item>
      <el-form-item label="欠费催缴开始时间：" prop="smsArrearsNoticeStartTime">
        <el-date-picker
                class="input-width"
                v-model="tenantConfigSms.smsArrearsNoticeStartTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择欠费催缴开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="欠费催缴结束时间：" prop="smsArrearsNoticeEndTime">
        <el-date-picker
                class="input-width"
                v-model="tenantConfigSms.smsArrearsNoticeEndTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择欠费催缴结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantConfigSmsFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantConfigSmsFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantConfigSms, getTenantConfigSms, updateTenantConfigSms} from '@/api/tenantConfigSms'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  import SingleUpload from '@/components/Upload/singleUpload'
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
    name: 'TenantConfigSmsDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantConfigSms:Object.assign({}, defaultTenantConfigSms, this.$route.query),
        tenantInfoOptions:[],
        rules: {
          tenantId: [
            {required: true, message: '请输入租户ID', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantConfigSms(this.$route.query.id).then(response => {
	          let data = response.data;
	          data.smsArrearsNoticeStartTime = formatDate(new Date(data.smsArrearsNoticeStartTime), 'yyyy-MM-dd hh:mm:ss');
	          data.smsArrearsNoticeEndTime = formatDate(new Date(data.smsArrearsNoticeEndTime), 'yyyy-MM-dd hh:mm:ss');
	          this.tenantConfigSms = data;
	          //this.tenantConfigSms = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantConfigSmsByTenantId(this.$route.query.tenantId).then(response => {
	          let data = response.data;
	          data.smsArrearsNoticeStartTime = formatDate(new Date(data.smsArrearsNoticeStartTime), 'yyyy-MM-dd hh:mm:ss');
	          data.smsArrearsNoticeEndTime = formatDate(new Date(data.smsArrearsNoticeEndTime), 'yyyy-MM-dd hh:mm:ss');
	          this.tenantConfigSms = data;
	          //this.tenantConfigSms = response.data;
        	});
        }
        
      }else{
        this.tenantConfigSms = Object.assign({},defaultTenantConfigSms,this.$route.query);
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
                updateTenantConfigSms(this.$route.query.id, this.tenantConfigSms).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantConfigSms(this.tenantConfigSms).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantConfigSms = Object.assign({},defaultTenantConfigSms);
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
        this.tenantConfigSms = Object.assign({},defaultTenantConfigSms);
      }
    }
  }
</script>
<style>
</style>


