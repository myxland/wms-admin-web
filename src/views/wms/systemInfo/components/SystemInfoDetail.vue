<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="systemInfo" :rules="rules" ref="systemInfoFrom" label-width="150px">
      <el-form-item label="系统名称：" prop="systemName">
        <el-input v-model="systemInfo.systemName"></el-input>
      </el-form-item>
      <el-form-item label="开放对象：" prop="tenantType">
        <el-select v-model="systemInfo.tenantType" clearable>
          <el-option
            v-for="item in tenantTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运行环境：" prop="runtimeEnvironment">
        <el-select v-model="systemInfo.runtimeEnvironment" clearable>
          <el-option
            v-for="item in runtimeEnvironmentOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="依赖系统：" prop="dependentSystemId">
        <el-input v-model="systemInfo.dependentSystemId"></el-input>
      </el-form-item>
      <el-form-item label="价格政策：" prop="priceType">
        <el-select v-model="systemInfo.priceType" clearable>
          <el-option
            v-for="item in priceTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="计费周期：" prop="billCycle">
        <el-select v-model="systemInfo.billCycle" clearable>
          <el-option
            v-for="item in billCycleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开放基础版：" prop="basicOn">
        <el-select v-model="systemInfo.basicOn" clearable>
          <el-option
            v-for="item in basicOnOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开放高级版：" prop="advanceOn">
        <el-select v-model="systemInfo.advanceOn" clearable>
          <el-option
            v-for="item in advanceOnOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开放旗舰版：" prop="ultimateOn">
        <el-select v-model="systemInfo.ultimateOn" clearable>
          <el-option
            v-for="item in ultimateOnOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布状态：" prop="issueOn">
        <el-select v-model="systemInfo.issueOn" clearable>
          <el-option
            v-for="item in issueOnOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('systemInfoFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('systemInfoFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createSystemInfo, getSystemInfo, updateSystemInfo} from '@/api/systemInfo'
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultSystemInfo={
    systemName: '',
    tenantType: 0,
    runtimeEnvironment: 0,
    dependentSystemId: '',
    priceType: 0,
    billCycle: 0,
    basicOn: 0,
    advanceOn: 0,
    ultimateOn: 0,
    issueOn: 0
  };
  const defaultTenantTypeOptions=[
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
  const defaultRuntimeEnvironmentOptions=[
    {
      value: 0,
      label: 'PC'
    },
    {
      value: 1,
      label: '移动端'
    }
  ];
  const defaultPriceTypeOptions=[
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
  const defaultBillCycleOptions=[
    {
      value: 0,
      label: '实时'
    },
    {
      value: 1,
      label: '按天'
    },
    {
      value: 2,
      label: '按月'
    },
    {
      value: 3,
      label: '按年'
    }
  ];
  const defaultBasicOnOptions=[
    {
      value: 0,
      label: '未开放'
    },
    {
      value: 1,
      label: '开放'
    }
  ];
  const defaultAdvanceOnOptions=[
    {
      value: 0,
      label: '未开放'
    },
    {
      value: 1,
      label: '开放'
    }
  ];
  const defaultUltimateOnOptions=[
    {
      value: 0,
      label: '未开放'
    },
    {
      value: 1,
      label: '开放'
    }
  ];
  const defaultIssueOnOptions=[
    {
      value: 0,
      label: '未发布'
    },
    {
      value: 1,
      label: '已发布'
    }
  ];
  export default {
    name: 'SystemInfoDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        systemInfo:Object.assign({}, defaultSystemInfo),
        rules: {
          systemName: [
            {required: true, message: '请输入系统名称', trigger: 'blur'}
          ],
          tenantType: [
            {required: true, message: '请选择开放对象', trigger: 'blur'}
          ],
          runtimeEnvironment: [
            {required: true, message: '请选择运行环境', trigger: 'blur'}
          ],
          dependentSystemId: [
            {required: true, message: '请输入依赖系统', trigger: 'blur'}
          ],
          priceType: [
            {required: true, message: '请选择价格政策', trigger: 'blur'}
          ],
          billCycle: [
            {required: true, message: '请选择计费周期', trigger: 'blur'}
          ],
          basicOn: [
            {required: true, message: '请选择开放基础版', trigger: 'blur'}
          ],
          advanceOn: [
            {required: true, message: '请选择开放高级版', trigger: 'blur'}
          ],
          ultimateOn: [
            {required: true, message: '请选择开放旗舰版', trigger: 'blur'}
          ],
          issueOn: [
            {required: true, message: '请选择发布状态', trigger: 'blur'}
          ]
        },
        tenantTypeOptions: Object.assign({},defaultTenantTypeOptions),
        runtimeEnvironmentOptions: Object.assign({},defaultRuntimeEnvironmentOptions),
        priceTypeOptions: Object.assign({},defaultPriceTypeOptions),
        billCycleOptions: Object.assign({},defaultBillCycleOptions),
        basicOnOptions: Object.assign({},defaultBasicOnOptions),
        advanceOnOptions: Object.assign({},defaultAdvanceOnOptions),
        ultimateOnOptions: Object.assign({},defaultUltimateOnOptions),
        issueOnOptions: Object.assign({},defaultIssueOnOptions)
      }
    },
    created() {
      if (this.isEdit) {
        getSystemInfo(this.$route.query.id).then(response => {
          this.systemInfo = response.data;
        });
      }else{
        this.systemInfo = Object.assign({},defaultSystemInfo);
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
                updateSystemInfo(this.$route.query.id, this.systemInfo).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createSystemInfo(this.systemInfo).then(response => {
                  this.$refs[formName].resetFields();
                  this.systemInfo = Object.assign({},defaultSystemInfo);
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
        this.systemInfo = Object.assign({},defaultSystemInfo);
      }
    }
  }
</script>
<style>
</style>


