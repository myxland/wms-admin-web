<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantWaterType" :rules="rules" ref="tenantWaterTypeFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        <el-input v-model="tenantWaterType.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="tenantWaterType.tenantId" placeholder="请选择租户" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用水类别名称：" prop="waterTypeName">
        <el-input v-model="tenantWaterType.waterTypeName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantWaterTypeFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantWaterTypeFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantWaterType, getTenantWaterType, updateTenantWaterType} from '@/api/tenantWaterType'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantWaterType={
    tenantId: '',
    waterTypeName: ''
  };
  export default {
    name: 'TenantWaterTypeDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantWaterType:Object.assign({}, defaultTenantWaterType, this.$route.query),
        tenantInfoOptions:[],
        rules: {
          tenantId: [
            {required: true, message: '请输入租户编号', trigger: 'blur'}
          ],
          waterTypeName: [
            {required: true, message: '请输入用水类别名称', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantWaterType(this.$route.query.id).then(response => {
	          this.tenantWaterType = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantWaterTypeByTenantId(this.$route.query.tenantId).then(response => {
	          this.tenantWaterType = response.data;
        	});
        }
        
      }else{
        this.tenantWaterType = Object.assign({},defaultTenantWaterType,this.$route.query);
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
                updateTenantWaterType(this.$route.query.id, this.tenantWaterType).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantWaterType(this.tenantWaterType).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantWaterType = Object.assign({},defaultTenantWaterType);
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
        this.tenantWaterType = Object.assign({},defaultTenantWaterType);
      }
    }
  }
</script>
<style>
</style>


