<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantBill" :rules="rules" ref="tenantBillFrom" label-width="150px">
      <el-form-item label="编号ID：" prop="id">
        <el-input v-model="tenantBill.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="tenantBill.tenantId" placeholder="请选择租户" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户发票开具方式：" prop="billPrintType">
        <el-input v-model="tenantBill.billPrintType"></el-input>
      </el-form-item>
      <el-form-item label="发票备注定义：" prop="billRemark">
        <el-input v-model="tenantBill.billRemark"></el-input>
      </el-form-item>
      <el-form-item label="电子发票服务商：" prop="billService">
        <el-input v-model="tenantBill.billService"></el-input>
      </el-form-item>
      <el-form-item label="接入代码：" prop="billJrdm">
        <el-input v-model="tenantBill.billJrdm"></el-input>
      </el-form-item>
      <el-form-item label="签名值参数：" prop="billQmcs">
        <el-input v-model="tenantBill.billQmcs"></el-input>
      </el-form-item>
      <el-form-item label="税控盘编号：" prop="billSkpbh">
        <el-input v-model="tenantBill.billSkpbh"></el-input>
      </el-form-item>
      <el-form-item label="税控盘口令：" prop="billSkpkl">
        <el-input v-model="tenantBill.billSkpkl"></el-input>
      </el-form-item>
      <el-form-item label="税务数字证书密码：" prop="billKeypwd">
        <el-input v-model="tenantBill.billKeypwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantBillFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantBillFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantBill, getTenantBill, updateTenantBill} from '@/api/tenantBill'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantBill={
    tenantId: '',
    billPrintType: 0,
    billRemark: '',
    billService: '',
    billJrdm: '',
    billQmcs: '',
    billSkpbh: '',
    billSkpkl: '',
    billKeypwd: ''
  };
  const defaultBillPrintTypeOptions=[
  ];
  export default {
    name: 'TenantBillDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantBill:Object.assign({}, defaultTenantBill),
        tenantInfoOptions:[],
        rules: {
        },
        billPrintTypeOptions: Object.assign({},defaultBillPrintTypeOptions)
      }
    },
    created() {
      if (this.isEdit) {
        getTenantBill(this.$route.query.id).then(response => {
          this.tenantBill = response.data;
        });
      }else{
        this.tenantBill = Object.assign({},defaultTenantBill);
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
                updateTenantBill(this.$route.query.id, this.tenantBill).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantBill(this.tenantBill).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantBill = Object.assign({},defaultTenantBill);
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
        this.tenantBill = Object.assign({},defaultTenantBill);
      }
    }
  }
</script>
<style>
</style>


