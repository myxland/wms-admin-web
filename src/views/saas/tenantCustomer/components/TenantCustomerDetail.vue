<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantCustomer" :rules="rules" ref="tenantCustomerFrom" label-width="150px">
      <el-form-item label="客户ID：" prop="id">
        <el-input v-model="tenantCustomer.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        <el-select v-model="tenantCustomer.tenantId" placeholder="请选择租户ID" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户代码：" prop="customerCode">
        <el-input v-model="tenantCustomer.customerCode"></el-input>
      </el-form-item>
      <el-form-item label="用户名称：" prop="customerName">
        <el-input v-model="tenantCustomer.customerName"></el-input>
      </el-form-item>
      <el-form-item label="用户地址：" prop="customerAddress">
        <el-input v-model="tenantCustomer.customerAddress"></el-input>
      </el-form-item>
      <el-form-item label="用户类别ID：" prop="customerTypeId">
        <el-input v-model="tenantCustomer.customerTypeId"></el-input>
      </el-form-item>
      <el-form-item label="建档时间：" prop="customerRegisterTime">
        <el-date-picker
                class="input-width"
                v-model="tenantCustomer.customerRegisterTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择建档时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="用户状态：" prop="customerStatus">
        <el-select
          v-model="tenantCustomer.customerStatus"
          clearable
          placeholder="请选择用户状态">
          <el-option
            v-for="item in customerStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户缴费方式：" prop="customerPaymentMethod">
        <el-select
          v-model="tenantCustomer.customerPaymentMethod"
          clearable
          placeholder="请选择用户缴费方式">
          <el-option
            v-for="item in customerPaymentMethodOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开票类别：" prop="invoiceType">
        <el-select
          v-model="tenantCustomer.invoiceType"
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
      <el-form-item label="开票名称：" prop="invoiceName">
        <el-input v-model="tenantCustomer.invoiceName"></el-input>
      </el-form-item>
      <el-form-item label="税号：" prop="invoiceTaxNo">
        <el-input v-model="tenantCustomer.invoiceTaxNo"></el-input>
      </el-form-item>
      <el-form-item label="开票地址：" prop="invoiceAddress">
        <el-input v-model="tenantCustomer.invoiceAddress"></el-input>
      </el-form-item>
      <el-form-item label="开票电话：" prop="invoiceTel">
        <el-input v-model="tenantCustomer.invoiceTel"></el-input>
      </el-form-item>
      <el-form-item label="开户行行号：" prop="invoiceBankCode">
        <el-input v-model="tenantCustomer.invoiceBankCode"></el-input>
      </el-form-item>
      <el-form-item label="开户行名称：" prop="invoiceBankName">
        <el-input v-model="tenantCustomer.invoiceBankName"></el-input>
      </el-form-item>
      <el-form-item label="开户行账号：" prop="invoiceBankAccountNo">
        <el-input v-model="tenantCustomer.invoiceBankAccountNo"></el-input>
      </el-form-item>
      <el-form-item label="用户预存余额：" prop="customerBalanceMoney">
        <el-input-number v-model="tenantCustomer.customerBalanceMoney" :min="0" :precision="2" placeholder="用户预存余额"></el-input-number>
      </el-form-item>
      <el-form-item label="用户欠费金额：" prop="customerArrearsMoney">
        <el-input-number v-model="tenantCustomer.customerArrearsMoney" :min="0" :precision="2" placeholder="用户欠费金额"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantCustomerFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantCustomerFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantCustomer, getTenantCustomer, updateTenantCustomer} from '@/api/tenantCustomer'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantCustomer={
    tenantId: '',
    customerCode: '',
    customerName: '',
    customerAddress: '',
    customerTypeId: '',
    customerRegisterTime: '',
    customerStatus: '',
    customerPaymentMethod: '',
    invoiceType: '',
    invoiceName: '',
    invoiceTaxNo: '',
    invoiceAddress: '',
    invoiceTel: '',
    invoiceBankCode: '',
    invoiceBankName: '',
    invoiceBankAccountNo: '',
    customerBalanceMoney: null,
    customerArrearsMoney: null
  };
  const defaultCustomerStatusOptions=[
    {
      value: 1,
      label: '正常'
    },
    {
      value: 2,
      label: '暂停'
    },
    {
      value: 3,
      label: '消户'
    }
  ];
  const defaultCustomerPaymentMethodOptions=[
    {
      value: 1,
      label: '坐收'
    },
    {
      value: 2,
      label: '走收'
    },
    {
      value: 3,
      label: '代扣'
    },
    {
      value: 4,
      label: '托收'
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
  export default {
    name: 'TenantCustomerDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantCustomer:Object.assign({}, defaultTenantCustomer, this.$route.query),
        tenantInfoOptions:[],
        customerStatusOptions: Object.assign({},defaultCustomerStatusOptions),
        customerPaymentMethodOptions: Object.assign({},defaultCustomerPaymentMethodOptions),
        invoiceTypeOptions: Object.assign({},defaultInvoiceTypeOptions),
        rules: {
          tenantId: [
            {required: true, message: '请输入租户ID', trigger: 'blur'}
          ],
          customerCode: [
            {required: true, message: '请输入用户代码', trigger: 'blur'}
          ],
          customerName: [
            {required: true, message: '请输入用户名称', trigger: 'blur'}
          ],
          customerAddress: [
            {required: true, message: '请输入用户地址', trigger: 'blur'}
          ],
          customerRegisterTime: [
            {required: true, message: '请输入建档时间', trigger: 'blur'}
          ],
          customerStatus: [
            {required: true, message: '请选择用户状态', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantCustomer(this.$route.query.id).then(response => {
	          let data = response.data;
	          data.customerRegisterTime = formatDate(new Date(data.customerRegisterTime), 'yyyy-MM-dd hh:mm:ss');
	          this.tenantCustomer = data;
	          //this.tenantCustomer = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantCustomerByTenantId(this.$route.query.tenantId).then(response => {
	          let data = response.data;
	          data.customerRegisterTime = formatDate(new Date(data.customerRegisterTime), 'yyyy-MM-dd hh:mm:ss');
	          this.tenantCustomer = data;
	          //this.tenantCustomer = response.data;
        	});
        }
        
      }else{
        this.tenantCustomer = Object.assign({},defaultTenantCustomer,this.$route.query);
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
                updateTenantCustomer(this.$route.query.id, this.tenantCustomer).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantCustomer(this.tenantCustomer).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantCustomer = Object.assign({},defaultTenantCustomer);
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
        this.tenantCustomer = Object.assign({},defaultTenantCustomer);
      }
    }
  }
</script>
<style>
</style>


