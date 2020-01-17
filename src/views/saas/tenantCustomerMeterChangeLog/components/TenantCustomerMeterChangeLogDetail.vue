<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantCustomerMeterChangeLog" :rules="rules" ref="tenantCustomerMeterChangeLogFrom" label-width="150px">
      <el-form-item label="变更日志ID：" prop="id">
        <el-input v-model="tenantCustomerMeterChangeLog.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        <el-select v-model="tenantCustomerMeterChangeLog.tenantId" placeholder="请选择租户ID" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户ID：" prop="customerId">
        <el-input v-model="tenantCustomerMeterChangeLog.customerId"></el-input>
      </el-form-item>
      <el-form-item label="新用户ID：" prop="csutomerIdNew">
        <el-input v-model="tenantCustomerMeterChangeLog.csutomerIdNew"></el-input>
      </el-form-item>
      <el-form-item label="用户名称：" prop="customerName">
        <el-input v-model="tenantCustomerMeterChangeLog.customerName"></el-input>
      </el-form-item>
      <el-form-item label="新用户名称：" prop="customerNameNew">
        <el-input v-model="tenantCustomerMeterChangeLog.customerNameNew"></el-input>
      </el-form-item>
      <el-form-item label="用户地址：" prop="customerAddress">
        <el-input v-model="tenantCustomerMeterChangeLog.customerAddress"></el-input>
      </el-form-item>
      <el-form-item label="新用户地址：" prop="customerAddressNew">
        <el-input v-model="tenantCustomerMeterChangeLog.customerAddressNew"></el-input>
      </el-form-item>
      <el-form-item label="用户类别ID：" prop="customerTypeId">
        <el-input v-model="tenantCustomerMeterChangeLog.customerTypeId"></el-input>
      </el-form-item>
      <el-form-item label="新用户类别ID：" prop="customerTypeIdNew">
        <el-input v-model="tenantCustomerMeterChangeLog.customerTypeIdNew"></el-input>
      </el-form-item>
      <el-form-item label="用户状态：" prop="customerStatus">
        <el-select
          v-model="tenantCustomerMeterChangeLog.customerStatus"
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
      <el-form-item label="新用户状态：" prop="customerStatusNew">
        <el-select
          v-model="tenantCustomerMeterChangeLog.customerStatusNew"
          clearable
          placeholder="请选择新用户状态">
          <el-option
            v-for="item in customerStatusNewOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收费方式：" prop="customerPaymentMethod">
        <el-select
          v-model="tenantCustomerMeterChangeLog.customerPaymentMethod"
          clearable
          placeholder="请选择收费方式">
          <el-option
            v-for="item in customerPaymentMethodOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新收费方式：" prop="customerPaymentMethodNew">
        <el-select
          v-model="tenantCustomerMeterChangeLog.customerPaymentMethodNew"
          clearable
          placeholder="请选择新收费方式">
          <el-option
            v-for="item in customerPaymentMethodNewOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开票类别：" prop="invoiceType">
        <el-select
          v-model="tenantCustomerMeterChangeLog.invoiceType"
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
      <el-form-item label="新开票类别：" prop="invoiceTypeNew">
        <el-select
          v-model="tenantCustomerMeterChangeLog.invoiceTypeNew"
          clearable
          placeholder="请选择新开票类别">
          <el-option
            v-for="item in invoiceTypeNewOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开票名称：" prop="invoiceName">
        <el-input v-model="tenantCustomerMeterChangeLog.invoiceName"></el-input>
      </el-form-item>
      <el-form-item label="新开票名称：" prop="invoiceNameNew">
        <el-input v-model="tenantCustomerMeterChangeLog.invoiceNameNew"></el-input>
      </el-form-item>
      <el-form-item label="税号：" prop="invoiceTaxNo">
        <el-input v-model="tenantCustomerMeterChangeLog.invoiceTaxNo"></el-input>
      </el-form-item>
      <el-form-item label="新税号：" prop="invoiceTaxNoNew">
        <el-input v-model="tenantCustomerMeterChangeLog.invoiceTaxNoNew"></el-input>
      </el-form-item>
      <el-form-item label="开票地址：" prop="invoiceAddress">
        <el-input v-model="tenantCustomerMeterChangeLog.invoiceAddress"></el-input>
      </el-form-item>
      <el-form-item label="新开票地址：" prop="invoiceAddressNew">
        <el-input v-model="tenantCustomerMeterChangeLog.invoiceAddressNew"></el-input>
      </el-form-item>
      <el-form-item label="开票电话：" prop="invoiceTel">
        <el-input v-model="tenantCustomerMeterChangeLog.invoiceTel"></el-input>
      </el-form-item>
      <el-form-item label="新开票电话：" prop="invoiceTelNew">
        <el-input v-model="tenantCustomerMeterChangeLog.invoiceTelNew"></el-input>
      </el-form-item>
      <el-form-item label="开户行行号：" prop="invoiceBankCode">
        <el-input v-model="tenantCustomerMeterChangeLog.invoiceBankCode"></el-input>
      </el-form-item>
      <el-form-item label="新开户行行号：" prop="invoiceBankCodeNew">
        <el-input v-model="tenantCustomerMeterChangeLog.invoiceBankCodeNew"></el-input>
      </el-form-item>
      <el-form-item label="开户行名称：" prop="invoiceBankName">
        <el-input v-model="tenantCustomerMeterChangeLog.invoiceBankName"></el-input>
      </el-form-item>
      <el-form-item label="新开户行名称：" prop="invoiceBankNameNew">
        <el-input v-model="tenantCustomerMeterChangeLog.invoiceBankNameNew"></el-input>
      </el-form-item>
      <el-form-item label="开户行账号：" prop="invoiceBankAccountNo">
        <el-input v-model="tenantCustomerMeterChangeLog.invoiceBankAccountNo"></el-input>
      </el-form-item>
      <el-form-item label="新开户行账号：" prop="invoiceBankAccountNoNew">
        <el-input v-model="tenantCustomerMeterChangeLog.invoiceBankAccountNoNew"></el-input>
      </el-form-item>
      <el-form-item label="水表ID：" prop="meterId">
        <el-input v-model="tenantCustomerMeterChangeLog.meterId"></el-input>
      </el-form-item>
      <el-form-item label="价格分类ID：" prop="priceTypeId">
        <el-input v-model="tenantCustomerMeterChangeLog.priceTypeId"></el-input>
      </el-form-item>
      <el-form-item label="新价格分类ID：" prop="priceTypeIdNew">
        <el-input v-model="tenantCustomerMeterChangeLog.priceTypeIdNew"></el-input>
      </el-form-item>
      <el-form-item label="水表止码：" prop="meterLastSettlePointer">
        <el-input-number v-model="tenantCustomerMeterChangeLog.meterLastSettlePointer" :min="0" :precision="2" placeholder="水表止码"></el-input-number>
      </el-form-item>
      <el-form-item label="新水表止码：" prop="meterLastSettlePointerNew">
        <el-input-number v-model="tenantCustomerMeterChangeLog.meterLastSettlePointerNew" :min="0" :precision="2" placeholder="新水表止码"></el-input-number>
      </el-form-item>
      <el-form-item label="水表厂商ID：" prop="manufactorId">
        <el-input v-model="tenantCustomerMeterChangeLog.manufactorId"></el-input>
      </el-form-item>
      <el-form-item label="新水表厂商ID：" prop="manufactorIdNew">
        <el-input v-model="tenantCustomerMeterChangeLog.manufactorIdNew"></el-input>
      </el-form-item>
      <el-form-item label="水表类型：" prop="meterType">
        <el-select
          v-model="tenantCustomerMeterChangeLog.meterType"
          clearable
          placeholder="请选择水表类型">
          <el-option
            v-for="item in meterTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新水表类型：" prop="meterTypeNew">
        <el-select
          v-model="tenantCustomerMeterChangeLog.meterTypeNew"
          clearable
          placeholder="请选择新水表类型">
          <el-option
            v-for="item in meterTypeNewOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="水表口径ID：" prop="caliberId">
        <el-input v-model="tenantCustomerMeterChangeLog.caliberId"></el-input>
      </el-form-item>
      <el-form-item label="新水表口径ID：" prop="caliberIdNew">
        <el-input v-model="tenantCustomerMeterChangeLog.caliberIdNew"></el-input>
      </el-form-item>
      <el-form-item label="水表表身码：" prop="meterMachineCode">
        <el-input v-model="tenantCustomerMeterChangeLog.meterMachineCode"></el-input>
      </el-form-item>
      <el-form-item label="新水表表身码：" prop="meterMachineCodeNew">
        <el-input v-model="tenantCustomerMeterChangeLog.meterMachineCodeNew"></el-input>
      </el-form-item>
      <el-form-item label="远传系统编号：" prop="meterIotCode">
        <el-input v-model="tenantCustomerMeterChangeLog.meterIotCode"></el-input>
      </el-form-item>
      <el-form-item label="新远传系统编号：" prop="meterIotCodeNew">
        <el-input v-model="tenantCustomerMeterChangeLog.meterIotCodeNew"></el-input>
      </el-form-item>
      <el-form-item label="人口数：" prop="meterPeoples">
        <el-input-number v-model="tenantCustomerMeterChangeLog.meterPeoples" :min="0" placeholder="人口数"></el-input-number>
      </el-form-item>
      <el-form-item label="新人口数：" prop="meterPeoplesNew">
        <el-input-number v-model="tenantCustomerMeterChangeLog.meterPeoplesNew" :min="0" placeholder="新人口数"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantCustomerMeterChangeLogFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantCustomerMeterChangeLogFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantCustomerMeterChangeLog, getTenantCustomerMeterChangeLog, updateTenantCustomerMeterChangeLog} from '@/api/tenantCustomerMeterChangeLog'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantCustomerMeterChangeLog={
    tenantId: '',
    customerId: '',
    csutomerIdNew: '',
    customerName: '',
    customerNameNew: '',
    customerAddress: '',
    customerAddressNew: '',
    customerTypeId: '',
    customerTypeIdNew: '',
    customerStatus: '',
    customerStatusNew: '',
    customerPaymentMethod: '',
    customerPaymentMethodNew: '',
    invoiceType: '',
    invoiceTypeNew: '',
    invoiceName: '',
    invoiceNameNew: '',
    invoiceTaxNo: '',
    invoiceTaxNoNew: '',
    invoiceAddress: '',
    invoiceAddressNew: '',
    invoiceTel: '',
    invoiceTelNew: '',
    invoiceBankCode: '',
    invoiceBankCodeNew: '',
    invoiceBankName: '',
    invoiceBankNameNew: '',
    invoiceBankAccountNo: '',
    invoiceBankAccountNoNew: '',
    meterId: '',
    priceTypeId: '',
    priceTypeIdNew: '',
    meterLastSettlePointer: null,
    meterLastSettlePointerNew: null,
    manufactorId: '',
    manufactorIdNew: '',
    meterType: '',
    meterTypeNew: '',
    caliberId: '',
    caliberIdNew: '',
    meterMachineCode: '',
    meterMachineCodeNew: '',
    meterIotCode: '',
    meterIotCodeNew: '',
    meterPeoples: 0,
    meterPeoplesNew: 0
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
  const defaultCustomerStatusNewOptions=[
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
  const defaultCustomerPaymentMethodNewOptions=[
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
  const defaultInvoiceTypeNewOptions=[
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
  const defaultMeterTypeOptions=[
    {
      value: 1,
      label: '机械表'
    },
    {
      value: 2,
      label: '远传表'
    },
    {
      value: 3,
      label: 'IC卡表'
    }
  ];
  const defaultMeterTypeNewOptions=[
    {
      value: 1,
      label: '机械表'
    },
    {
      value: 2,
      label: '远传表'
    },
    {
      value: 3,
      label: 'IC卡表'
    }
  ];
  export default {
    name: 'TenantCustomerMeterChangeLogDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantCustomerMeterChangeLog:Object.assign({}, defaultTenantCustomerMeterChangeLog, this.$route.query),
        tenantInfoOptions:[],
        customerStatusOptions: Object.assign({},defaultCustomerStatusOptions),
        customerStatusNewOptions: Object.assign({},defaultCustomerStatusNewOptions),
        customerPaymentMethodOptions: Object.assign({},defaultCustomerPaymentMethodOptions),
        customerPaymentMethodNewOptions: Object.assign({},defaultCustomerPaymentMethodNewOptions),
        invoiceTypeOptions: Object.assign({},defaultInvoiceTypeOptions),
        invoiceTypeNewOptions: Object.assign({},defaultInvoiceTypeNewOptions),
        meterTypeOptions: Object.assign({},defaultMeterTypeOptions),
        meterTypeNewOptions: Object.assign({},defaultMeterTypeNewOptions),
        rules: {
          tenantId: [
            {required: true, message: '请输入租户ID', trigger: 'blur'}
          ],
          customerId: [
            {required: true, message: '请输入用户ID', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantCustomerMeterChangeLog(this.$route.query.id).then(response => {
	          this.tenantCustomerMeterChangeLog = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantCustomerMeterChangeLogByTenantId(this.$route.query.tenantId).then(response => {
	          this.tenantCustomerMeterChangeLog = response.data;
        	});
        }
        
      }else{
        this.tenantCustomerMeterChangeLog = Object.assign({},defaultTenantCustomerMeterChangeLog,this.$route.query);
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
                updateTenantCustomerMeterChangeLog(this.$route.query.id, this.tenantCustomerMeterChangeLog).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantCustomerMeterChangeLog(this.tenantCustomerMeterChangeLog).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantCustomerMeterChangeLog = Object.assign({},defaultTenantCustomerMeterChangeLog);
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
        this.tenantCustomerMeterChangeLog = Object.assign({},defaultTenantCustomerMeterChangeLog);
      }
    }
  }
</script>
<style>
</style>


