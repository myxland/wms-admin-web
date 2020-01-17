<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantMeterStatus" :rules="rules" ref="tenantMeterStatusFrom" label-width="150px">
      <el-form-item label="表况ID：" prop="id">
        <el-input v-model="tenantMeterStatus.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        <el-select v-model="tenantMeterStatus.tenantId" placeholder="请选择租户ID" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="表况名称：" prop="meterStatusName">
        <el-input v-model="tenantMeterStatus.meterStatusName"></el-input>
      </el-form-item>
      <el-form-item label="水量计算方式：" prop="usenumCalcType">
        <el-select
          v-model="tenantMeterStatus.usenumCalcType"
          clearable
          placeholder="请选择水量计算方式">
          <el-option
            v-for="item in usenumCalcTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生成工单类型：" prop="workBillType">
        <el-select
          v-model="tenantMeterStatus.workBillType"
          clearable
          placeholder="请选择生成工单类型">
          <el-option
            v-for="item in workBillTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建方式：" prop="createType">
        <el-input v-model="tenantMeterStatus.createType"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantMeterStatusFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantMeterStatusFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantMeterStatus, getTenantMeterStatus, updateTenantMeterStatus} from '@/api/tenantMeterStatus'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantMeterStatus={
    tenantId: '',
    meterStatusName: '',
    usenumCalcType: '',
    workBillType: '',
    createType: ''
  };
  const defaultUsenumCalcTypeOptions=[
    {
      value: 1,
      label: '自动计算'
    },
    {
      value: 2,
      label: '手工输入'
    }
  ];
  const defaultWorkBillTypeOptions=[
    {
      value: 0,
      label: '不生成'
    },
    {
      value: 1,
      label: '故障换表'
    },
    {
      value: 3,
      label: '周期换表'
    }
  ];
  export default {
    name: 'TenantMeterStatusDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantMeterStatus:Object.assign({}, defaultTenantMeterStatus, this.$route.query),
        tenantInfoOptions:[],
        usenumCalcTypeOptions: Object.assign({},defaultUsenumCalcTypeOptions),
        workBillTypeOptions: Object.assign({},defaultWorkBillTypeOptions),
        rules: {
          tenantId: [
            {required: true, message: '请输入租户ID', trigger: 'blur'}
          ],
          meterStatusName: [
            {required: true, message: '请输入表况名称', trigger: 'blur'}
          ],
          usenumCalcType: [
            {required: true, message: '请选择水量计算方式', trigger: 'blur'}
          ],
          workBillType: [
            {required: true, message: '请选择生成工单类型', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantMeterStatus(this.$route.query.id).then(response => {
	          this.tenantMeterStatus = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantMeterStatusByTenantId(this.$route.query.tenantId).then(response => {
	          this.tenantMeterStatus = response.data;
        	});
        }
        
      }else{
        this.tenantMeterStatus = Object.assign({},defaultTenantMeterStatus,this.$route.query);
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
                updateTenantMeterStatus(this.$route.query.id, this.tenantMeterStatus).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantMeterStatus(this.tenantMeterStatus).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantMeterStatus = Object.assign({},defaultTenantMeterStatus);
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
        this.tenantMeterStatus = Object.assign({},defaultTenantMeterStatus);
      }
    }
  }
</script>
<style>
</style>


