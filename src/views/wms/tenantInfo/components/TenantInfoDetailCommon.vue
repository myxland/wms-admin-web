<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantInfo" :rules="rules" ref="tenantInfoFrom" label-width="150px">
      <el-form-item label="租户名称：" prop="tenantName">
        <el-input v-model="tenantInfo.tenantName"></el-input>
      </el-form-item>
      <el-form-item label="账户余额：" prop="tenantBalance">
        <el-input v-model="tenantInfo.tenantBalance"></el-input>
      </el-form-item>
      <el-form-item label="显示名称：" prop="tenantDisplayName">
        <el-input v-model="tenantInfo.tenantDisplayName"></el-input>
      </el-form-item>
      <el-form-item label="省：" prop="tenantProvince">
        <el-input v-model="tenantInfo.tenantProvince"></el-input>
      </el-form-item>
      <el-form-item label="市：" prop="tenantCity">
        <el-input v-model="tenantInfo.tenantCity"></el-input>
      </el-form-item>
      <el-form-item label="区/县：" prop="tenantArea">
        <el-input v-model="tenantInfo.tenantArea"></el-input>
      </el-form-item>
      <el-form-item label="联系地址：" prop="tenantAddress">
        <el-input v-model="tenantInfo.tenantAddress"></el-input>
      </el-form-item>
      <el-form-item label="联系人：" prop="tenantLinkman">
        <el-input v-model="tenantInfo.tenantLinkman"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：" prop="tenantMobile">
        <el-input v-model="tenantInfo.tenantMobile"></el-input>
      </el-form-item>
      <el-form-item label="单位电话：" prop="tenantPhone">
        <el-input v-model="tenantInfo.tenantPhone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="tenantEmail">
        <el-input v-model="tenantInfo.tenantEmail"></el-input>
      </el-form-item>
      <el-form-item label="QQ号码：" prop="tenantQq">
        <el-input v-model="tenantInfo.tenantQq"></el-input>
      </el-form-item>
      <el-form-item label="租户类型：" prop="tenantType">
        <el-select v-model="tenantInfo.tenantType" clearable>
          <el-option
            v-for="item in tenantTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="租户状态：" prop="tenantStatus">
        <el-select v-model="tenantInfo.tenantStatus" clearable>
          <el-option
            v-for="item in tenantStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="注册时间：" prop="registerDate">
        <el-input v-model="tenantInfo.registerDate"></el-input>
      </el-form-item>
      <el-form-item label="到期日期：" prop="expireDate">
        <el-input v-model="tenantInfo.expireDate"></el-input>
      </el-form-item>
      <el-form-item label="税号：" prop="creditNumber">
        <el-input v-model="tenantInfo.creditNumber"></el-input>
      </el-form-item>
      <el-form-item label="开票地址：" prop="invoiceAddress">
        <el-input v-model="tenantInfo.invoiceAddress"></el-input>
      </el-form-item>
      <el-form-item label="开户行行号：" prop="bankNo">
        <el-input v-model="tenantInfo.bankNo"></el-input>
      </el-form-item>
      <el-form-item label="开户行名称：" prop="bankName">
        <el-input v-model="tenantInfo.bankName"></el-input>
      </el-form-item>
      <el-form-item label="开户账号：" prop="bankAccount">
        <el-input v-model="tenantInfo.bankAccount"></el-input>
      </el-form-item>
      <el-form-item label="部分缴费：" prop="partChargeOn">
        <el-select v-model="tenantInfo.partChargeOn" clearable>
          <el-option
            v-for="item in partChargeOnOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="违约金：" prop="fineOn">
        <el-select v-model="tenantInfo.fineOn" clearable>
          <el-option
            v-for="item in fineOnOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="违约金宽限天数：" prop="fineDay">
        <el-input v-model="tenantInfo.fineDay"></el-input>
      </el-form-item>
      <el-form-item label="违约金每天收取比例：" prop="fineRate">
        <el-input v-model="tenantInfo.fineRate"></el-input>
      </el-form-item>
      <el-form-item label="违约金封顶比例：" prop="fineRateCap">
        <el-input v-model="tenantInfo.fineRateCap"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantInfoFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantInfoFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantInfo, getTenantInfo, updateTenantInfo} from '@/api/tenantInfo'
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantInfo={
    tenantName: '',
    tenantBalance: '',
    tenantDisplayName: '',
    tenantProvince: '',
    tenantCity: '',
    tenantArea: '',
    tenantAddress: '',
    tenantLinkman: '',
    tenantMobile: '',
    tenantPhone: '',
    tenantEmail: '',
    tenantQq: '',
    tenantType: 0,
    tenantStatus: 0,
    registerDate: '',
    expireDate: '',
    creditNumber: '',
    invoiceAddress: '',
    bankNo: '',
    bankName: '',
    bankAccount: '',
    partChargeOn: 0,
    fineOn: 0,
    fineDay: 0,
    fineRate: '',
    fineRateCap: ''
  };
  const defaultTenantTypeOptions=[
    {
      value: 1,
      label: '使用单位'
    },
    {
      value: 2,
      label: '供应单位'
    },
    {
      value: 3,
      label: '内部运营'
    }
  ];
  const defaultTenantStatusOptions=[
    {
      value: 1,
      label: '正式'
    },
    {
      value: 0,
      label: '试用'
    }
  ];
  const defaultPartChargeOnOptions=[
    {
      value: 1,
      label: '启用'
    },
    {
      value: 0,
      label: '不启用'
    }
  ];
  const defaultFineOnOptions=[
    {
      value: 1,
      label: '启用'
    },
    {
      value: 0,
      label: '不启用'
    }
  ];
  export default {
    name: 'TenantInfoDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantInfo:Object.assign({}, defaultTenantInfo),
        rules: {
          tenantName: [
            {required: true, message: '请输入租户名称', trigger: 'blur'}
          ],
          tenantBalance: [
            {required: true, message: '请输入账户余额', trigger: 'blur'}
          ],
          tenantDisplayName: [
            {required: true, message: '请输入显示名称', trigger: 'blur'}
          ],
          tenantProvince: [
            {required: true, message: '请输入省', trigger: 'blur'}
          ],
          tenantCity: [
            {required: true, message: '请输入市', trigger: 'blur'}
          ],
          tenantArea: [
            {required: true, message: '请输入区/县', trigger: 'blur'}
          ],
          tenantAddress: [
            {required: true, message: '请输入联系地址', trigger: 'blur'}
          ],
          tenantLinkman: [
            {required: true, message: '请输入联系人', trigger: 'blur'}
          ],
          tenantMobile: [
            {required: true, message: '请输入手机号码', trigger: 'blur'}
          ],
          tenantPhone: [
            {required: true, message: '请输入单位电话', trigger: 'blur'}
          ],
          tenantEmail: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
          tenantQq: [
            {required: true, message: '请输入QQ号码', trigger: 'blur'}
          ],
          tenantType: [
            {required: true, message: '请选择租户类型', trigger: 'blur'}
          ],
          tenantStatus: [
            {required: true, message: '请选择租户状态', trigger: 'blur'}
          ],
          registerDate: [
            {required: true, message: '请输入注册时间', trigger: 'blur'}
          ],
          expireDate: [
            {required: true, message: '请输入到期日期', trigger: 'blur'}
          ],
          creditNumber: [
            {required: true, message: '请输入税号', trigger: 'blur'}
          ],
          invoiceAddress: [
            {required: true, message: '请输入开票地址', trigger: 'blur'}
          ],
          bankNo: [
            {required: true, message: '请输入开户行行号', trigger: 'blur'}
          ],
          bankName: [
            {required: true, message: '请输入开户行名称', trigger: 'blur'}
          ],
          bankAccount: [
            {required: true, message: '请输入开户账号', trigger: 'blur'}
          ],
          partChargeOn: [
            {required: true, message: '请选择部分缴费', trigger: 'blur'}
          ],
          fineOn: [
            {required: true, message: '请选择违约金', trigger: 'blur'}
          ],
          fineDay: [
            {required: true, message: '请输入违约金宽限天数', trigger: 'blur'}
          ],
          fineRate: [
            {required: true, message: '请输入违约金每天收取比例', trigger: 'blur'}
          ],
          fineRateCap: [
            {required: true, message: '请输入违约金封顶比例', trigger: 'blur'}
          ]
        },
        tenantTypeOptions: Object.assign({},defaultTenantTypeOptions),
        tenantStatusOptions: Object.assign({},defaultTenantStatusOptions),
        partChargeOnOptions: Object.assign({},defaultPartChargeOnOptions),
        fineOnOptions: Object.assign({},defaultFineOnOptions)
      }
    },
    created() {
      if (this.isEdit) {
        getTenantInfo(this.$route.query.id).then(response => {
          this.tenantInfo = response.data;
        });
      }else{
        this.tenantInfo = Object.assign({},defaultTenantInfo);
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateTenantInfo(this.$route.query.id, this.tenantInfo).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantInfo(this.tenantInfo).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantInfo = Object.assign({},defaultTenantInfo);
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
        this.tenantInfo = Object.assign({},defaultTenantInfo);
      }
    }
  }
</script>
<style>
</style>


