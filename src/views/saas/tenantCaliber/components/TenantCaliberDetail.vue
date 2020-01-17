<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantCaliber" :rules="rules" ref="tenantCaliberFrom" label-width="150px">
      <el-form-item label="口径ID：" prop="id">
        <el-input v-model="tenantCaliber.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        <el-select v-model="tenantCaliber.tenantId" placeholder="请选择租户ID" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="口径名称：" prop="caliberName">
        <el-input v-model="tenantCaliber.caliberName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantCaliberFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantCaliberFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantCaliber, getTenantCaliber, updateTenantCaliber} from '@/api/tenantCaliber'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantCaliber={
    tenantId: '',
    caliberName: ''
  };
  export default {
    name: 'TenantCaliberDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantCaliber:Object.assign({}, defaultTenantCaliber, this.$route.query),
        tenantInfoOptions:[],
        rules: {
          tenantId: [
            {required: true, message: '请输入租户ID', trigger: 'blur'}
          ],
          caliberName: [
            {required: true, message: '请输入口径名称', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantCaliber(this.$route.query.id).then(response => {
	          this.tenantCaliber = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantCaliberByTenantId(this.$route.query.tenantId).then(response => {
	          this.tenantCaliber = response.data;
        	});
        }
        
      }else{
        this.tenantCaliber = Object.assign({},defaultTenantCaliber,this.$route.query);
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
                updateTenantCaliber(this.$route.query.id, this.tenantCaliber).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantCaliber(this.tenantCaliber).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantCaliber = Object.assign({},defaultTenantCaliber);
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
        this.tenantCaliber = Object.assign({},defaultTenantCaliber);
      }
    }
  }
</script>
<style>
</style>


