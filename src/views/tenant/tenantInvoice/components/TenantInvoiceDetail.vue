<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantInvoice" :rules="rules" ref="tenantInvoiceFrom" label-width="150px">
      <el-form-item label="租户编号：" prop="id">
        <el-input v-model="tenantInvoice.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="tenantInvoice.tenantId" placeholder="请选择租户" :disabled="true" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="税号：" prop="creditNumber">
        <el-input v-model="tenantInvoice.creditNumber"></el-input>
      </el-form-item>
      <el-form-item label="开票地址：" prop="invoiceAddress">
        <el-input v-model="tenantInvoice.invoiceAddress"></el-input>
      </el-form-item>
      <el-form-item label="开户行行号：" prop="bankNo">
        <el-input v-model="tenantInvoice.bankNo"></el-input>
      </el-form-item>
      <el-form-item label="开户行名称：" prop="bankName">
        <el-input v-model="tenantInvoice.bankName"></el-input>
      </el-form-item>
      <el-form-item label="开户账号：" prop="accountNo">
        <el-input v-model="tenantInvoice.accountNo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantInvoiceFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantInvoiceFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantInvoice, getTenantInvoice, getTenantInvoiceByTenantId, updateTenantInvoice} from '@/api/tenantInvoice'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantInvoice={
    tenantId: '',
    creditNumber: '',
    invoiceAddress: '',
    bankNo: '',
    bankName: '',
    accountNo: ''
  };
  export default {
    name: 'TenantInvoiceDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantInvoice:Object.assign({}, defaultTenantInvoice),
        tenantInfoOptions:[],
        rules: {
          tenantId: [
            {required: true, message: '请输入租户编号', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantInvoice(this.$route.query.id).then(response => {
	          this.tenantInvoice = response.data;
        	});
        }
        if (this.$route.query.tenantId) {
          getTenantInvoiceByTenantId(this.$route.query.tenantId).then(response => {
	          this.tenantInvoice = response.data;
        	});
        }
        
      }else{
        this.tenantInvoice = Object.assign({},defaultTenantInvoice);
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
                updateTenantInvoice(this.$route.query.id, this.tenantInvoice).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantInvoice(this.tenantInvoice).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantInvoice = Object.assign({},defaultTenantInvoice);
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
        this.tenantInvoice = Object.assign({},defaultTenantInvoice);
      }
    }
  }
</script>
<style>
</style>


