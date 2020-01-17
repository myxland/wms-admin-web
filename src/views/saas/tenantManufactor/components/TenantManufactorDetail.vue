<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantManufactor" :rules="rules" ref="tenantManufactorFrom" label-width="150px">
      <el-form-item label="制造商ID：" prop="id">
        <el-input v-model="tenantManufactor.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        <el-select v-model="tenantManufactor.tenantId" placeholder="请选择租户ID" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="制造商名称：" prop="manufactorName">
        <el-input v-model="tenantManufactor.manufactorName"></el-input>
      </el-form-item>
      <el-form-item label="远传表接入APIKEY：" prop="manufactorApikey">
        <el-input v-model="tenantManufactor.manufactorApikey"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantManufactorFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantManufactorFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantManufactor, getTenantManufactor, updateTenantManufactor} from '@/api/tenantManufactor'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantManufactor={
    tenantId: '',
    manufactorName: '',
    manufactorApikey: ''
  };
  export default {
    name: 'TenantManufactorDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantManufactor:Object.assign({}, defaultTenantManufactor, this.$route.query),
        tenantInfoOptions:[],
        rules: {
          tenantId: [
            {required: true, message: '请输入租户ID', trigger: 'blur'}
          ],
          manufactorName: [
            {required: true, message: '请输入制造商名称', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantManufactor(this.$route.query.id).then(response => {
	          this.tenantManufactor = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantManufactorByTenantId(this.$route.query.tenantId).then(response => {
	          this.tenantManufactor = response.data;
        	});
        }
        
      }else{
        this.tenantManufactor = Object.assign({},defaultTenantManufactor,this.$route.query);
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
                updateTenantManufactor(this.$route.query.id, this.tenantManufactor).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantManufactor(this.tenantManufactor).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantManufactor = Object.assign({},defaultTenantManufactor);
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
        this.tenantManufactor = Object.assign({},defaultTenantManufactor);
      }
    }
  }
</script>
<style>
</style>


