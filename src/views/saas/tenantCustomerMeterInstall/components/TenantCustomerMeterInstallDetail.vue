<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantCustomerMeterInstall" :rules="rules" ref="tenantCustomerMeterInstallFrom" label-width="150px">
      <el-form-item label="水表立户ID：" prop="id">
        <el-input v-model="tenantCustomerMeterInstall.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        <el-select v-model="tenantCustomerMeterInstall.tenantId" placeholder="请选择租户ID" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="已经立户的水表ID：" prop="meterId">
        <el-input v-model="tenantCustomerMeterInstall.meterId"></el-input>
      </el-form-item>
      <el-form-item label="已经立户的水表代码：" prop="meterCode">
        <el-input v-model="tenantCustomerMeterInstall.meterCode"></el-input>
      </el-form-item>
      <el-form-item label="用户名称：" prop="custName">
        <el-input v-model="tenantCustomerMeterInstall.custName"></el-input>
      </el-form-item>
      <el-form-item label="水表地址：" prop="meterAddress">
        <el-input v-model="tenantCustomerMeterInstall.meterAddress"></el-input>
      </el-form-item>
      <el-form-item label="表身号码[钢印号等]：" prop="meterMachineCode">
        <el-input v-model="tenantCustomerMeterInstall.meterMachineCode"></el-input>
      </el-form-item>
      <el-form-item label="厂商ID：" prop="manufactorId">
        <el-input v-model="tenantCustomerMeterInstall.manufactorId"></el-input>
      </el-form-item>
      <el-form-item label="水表类型：" prop="meterType">
        <el-select
          v-model="tenantCustomerMeterInstall.meterType"
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
        <el-input v-model="tenantCustomerMeterInstall.caliberId"></el-input>
      </el-form-item>
      <el-form-item label="用水分类ID：" prop="waterTypeId">
        <el-input v-model="tenantCustomerMeterInstall.waterTypeId"></el-input>
      </el-form-item>
      <el-form-item label="价格分类ID：" prop="priceTypeId">
        <el-input v-model="tenantCustomerMeterInstall.priceTypeId"></el-input>
      </el-form-item>
      <el-form-item label="采集系统编号：" prop="meterIotCode">
        <el-input v-model="tenantCustomerMeterInstall.meterIotCode"></el-input>
      </el-form-item>
      <el-form-item label="水表安装日期：" prop="meterInstallDate">
        <el-date-picker
                class="input-width"
                v-model="tenantCustomerMeterInstall.meterInstallDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择水表安装日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="最后一次结算时间：" prop="meterLastSettleTime">
        <el-date-picker
                class="input-width"
                v-model="tenantCustomerMeterInstall.meterLastSettleTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择最后一次结算时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="最后一次结算指针：" prop="meterLastSettlePointer">
        <el-input-number v-model="tenantCustomerMeterInstall.meterLastSettlePointer" :min="0" :precision="2" placeholder="最后一次结算指针"></el-input-number>
      </el-form-item>
      <el-form-item label="联系人手机号码：" prop="linkmanMobile">
        <el-input v-model="tenantCustomerMeterInstall.linkmanMobile"></el-input>
      </el-form-item>
      <el-form-item label="用户身份证编号：" prop="custmerIdNo">
        <el-input v-model="tenantCustomerMeterInstall.custmerIdNo"></el-input>
      </el-form-item>
      <el-form-item label="老系统编号：" prop="oldCode">
        <el-input v-model="tenantCustomerMeterInstall.oldCode"></el-input>
      </el-form-item>
      <el-form-item label="录入方式：" prop="inputType">
        <el-select
          v-model="tenantCustomerMeterInstall.inputType"
          clearable
          placeholder="请选择录入方式">
          <el-option
            v-for="item in inputTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="录入日期：" prop="inputTime">
        <el-date-picker
                class="input-width"
                v-model="tenantCustomerMeterInstall.inputTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择录入日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="是否已经立户：" prop="createOn">
        <el-switch
          v-model="tenantCustomerMeterInstall.createOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantCustomerMeterInstallFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantCustomerMeterInstallFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantCustomerMeterInstall, getTenantCustomerMeterInstall, updateTenantCustomerMeterInstall} from '@/api/tenantCustomerMeterInstall'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantCustomerMeterInstall={
    tenantId: '',
    meterId: '',
    meterCode: '',
    custName: '',
    meterAddress: '',
    meterMachineCode: '',
    manufactorId: '',
    meterType: '',
    caliberId: '',
    waterTypeId: '',
    priceTypeId: '',
    meterIotCode: '',
    meterInstallDate: '',
    meterLastSettleTime: '',
    meterLastSettlePointer: null,
    linkmanMobile: '',
    custmerIdNo: '',
    oldCode: '',
    inputType: '',
    inputTime: '',
    createOn: 1
  };
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
  const defaultInputTypeOptions=[
    {
      value: 1,
      label: '手工录入'
    },
    {
      value: 2,
      label: '文件导入'
    }
  ];
  export default {
    name: 'TenantCustomerMeterInstallDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantCustomerMeterInstall:Object.assign({}, defaultTenantCustomerMeterInstall, this.$route.query),
        tenantInfoOptions:[],
        meterTypeOptions: Object.assign({},defaultMeterTypeOptions),
        inputTypeOptions: Object.assign({},defaultInputTypeOptions),
        rules: {
          tenantId: [
            {required: true, message: '请输入租户ID', trigger: 'blur'}
          ],
          custName: [
            {required: true, message: '请输入用户名称', trigger: 'blur'}
          ],
          meterAddress: [
            {required: true, message: '请输入水表地址', trigger: 'blur'}
          ],
          meterType: [
            {required: true, message: '请选择水表类型', trigger: 'blur'}
          ],
          caliberId: [
            {required: true, message: '请输入水表口径ID', trigger: 'blur'}
          ],
          priceTypeId: [
            {required: true, message: '请输入价格分类ID', trigger: 'blur'}
          ],
          meterLastSettleTime: [
            {required: true, message: '请输入最后一次结算时间', trigger: 'blur'}
          ],
          meterLastSettlePointer: [
            {required: true, message: '请输入最后一次结算指针', trigger: 'blur'}
          ],
          inputType: [
            {required: true, message: '请选择录入方式', trigger: 'blur'}
          ],
          inputTime: [
            {required: true, message: '请输入录入日期', trigger: 'blur'}
          ],
          createOn: [
            {required: true, message: '请选择是否已经立户', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantCustomerMeterInstall(this.$route.query.id).then(response => {
	          let data = response.data;
	          data.meterInstallDate = formatDate(new Date(data.meterInstallDate), 'yyyy-MM-dd');
	          data.meterLastSettleTime = formatDate(new Date(data.meterLastSettleTime), 'yyyy-MM-dd hh:mm:ss');
	          data.inputTime = formatDate(new Date(data.inputTime), 'yyyy-MM-dd hh:mm:ss');
	          this.tenantCustomerMeterInstall = data;
	          //this.tenantCustomerMeterInstall = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantCustomerMeterInstallByTenantId(this.$route.query.tenantId).then(response => {
	          let data = response.data;
	          data.meterInstallDate = formatDate(new Date(data.meterInstallDate), 'yyyy-MM-dd');
	          data.meterLastSettleTime = formatDate(new Date(data.meterLastSettleTime), 'yyyy-MM-dd hh:mm:ss');
	          data.inputTime = formatDate(new Date(data.inputTime), 'yyyy-MM-dd hh:mm:ss');
	          this.tenantCustomerMeterInstall = data;
	          //this.tenantCustomerMeterInstall = response.data;
        	});
        }
        
      }else{
        this.tenantCustomerMeterInstall = Object.assign({},defaultTenantCustomerMeterInstall,this.$route.query);
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
                updateTenantCustomerMeterInstall(this.$route.query.id, this.tenantCustomerMeterInstall).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantCustomerMeterInstall(this.tenantCustomerMeterInstall).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantCustomerMeterInstall = Object.assign({},defaultTenantCustomerMeterInstall);
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
        this.tenantCustomerMeterInstall = Object.assign({},defaultTenantCustomerMeterInstall);
      }
    }
  }
</script>
<style>
</style>


