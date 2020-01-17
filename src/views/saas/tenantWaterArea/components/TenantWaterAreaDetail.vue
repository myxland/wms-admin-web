<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantWaterArea" :rules="rules" ref="tenantWaterAreaFrom" label-width="150px">
      <el-form-item label="供水区域ID：" prop="id">
        <el-input v-model="tenantWaterArea.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        <el-select v-model="tenantWaterArea.tenantId" placeholder="请选择租户ID" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供水区域名称：" prop="waterAreaName">
        <el-input v-model="tenantWaterArea.waterAreaName"></el-input>
      </el-form-item>
      <el-form-item label="上级供水区域ID：" prop="waterAreaParentId">
        <el-input v-model="tenantWaterArea.waterAreaParentId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantWaterAreaFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantWaterAreaFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantWaterArea, getTenantWaterArea, updateTenantWaterArea} from '@/api/tenantWaterArea'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantWaterArea={
    tenantId: '',
    waterAreaName: '',
    waterAreaParentId: ''
  };
  export default {
    name: 'TenantWaterAreaDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantWaterArea:Object.assign({}, defaultTenantWaterArea, this.$route.query),
        tenantInfoOptions:[],
        rules: {
          tenantId: [
            {required: true, message: '请输入租户ID', trigger: 'blur'}
          ],
          waterAreaName: [
            {required: true, message: '请输入供水区域名称', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantWaterArea(this.$route.query.id).then(response => {
	          this.tenantWaterArea = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantWaterAreaByTenantId(this.$route.query.tenantId).then(response => {
	          this.tenantWaterArea = response.data;
        	});
        }
        
      }else{
        this.tenantWaterArea = Object.assign({},defaultTenantWaterArea,this.$route.query);
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
                updateTenantWaterArea(this.$route.query.id, this.tenantWaterArea).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantWaterArea(this.tenantWaterArea).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantWaterArea = Object.assign({},defaultTenantWaterArea);
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
        this.tenantWaterArea = Object.assign({},defaultTenantWaterArea);
      }
    }
  }
</script>
<style>
</style>


