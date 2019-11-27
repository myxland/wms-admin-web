<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantConfig" :rules="rules" ref="tenantConfigFrom" label-width="150px">
      <el-form-item label="租户编号：" prop="id">
        <el-input v-model="tenantConfig.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="tenantConfig.tenantId" placeholder="请选择租户" :disabled="true" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否启用部分缴费：" prop="partChargeOn">
        <el-switch
          v-model="tenantConfig.partChargeOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="是否启用违约金：" prop="overDuefineOn">
        <el-switch
          v-model="tenantConfig.overDuefineOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="违约金宽限天数：" prop="overDuefineDay">
        <el-input-number v-model="tenantConfig.overDuefineDay" :min="0" placeholder="违约金宽限天数"></el-input-number>
      </el-form-item>
      <el-form-item label="违约金每天收取比例：" prop="overDuefineRatio">
        <el-input-number v-model="tenantConfig.overDuefineRatio" :min="0" :max="1" precision="4" placeholder="违约金每天收取比例"></el-input-number>
      </el-form-item>
      <el-form-item label="违约金封顶比例：" prop="overDuefineTopRatio">
        <el-input-number v-model="tenantConfig.overDuefineTopRatio" :min="0" :max="1" precision="4" placeholder="违约金封顶比例"></el-input-number>
      </el-form-item>
      <el-form-item label="预存抵扣方式：" prop="ycdkType" clearable>
        <el-select
          v-model="tenantConfig.ycdkType"
          placeholder="请选择预存抵扣方式">
          <el-option
            v-for="item in ycdkTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantConfigFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantConfigFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantConfig, getTenantConfig, getTenantConfigByTenantId, updateTenantConfig} from '@/api/tenantConfig'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantConfig={
    tenantId: '',
    partChargeOn: 1,
    overDuefineOn: 1,
    overDuefineDay: 0,
    overDuefineRatio: null,
    overDuefineTopRatio: null,
    ycdkType: ''
  };
  const defaultYcdkTypeOptions=[
    {
      value: 1,
      label: '抄表后即时抵扣'
    },
    {
      value: 2,
      label: '人工发起抵扣'
    }
  ];
  export default {
    name: 'TenantConfigDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantConfig:Object.assign({}, defaultTenantConfig),
        tenantInfoOptions:[],
        ycdkTypeOptions: Object.assign({},defaultYcdkTypeOptions),
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
          getTenantConfig(this.$route.query.id).then(response => {
            this.tenantConfig = response.data;
          });
        }
        if (this.$route.query.tenantId) {
          getTenantConfigByTenantId(this.$route.query.tenantId).then(response => {
            this.tenantConfig = response.data;
          });
        }
      }else{
        this.tenantConfig = Object.assign({},defaultTenantConfig);
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
                updateTenantConfig(this.$route.query.id, this.tenantConfig).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantConfig(this.tenantConfig).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantConfig = Object.assign({},defaultTenantConfig);
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
        this.tenantConfig = Object.assign({},defaultTenantConfig);
      }
    }
  }
</script>
<style>
</style>


