<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="systemDesign" :rules="rules" ref="systemDesignFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        <el-input v-model="systemDesign.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="依赖模块：" prop="relyId">
        <el-input v-model="systemDesign.relyId"></el-input>
      </el-form-item>
      <el-form-item label="模块名称：" prop="moduleName">
        <el-input v-model="systemDesign.moduleName"></el-input>
      </el-form-item>
      <el-form-item label="开放对象：" prop="openTenantType" clearable>
        <el-select
          v-model="systemDesign.openTenantType"
          placeholder="请选择开放对象">
          <el-option
            v-for="item in openTenantTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="运行环境：" prop="runEnvType" clearable>
        <el-select
          v-model="systemDesign.runEnvType"
          placeholder="请选择运行环境">
          <el-option
            v-for="item in runEnvTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="价格政策：" prop="pricePolicyType" clearable>
        <el-select
          v-model="systemDesign.pricePolicyType"
          placeholder="请选择价格政策">
          <el-option
            v-for="item in pricePolicyTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="计费周期：" prop="billCycleType" clearable>
        <el-select
          v-model="systemDesign.billCycleType"
          placeholder="请选择计费周期">
          <el-option
            v-for="item in billCycleTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="开放基础版：" prop="basicOn">
        <el-switch
          v-model="systemDesign.basicOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="开放高级版：" prop="advanceOn">
        <el-switch
          v-model="systemDesign.advanceOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="开放旗舰版：" prop="ultimateOn">
        <el-switch
          v-model="systemDesign.ultimateOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="功能发布：" prop="moduleReleaseOn">
        <el-switch
          v-model="systemDesign.moduleReleaseOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('systemDesignFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('systemDesignFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createSystemDesign, getSystemDesign, updateSystemDesign} from '@/api/systemDesign'
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultSystemDesign={
    relyId: '',
    moduleName: '',
    openTenantType: '',
    runEnvType: '',
    pricePolicyType: '',
    billCycleType: '',
    basicOn: 1,
    advanceOn: 1,
    ultimateOn: 1,
    moduleReleaseOn: 1
  };
  const defaultOpenTenantTypeOptions=[
    {
      value: 1,
      label: '使用单位'
    },
    {
      value: 2,
      label: '供应单位'
    },
    {
      value: 3,
      label: '内部运营'
    }
  ];
  const defaultRunEnvTypeOptions=[
    {
      value: 1,
      label: 'PC'
    },
    {
      value: 2,
      label: '移动端'
    }
  ];
  const defaultPricePolicyTypeOptions=[
    {
      value: 0,
      label: '免费'
    },
    {
      value: 1,
      label: '按量付费'
    },
    {
      value: 2,
      label: '固定价格'
    }
  ];
  const defaultBillCycleTypeOptions=[
    {
      value: 1,
      label: '实时'
    },
    {
      value: 2,
      label: '按天'
    },
    {
      value: 3,
      label: '按月'
    },
    {
      value: 4,
      label: '按年'
    }
  ];
  export default {
    name: 'SystemDesignDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        systemDesign:Object.assign({}, defaultSystemDesign),
        openTenantTypeOptions: Object.assign({},defaultOpenTenantTypeOptions),
        runEnvTypeOptions: Object.assign({},defaultRunEnvTypeOptions),
        pricePolicyTypeOptions: Object.assign({},defaultPricePolicyTypeOptions),
        billCycleTypeOptions: Object.assign({},defaultBillCycleTypeOptions),
        rules: {
          moduleName: [
            {required: true, message: '请输入模块名称', trigger: 'blur'}
          ],
          openTenantType: [
            {required: true, message: '请选择开放对象', trigger: 'blur'}
          ],
          runEnvType: [
            {required: true, message: '请选择运行环境', trigger: 'blur'}
          ],
          pricePolicyType: [
            {required: true, message: '请选择价格政策', trigger: 'blur'}
          ],
          basicOn: [
            {required: true, message: '请选择开放基础版', trigger: 'blur'}
          ],
          advanceOn: [
            {required: true, message: '请选择开放高级版', trigger: 'blur'}
          ],
          ultimateOn: [
            {required: true, message: '请选择开放旗舰版', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getSystemDesign(this.$route.query.id).then(response => {
          this.systemDesign = response.data;
        });
      }else{
        this.systemDesign = Object.assign({},defaultSystemDesign);
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateSystemDesign(this.$route.query.id, this.systemDesign).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createSystemDesign(this.systemDesign).then(response => {
                  this.$refs[formName].resetFields();
                  this.systemDesign = Object.assign({},defaultSystemDesign);
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
        this.systemDesign = Object.assign({},defaultSystemDesign);
      }
    }
  }
</script>
<style>
</style>


