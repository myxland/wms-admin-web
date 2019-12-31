<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="moduleInfo" :rules="rules" ref="moduleInfoFrom" label-width="150px">
      <el-form-item label="模块ID：" prop="id">
        <el-input v-model="moduleInfo.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="模块名称：" prop="moduleName">
        <el-input v-model="moduleInfo.moduleName"></el-input>
      </el-form-item>
      <el-form-item label="开放对象：" prop="openTarget">
        <el-select
          v-model="moduleInfo.openTarget"
          clearable
          placeholder="请选择开放对象">
          <el-option
            v-for="item in openTargetOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运行环境：" prop="runEnv">
        <el-select
          v-model="moduleInfo.runEnv"
          clearable
          placeholder="请选择运行环境">
          <el-option
            v-for="item in runEnvOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="依赖模块ID：" prop="relyModuleId">
        <el-select v-model="moduleInfo.relyModuleId" placeholder="请选择依赖模块ID" :disabled="this.$route.query.moduleId?true:false" clearable>
                <el-option
                  v-for="item in moduleInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="计费模式：" prop="billingMode">
        <el-select
          v-model="moduleInfo.billingMode"
          clearable
          placeholder="请选择计费模式">
          <el-option
            v-for="item in billingModeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="计费周期：" prop="billingCycle">
        <el-select
          v-model="moduleInfo.billingCycle"
          clearable
          placeholder="请选择计费周期">
          <el-option
            v-for="item in billingCycleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="基础版：" prop="basicEditionOn">
        <el-switch
          v-model="moduleInfo.basicEditionOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="高级版：" prop="advanceEditionOn">
        <el-switch
          v-model="moduleInfo.advanceEditionOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="旗舰版：" prop="ultimateEditionOn">
        <el-switch
          v-model="moduleInfo.ultimateEditionOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="发布状态：" prop="moduleOn">
        <el-switch
          v-model="moduleInfo.moduleOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="应用APPID：" prop="moduleAppid">
        <el-input v-model="moduleInfo.moduleAppid"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('moduleInfoFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('moduleInfoFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createModuleInfo, getModuleInfo, updateModuleInfo} from '@/api/moduleInfo'
  import {fetchList as fetchModuleInfoList} from '@/api/moduleInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultModuleInfo={
    moduleName: '',
    openTarget: '',
    runEnv: '',
    relyModuleId: '',
    billingMode: '',
    billingCycle: '',
    basicEditionOn: 1,
    advanceEditionOn: 1,
    ultimateEditionOn: 1,
    moduleOn: 1,
    moduleAppid: ''
  };
  const defaultOpenTargetOptions=[
    {
      value: 1,
      label: '使用单位'
    },
    {
      value: 2,
      label: '水表厂商'
    },
    {
      value: 3,
      label: '代收机构'
    },
    {
      value: 4,
      label: '内部运营'
    },
    {
      value: 5,
      label: '分销商'
    }
  ];
  const defaultRunEnvOptions=[
    {
      value: 1,
      label: 'PC端'
    },
    {
      value: 2,
      label: '移动端'
    },
    {
      value: 3,
      label: '微信端'
    },
    {
      value: 4,
      label: '支付宝端'
    },
    {
      value: 5,
      label: 'API接口'
    },
    {
      value: 6,
      label: '自助终端'
    }
  ];
  const defaultBillingModeOptions=[
    {
      value: 1,
      label: '默认开通'
    },
    {
      value: 2,
      label: '免费'
    },
    {
      value: 3,
      label: '按量付费'
    },
    {
      value: 4,
      label: '固定价格'
    },
    {
      value: 5,
      label: '阶梯价格'
    }
  ];
  const defaultBillingCycleOptions=[
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
    name: 'ModuleInfoDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        moduleInfo:Object.assign({}, defaultModuleInfo, this.$route.query),
        moduleInfoOptions:[],
        openTargetOptions: Object.assign({},defaultOpenTargetOptions),
        runEnvOptions: Object.assign({},defaultRunEnvOptions),
        billingModeOptions: Object.assign({},defaultBillingModeOptions),
        billingCycleOptions: Object.assign({},defaultBillingCycleOptions),
        rules: {
          moduleName: [
            {required: true, message: '请输入模块名称', trigger: 'blur'}
          ],
          openTarget: [
            {required: true, message: '请选择开放对象', trigger: 'blur'}
          ],
          runEnv: [
            {required: true, message: '请选择运行环境', trigger: 'blur'}
          ],
          billingMode: [
            {required: true, message: '请选择计费模式', trigger: 'blur'}
          ],
          basicEditionOn: [
            {required: true, message: '请选择基础版', trigger: 'blur'}
          ],
          advanceEditionOn: [
            {required: true, message: '请选择高级版', trigger: 'blur'}
          ],
          ultimateEditionOn: [
            {required: true, message: '请选择旗舰版', trigger: 'blur'}
          ],
          moduleOn: [
            {required: true, message: '请选择发布状态', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getModuleInfo(this.$route.query.id).then(response => {
	          this.moduleInfo = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getModuleInfoByTenantId(this.$route.query.tenantId).then(response => {
	          this.moduleInfo = response.data;
        	});
        }
        
      }else{
        this.moduleInfo = Object.assign({},defaultModuleInfo,this.$route.query);
      }
      this.getModuleInfoList();
    },
    methods: {
      getModuleInfoList() {
        fetchModuleInfoList({pageNum:1,pageSize:500}).then(response => {
          this.moduleInfoOptions = [];
          let moduleInfoList = response.data.list;
          for(let i=0;i<moduleInfoList.length;i++){
            this.moduleInfoOptions.push({label:moduleInfoList[i].moduleName,value:moduleInfoList[i].id});
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
                updateModuleInfo(this.$route.query.id, this.moduleInfo).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createModuleInfo(this.moduleInfo).then(response => {
                  this.$refs[formName].resetFields();
                  this.moduleInfo = Object.assign({},defaultModuleInfo);
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
        this.moduleInfo = Object.assign({},defaultModuleInfo);
      }
    }
  }
</script>
<style>
</style>


