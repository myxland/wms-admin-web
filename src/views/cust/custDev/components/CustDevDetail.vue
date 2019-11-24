<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="custDev" :rules="rules" ref="custDevFrom" label-width="150px">
      <el-form-item label="系统编号：" prop="id">
        <el-input v-model="custDev.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="custDev.tenantId" placeholder="请选择租户" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="表具编号：" prop="devId">
        <el-input v-model="custDev.devId"></el-input>
      </el-form-item>
      <el-form-item label="价格类别编号：" prop="priceTypeId">
        <el-input v-model="custDev.priceTypeId"></el-input>
      </el-form-item>
      <el-form-item label="用水类别编号：" prop="waterTypeId">
        <el-input v-model="custDev.waterTypeId"></el-input>
      </el-form-item>
      <el-form-item label="排序：" prop="devOrder">
        <el-input v-model="custDev.devOrder"></el-input>
      </el-form-item>
      <el-form-item label="混合类型：" prop="waterMixType" clearable>
        <el-select
          v-model="custDev.waterMixType"
          placeholder="请选择混合类型">
          <el-option
            v-for="item in waterMixTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="本价格用水量占比或定量：" prop="waterScale">
        <el-input v-model="custDev.waterScale"></el-input>
      </el-form-item>
      <el-form-item label="水量计算方法：" prop="waterCalcType" clearable>
        <el-select
          v-model="custDev.waterCalcType"
          placeholder="请选择水量计算方法">
          <el-option
            v-for="item in waterCalcTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item>
        <el-button type="primary" @click="onSubmit('custDevFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('custDevFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createCustDev, getCustDev, updateCustDev} from '@/api/custDev'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultCustDev={
    tenantId: '',
    devId: '',
    priceTypeId: '',
    waterTypeId: '',
    devOrder: 0,
    waterMixType: '',
    waterScale: '',
    waterCalcType: ''
  };
  const defaultWaterMixTypeOptions=[
    {
      value: 1,
      label: '定量'
    },
    {
      value: 2,
      label: '比例'
    }
  ];
  const defaultWaterCalcTypeOptions=[
    {
      value: 1,
      label: '向上取整'
    },
    {
      value: 2,
      label: '向下取整'
    },
    {
      value: 3,
      label: '保留两位小数'
    }
  ];
  export default {
    name: 'CustDevDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        custDev:Object.assign({}, defaultCustDev),
        tenantInfoOptions:[],
        waterMixTypeOptions: Object.assign({},defaultWaterMixTypeOptions),
        waterCalcTypeOptions: Object.assign({},defaultWaterCalcTypeOptions),
        rules: {
          tenantId: [
            {required: true, message: '请输入租户编号', trigger: 'blur'}
          ],
          devId: [
            {required: true, message: '请输入表具编号', trigger: 'blur'}
          ],
          priceTypeId: [
            {required: true, message: '请输入价格类别编号', trigger: 'blur'}
          ],
          waterTypeId: [
            {required: true, message: '请输入用水类别编号', trigger: 'blur'}
          ],
          devOrder: [
            {required: true, message: '请输入排序', trigger: 'blur'}
          ],
          waterMixType: [
            {required: true, message: '请选择混合类型', trigger: 'blur'}
          ],
          waterScale: [
            {required: true, message: '请输入本价格用水量占比或定量', trigger: 'blur'}
          ],
          waterCalcType: [
            {required: true, message: '请选择水量计算方法', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getCustDev(this.$route.query.id).then(response => {
          this.custDev = response.data;
        });
      }else{
        this.custDev = Object.assign({},defaultCustDev);
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
                updateCustDev(this.$route.query.id, this.custDev).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createCustDev(this.custDev).then(response => {
                  this.$refs[formName].resetFields();
                  this.custDev = Object.assign({},defaultCustDev);
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
        this.custDev = Object.assign({},defaultCustDev);
      }
    }
  }
</script>
<style>
</style>


