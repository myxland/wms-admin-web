<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantCustomerType" :rules="rules" ref="tenantCustomerTypeFrom" label-width="150px">
      <el-form-item label="用户类别ID：" prop="id">
        <el-input v-model="tenantCustomerType.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        <el-select v-model="tenantCustomerType.tenantId" placeholder="请选择租户ID" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户类别名称：" prop="customerTypeName">
        <el-input v-model="tenantCustomerType.customerTypeName"></el-input>
      </el-form-item>
      <el-form-item label="上级用户类别ID：" prop="customerTypeParentId">
        <el-input v-model="tenantCustomerType.customerTypeParentId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantCustomerTypeFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantCustomerTypeFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantCustomerType, getTenantCustomerType, updateTenantCustomerType} from '@/api/tenantCustomerType'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantCustomerType={
    tenantId: '',
    customerTypeName: '',
    customerTypeParentId: ''
  };
  export default {
    name: 'TenantCustomerTypeDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantCustomerType:Object.assign({}, defaultTenantCustomerType, this.$route.query),
        tenantInfoOptions:[],
        rules: {
          tenantId: [
            {required: true, message: '请输入租户ID', trigger: 'blur'}
          ],
          customerTypeName: [
            {required: true, message: '请输入用户类别名称', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantCustomerType(this.$route.query.id).then(response => {
	          this.tenantCustomerType = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantCustomerTypeByTenantId(this.$route.query.tenantId).then(response => {
	          this.tenantCustomerType = response.data;
        	});
        }
        
      }else{
        this.tenantCustomerType = Object.assign({},defaultTenantCustomerType,this.$route.query);
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
                updateTenantCustomerType(this.$route.query.id, this.tenantCustomerType).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantCustomerType(this.tenantCustomerType).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantCustomerType = Object.assign({},defaultTenantCustomerType);
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
        this.tenantCustomerType = Object.assign({},defaultTenantCustomerType);
      }
    }
  }
</script>
<style>
</style>


