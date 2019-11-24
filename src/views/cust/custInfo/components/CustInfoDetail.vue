<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="custInfo" :rules="rules" ref="custInfoFrom" label-width="150px">
      <el-form-item label="系统编号：" prop="id">
        <el-input v-model="custInfo.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="custInfo.tenantId" placeholder="请选择租户" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户编号：" prop="custNo">
        <el-input v-model="custInfo.custNo"></el-input>
      </el-form-item>
      <el-form-item label="用户名称：" prop="custName">
        <el-input v-model="custInfo.custName"></el-input>
      </el-form-item>
      <el-form-item label="用户地址：" prop="custAddress">
        <el-input v-model="custInfo.custAddress"></el-input>
      </el-form-item>
      <el-form-item label="用户类别编号：" prop="custTypeId">
        <el-input v-model="custInfo.custTypeId"></el-input>
      </el-form-item>
      <el-form-item label="立户日期：" prop="custRegistDate">
        <el-input v-model="custInfo.custRegistDate"></el-input>
      </el-form-item>
      <el-form-item label="用户状态：" prop="custStatus" clearable>
        <el-select
          v-model="custInfo.custStatus"
          placeholder="请选择用户状态">
          <el-option
            v-for="item in custStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="收费方式：" prop="payType" clearable>
        <el-select
          v-model="custInfo.payType"
          placeholder="请选择收费方式">
          <el-option
            v-for="item in payTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="开票类别：" prop="billType" clearable>
        <el-select
          v-model="custInfo.billType"
          placeholder="请选择开票类别">
          <el-option
            v-for="item in billTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="开票名称：" prop="billName">
        <el-input v-model="custInfo.billName"></el-input>
      </el-form-item>
      <el-form-item label="税号：" prop="billTaxnum">
        <el-input v-model="custInfo.billTaxnum"></el-input>
      </el-form-item>
      <el-form-item label="开票地址：" prop="billAddress">
        <el-input v-model="custInfo.billAddress"></el-input>
      </el-form-item>
      <el-form-item label="开票电话：" prop="billTel">
        <el-input v-model="custInfo.billTel"></el-input>
      </el-form-item>
      <el-form-item label="银行名称：" prop="billBank">
        <el-input v-model="custInfo.billBank"></el-input>
      </el-form-item>
      <el-form-item label="开户行名称：" prop="billBankName">
        <el-input v-model="custInfo.billBankName"></el-input>
      </el-form-item>
      <el-form-item label="开户行账号：" prop="billBankAccount">
        <el-input v-model="custInfo.billBankAccount"></el-input>
      </el-form-item>
      <el-form-item label="开户行号：" prop="billBankId">
        <el-input v-model="custInfo.billBankId"></el-input>
      </el-form-item>
      <el-form-item label="预存余额：" prop="saveMoney">
        <el-input v-model="custInfo.saveMoney"></el-input>
      </el-form-item>
      <el-form-item label="欠费金额：" prop="dueMoney">
        <el-input v-model="custInfo.dueMoney"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('custInfoFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('custInfoFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createCustInfo, getCustInfo, updateCustInfo} from '@/api/custInfo'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultCustInfo={
    tenantId: '',
    custNo: '',
    custName: '',
    custAddress: '',
    custTypeId: '',
    custRegistDate: '',
    custStatus: '',
    payType: '',
    billType: '',
    billName: '',
    billTaxnum: '',
    billAddress: '',
    billTel: '',
    billBank: '',
    billBankName: '',
    billBankAccount: '',
    billBankId: '',
    saveMoney: '',
    dueMoney: ''
  };
  const defaultCustStatusOptions=[
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
  const defaultPayTypeOptions=[
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
  const defaultBillTypeOptions=[
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
    name: 'CustInfoDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        custInfo:Object.assign({}, defaultCustInfo),
        tenantInfoOptions:[],
        custStatusOptions: Object.assign({},defaultCustStatusOptions),
        payTypeOptions: Object.assign({},defaultPayTypeOptions),
        billTypeOptions: Object.assign({},defaultBillTypeOptions),
        rules: {
          custNo: [
            {required: true, message: '请输入用户编号', trigger: 'blur'}
          ],
          custName: [
            {required: true, message: '请输入用户名称', trigger: 'blur'}
          ],
          custAddress: [
            {required: true, message: '请输入用户地址', trigger: 'blur'}
          ],
          custTypeId: [
            {required: true, message: '请输入用户类别编号', trigger: 'blur'}
          ],
          custRegistDate: [
            {required: true, message: '请输入立户日期', trigger: 'blur'}
          ],
          custStatus: [
            {required: true, message: '请选择用户状态', trigger: 'blur'}
          ],
          payType: [
            {required: true, message: '请选择收费方式', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getCustInfo(this.$route.query.id).then(response => {
          this.custInfo = response.data;
        });
      }else{
        this.custInfo = Object.assign({},defaultCustInfo);
      }
      this.getTenantInfoList();
    },
    methods: {
      getTenantInfoList() {
        fetchTenantInfoList({pageNum:1,pageSize:100}).then(response => {
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
                updateCustInfo(this.$route.query.id, this.custInfo).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createCustInfo(this.custInfo).then(response => {
                  this.$refs[formName].resetFields();
                  this.custInfo = Object.assign({},defaultCustInfo);
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
        this.custInfo = Object.assign({},defaultCustInfo);
      }
    }
  }
</script>
<style>
</style>


