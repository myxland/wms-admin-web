<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="custInfoChange" :rules="rules" ref="custInfoChangeFrom" label-width="150px">
      <el-form-item label="系统编号：" prop="id">
        <el-input v-model="custInfoChange.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="custInfoChange.tenantId" placeholder="请选择租户" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户编号：" prop="custId">
        <el-input v-model="custInfoChange.custId"></el-input>
      </el-form-item>
      <el-form-item label="变更日期：" prop="changeDate">
        <el-input v-model="custInfoChange.changeDate"></el-input>
      </el-form-item>
      <el-form-item label="变更人：" prop="changer">
        <el-input v-model="custInfoChange.changer"></el-input>
      </el-form-item>
      <el-form-item label="用户信息变更：" prop="baseChange">
        <el-switch
          v-model="custInfoChange.baseChange"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="开票信息变更：" prop="billChange">
        <el-switch
          v-model="custInfoChange.billChange"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="用户状态变更：" prop="statusChange">
        <el-switch
          v-model="custInfoChange.statusChange"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="用户名称：" prop="custName">
        <el-input v-model="custInfoChange.custName"></el-input>
      </el-form-item>
      <el-form-item label="变更前用户名称：" prop="custNameHis">
        <el-input v-model="custInfoChange.custNameHis"></el-input>
      </el-form-item>
      <el-form-item label="用户地址：" prop="custAddress">
        <el-input v-model="custInfoChange.custAddress"></el-input>
      </el-form-item>
      <el-form-item label="变更前用户地址：" prop="custAddressHis">
        <el-input v-model="custInfoChange.custAddressHis"></el-input>
      </el-form-item>
      <el-form-item label="用户类别编号：" prop="custTypeId">
        <el-input v-model="custInfoChange.custTypeId"></el-input>
      </el-form-item>
      <el-form-item label="变更前用户类别编号：" prop="custTypeIdHis">
        <el-input v-model="custInfoChange.custTypeIdHis"></el-input>
      </el-form-item>
      <el-form-item label="立户日期：" prop="custRegistDate">
        <el-input v-model="custInfoChange.custRegistDate"></el-input>
      </el-form-item>
      <el-form-item label="变更前立户日期：" prop="custRegistDateHis">
        <el-input v-model="custInfoChange.custRegistDateHis"></el-input>
      </el-form-item>
      <el-form-item label="用户状态：" prop="custStatus" clearable>
        <el-select
          v-model="custInfoChange.custStatus"
          placeholder="请选择用户状态">
          <el-option
            v-for="item in custStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="变更前用户状态：" prop="custStatusHis" clearable>
        <el-select
          v-model="custInfoChange.custStatusHis"
          placeholder="请选择变更前用户状态">
          <el-option
            v-for="item in custStatusHisOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="收费方式：" prop="payType" clearable>
        <el-select
          v-model="custInfoChange.payType"
          placeholder="请选择收费方式">
          <el-option
            v-for="item in payTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="变更前收费方式：" prop="payTypeHis" clearable>
        <el-select
          v-model="custInfoChange.payTypeHis"
          placeholder="请选择变更前收费方式">
          <el-option
            v-for="item in payTypeHisOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="开票类别：" prop="billType" clearable>
        <el-select
          v-model="custInfoChange.billType"
          placeholder="请选择开票类别">
          <el-option
            v-for="item in billTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="变更前开票类别：" prop="billTypeHis" clearable>
        <el-select
          v-model="custInfoChange.billTypeHis"
          placeholder="请选择变更前开票类别">
          <el-option
            v-for="item in billTypeHisOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="开票名称：" prop="billName">
        <el-input v-model="custInfoChange.billName"></el-input>
      </el-form-item>
      <el-form-item label="变更前开票名称：" prop="billNameHis">
        <el-input v-model="custInfoChange.billNameHis"></el-input>
      </el-form-item>
      <el-form-item label="税号：" prop="billTaxnum">
        <el-input v-model="custInfoChange.billTaxnum"></el-input>
      </el-form-item>
      <el-form-item label="变更前税号：" prop="billTaxnumHis">
        <el-input v-model="custInfoChange.billTaxnumHis"></el-input>
      </el-form-item>
      <el-form-item label="开票地址：" prop="billAddress">
        <el-input v-model="custInfoChange.billAddress"></el-input>
      </el-form-item>
      <el-form-item label="变更前开票地址：" prop="billAddressHis">
        <el-input v-model="custInfoChange.billAddressHis"></el-input>
      </el-form-item>
      <el-form-item label="开票电话：" prop="billTel">
        <el-input v-model="custInfoChange.billTel"></el-input>
      </el-form-item>
      <el-form-item label="变更前开票电话：" prop="billTelHis">
        <el-input v-model="custInfoChange.billTelHis"></el-input>
      </el-form-item>
      <el-form-item label="银行名称：" prop="billBank">
        <el-input v-model="custInfoChange.billBank"></el-input>
      </el-form-item>
      <el-form-item label="变更前银行名称：" prop="billBankHis">
        <el-input v-model="custInfoChange.billBankHis"></el-input>
      </el-form-item>
      <el-form-item label="开户行行号：" prop="billBankId">
        <el-input v-model="custInfoChange.billBankId"></el-input>
      </el-form-item>
      <el-form-item label="变更前开户行行号：" prop="billBankIdHis">
        <el-input v-model="custInfoChange.billBankIdHis"></el-input>
      </el-form-item>
      <el-form-item label="开户行名称：" prop="billBankName">
        <el-input v-model="custInfoChange.billBankName"></el-input>
      </el-form-item>
      <el-form-item label="变更前开户行名称：" prop="billBankNameHis">
        <el-input v-model="custInfoChange.billBankNameHis"></el-input>
      </el-form-item>
      <el-form-item label="开户行账号：" prop="billBankAccount">
        <el-input v-model="custInfoChange.billBankAccount"></el-input>
      </el-form-item>
      <el-form-item label="变更前开户行账号：" prop="billBankAccountHis">
        <el-input v-model="custInfoChange.billBankAccountHis"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('custInfoChangeFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('custInfoChangeFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createCustInfoChange, getCustInfoChange, updateCustInfoChange} from '@/api/custInfoChange'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultCustInfoChange={
    tenantId: '',
    custId: '',
    changeDate: '',
    changer: '',
    baseChange: 1,
    billChange: 1,
    statusChange: 1,
    custName: '',
    custNameHis: '',
    custAddress: '',
    custAddressHis: '',
    custTypeId: '',
    custTypeIdHis: '',
    custRegistDate: '',
    custRegistDateHis: '',
    custStatus: '',
    custStatusHis: '',
    payType: '',
    payTypeHis: '',
    billType: '',
    billTypeHis: '',
    billName: '',
    billNameHis: '',
    billTaxnum: '',
    billTaxnumHis: '',
    billAddress: '',
    billAddressHis: '',
    billTel: '',
    billTelHis: '',
    billBank: '',
    billBankHis: '',
    billBankId: '',
    billBankIdHis: '',
    billBankName: '',
    billBankNameHis: '',
    billBankAccount: '',
    billBankAccountHis: ''
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
  const defaultCustStatusHisOptions=[
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
  const defaultPayTypeHisOptions=[
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
  const defaultBillTypeHisOptions=[
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
    name: 'CustInfoChangeDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        custInfoChange:Object.assign({}, defaultCustInfoChange),
        tenantInfoOptions:[],
        custStatusOptions: Object.assign({},defaultCustStatusOptions),
        custStatusHisOptions: Object.assign({},defaultCustStatusHisOptions),
        payTypeOptions: Object.assign({},defaultPayTypeOptions),
        payTypeHisOptions: Object.assign({},defaultPayTypeHisOptions),
        billTypeOptions: Object.assign({},defaultBillTypeOptions),
        billTypeHisOptions: Object.assign({},defaultBillTypeHisOptions),
        rules: {
          tenantId: [
            {required: true, message: '请输入租户编号', trigger: 'blur'}
          ],
          custId: [
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
        getCustInfoChange(this.$route.query.id).then(response => {
          this.custInfoChange = response.data;
        });
      }else{
        this.custInfoChange = Object.assign({},defaultCustInfoChange);
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
                updateCustInfoChange(this.$route.query.id, this.custInfoChange).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createCustInfoChange(this.custInfoChange).then(response => {
                  this.$refs[formName].resetFields();
                  this.custInfoChange = Object.assign({},defaultCustInfoChange);
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
        this.custInfoChange = Object.assign({},defaultCustInfoChange);
      }
    }
  }
</script>
<style>
</style>


