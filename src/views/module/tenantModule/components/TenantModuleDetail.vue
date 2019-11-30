<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantModule" :rules="rules" ref="tenantModuleFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        <el-input v-model="tenantModule.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="tenantModule.tenantId" placeholder="请选择租户" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模块显示名称：" prop="moduleDisplayName">
        <el-input v-model="tenantModule.moduleDisplayName"></el-input>
      </el-form-item>
      <el-form-item label="模块排序：" prop="moduleOrder">
        <el-input-number v-model="tenantModule.moduleOrder" :min="0" placeholder="模块排序"></el-input-number>
      </el-form-item>
      <el-form-item label="开通版本：" prop="moduleEdition" clearable>
        <el-select
          v-model="tenantModule.moduleEdition"
          placeholder="请选择开通版本">
          <el-option
            v-for="item in moduleEditionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="模块状态：" prop="moduleStatus">
        <el-switch
          v-model="tenantModule.moduleStatus"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="价格体系：" prop="modulePriceType" clearable>
        <el-select
          v-model="tenantModule.modulePriceType"
          placeholder="请选择价格体系">
          <el-option
            v-for="item in modulePriceTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="开通时间：" prop="moduleOpenDate">
        <el-date-picker
                class="input-width"
                v-model="tenantModule.moduleOpenDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择开通时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="到期时间：" prop="moduleEndDate">
        <el-date-picker
                class="input-width"
                v-model="tenantModule.moduleEndDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择到期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="开始计费日期：" prop="moduleStartChargeDate">
        <el-date-picker
                class="input-width"
                v-model="tenantModule.moduleStartChargeDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择开始计费日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="欠费金额：" prop="moduleArrears">
        <el-input-number v-model="tenantModule.moduleArrears" :min="0" :precision="2" placeholder="欠费金额"></el-input-number>
      </el-form-item>
      <el-form-item label="透支额度：" prop="moduleOverdraft">
        <el-input-number v-model="tenantModule.moduleOverdraft" :min="0" :precision="2" placeholder="透支额度"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantModuleFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantModuleFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantModule, getTenantModule, updateTenantModule} from '@/api/tenantModule'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantModule={
    tenantId: '',
    moduleDisplayName: '',
    moduleOrder: 0,
    moduleEdition: '',
    moduleStatus: 1,
    modulePriceType: '',
    moduleOpenDate: '',
    moduleEndDate: '',
    moduleStartChargeDate: '',
    moduleArrears: null,
    moduleOverdraft: null
  };
  const defaultModuleEditionOptions=[
    {
      value: 1,
      label: '基础版'
    },
    {
      value: 2,
      label: '高级版'
    },
    {
      value: 3,
      label: '旗舰版'
    }
  ];
  const defaultModulePriceTypeOptions=[
    {
      value: 1,
      label: '标准价格'
    },
    {
      value: 2,
      label: '指定价格'
    }
  ];
  export default {
    name: 'TenantModuleDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantModule:Object.assign({}, defaultTenantModule, this.$route.query),
        tenantInfoOptions:[],
        moduleEditionOptions: Object.assign({},defaultModuleEditionOptions),
        modulePriceTypeOptions: Object.assign({},defaultModulePriceTypeOptions),
        rules: {
          tenantId: [
            {required: true, message: '请输入租户编号', trigger: 'blur'}
          ],
          moduleDisplayName: [
            {required: true, message: '请输入模块显示名称', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantModule(this.$route.query.id).then(response => {
	          let data = response.data;
	          data.moduleOpenDate = formatDate(new Date(data.moduleOpenDate), 'yyyy-MM-dd hh:mm:ss');
	          data.moduleEndDate = formatDate(new Date(data.moduleEndDate), 'yyyy-MM-dd hh:mm:ss');
	          data.moduleStartChargeDate = formatDate(new Date(data.moduleStartChargeDate), 'yyyy-MM-dd');
	          this.tenantModule = data;
	          //this.tenantModule = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantModuleByTenantId(this.$route.query.tenantId).then(response => {
	          let data = response.data;
	          data.moduleOpenDate = formatDate(new Date(data.moduleOpenDate), 'yyyy-MM-dd hh:mm:ss');
	          data.moduleEndDate = formatDate(new Date(data.moduleEndDate), 'yyyy-MM-dd hh:mm:ss');
	          data.moduleStartChargeDate = formatDate(new Date(data.moduleStartChargeDate), 'yyyy-MM-dd');
	          this.tenantModule = data;
	          //this.tenantModule = response.data;
        	});
        }
        
      }else{
        this.tenantModule = Object.assign({},defaultTenantModule,this.$route.query);
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
                updateTenantModule(this.$route.query.id, this.tenantModule).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantModule(this.tenantModule).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantModule = Object.assign({},defaultTenantModule);
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
        this.tenantModule = Object.assign({},defaultTenantModule);
      }
    }
  }
</script>
<style>
</style>


