<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="devRecList" :rules="rules" ref="devRecListFrom" label-width="150px">
      <el-form-item label="系统编号：" prop="id">
        <el-input v-model="devRecList.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="devRecList.tenantId" placeholder="请选择租户" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="应收账标识：" prop="recFlag" clearable>
        <el-select
          v-model="devRecList.recFlag"
          placeholder="请选择应收账标识">
          <el-option
            v-for="item in recFlagOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="应收来源：" prop="recType" clearable>
        <el-select
          v-model="devRecList.recType"
          placeholder="请选择应收来源">
          <el-option
            v-for="item in recTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="部门编号：" prop="deptId">
        <el-input v-model="devRecList.deptId"></el-input>
      </el-form-item>
      <el-form-item label="表册编号：" prop="bookletId">
        <el-input v-model="devRecList.bookletId"></el-input>
      </el-form-item>
      <el-form-item label="用户编号：" prop="custId">
        <el-input v-model="devRecList.custId"></el-input>
      </el-form-item>
      <el-form-item label="用户名称：" prop="custName">
        <el-input v-model="devRecList.custName"></el-input>
      </el-form-item>
      <el-form-item label="用户地址：" prop="custAddress">
        <el-input v-model="devRecList.custAddress"></el-input>
      </el-form-item>
      <el-form-item label="表具系统编号：" prop="devId">
        <el-input v-model="devRecList.devId"></el-input>
      </el-form-item>
      <el-form-item label="表具地址：" prop="devAddress">
        <el-input v-model="devRecList.devAddress"></el-input>
      </el-form-item>
      <el-form-item label="应收月份：" prop="readMonth">
        <el-input v-model="devRecList.readMonth"></el-input>
      </el-form-item>
      <el-form-item label="应收账务统计月份：" prop="recMonth">
        <el-input v-model="devRecList.recMonth"></el-input>
      </el-form-item>
      <el-form-item label="业务流水号：" prop="businessId">
        <el-input v-model="devRecList.businessId"></el-input>
      </el-form-item>
      <el-form-item label="抄表员编号：" prop="reader">
        <el-input v-model="devRecList.reader"></el-input>
      </el-form-item>
      <el-form-item label="计费时间：" prop="calcDate">
        <el-input v-model="devRecList.calcDate"></el-input>
      </el-form-item>
      <el-form-item label="上次计费日期：" prop="lastDate">
        <el-input v-model="devRecList.lastDate"></el-input>
      </el-form-item>
      <el-form-item label="起数：" prop="lastCode">
        <el-input v-model="devRecList.lastCode"></el-input>
      </el-form-item>
      <el-form-item label="当前计费日期：" prop="currDate">
        <el-input v-model="devRecList.currDate"></el-input>
      </el-form-item>
      <el-form-item label="止数：" prop="currCode">
        <el-input v-model="devRecList.currCode"></el-input>
      </el-form-item>
      <el-form-item label="用量占比：" prop="waterScale">
        <el-input v-model="devRecList.waterScale"></el-input>
      </el-form-item>
      <el-form-item label="计费水量：" prop="useNum">
        <el-input v-model="devRecList.useNum"></el-input>
      </el-form-item>
      <el-form-item label="价格编号：" prop="priceTypeId">
        <el-input v-model="devRecList.priceTypeId"></el-input>
      </el-form-item>
      <el-form-item label="应收金额：" prop="recMoney">
        <el-input v-model="devRecList.recMoney"></el-input>
      </el-form-item>
      <el-form-item label="欠费金额：" prop="dueMoney">
        <el-input v-model="devRecList.dueMoney"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('devRecListFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('devRecListFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createDevRecList, getDevRecList, updateDevRecList} from '@/api/devRecList'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultDevRecList={
    tenantId: '',
    recFlag: '',
    recType: '',
    deptId: '',
    bookletId: '',
    custId: '',
    custName: '',
    custAddress: '',
    devId: '',
    devAddress: '',
    readMonth: '',
    recMonth: '',
    businessId: '',
    reader: '',
    calcDate: '',
    lastDate: '',
    lastCode: '',
    currDate: '',
    currCode: '',
    waterScale: '',
    useNum: '',
    priceTypeId: '',
    recMoney: '',
    dueMoney: ''
  };
  const defaultRecFlagOptions=[
    {
      value: 1,
      label: '正常'
    },
    {
      value: 2,
      label: '被冲正'
    },
    {
      value: 3,
      label: '冲正负记录'
    }
  ];
  const defaultRecTypeOptions=[
    {
      value: 1,
      label: '抄表'
    },
    {
      value: 2,
      label: '换表'
    }
  ];
  export default {
    name: 'DevRecListDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        devRecList:Object.assign({}, defaultDevRecList),
        tenantInfoOptions:[],
        recFlagOptions: Object.assign({},defaultRecFlagOptions),
        recTypeOptions: Object.assign({},defaultRecTypeOptions),
        rules: {
          tenantId: [
            {required: true, message: '请输入租户编号', trigger: 'blur'}
          ],
          recType: [
            {required: true, message: '请选择应收来源', trigger: 'blur'}
          ],
          deptId: [
            {required: true, message: '请输入部门编号', trigger: 'blur'}
          ],
          custId: [
            {required: true, message: '请输入用户编号', trigger: 'blur'}
          ],
          devId: [
            {required: true, message: '请输入表具系统编号', trigger: 'blur'}
          ],
          readMonth: [
            {required: true, message: '请输入应收月份', trigger: 'blur'}
          ],
          recMonth: [
            {required: true, message: '请输入应收账务统计月份', trigger: 'blur'}
          ],
          calcDate: [
            {required: true, message: '请输入计费时间', trigger: 'blur'}
          ],
          waterScale: [
            {required: true, message: '请输入用量占比', trigger: 'blur'}
          ],
          priceTypeId: [
            {required: true, message: '请输入价格编号', trigger: 'blur'}
          ],
          recMoney: [
            {required: true, message: '请输入应收金额', trigger: 'blur'}
          ],
          dueMoney: [
            {required: true, message: '请输入欠费金额', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getDevRecList(this.$route.query.id).then(response => {
          this.devRecList = response.data;
        });
      }else{
        this.devRecList = Object.assign({},defaultDevRecList);
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
                updateDevRecList(this.$route.query.id, this.devRecList).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createDevRecList(this.devRecList).then(response => {
                  this.$refs[formName].resetFields();
                  this.devRecList = Object.assign({},defaultDevRecList);
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
        this.devRecList = Object.assign({},defaultDevRecList);
      }
    }
  }
</script>
<style>
</style>


