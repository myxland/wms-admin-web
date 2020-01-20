<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantMeterReadLogCurrent" :rules="rules" ref="tenantMeterReadLogCurrentFrom" label-width="150px">
      <el-form-item label="抄表计划：" prop="id">
        <el-input v-model="tenantMeterReadLogCurrent.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        <el-select v-model="tenantMeterReadLogCurrent.tenantId" placeholder="请选择租户ID" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="结算月份：" prop="readMonth">
        <el-date-picker
                class="input-width"
                v-model="tenantMeterReadLogCurrent.readMonth"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择结算月份">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="用户ID：" prop="customerId">
        <el-input v-model="tenantMeterReadLogCurrent.customerId"></el-input>
      </el-form-item>
      <el-form-item label="水表ID：" prop="meterId">
        <el-input v-model="tenantMeterReadLogCurrent.meterId"></el-input>
      </el-form-item>
      <el-form-item label="结算前水表当年累计水量：" prop="meterYearTotalWatersBefore">
        <el-input-number v-model="tenantMeterReadLogCurrent.meterYearTotalWatersBefore" :min="0" :precision="2" placeholder="结算前水表当年累计水量"></el-input-number>
      </el-form-item>
      <el-form-item label="结算开始时间：" prop="settleStartTime">
        <el-date-picker
                class="input-width"
                v-model="tenantMeterReadLogCurrent.settleStartTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择结算开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结算开始指针：" prop="settleStartPointer">
        <el-input-number v-model="tenantMeterReadLogCurrent.settleStartPointer" :min="0" :precision="2" placeholder="结算开始指针"></el-input-number>
      </el-form-item>
      <el-form-item label="本次抄表时间：" prop="currentReadTime">
        <el-date-picker
                class="input-width"
                v-model="tenantMeterReadLogCurrent.currentReadTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择本次抄表时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="本次抄表指针：" prop="currentReadPointer">
        <el-input-number v-model="tenantMeterReadLogCurrent.currentReadPointer" :min="0" :precision="2" placeholder="本次抄表指针"></el-input-number>
      </el-form-item>
      <el-form-item label="抄表员ID：" prop="readEmployeeId">
        <el-input v-model="tenantMeterReadLogCurrent.readEmployeeId"></el-input>
      </el-form-item>
      <el-form-item label="表次抄表状况：" prop="meterStatusId">
        <el-input v-model="tenantMeterReadLogCurrent.meterStatusId"></el-input>
      </el-form-item>
      <el-form-item label="应结算水量：" prop="settleWaters">
        <el-input-number v-model="tenantMeterReadLogCurrent.settleWaters" :min="0" :precision="2" placeholder="应结算水量"></el-input-number>
      </el-form-item>
      <el-form-item label="应收水量：" prop="receivableWaters">
        <el-input-number v-model="tenantMeterReadLogCurrent.receivableWaters" :min="0" :precision="2" placeholder="应收水量"></el-input-number>
      </el-form-item>
      <el-form-item label="抄表来源：" prop="readSource">
        <el-select
          v-model="tenantMeterReadLogCurrent.readSource"
          clearable
          placeholder="请选择抄表来源">
          <el-option
            v-for="item in readSourceOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="抄表状态：" prop="readStatus">
        <el-select
          v-model="tenantMeterReadLogCurrent.readStatus"
          clearable
          placeholder="请选择抄表状态">
          <el-option
            v-for="item in readStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="检查结果：" prop="checkResult">
        <el-select
          v-model="tenantMeterReadLogCurrent.checkResult"
          clearable
          placeholder="请选择检查结果">
          <el-option
            v-for="item in checkResultOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="处理结果：" prop="processReault">
        <el-select
          v-model="tenantMeterReadLogCurrent.processReault"
          clearable
          placeholder="请选择处理结果">
          <el-option
            v-for="item in processReaultOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="处理人：" prop="processEmployeeId">
        <el-input v-model="tenantMeterReadLogCurrent.processEmployeeId"></el-input>
      </el-form-item>
      <el-form-item label="处理时间：" prop="processTime">
        <el-date-picker
                class="input-width"
                v-model="tenantMeterReadLogCurrent.processTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择处理时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="处理方式：" prop="processType">
        <el-select
          v-model="tenantMeterReadLogCurrent.processType"
          clearable
          placeholder="请选择处理方式">
          <el-option
            v-for="item in processTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantMeterReadLogCurrentFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantMeterReadLogCurrentFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantMeterReadLogCurrent, getTenantMeterReadLogCurrent, updateTenantMeterReadLogCurrent} from '@/api/tenantMeterReadLogCurrent'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantMeterReadLogCurrent={
    tenantId: '',
    readMonth: '',
    customerId: '',
    meterId: '',
    meterYearTotalWatersBefore: null,
    settleStartTime: '',
    settleStartPointer: null,
    currentReadTime: '',
    currentReadPointer: null,
    readEmployeeId: '',
    meterStatusId: '',
    settleWaters: null,
    receivableWaters: null,
    readSource: '',
    readStatus: '',
    checkResult: '',
    processReault: '',
    processEmployeeId: '',
    processTime: '',
    processType: ''
  };
  const defaultReadSourceOptions=[
    {
      value: 1,
      label: '移动抄表'
    },
    {
      value: 2,
      label: '人工入账'
    },
    {
      value: 3,
      label: '远传表导入'
    },
    {
      value: 4,
      label: '远传表接口'
    }
  ];
  const defaultReadStatusOptions=[
    {
      value: 0,
      label: '未抄'
    },
    {
      value: 1,
      label: '已抄'
    }
  ];
  const defaultCheckResultOptions=[
    {
      value: 0,
      label: '正常'
    },
    {
      value: 1,
      label: '异常'
    }
  ];
  const defaultProcessReaultOptions=[
    {
      value: 1,
      label: '已处理'
    },
    {
      value: 2,
      label: '未处理'
    }
  ];
  const defaultProcessTypeOptions=[
    {
      value: 1,
      label: '重新抄表'
    },
    {
      value: 2,
      label: '通过'
    }
  ];
  export default {
    name: 'TenantMeterReadLogCurrentDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantMeterReadLogCurrent:Object.assign({}, defaultTenantMeterReadLogCurrent, this.$route.query),
        tenantInfoOptions:[],
        readSourceOptions: Object.assign({},defaultReadSourceOptions),
        readStatusOptions: Object.assign({},defaultReadStatusOptions),
        checkResultOptions: Object.assign({},defaultCheckResultOptions),
        processReaultOptions: Object.assign({},defaultProcessReaultOptions),
        processTypeOptions: Object.assign({},defaultProcessTypeOptions),
        rules: {
          tenantId: [
            {required: true, message: '请输入租户ID', trigger: 'blur'}
          ],
          readMonth: [
            {required: true, message: '请输入结算月份', trigger: 'blur'}
          ],
          meterId: [
            {required: true, message: '请输入水表ID', trigger: 'blur'}
          ],
          readStatus: [
            {required: true, message: '请选择抄表状态', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantMeterReadLogCurrent(this.$route.query.id).then(response => {
	          let data = response.data;
	          data.readMonth = formatDate(new Date(data.readMonth), 'yyyy-MM-dd');
	          data.settleStartTime = formatDate(new Date(data.settleStartTime), 'yyyy-MM-dd hh:mm:ss');
	          data.currentReadTime = formatDate(new Date(data.currentReadTime), 'yyyy-MM-dd hh:mm:ss');
	          data.processTime = formatDate(new Date(data.processTime), 'yyyy-MM-dd hh:mm:ss');
	          this.tenantMeterReadLogCurrent = data;
	          //this.tenantMeterReadLogCurrent = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantMeterReadLogCurrentByTenantId(this.$route.query.tenantId).then(response => {
	          let data = response.data;
	          data.readMonth = formatDate(new Date(data.readMonth), 'yyyy-MM-dd');
	          data.settleStartTime = formatDate(new Date(data.settleStartTime), 'yyyy-MM-dd hh:mm:ss');
	          data.currentReadTime = formatDate(new Date(data.currentReadTime), 'yyyy-MM-dd hh:mm:ss');
	          data.processTime = formatDate(new Date(data.processTime), 'yyyy-MM-dd hh:mm:ss');
	          this.tenantMeterReadLogCurrent = data;
	          //this.tenantMeterReadLogCurrent = response.data;
        	});
        }
        
      }else{
        this.tenantMeterReadLogCurrent = Object.assign({},defaultTenantMeterReadLogCurrent,this.$route.query);
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
                updateTenantMeterReadLogCurrent(this.$route.query.id, this.tenantMeterReadLogCurrent).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantMeterReadLogCurrent(this.tenantMeterReadLogCurrent).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantMeterReadLogCurrent = Object.assign({},defaultTenantMeterReadLogCurrent);
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
        this.tenantMeterReadLogCurrent = Object.assign({},defaultTenantMeterReadLogCurrent);
      }
    }
  }
</script>
<style>
</style>


