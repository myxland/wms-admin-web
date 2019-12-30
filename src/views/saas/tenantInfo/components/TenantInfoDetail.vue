<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantInfo" :rules="rules" ref="tenantInfoFrom" label-width="150px">
      <el-form-item label="租户ID：" prop="id" v-if="isEdit">
        <el-input v-model="tenantInfo.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户名称：" prop="tenantName">
        <el-input v-model="tenantInfo.tenantName"></el-input>
      </el-form-item>
      <el-form-item label="租户类型：" prop="tenantType">
        <el-select
          v-model="tenantInfo.tenantType"
          clearable
          placeholder="请选择租户类型">
          <el-option
            v-for="item in tenantTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="租户显示名称：" prop="tenantDisplayName">
        <el-input v-model="tenantInfo.tenantDisplayName"></el-input>
      </el-form-item>
      <el-form-item label="账户余额：" prop="tenantBalance" v-if="isEdit">
        <el-input-number v-model="tenantInfo.tenantBalance" :min="0" :precision="2" placeholder="账户余额"></el-input-number>
      </el-form-item>
      <el-form-item label="透支额度：" prop="teanantOverdraw">
        <el-input-number v-model="tenantInfo.teanantOverdraw" :min="0" :precision="2" placeholder="透支额度"></el-input-number>
      </el-form-item>      
      <el-form-item label="省：" prop="tenantProvince">
        <el-input v-model="tenantInfo.tenantProvince"></el-input>
      </el-form-item>
      <el-form-item label="市：" prop="tenantCity">
        <el-input v-model="tenantInfo.tenantCity"></el-input>
      </el-form-item>
      <el-form-item label="区/县：" prop="tenantCountyTown">
        <el-input v-model="tenantInfo.tenantCountyTown"></el-input>
      </el-form-item>
      <el-form-item label="联系地址：" prop="tenantLinkAddress">
        <el-input v-model="tenantInfo.tenantLinkAddress"></el-input>
      </el-form-item>
      <el-form-item label="联系人：" prop="tenantLinkman">
        <el-input v-model="tenantInfo.tenantLinkman"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：" prop="tenantLinkmanMobile">
        <el-input v-model="tenantInfo.tenantLinkmanMobile"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="tenantLinkmanEmail">
        <el-input v-model="tenantInfo.tenantLinkmanEmail"></el-input>
      </el-form-item>
      <el-form-item label="QQ号码：" prop="tenantLinkmanQq">
        <el-input v-model="tenantInfo.tenantLinkmanQq"></el-input>
      </el-form-item>
      
      <el-form-item label="注册时间：" prop="tenantRegisterTime"  v-if="isEdit">
        <el-date-picker
                class="input-width"
                v-model="tenantInfo.tenantRegisterTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择注册时间">
        </el-date-picker>
      </el-form-item>
       <el-form-item label="开票地址：" prop="invoiceAddress">
        <el-input v-model="tenantInfo.invoiceAddress"></el-input>
      </el-form-item>
      <el-form-item label="开票名称：" prop="invoiceName">
        <el-input v-model="tenantInfo.invoiceName"></el-input>
      </el-form-item>
      <el-form-item label="税号：" prop="invoiceTaxNo">
        <el-input v-model="tenantInfo.invoiceTaxNo"></el-input>
      </el-form-item>
      <el-form-item label="开户行行号：" prop="invoiceBankCode">
        <el-input v-model="tenantInfo.invoiceBankCode"></el-input>
      </el-form-item>
      <el-form-item label="开户行名称：" prop="invoiceBankName">
        <el-input v-model="tenantInfo.invoiceBankName"></el-input>
      </el-form-item>
      <el-form-item label="开户账号：" prop="invoiceBankAccountNo">
        <el-input v-model="tenantInfo.invoiceBankAccountNo"></el-input>
      </el-form-item>
      <el-form-item label="开票电话：" prop="invoiceTel">
        <el-input v-model="tenantInfo.invoiceTel"></el-input>
      </el-form-item>
      <el-form-item label="开票类别：" prop="invoiceType">
        <el-select
          v-model="tenantInfo.invoiceType"
          clearable
          placeholder="请选择开票类别">
          <el-option
            v-for="item in invoiceTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门结构：" prop="departmentStructure">
        <el-select
          v-model="tenantInfo.departmentStructure"
          clearable
          placeholder="请选择部门结构">
          <el-option
            v-for="item in departmentStructureOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶梯水价：" prop="priceStepOn">
        <el-select
          v-model="tenantInfo.priceStepOn"
          clearable
          placeholder="请选择阶梯水价">
          <el-option
            v-for="item in priceStepOnOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantInfoFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantInfoFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantInfo, getTenantInfo, updateTenantInfo} from '@/api/tenantInfo'
  import {formatDate} from '@/utils/date';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantInfo={
    tenantName: '',
    tenantBalance: null,
    teanantOverdraw: null,
    tenantDisplayName: '',
    tenantProvince: '',
    tenantCity: '',
    tenantCountyTown: '',
    tenantLinkAddress: '',
    tenantLinkman: '',
    tenantLinkmanMobile: '',
    tenantLinkmanTel: '',
    tenantLinkmanEmail: '',
    tenantLinkmanQq: '',
    tenantType: '',
    tenantRegisterTime: '',
    invoiceType: '',
    invoiceName: '',
    invoiceTaxNo: '',
    invoiceAddress: '',
    invoiceTel: '',
    invoiceBankCode: '',
    invoiceBankName: '',
    invoiceBankAccountNo: '',
    tenantAccesskey: '',
    departmentStructure: null,
    priceStepOnOptions: null
  };
  const defaultTenantTypeOptions=[
    {
      value: 1,
      label: '使用单位'
    },
    {
      value: 2,
      label: '水表厂商'
    },
    {
      value: 3,
      label: '代收机构'
    },
    {
      value: 4,
      label: '内部运营'
    },
    {
      value: 5,
      label: '分销商'
    }
  ];
  const defaultInvoiceTypeOptions=[
    {
      value: 1,
      label: '普通纸制发票'
    },
    {
      value: 2,
      label: '普通电子发票'
    },
    {
      value: 3,
      label: '专用纸制发票'
    }
  ];
  const defaultDepartmentStructureOptions=[
    {
      value: 1,
      label: '扁平型结构'
    }
  ];
  const defaultPriceStepOnOptions=[
    {
      value: 1,
      label: '是'
    },
    {
      value: 0,
      label: '否'
    }
  ];
  export default {
    name: 'TenantInfoDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantInfo:Object.assign({}, defaultTenantInfo),
        tenantTypeOptions: Object.assign({},defaultTenantTypeOptions),
        invoiceTypeOptions: Object.assign({},defaultInvoiceTypeOptions),
        departmentStructureOptions: Object.assign({},defaultDepartmentStructureOptions),
        priceStepOnOptions: Object.assign({},defaultPriceStepOnOptions),
        rules: {
          tenantName: [
            {required: true, message: '请输入租户名称', trigger: 'blur'}
          ],
          teanantOverdraw: [
            {required: true, message: '请输入透支额度', trigger: 'blur'}
          ],
          tenantDisplayName: [
            {required: true, message: '请输入租户显示名称', trigger: 'blur'}
          ],
          tenantLinkman: [
            {required: true, message: '请输入联系人', trigger: 'blur'}
          ],
          tenantLinkmanMobile: [
            {required: true, message: '请输入手机号码', trigger: 'blur'}
          ],
          tenantLinkmanEmail: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
          tenantType: [
            {required: true, message: '请选择租户类型', trigger: 'blur'}
          ],
          tenantRegisterTime: [
            {required: true, message: '请输入注册时间', trigger: 'blur'}
          ],
          departmentStructure: [
            {required: true, message: '请选择部门结构', trigger: 'blur'}
          ],
          priceStepOn: [
            {required: true, message: '请选择阶梯水价', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantInfo(this.$route.query.id).then(response => {
	          let data = response.data;
	          data.tenantRegisterTime = formatDate(new Date(data.tenantRegisterTime), 'yyyy-MM-dd hh:mm:ss');
	          this.tenantInfo = data;
	          //this.tenantInfo = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantInfoByTenantId(this.$route.query.tenantId).then(response => {
	          let data = response.data;
	          data.tenantRegisterTime = formatDate(new Date(data.tenantRegisterTime), 'yyyy-MM-dd hh:mm:ss');
	          this.tenantInfo = data;
	          //this.tenantInfo = response.data;
        	});
        }
        
      }else{
        this.tenantInfo = Object.assign({},defaultTenantInfo);
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateTenantInfo(this.$route.query.id, this.tenantInfo).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantInfo(this.tenantInfo).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantInfo = Object.assign({},defaultTenantInfo);
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
        this.tenantInfo = Object.assign({},defaultTenantInfo);
      }
    }
  }
</script>
<style>
</style>


