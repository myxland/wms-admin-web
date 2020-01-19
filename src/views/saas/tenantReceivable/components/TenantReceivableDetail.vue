<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantReceivable" :rules="rules" ref="tenantReceivableFrom" label-width="150px">
      <el-form-item label="应收账ID：" prop="id">
        <el-input v-model="tenantReceivable.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        <el-select v-model="tenantReceivable.tenantId" placeholder="请选择租户ID" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="应收账状态：" prop="receivableStatus">
        <el-select
          v-model="tenantReceivable.receivableStatus"
          clearable
          placeholder="请选择应收账状态">
          <el-option
            v-for="item in receivableStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="应收类型：" prop="receivableType">
        <el-select
          v-model="tenantReceivable.receivableType"
          clearable
          placeholder="请选择应收类型">
          <el-option
            v-for="item in receivableTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门ID：" prop="departmentId">
        <el-input v-model="tenantReceivable.departmentId"></el-input>
      </el-form-item>
      <el-form-item label="表册ID：" prop="bookletId">
        <el-input v-model="tenantReceivable.bookletId"></el-input>
      </el-form-item>
      <el-form-item label="表册代码：" prop="bookletCode">
        <el-input v-model="tenantReceivable.bookletCode"></el-input>
      </el-form-item>
      <el-form-item label="用户ID：" prop="customerId">
        <el-input v-model="tenantReceivable.customerId"></el-input>
      </el-form-item>
      <el-form-item label="用户代码：" prop="customerCode">
        <el-input v-model="tenantReceivable.customerCode"></el-input>
      </el-form-item>
      <el-form-item label="用户名称：" prop="customerName">
        <el-input v-model="tenantReceivable.customerName"></el-input>
      </el-form-item>
      <el-form-item label="用户地址：" prop="customerAddress">
        <el-input v-model="tenantReceivable.customerAddress"></el-input>
      </el-form-item>
      <el-form-item label="水表ID：" prop="meterId">
        <el-input v-model="tenantReceivable.meterId"></el-input>
      </el-form-item>
      <el-form-item label="水表代码：" prop="meterCode">
        <el-input v-model="tenantReceivable.meterCode"></el-input>
      </el-form-item>
      <el-form-item label="表具地址：" prop="meterAddress">
        <el-input v-model="tenantReceivable.meterAddress"></el-input>
      </el-form-item>
      <el-form-item label="抄表员ID：" prop="readEmployeeId">
        <el-input v-model="tenantReceivable.readEmployeeId"></el-input>
      </el-form-item>
      <el-form-item label="应收账时间：" prop="receivableTime">
        <el-date-picker
                class="input-width"
                v-model="tenantReceivable.receivableTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择应收账时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结算开始时间：" prop="settleStartTime">
        <el-date-picker
                class="input-width"
                v-model="tenantReceivable.settleStartTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择结算开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结算开始指针：" prop="settleStartPointer">
        <el-input-number v-model="tenantReceivable.settleStartPointer" :min="0" :precision="2" placeholder="结算开始指针"></el-input-number>
      </el-form-item>
      <el-form-item label="结算截止时间：" prop="settleEndTime">
        <el-date-picker
                class="input-width"
                v-model="tenantReceivable.settleEndTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择结算截止时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结算截止指针：" prop="settleEndPointer">
        <el-input-number v-model="tenantReceivable.settleEndPointer" :min="0" :precision="2" placeholder="结算截止指针"></el-input-number>
      </el-form-item>
      <el-form-item label="应结算水量：" prop="settleWaters">
        <el-input-number v-model="tenantReceivable.settleWaters" :min="0" :precision="2" placeholder="应结算水量"></el-input-number>
      </el-form-item>
      <el-form-item label="价格类别ID：" prop="priceTypeId">
        <el-input v-model="tenantReceivable.priceTypeId"></el-input>
      </el-form-item>
      <el-form-item label="应收水量：" prop="receivableWaters">
        <el-input-number v-model="tenantReceivable.receivableWaters" :min="0" :precision="2" placeholder="应收水量"></el-input-number>
      </el-form-item>
      <el-form-item label="应收金额：" prop="receivableMoney">
        <el-input-number v-model="tenantReceivable.receivableMoney" :min="0" :precision="2" placeholder="应收金额"></el-input-number>
      </el-form-item>
      <el-form-item label="欠费金额：" prop="arrearsMoney">
        <el-input-number v-model="tenantReceivable.arrearsMoney" :min="0" :precision="2" placeholder="欠费金额"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantReceivableFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantReceivableFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantReceivable, getTenantReceivable, updateTenantReceivable} from '@/api/tenantReceivable'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantReceivable={
    tenantId: '',
    receivableStatus: '',
    receivableType: '',
    departmentId: '',
    bookletId: '',
    bookletCode: '',
    customerId: '',
    customerCode: '',
    customerName: '',
    customerAddress: '',
    meterId: '',
    meterCode: '',
    meterAddress: '',
    readEmployeeId: '',
    receivableTime: '',
    settleStartTime: '',
    settleStartPointer: null,
    settleEndTime: '',
    settleEndPointer: null,
    settleWaters: null,
    priceTypeId: '',
    receivableWaters: null,
    receivableMoney: null,
    arrearsMoney: null
  };
  const defaultReceivableStatusOptions=[
    {
      value: 1,
      label: '正常'
    },
    {
      value: 2,
      label: '被冲正'
    },
    {
      value: 3,
      label: '冲正负记录'
    }
  ];
  const defaultReceivableTypeOptions=[
    {
      value: 1,
      label: '抄表'
    },
    {
      value: 2,
      label: '换表'
    },
    {
      value: 3,
      label: '追补'
    }
  ];
  export default {
    name: 'TenantReceivableDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantReceivable:Object.assign({}, defaultTenantReceivable, this.$route.query),
        tenantInfoOptions:[],
        receivableStatusOptions: Object.assign({},defaultReceivableStatusOptions),
        receivableTypeOptions: Object.assign({},defaultReceivableTypeOptions),
        rules: {
          tenantId: [
            {required: true, message: '请输入租户ID', trigger: 'blur'}
          ],
          receivableStatus: [
            {required: true, message: '请选择应收账状态', trigger: 'blur'}
          ],
          receivableType: [
            {required: true, message: '请选择应收类型', trigger: 'blur'}
          ],
          departmentId: [
            {required: true, message: '请输入部门ID', trigger: 'blur'}
          ],
          customerId: [
            {required: true, message: '请输入用户ID', trigger: 'blur'}
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
          meterId: [
            {required: true, message: '请输入水表ID', trigger: 'blur'}
          ],
          meterCode: [
            {required: true, message: '请输入水表代码', trigger: 'blur'}
          ],
          meterAddress: [
            {required: true, message: '请输入表具地址', trigger: 'blur'}
          ],
          receivableTime: [
            {required: true, message: '请输入应收账时间', trigger: 'blur'}
          ],
          priceTypeId: [
            {required: true, message: '请输入价格类别ID', trigger: 'blur'}
          ],
          receivableWaters: [
            {required: true, message: '请输入应收水量', trigger: 'blur'}
          ],
          receivableMoney: [
            {required: true, message: '请输入应收金额', trigger: 'blur'}
          ],
          arrearsMoney: [
            {required: true, message: '请输入欠费金额', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantReceivable(this.$route.query.id).then(response => {
	          let data = response.data;
	          data.receivableTime = formatDate(new Date(data.receivableTime), 'yyyy-MM-dd hh:mm:ss');
	          data.settleStartTime = formatDate(new Date(data.settleStartTime), 'yyyy-MM-dd hh:mm:ss');
	          data.settleEndTime = formatDate(new Date(data.settleEndTime), 'yyyy-MM-dd hh:mm:ss');
	          this.tenantReceivable = data;
	          //this.tenantReceivable = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantReceivableByTenantId(this.$route.query.tenantId).then(response => {
	          let data = response.data;
	          data.receivableTime = formatDate(new Date(data.receivableTime), 'yyyy-MM-dd hh:mm:ss');
	          data.settleStartTime = formatDate(new Date(data.settleStartTime), 'yyyy-MM-dd hh:mm:ss');
	          data.settleEndTime = formatDate(new Date(data.settleEndTime), 'yyyy-MM-dd hh:mm:ss');
	          this.tenantReceivable = data;
	          //this.tenantReceivable = response.data;
        	});
        }
        
      }else{
        this.tenantReceivable = Object.assign({},defaultTenantReceivable,this.$route.query);
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
                updateTenantReceivable(this.$route.query.id, this.tenantReceivable).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantReceivable(this.tenantReceivable).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantReceivable = Object.assign({},defaultTenantReceivable);
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
        this.tenantReceivable = Object.assign({},defaultTenantReceivable);
      }
    }
  }
</script>
<style>
</style>


