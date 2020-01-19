<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantMeter" :rules="rules" ref="tenantMeterFrom" label-width="150px">
      <el-form-item label="水表ID：" prop="id">
        <el-input v-model="tenantMeter.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        <el-select v-model="tenantMeter.tenantId" placeholder="请选择租户ID" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户ID：" prop="customerId">
        <el-input v-model="tenantMeter.customerId"></el-input>
      </el-form-item>
      <el-form-item label="水表表册ID：" prop="meterBookletId">
        <el-input v-model="tenantMeter.meterBookletId"></el-input>
      </el-form-item>
      <el-form-item label="上级水表ID：" prop="meterParentId">
        <el-input v-model="tenantMeter.meterParentId"></el-input>
      </el-form-item>
      <el-form-item label="水表编号：" prop="meterCode">
        <el-input v-model="tenantMeter.meterCode"></el-input>
      </el-form-item>
      <el-form-item label="水表地址：" prop="meterAddress">
        <el-input v-model="tenantMeter.meterAddress"></el-input>
      </el-form-item>
      <el-form-item label="家庭人数：" prop="meterPeoples">
        <el-input-number v-model="tenantMeter.meterPeoples" :min="0" placeholder="家庭人数"></el-input-number>
      </el-form-item>
      <el-form-item label="表身号码[钢印号等]：" prop="meterMachineCode">
        <el-input v-model="tenantMeter.meterMachineCode"></el-input>
      </el-form-item>
      <el-form-item label="用途：" prop="meterUseType">
        <el-select
          v-model="tenantMeter.meterUseType"
          clearable
          placeholder="请选择用途">
          <el-option
            v-for="item in meterUseTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="厂商ID：" prop="meterManufactorId">
        <el-input v-model="tenantMeter.meterManufactorId"></el-input>
      </el-form-item>
      <el-form-item label="水表类型：" prop="meterType">
        <el-select
          v-model="tenantMeter.meterType"
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
      <el-form-item label="水表口径ID：" prop="caliberId">
        <el-input v-model="tenantMeter.caliberId"></el-input>
      </el-form-item>
      <el-form-item label="用水分类ID：" prop="meterWaterTypeId">
        <el-input v-model="tenantMeter.meterWaterTypeId"></el-input>
      </el-form-item>
      <el-form-item label="价格分类ID：" prop="priceTypeId">
        <el-input v-model="tenantMeter.priceTypeId"></el-input>
      </el-form-item>
      <el-form-item label="采集系统代码：" prop="meterIotCode">
        <el-input v-model="tenantMeter.meterIotCode"></el-input>
      </el-form-item>
      <el-form-item label="水表安装日期：" prop="meterInstallDate">
        <el-date-picker
                class="input-width"
                v-model="tenantMeter.meterInstallDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择水表安装日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="水表建档日期：" prop="meterRegisterTime">
        <el-date-picker
                class="input-width"
                v-model="tenantMeter.meterRegisterTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择水表建档日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="水表状态：" prop="meterStatus">
        <el-select
          v-model="tenantMeter.meterStatus"
          clearable
          placeholder="请选择水表状态">
          <el-option
            v-for="item in meterStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年累计用水量：" prop="meterYearTotalWaters">
        <el-input-number v-model="tenantMeter.meterYearTotalWaters" :min="0" :precision="2" placeholder="年累计用水量"></el-input-number>
      </el-form-item>
      <el-form-item label="最后一次结算日期：" prop="meterLastSettleTime">
        <el-date-picker
                class="input-width"
                v-model="tenantMeter.meterLastSettleTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择最后一次结算日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="最后一次结算指针：" prop="meterLastSettlePointer">
        <el-input-number v-model="tenantMeter.meterLastSettlePointer" :min="0" :precision="2" placeholder="最后一次结算指针"></el-input-number>
      </el-form-item>
      <el-form-item label="水表欠费总金额：" prop="meterArrearsMoney">
        <el-input-number v-model="tenantMeter.meterArrearsMoney" :min="0" :precision="2" placeholder="水表欠费总金额"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantMeterFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantMeterFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantMeter, getTenantMeter, updateTenantMeter} from '@/api/tenantMeter'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantMeter={
    tenantId: '',
    customerId: '',
    meterBookletId: '',
    meterParentId: '',
    meterCode: '',
    meterAddress: '',
    meterPeoples: 0,
    meterMachineCode: '',
    meterUseType: '',
    meterManufactorId: '',
    meterType: '',
    caliberId: '',
    meterWaterTypeId: '',
    priceTypeId: '',
    meterIotCode: '',
    meterInstallDate: '',
    meterRegisterTime: '',
    meterStatus: '',
    meterYearTotalWaters: null,
    meterLastSettleTime: '',
    meterLastSettlePointer: null,
    meterArrearsMoney: null
  };
  const defaultMeterUseTypeOptions=[
    {
      value: 1,
      label: '水费结算'
    },
    {
      value: 2,
      label: '水量考核'
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
  const defaultMeterStatusOptions=[
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
      label: '拆表'
    }
  ];
  export default {
    name: 'TenantMeterDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantMeter:Object.assign({}, defaultTenantMeter, this.$route.query),
        tenantInfoOptions:[],
        meterUseTypeOptions: Object.assign({},defaultMeterUseTypeOptions),
        meterTypeOptions: Object.assign({},defaultMeterTypeOptions),
        meterStatusOptions: Object.assign({},defaultMeterStatusOptions),
        rules: {
          tenantId: [
            {required: true, message: '请输入租户ID', trigger: 'blur'}
          ],
          meterCode: [
            {required: true, message: '请输入水表编号', trigger: 'blur'}
          ],
          meterAddress: [
            {required: true, message: '请输入水表地址', trigger: 'blur'}
          ],
          meterUseType: [
            {required: true, message: '请选择用途', trigger: 'blur'}
          ],
          meterType: [
            {required: true, message: '请选择水表类型', trigger: 'blur'}
          ],
          caliberId: [
            {required: true, message: '请输入水表口径ID', trigger: 'blur'}
          ],
          meterRegisterTime: [
            {required: true, message: '请输入水表建档日期', trigger: 'blur'}
          ],
          meterStatus: [
            {required: true, message: '请选择水表状态', trigger: 'blur'}
          ],
          meterYearTotalWaters: [
            {required: true, message: '请输入年累计用水量', trigger: 'blur'}
          ],
          meterArrearsMoney: [
            {required: true, message: '请输入水表欠费总金额', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantMeter(this.$route.query.id).then(response => {
	          let data = response.data;
	          data.meterInstallDate = formatDate(new Date(data.meterInstallDate), 'yyyy-MM-dd');
	          data.meterRegisterTime = formatDate(new Date(data.meterRegisterTime), 'yyyy-MM-dd hh:mm:ss');
	          data.meterLastSettleTime = formatDate(new Date(data.meterLastSettleTime), 'yyyy-MM-dd hh:mm:ss');
	          this.tenantMeter = data;
	          //this.tenantMeter = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantMeterByTenantId(this.$route.query.tenantId).then(response => {
	          let data = response.data;
	          data.meterInstallDate = formatDate(new Date(data.meterInstallDate), 'yyyy-MM-dd');
	          data.meterRegisterTime = formatDate(new Date(data.meterRegisterTime), 'yyyy-MM-dd hh:mm:ss');
	          data.meterLastSettleTime = formatDate(new Date(data.meterLastSettleTime), 'yyyy-MM-dd hh:mm:ss');
	          this.tenantMeter = data;
	          //this.tenantMeter = response.data;
        	});
        }
        
      }else{
        this.tenantMeter = Object.assign({},defaultTenantMeter,this.$route.query);
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
                updateTenantMeter(this.$route.query.id, this.tenantMeter).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantMeter(this.tenantMeter).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantMeter = Object.assign({},defaultTenantMeter);
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
        this.tenantMeter = Object.assign({},defaultTenantMeter);
      }
    }
  }
</script>
<style>
</style>


