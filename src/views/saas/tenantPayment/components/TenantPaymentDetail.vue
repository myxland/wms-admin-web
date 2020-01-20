<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantPayment" :rules="rules" ref="tenantPaymentFrom" label-width="150px">
      <el-form-item label="实收账ID：" prop="id">
        <el-input v-model="tenantPayment.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        <el-select v-model="tenantPayment.tenantId" placeholder="请选择租户ID" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内部生成的订单号：" prop="outTransno">
        <el-input v-model="tenantPayment.outTransno"></el-input>
      </el-form-item>
      <el-form-item label="外部如微信支付宝传入的订单号：" prop="inTransno">
        <el-input v-model="tenantPayment.inTransno"></el-input>
      </el-form-item>
      <el-form-item label="付款时间：" prop="payTime">
        <el-date-picker
                class="input-width"
                v-model="tenantPayment.payTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择付款时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="实收账状态：" prop="paymentStatus">
        <el-select
          v-model="tenantPayment.paymentStatus"
          clearable
          placeholder="请选择实收账状态">
          <el-option
            v-for="item in paymentStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户ID：" prop="customerId">
        <el-input v-model="tenantPayment.customerId"></el-input>
      </el-form-item>
      <el-form-item label="收款部门ID：" prop="chargeDepartmentId">
        <el-input v-model="tenantPayment.chargeDepartmentId"></el-input>
      </el-form-item>
      <el-form-item label="收费员ID：" prop="chargeEmployeeId">
        <el-input v-model="tenantPayment.chargeEmployeeId"></el-input>
      </el-form-item>
      <el-form-item label="付款途径：" prop="payChannels">
        <el-select
          v-model="tenantPayment.payChannels"
          clearable
          placeholder="请选择付款途径">
          <el-option
            v-for="item in payChannelsOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="付款方式：" prop="payMethod">
        <el-select
          v-model="tenantPayment.payMethod"
          clearable
          placeholder="请选择付款方式">
          <el-option
            v-for="item in payMethodOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户上期预存余额：" prop="customerBalanceMoneyBefore">
        <el-input-number v-model="tenantPayment.customerBalanceMoneyBefore" :min="0" :precision="2" placeholder="用户上期预存余额"></el-input-number>
      </el-form-item>
      <el-form-item label="用户付款金额：" prop="customerPayMoney">
        <el-input-number v-model="tenantPayment.customerPayMoney" :min="0" :precision="2" placeholder="用户付款金额"></el-input-number>
      </el-form-item>
      <el-form-item label="用户预存发生值：" prop="customerBalanceMoneyHappen">
        <el-input-number v-model="tenantPayment.customerBalanceMoneyHappen" :min="0" :precision="2" placeholder="用户预存发生值"></el-input-number>
      </el-form-item>
      <el-form-item label="所缴欠费金额：" prop="payTheArrearsMoney">
        <el-input-number v-model="tenantPayment.payTheArrearsMoney" :min="0" :precision="2" placeholder="所缴欠费金额"></el-input-number>
      </el-form-item>
      <el-form-item label="所缴违约金金额：" prop="payTheLateFeeMoney">
        <el-input-number v-model="tenantPayment.payTheLateFeeMoney" :min="0" :precision="2" placeholder="所缴违约金金额"></el-input-number>
      </el-form-item>
      <el-form-item label="用户本期预存余额：" prop="customerBalanceMoneyAfter">
        <el-input-number v-model="tenantPayment.customerBalanceMoneyAfter" :min="0" :precision="2" placeholder="用户本期预存余额"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantPaymentFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantPaymentFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantPayment, getTenantPayment, updateTenantPayment} from '@/api/tenantPayment'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantPayment={
    tenantId: '',
    outTransno: '',
    inTransno: '',
    payTime: '',
    paymentStatus: '',
    customerId: '',
    chargeDepartmentId: '',
    chargeEmployeeId: '',
    payChannels: '',
    payMethod: '',
    customerBalanceMoneyBefore: null,
    customerPayMoney: null,
    customerBalanceMoneyHappen: null,
    payTheArrearsMoney: null,
    payTheLateFeeMoney: null,
    customerBalanceMoneyAfter: null
  };
  const defaultPaymentStatusOptions=[
    {
      value: 1,
      label: '正常'
    },
    {
      value: 2,
      label: '被退款'
    },
    {
      value: 3,
      label: '退款记录'
    }
  ];
  const defaultPayChannelsOptions=[
    {
      value: 1,
      label: '柜台'
    },
    {
      value: 2,
      label: '银行'
    },
    {
      value: 3,
      label: '线上'
    },
    {
      value: 4,
      label: '走收'
    },
    {
      value: 5,
      label: '系统处理'
    }
  ];
  const defaultPayMethodOptions=[
    {
      value: 0,
      label: '预存抵扣'
    },
    {
      value: 1,
      label: '现金'
    },
    {
      value: 2,
      label: '支票'
    },
    {
      value: 3,
      label: '刷卡'
    },
    {
      value: 4,
      label: '电汇'
    },
    {
      value: 5,
      label: '代扣'
    },
    {
      value: 6,
      label: '托收'
    },
    {
      value: 7,
      label: '微信生活缴费'
    },
    {
      value: 8,
      label: '支付宝生活缴费'
    },
    {
      value: 9,
      label: '微信公众号'
    },
    {
      value: 10,
      label: '微信扫码[用户被扫]'
    },
    {
      value: 11,
      label: '支付宝扫码[用户被扫]'
    },
    {
      value: 12,
      label: '微信扫码[用户主扫]'
    },
    {
      value: 13,
      label: '支付宝扫码[用户主扫]'
    }
  ];
  export default {
    name: 'TenantPaymentDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantPayment:Object.assign({}, defaultTenantPayment, this.$route.query),
        tenantInfoOptions:[],
        paymentStatusOptions: Object.assign({},defaultPaymentStatusOptions),
        payChannelsOptions: Object.assign({},defaultPayChannelsOptions),
        payMethodOptions: Object.assign({},defaultPayMethodOptions),
        rules: {
          tenantId: [
            {required: true, message: '请输入租户ID', trigger: 'blur'}
          ],
          payTime: [
            {required: true, message: '请输入付款时间', trigger: 'blur'}
          ],
          paymentStatus: [
            {required: true, message: '请选择实收账状态', trigger: 'blur'}
          ],
          customerId: [
            {required: true, message: '请输入用户ID', trigger: 'blur'}
          ],
          payChannels: [
            {required: true, message: '请选择付款途径', trigger: 'blur'}
          ],
          payMethod: [
            {required: true, message: '请选择付款方式', trigger: 'blur'}
          ],
          customerBalanceMoneyBefore: [
            {required: true, message: '请输入用户上期预存余额', trigger: 'blur'}
          ],
          customerBalanceMoneyHappen: [
            {required: true, message: '请输入用户预存发生值', trigger: 'blur'}
          ],
          customerBalanceMoneyAfter: [
            {required: true, message: '请输入用户本期预存余额', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantPayment(this.$route.query.id).then(response => {
	          let data = response.data;
	          data.payTime = formatDate(new Date(data.payTime), 'yyyy-MM-dd hh:mm:ss');
	          this.tenantPayment = data;
	          //this.tenantPayment = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantPaymentByTenantId(this.$route.query.tenantId).then(response => {
	          let data = response.data;
	          data.payTime = formatDate(new Date(data.payTime), 'yyyy-MM-dd hh:mm:ss');
	          this.tenantPayment = data;
	          //this.tenantPayment = response.data;
        	});
        }
        
      }else{
        this.tenantPayment = Object.assign({},defaultTenantPayment,this.$route.query);
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
                updateTenantPayment(this.$route.query.id, this.tenantPayment).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantPayment(this.tenantPayment).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantPayment = Object.assign({},defaultTenantPayment);
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
        this.tenantPayment = Object.assign({},defaultTenantPayment);
      }
    }
  }
</script>
<style>
</style>


