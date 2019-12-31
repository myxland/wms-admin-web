<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantConsumptionBill" :rules="rules" ref="tenantConsumptionBillFrom" label-width="150px">
      <el-form-item label="租户ID：" prop="tenantId">
        <el-select v-model="tenantConsumptionBill.tenantId" placeholder="请选择租户ID" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账单时间：" prop="consumptionBillTime">
        <el-date-picker
                class="input-width"
                v-model="tenantConsumptionBill.consumptionBillTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择账单时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="账单金额：" prop="consumptionBillMoney">
        <el-input-number v-model="tenantConsumptionBill.consumptionBillMoney" :min="0" :precision="2" placeholder="账单金额"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantConsumptionBillFrom')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantConsumptionBill, createTenantConsumptionBillByTenantConsume, getTenantConsumptionBill, updateTenantConsumptionBill} from '@/api/tenantConsumptionBill'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantConsumptionBill={
    tenantId: '',
    consumptionBillType: '',
    consumptionBillTime: '',
    consumptionBillName: '',
    consumptionBillMoney: null,
    tenantBalance: null,
    consumptionBillRemark: ''
  };
  const defaultConsumptionBillTypeOptions=[
    {
      value: 1,
      label: '充值'
    },
    {
      value: 2,
      label: '消费'
    }
  ];
  export default {
    name: 'TenantConsumptionBillDetailByTenantConsume',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantConsumptionBill:Object.assign({}, defaultTenantConsumptionBill, this.$route.query),
        tenantInfoOptions:[],
        consumptionBillTypeOptions: Object.assign({},defaultConsumptionBillTypeOptions),
        rules: {
          tenantId: [
            {required: true, message: '请输入租户ID', trigger: 'blur'}
          ],
          consumptionBillTime: [
            {required: true, message: '请输入账单时间', trigger: 'blur'}
          ],
          consumptionBillMoney: [
            {required: true, message: '请输入账单金额', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantConsumptionBill(this.$route.query.id).then(response => {
	          let data = response.data;
	          data.consumptionBillTime = formatDate(new Date(data.consumptionBillTime), 'yyyy-MM-dd hh:mm:ss');
	          this.tenantConsumptionBill = data;
	          //this.tenantConsumptionBill = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantConsumptionBillByTenantId(this.$route.query.tenantId).then(response => {
	          let data = response.data;
	          data.consumptionBillTime = formatDate(new Date(data.consumptionBillTime), 'yyyy-MM-dd hh:mm:ss');
	          this.tenantConsumptionBill = data;
	          //this.tenantConsumptionBill = response.data;
        	});
        }
        
      }else{
        this.tenantConsumptionBill = Object.assign({},defaultTenantConsumptionBill,this.$route.query);
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
                updateTenantConsumptionBill(this.$route.query.id, this.tenantConsumptionBill).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantConsumptionBillByTenantConsume(this.tenantConsumptionBill).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantConsumptionBill = Object.assign({},defaultTenantConsumptionBill);
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
        this.tenantConsumptionBill = Object.assign({},defaultTenantConsumptionBill);
      }
    }
  }
</script>
<style>
</style>


