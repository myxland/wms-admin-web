<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantInfo" :rules="rules" ref="tenantInfoFrom" label-width="150px">
      <el-form-item label="租户编号：" prop="id">
        {{tenantInfo.id}}
      </el-form-item>
      <el-form-item label="租户名称：" prop="tenantName">
      	{{tenantInfo.tenantName}}
      </el-form-item>
      <el-form-item label="显示名称：" prop="displayName">
      	{{tenantInfo.displayName}}
      </el-form-item>
      <el-form-item label="省：" prop="tenantProvince">
      	{{tenantInfo.tenantProvince}}
      </el-form-item>
      <el-form-item label="市：" prop="tenantCity">
      	{{tenantInfo.tenantCity}}
      </el-form-item>
      <el-form-item label="区县：" prop="tenantArea">
      	{{tenantInfo.tenantArea}}
      </el-form-item>
      <el-form-item label="联系地址：" prop="tenantAddress">
      	{{tenantInfo.tenantAddress}}
      </el-form-item>
      <el-form-item label="联系人：" prop="tenantLinkman">
      	{{tenantInfo.tenantLinkman}}
      </el-form-item>
      <el-form-item label="手机号码：" prop="tenantMobile">
      	{{tenantInfo.tenantMobile}}
      </el-form-item>
      <el-form-item label="单位电话：" prop="tenantTel">
      	{{tenantInfo.tenantTel}}
      </el-form-item>
      <el-form-item label="邮箱：" prop="tenantEmail">
      	{{tenantInfo.tenantEmail}}
      </el-form-item>
      <el-form-item label="QQ号码：" prop="tenantQq">
      	{{tenantInfo.tenantQq}}
      </el-form-item>
      <el-form-item label="租户类型：" prop="tenantType" clearable>
        {{tenantInfo.tenantType | formatTenantType}}
      </el-form-item>      
      <el-form-item label="租户状态：" prop="tenantStatus" clearable>
        {{tenantInfo.tenantStatus | formatTenantStatus}}
      </el-form-item>      
      <el-form-item label="注册时间：" prop="regTime">
        {{tenantInfo.regTime}}
      </el-form-item>
      <el-form-item label="到期日期：" prop="endDate">
        {{tenantInfo.endDate}}
      </el-form-item>
      <el-form-item label="税号：" prop="creditNumber">
      	{{tenantInfo.creditNumber}}
      </el-form-item>
      <el-form-item label="开票地址：" prop="invoiceAddress">
      	{{tenantInfo.invoiceAddress}}
      </el-form-item>
      <el-form-item label="开户行行号：" prop="bankNo">
      	{{tenantInfo.bankNo}}
      </el-form-item>
      <el-form-item label="开户行名称：" prop="bankName">
      	{{tenantInfo.bankName}}
      </el-form-item>
      <el-form-item label="开户账号：" prop="accountNo">
      	{{tenantInfo.accountNo}}
      </el-form-item>
      <el-form-item label="是否启用部分缴费：" prop="partChargeOn">
        <el-switch
          v-model="tenantInfo.partChargeOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="是否启用违约金：" prop="overDuefineOn">
        <el-switch
          v-model="tenantInfo.overDuefineOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="违约金宽限天数：" prop="overDuefineDay">
      	{{tenantInfo.overDuefineDay}}
      </el-form-item>
      <el-form-item label="违约金每天收取比例：" prop="overDuefineRatio">
      	{{tenantInfo.overDuefineRatio}}
      </el-form-item>
      <el-form-item label="违约金封顶比例：" prop="overDuefineTopRatio">
      	{{tenantInfo.overDuefineTopRatio}}
      </el-form-item>
      <el-form-item label="预存抵扣方式：" prop="ycdkType" clearable>
        {{tenantInfo.ycdkType | formatYcdkType}}
      </el-form-item>      
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantInfo} from '@/api/tenantInfo'
  import {formatDate} from '@/utils/date';

  const defaultTenantInfo={
    tenantName: '',
    displayName: '',
    tenantProvince: '',
    tenantCity: '',
    tenantArea: '',
    tenantAddress: '',
    tenantLinkman: '',
    tenantMobile: '',
    tenantTel: '',
    tenantEmail: '',
    tenantQq: '',
    tenantType: '',
    tenantStatus: '',
    regTime: '',
    endDate: '',
    creditNumber: '',
    invoiceAddress: '',
    bankNo: '',
    bankName: '',
    accountNo: '',
    partChargeOn: 1,
    overDuefineOn: 1,
    overDuefineDay: 0,
    overDuefineRatio: null,
    overDuefineTopRatio: null,
    ycdkType: ''
  };
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
      value: 2,
      label: '试用'
    }
  ];
  const defaultYcdkTypeOptions=[
    {
      value: 1,
      label: '抄表后即时抵扣'
    },
    {
      value: 2,
      label: '人工发起抵扣'
    }
  ];
  export default {
    name: 'TenantInfoView',
    data() {
      return {
        tenantInfo:Object.assign({}, defaultTenantInfo),
        tenantTypeOptions: Object.assign({},defaultTenantTypeOptions),
        tenantStatusOptions: Object.assign({},defaultTenantStatusOptions),
        ycdkTypeOptions: Object.assign({},defaultYcdkTypeOptions),
        rules: {
        }
      }
    },
    created() {
      getTenantInfo(this.$route.query.id).then(response => {
	      let data = response.data;
	      data.regTime = formatDate(new Date(data.regTime), 'yyyy-MM-dd hh:mm:ss');
	      data.endDate = formatDate(new Date(data.endDate), 'yyyy-MM-dd');
	      this.tenantInfo = data;
	      //this.tenantInfo = response.data;
      });
    },
    filters: {
      formatTenantType(tenantType){
      	for(let i=0;i<defaultTenantTypeOptions.length;i++){
      		if(tenantType===defaultTenantTypeOptions[i].value){
      			return defaultTenantTypeOptions[i].label;
      		}
      	}
      },
      formatTenantStatus(tenantStatus){
      	for(let i=0;i<defaultTenantStatusOptions.length;i++){
      		if(tenantStatus===defaultTenantStatusOptions[i].value){
      			return defaultTenantStatusOptions[i].label;
      		}
      	}
      },
      formatYcdkType(ycdkType){
      	for(let i=0;i<defaultYcdkTypeOptions.length;i++){
      		if(ycdkType===defaultYcdkTypeOptions[i].value){
      			return defaultYcdkTypeOptions[i].label;
      		}
      	}
      },
    },
    methods: {
    }
  }
</script>
<style>
</style>