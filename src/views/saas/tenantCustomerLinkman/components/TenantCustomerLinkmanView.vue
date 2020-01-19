<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantCustomerLinkman" :rules="rules" ref="tenantCustomerLinkmanFrom" label-width="150px">
      <el-form-item label="联系人ID：" prop="id">
        {{tenantCustomerLinkman.id}}
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        {{tenantCustomerLinkman.tenantName}}
      </el-form-item>
      <el-form-item label="客户ID：" prop="customerId">
      	{{tenantCustomerLinkman.customerId}}
      </el-form-item>
      <el-form-item label="联系人姓名：" prop="linkmanName">
      	{{tenantCustomerLinkman.linkmanName}}
      </el-form-item>
      <el-form-item label="联系人地址：" prop="linkmanAddress">
      	{{tenantCustomerLinkman.linkmanAddress}}
      </el-form-item>
      <el-form-item label="主联系人：" prop="linkmanMainOn">
        <el-switch
          v-model="tenantCustomerLinkman.linkmanMainOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="性别：" prop="linkmanSex">
        {{tenantCustomerLinkman.linkmanSex | formatLinkmanSex}}
      </el-form-item>
      <el-form-item label="出生日期：" prop="linkmanBirthday">
        {{tenantCustomerLinkman.linkmanBirthday}}
      </el-form-item>
      <el-form-item label="手机号码：" prop="linkmanMobile">
      	{{tenantCustomerLinkman.linkmanMobile}}
      </el-form-item>
      <el-form-item label="固定电话号码：" prop="linkmanTel">
      	{{tenantCustomerLinkman.linkmanTel}}
      </el-form-item>
      <el-form-item label="邮箱地址：" prop="linkmanEmail">
      	{{tenantCustomerLinkman.linkmanEmail}}
      </el-form-item>
      <el-form-item label="微信号：" prop="linkmanPersonalWx">
      	{{tenantCustomerLinkman.linkmanPersonalWx}}
      </el-form-item>
      <el-form-item label="QQ号：" prop="linkmanQq">
      	{{tenantCustomerLinkman.linkmanQq}}
      </el-form-item>
      <el-form-item label="备注：" prop="linkmanRemark">
      	{{tenantCustomerLinkman.linkmanRemark}}
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantCustomerLinkman} from '@/api/tenantCustomerLinkman'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';

  const defaultTenantCustomerLinkman={
    tenantId: '',
    customerId: '',
    linkmanName: '',
    linkmanAddress: '',
    linkmanMainOn: 1,
    linkmanSex: '',
    linkmanBirthday: '',
    linkmanMobile: '',
    linkmanTel: '',
    linkmanEmail: '',
    linkmanPersonalWx: '',
    linkmanQq: '',
    linkmanRemark: ''
  };
  const defaultLinkmanSexOptions=[
    {
      value: 1,
      label: '男'
    },
    {
      value: 2,
      label: '女'
    }
  ];
  export default {
    name: 'TenantCustomerLinkmanView',
    data() {
      return {
        tenantCustomerLinkman:Object.assign({}, defaultTenantCustomerLinkman),
        linkmanSexOptions: Object.assign({},defaultLinkmanSexOptions),
        rules: {
        }
      }
    },
    created() {
      getTenantCustomerLinkman(this.$route.query.id).then(response => {
	      let data = response.data;
	      data.linkmanBirthday = formatDate(new Date(data.linkmanBirthday), 'yyyy-MM-dd');
	      this.tenantCustomerLinkman = data;
	      //this.tenantCustomerLinkman = response.data;
      });
    },
    filters: {
      formatLinkmanSex(linkmanSex){
      	for(let i=0;i<defaultLinkmanSexOptions.length;i++){
      		if(linkmanSex===defaultLinkmanSexOptions[i].value){
      			return defaultLinkmanSexOptions[i].label;
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