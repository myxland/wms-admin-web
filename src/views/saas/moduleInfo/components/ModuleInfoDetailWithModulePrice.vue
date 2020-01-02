<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="moduleInfo" :rules="rules" ref="moduleInfoFrom" label-width="150px">
      <el-form-item label="模块ID：" v-if="isEdit" prop="id">
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
      <el-form-item label="发布状态：" v-if="isEdit" prop="moduleOn">
        <el-switch
          v-model="moduleInfo.moduleOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label-width="0">
      <el-tabs v-model="moduleInfo.moduleDefaultModulePrice"  type="card">
          <el-tab-pane label="基础版" name="basic" v-if="moduleInfo.basicEditionOn">
              <el-table ref="modulePriceTableBasic"
                        :data="moduleInfo.basicModulePriceList"
                        style="width: 100%"
                        v-loading="listLoading">
                <el-table-column label="起始量" width="140" align="left" header-align="center">
                  <template slot-scope="scope"><el-input-number size="mini" v-model="scope.row.startNum" :min="0" placeholder="起始量"></el-input-number></template>                  
                </el-table-column>
                <el-table-column label="终止量" width="140" align="left" header-align="center">
                  <template slot-scope="scope"><el-input-number size="mini" v-model="scope.row.endNum" :min="0" placeholder="终止量"></el-input-number></template>
                </el-table-column>
                <el-table-column label="价格" width="140" align="right" header-align="center">
                  <template slot-scope="scope"><el-input-number size="mini" v-model="scope.row.priceMoney" :min="0" :precision="2" placeholder="价格"></el-input-number></template>
                </el-table-column>
                <el-table-column label="操作" width="140" align="center">
                  <template slot-scope="scope">                    
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleAppendRowBasic(scope.$index, scope.row)" plain></el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDeleteRowBasic(scope.$index, scope.row)" plain></el-button>
                  </template>
                </el-table-column>
              </el-table>
          </el-tab-pane>
          <el-tab-pane label="高级版" name="advance" v-if="moduleInfo.advanceEditionOn">
              <el-table ref="modulePriceTableAdvance"
                        :data="moduleInfo.advanceModulePriceList"
                        style="width: 100%"
                        v-loading="listLoading">
                <el-table-column label="起始量" width="140" align="left" header-align="center">
                  <template slot-scope="scope"><el-input-number size="mini" v-model="scope.row.startNum" :min="0" placeholder="起始量"></el-input-number></template>                  
                </el-table-column>
                <el-table-column label="终止量" width="140" align="left" header-align="center">
                  <template slot-scope="scope"><el-input-number size="mini" v-model="scope.row.endNum" :min="0" placeholder="终止量"></el-input-number></template>
                </el-table-column>
                <el-table-column label="价格" width="140" align="right" header-align="center">
                  <template slot-scope="scope"><el-input-number size="mini" v-model="scope.row.priceMoney" :min="0" :precision="2" placeholder="价格"></el-input-number></template>
                </el-table-column>
                <el-table-column label="操作" width="140" align="center">
                  <template slot-scope="scope">                    
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleAppendRowAdvance(scope.$index, scope.row)" plain></el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDeleteRowAdvance(scope.$index, scope.row)" plain></el-button>
                  </template>
                </el-table-column>
              </el-table>
          </el-tab-pane>
          <el-tab-pane label="旗舰版" name="ultimate" v-if="moduleInfo.ultimateEditionOn">
              <el-table ref="modulePriceTableUltimate"
                        :data="moduleInfo.ultimateModulePriceList"
                        style="width: 100%"
                        v-loading="listLoading">
                <el-table-column label="起始量" width="140" align="left" header-align="center">
                  <template slot-scope="scope"><el-input-number size="mini" v-model="scope.row.startNum" :min="0" placeholder="起始量"></el-input-number></template>                  
                </el-table-column>
                <el-table-column label="终止量" width="140" align="left" header-align="center">
                  <template slot-scope="scope"><el-input-number size="mini" v-model="scope.row.endNum" :min="0" placeholder="终止量"></el-input-number></template>
                </el-table-column>
                <el-table-column label="价格" width="140" align="right" header-align="center">
                  <template slot-scope="scope"><el-input-number size="mini" v-model="scope.row.priceMoney" :min="0" :precision="2" placeholder="价格"></el-input-number></template>
                </el-table-column>
                <el-table-column label="操作" width="140" align="center">
                  <template slot-scope="scope">                    
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleAppendRowUltimate(scope.$index, scope.row)" plain></el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDeleteRowUltimate(scope.$index, scope.row)" plain></el-button>
                  </template>
                </el-table-column>
              </el-table>
          </el-tab-pane>
        </el-tabs>
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
  import {fetchList as fetchModulePriceList} from '@/api/modulePrice';
  import SingleUpload from '@/components/Upload/singleUpload';
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
    moduleAppid: '',
    moduleDefaultModulePrice:"basic",
    basicModulePriceList:[{"startNum":0,"endNum":0,"priceMoney":0}],
    advanceModulePriceList:[{"startNum":0,"endNum":0,"priceMoney":0}],
    ultimateModulePriceList:[{"startNum":0,"endNum":0,"priceMoney":0}]
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
    name: 'ModuleInfoDetailWithModulePrice',
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
        listLoading: false,
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
      handleAppendRowBasic(index, row){
        this.moduleInfo.basicModulePriceList.push({"startNum":0,"endNum":0,"priceMoney":0}); 
      },
      handleDeleteRowBasic(index, row){
        this.moduleInfo.basicModulePriceList.splice(index,1);
        if(this.moduleInfo.basicModulePriceList.length==0){
          this.moduleInfo.basicModulePriceList.push({"startNum":0,"endNum":0,"priceMoney":0});
        }
        
      },
      handleAppendRowAdvance(index, row){
        this.moduleInfo.advanceModulePriceList.push({"startNum":0,"endNum":0,"priceMoney":0}); 
      },
      handleDeleteRowAdvance(index, row){
        this.moduleInfo.advanceModulePriceList.splice(index,1);
        if(this.moduleInfo.advanceModulePriceList.length==0){
          this.moduleInfo.advanceModulePriceList.push({"startNum":0,"endNum":0,"priceMoney":0});
        }
        
      },
      handleAppendRowUltimate(index, row){
        this.moduleInfo.ultimateModulePriceList.push({"startNum":0,"endNum":0,"priceMoney":0}); 
      },
      handleDeleteRowUltimate(index, row){
        this.moduleInfo.ultimateModulePriceList.splice(index,1);
        if(this.moduleInfo.ultimateModulePriceList.length==0){
          this.moduleInfo.ultimateModulePriceList.push({"startNum":0,"endNum":0,"priceMoney":0});
        }
        
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


