<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantSystem" :rules="rules" ref="tenantSystemFrom" label-width="150px">
      <el-form-item label="租户编号：" prop="tenantId">
        <el-input v-model="tenantSystem.tenantId"></el-input>
      </el-form-item>
      <el-form-item label="系统编号：" prop="systemId">
        <el-input v-model="tenantSystem.systemId"></el-input>
      </el-form-item>
      <el-form-item label="系统显示名称：" prop="systemName">
        <el-input v-model="tenantSystem.systemName"></el-input>
      </el-form-item>
      <el-form-item label="系统排序：" prop="systemOrder">
        <el-input v-model="tenantSystem.systemOrder"></el-input>
      </el-form-item>
      <el-form-item label="开通版本：" prop="systemEdition">
        <el-select v-model="tenantSystem.systemEdition" clearable>
          <el-option
            v-for="item in systemEditionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="系统状态：" prop="systemStatus">
        <el-select v-model="tenantSystem.systemStatus" clearable>
          <el-option
            v-for="item in systemStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格体系：" prop="systemPriceType">
        <el-select v-model="tenantSystem.systemPriceType" clearable>
          <el-option
            v-for="item in systemPriceTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开通时间：" prop="systemStartDate">
        <el-input v-model="tenantSystem.systemStartDate"></el-input>
      </el-form-item>
      <el-form-item label="到期时间：" prop="systemEndDate">
        <el-input v-model="tenantSystem.systemEndDate"></el-input>
      </el-form-item>
      <el-form-item label="开始计费日期：" prop="systemStartChargeDate">
        <el-input v-model="tenantSystem.systemStartChargeDate"></el-input>
      </el-form-item>
      <el-form-item label="欠费金额：" prop="systemArrears">
        <el-input v-model="tenantSystem.systemArrears"></el-input>
      </el-form-item>
      <el-form-item label="透支额度：" prop="systemOverdraft">
        <el-input v-model="tenantSystem.systemOverdraft"></el-input>
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
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantSystem={
    tenantId: '',
    systemId: '',
    systemName: '',
    systemOrder: 0,
    systemEdition: 0,
    systemStatus: 0,
    systemPriceType: 0,
    systemStartDate: '',
    systemEndDate: '',
    systemStartChargeDate: '',
    systemArrears: '',
    systemOverdraft: ''
  };
  const defaultSystemEditionOptions=[
    {
      value: 0,
      label: '基础版'
    },
    {
      value: 1,
      label: '高级版'
    },
    {
      value: 2,
      label: '旗舰版'
    }
  ];
  const defaultSystemStatusOptions=[
    {
      value: 0,
      label: '未开通'
    },
    {
      value: 1,
      label: '开通'
    }
  ];
  const defaultSystemPriceTypeOptions=[
    {
      value: 0,
      label: '标准价格'
    },
    {
      value: 1,
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
        rules: {
          tenantId: [
            {required: true, message: '请输入租户编号', trigger: 'blur'}
          ],
          systemId: [
            {required: true, message: '请输入系统编号', trigger: 'blur'}
          ],
          systemName: [
            {required: true, message: '请输入系统显示名称', trigger: 'blur'}
          ],
          systemOrder: [
            {required: true, message: '请输入系统排序', trigger: 'blur'}
          ],
          systemEdition: [
            {required: true, message: '请选择开通版本', trigger: 'blur'}
          ],
          systemStatus: [
            {required: true, message: '请选择系统状态', trigger: 'blur'}
          ],
          systemPriceType: [
            {required: true, message: '请选择价格体系', trigger: 'blur'}
          ],
          systemStartDate: [
            {required: true, message: '请输入开通时间', trigger: 'blur'}
          ],
          systemEndDate: [
            {required: true, message: '请输入到期时间', trigger: 'blur'}
          ],
          systemStartChargeDate: [
            {required: true, message: '请输入开始计费日期', trigger: 'blur'}
          ],
          systemArrears: [
            {required: true, message: '请输入欠费金额', trigger: 'blur'}
          ],
          systemOverdraft: [
            {required: true, message: '请输入透支额度', trigger: 'blur'}
          ]
        },
        systemEditionOptions: Object.assign({},defaultSystemEditionOptions),
        systemStatusOptions: Object.assign({},defaultSystemStatusOptions),
        systemPriceTypeOptions: Object.assign({},defaultSystemPriceTypeOptions)
      }
    },
    created() {
      if (this.isEdit) {
        getTenantSystem(this.$route.query.id).then(response => {
          this.tenantSystem = response.data;
        });
      }else{
        this.tenantSystem = Object.assign({},defaultTenantSystem);
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


