<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantCustType" :rules="rules" ref="tenantCustTypeFrom" label-width="150px">
      <el-form-item label="用户类型：" prop="id">
        <el-input v-model="tenantCustType.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="tenantCustType.tenantId" placeholder="请选择租户" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户类别名称：" prop="custTypeName">
        <el-input v-model="tenantCustType.custTypeName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantCustTypeFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantCustTypeFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantCustType, getTenantCustType, updateTenantCustType} from '@/api/tenantCustType'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantCustType={
    tenantId: '',
    custTypeName: ''
  };
  export default {
    name: 'TenantCustTypeDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantCustType:Object.assign({}, defaultTenantCustType),
        tenantInfoOptions:[],
        rules: {
          tenantId: [
            {required: true, message: '请输入租户编号', trigger: 'blur'}
          ],
          custTypeName: [
            {required: true, message: '请输入用户类别名称', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getTenantCustType(this.$route.query.id).then(response => {
          this.tenantCustType = response.data;
        });
      }else{
        this.tenantCustType = Object.assign({},defaultTenantCustType);
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
                updateTenantCustType(this.$route.query.id, this.tenantCustType).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantCustType(this.tenantCustType).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantCustType = Object.assign({},defaultTenantCustType);
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
        this.tenantCustType = Object.assign({},defaultTenantCustType);
      }
    }
  }
</script>
<style>
</style>


