<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantSystem" :rules="rules" ref="tenantSystemFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        <el-input v-model="tenantSystem.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="tenantSystem.tenantId" placeholder="请选择租户" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模块：" prop="sysId">
        <el-select v-model="tenantSystem.sysId" placeholder="请选择模块" clearable>
                <el-option
                  v-for="item in systemDesignOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模块显示名称：" prop="sysDispName">
        <el-input v-model="tenantSystem.sysDispName"></el-input>
      </el-form-item>
      <el-form-item label="模块排序：" prop="sysOrder">
        <el-input v-model="tenantSystem.sysOrder"></el-input>
      </el-form-item>
      <el-form-item label="开通版本：" prop="sysEdition" clearable>
        <el-select
          v-model="tenantSystem.sysEdition"
          placeholder="请选择开通版本">
          <el-option
            v-for="item in sysEditionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="模块状态：" prop="sysStatus">
        <el-switch
          v-model="tenantSystem.sysStatus"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="价格体系：" prop="sysPriceType" clearable>
        <el-select
          v-model="tenantSystem.sysPriceType"
          placeholder="请选择价格体系">
          <el-option
            v-for="item in sysPriceTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="开通时间：" prop="sysOpenDate">
        <el-date-picker
                class="input-width"
                v-model="tenantSystem.sysOpenDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择开通时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="到期时间：" prop="sysEndDate">
        <el-date-picker
                class="input-width"
                v-model="tenantSystem.sysEndDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择到期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="开始计费日期：" prop="sysStartChargeDate">
        <el-date-picker
                class="input-width"
                v-model="tenantSystem.sysStartChargeDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择开始计费日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="欠费金额：" prop="sysArrears">
        <el-input v-model="tenantSystem.sysArrears"></el-input>
      </el-form-item>
      <el-form-item label="透支额度：" prop="sysOverdraft">
        <el-input v-model="tenantSystem.sysOverdraft"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantSystemFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantSystemFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantSystem, getTenantSystem, updateTenantSystem} from '@/api/tenantSystem'
  import {fetchList as fetchSystemDesignList} from '@/api/systemDesign';
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantSystem={
    tenantId: '',
    sysId: '',
    sysDispName: '',
    sysOrder: 0,
    sysEdition: '',
    sysStatus: 1,
    sysPriceType: '',
    sysOpenDate: '',
    sysEndDate: '',
    sysStartChargeDate: '',
    sysArrears: '',
    sysOverdraft: ''
  };
  const defaultSysEditionOptions=[
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
  const defaultSysPriceTypeOptions=[
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
    name: 'TenantSystemDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantSystem:Object.assign({}, defaultTenantSystem),
        systemDesignOptions:[],
        tenantInfoOptions:[],
        sysEditionOptions: Object.assign({},defaultSysEditionOptions),
        sysPriceTypeOptions: Object.assign({},defaultSysPriceTypeOptions),
        rules: {
          sysDispName: [
            {required: true, message: '请输入模块显示名称', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getTenantSystem(this.$route.query.id).then(response => {
          let data = response.data;
          data.sysOpenDate = formatDate(new Date(data.sysOpenDate), 'yyyy-MM-dd hh:mm:ss');
          data.sysEndDate = formatDate(new Date(data.sysEndDate), 'yyyy-MM-dd hh:mm:ss');
          data.sysStartChargeDate = formatDate(new Date(data.sysStartChargeDate), 'yyyy-MM-dd');
          this.tenantSystem = data;
          //this.tenantSystem = response.data;
        });
      }else{
        this.tenantSystem = Object.assign({},defaultTenantSystem);
      }
      this.getSystemDesignList();
      this.getTenantInfoList();
    },
    methods: {
      getSystemDesignList() {
        fetchSystemDesignList({pageNum:1,pageSize:100}).then(response => {
          this.systemDesignOptions = [];
          let systemDesignList = response.data.list;
          for(let i=0;i<systemDesignList.length;i++){
            this.systemDesignOptions.push({label:systemDesignList[i].moduleName,value:systemDesignList[i].id});
          }
        });
      },
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
                updateTenantSystem(this.$route.query.id, this.tenantSystem).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantSystem(this.tenantSystem).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantSystem = Object.assign({},defaultTenantSystem);
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
        this.tenantSystem = Object.assign({},defaultTenantSystem);
      }
    }
  }
</script>
<style>
</style>


