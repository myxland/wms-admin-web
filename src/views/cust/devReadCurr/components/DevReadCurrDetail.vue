<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="devReadCurr" :rules="rules" ref="devReadCurrFrom" label-width="150px">
      <el-form-item label="系统编号：" prop="id">
        <el-input v-model="devReadCurr.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="devReadCurr.tenantId" placeholder="请选择租户" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="抄表月份：" prop="readMonth">
        <el-input v-model="devReadCurr.readMonth"></el-input>
      </el-form-item>
      <el-form-item label="表具系统编号：" prop="devId">
        <el-input v-model="devReadCurr.devId"></el-input>
      </el-form-item>
      <el-form-item label="父表具编号：" prop="parentDevId">
        <el-input v-model="devReadCurr.parentDevId"></el-input>
      </el-form-item>
      <el-form-item label="本次计费前当年累计水量：" prop="yearUseNum">
        <el-input v-model="devReadCurr.yearUseNum"></el-input>
      </el-form-item>
      <el-form-item label="上次计费日期：" prop="lastCalcDate">
        <el-input v-model="devReadCurr.lastCalcDate"></el-input>
      </el-form-item>
      <el-form-item label="上次计费止码：" prop="lastCalcCode">
        <el-input v-model="devReadCurr.lastCalcCode"></el-input>
      </el-form-item>
      <el-form-item label="抄表人编号：" prop="currReadEmpId">
        <el-input v-model="devReadCurr.currReadEmpId"></el-input>
      </el-form-item>
      <el-form-item label="本次抄表日期：" prop="currReadDate">
        <el-input v-model="devReadCurr.currReadDate"></el-input>
      </el-form-item>
      <el-form-item label="本次抄表止码：" prop="currReadCode">
        <el-input v-model="devReadCurr.currReadCode"></el-input>
      </el-form-item>
      <el-form-item label="表次表具状况：" prop="currDevStatus">
        <el-input v-model="devReadCurr.currDevStatus"></el-input>
      </el-form-item>
      <el-form-item label="本次抄表水量：" prop="currUseNum">
        <el-input v-model="devReadCurr.currUseNum"></el-input>
      </el-form-item>
      <el-form-item label="本次计费水量：" prop="currCalcUseNum">
        <el-input v-model="devReadCurr.currCalcUseNum"></el-input>
      </el-form-item>
      <el-form-item label="抄表来源：" prop="readSource" clearable>
        <el-select
          v-model="devReadCurr.readSource"
          placeholder="请选择抄表来源">
          <el-option
            v-for="item in readSourceOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="抄表状态：" prop="readStatus" clearable>
        <el-select
          v-model="devReadCurr.readStatus"
          placeholder="请选择抄表状态">
          <el-option
            v-for="item in readStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="审核状态：" prop="checkResult" clearable>
        <el-select
          v-model="devReadCurr.checkResult"
          placeholder="请选择审核状态">
          <el-option
            v-for="item in checkResultOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="处理状态：" prop="procReault" clearable>
        <el-select
          v-model="devReadCurr.procReault"
          placeholder="请选择处理状态">
          <el-option
            v-for="item in procReaultOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="审核人：" prop="procMan">
        <el-input v-model="devReadCurr.procMan"></el-input>
      </el-form-item>
      <el-form-item label="审核时间：" prop="procTime">
        <el-input v-model="devReadCurr.procTime"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('devReadCurrFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('devReadCurrFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createDevReadCurr, getDevReadCurr, updateDevReadCurr} from '@/api/devReadCurr'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultDevReadCurr={
    tenantId: '',
    readMonth: '',
    devId: '',
    parentDevId: '',
    yearUseNum: '',
    lastCalcDate: '',
    lastCalcCode: '',
    currReadEmpId: '',
    currReadDate: '',
    currReadCode: '',
    currDevStatus: 0,
    currUseNum: '',
    currCalcUseNum: '',
    readSource: '',
    readStatus: '',
    checkResult: '',
    procReault: '',
    procMan: '',
    procTime: ''
  };
  const defaultReadSourceOptions=[
    {
      value: 1,
      label: '移动抄表'
    },
    {
      value: 2,
      label: '人工入账'
    },
    {
      value: 3,
      label: '远传表'
    }
  ];
  const defaultReadStatusOptions=[
    {
      value: 1,
      label: '未抄'
    },
    {
      value: 2,
      label: '已抄'
    }
  ];
  const defaultCheckResultOptions=[
    {
      value: 1,
      label: '正常'
    },
    {
      value: 2,
      label: '异常'
    }
  ];
  const defaultProcReaultOptions=[
    {
      value: 1,
      label: '已计费'
    },
    {
      value: 2,
      label: '待审核'
    },
    {
      value: 3,
      label: '已审核'
    }
  ];
  export default {
    name: 'DevReadCurrDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        devReadCurr:Object.assign({}, defaultDevReadCurr),
        tenantInfoOptions:[],
        readSourceOptions: Object.assign({},defaultReadSourceOptions),
        readStatusOptions: Object.assign({},defaultReadStatusOptions),
        checkResultOptions: Object.assign({},defaultCheckResultOptions),
        procReaultOptions: Object.assign({},defaultProcReaultOptions),
        rules: {
          tenantId: [
            {required: true, message: '请输入租户编号', trigger: 'blur'}
          ],
          readMonth: [
            {required: true, message: '请输入抄表月份', trigger: 'blur'}
          ],
          devId: [
            {required: true, message: '请输入表具系统编号', trigger: 'blur'}
          ],
          readStatus: [
            {required: true, message: '请选择抄表状态', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getDevReadCurr(this.$route.query.id).then(response => {
          this.devReadCurr = response.data;
        });
      }else{
        this.devReadCurr = Object.assign({},defaultDevReadCurr);
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
                updateDevReadCurr(this.$route.query.id, this.devReadCurr).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createDevReadCurr(this.devReadCurr).then(response => {
                  this.$refs[formName].resetFields();
                  this.devReadCurr = Object.assign({},defaultDevReadCurr);
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
        this.devReadCurr = Object.assign({},defaultDevReadCurr);
      }
    }
  }
</script>
<style>
</style>


