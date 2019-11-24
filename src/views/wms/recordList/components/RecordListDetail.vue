<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="recordList" :rules="rules" ref="recordListFrom" label-width="150px">
      <el-form-item label="租户：" prop="tenantid">
        <el-input v-model="recordList.tenantid"></el-input>
      </el-form-item>
      <el-form-item label="标识：" prop="recordFlag">
        <el-select v-model="recordList.recordFlag" clearable>
          <el-option
            v-for="item in recordFlagOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="来源：" prop="sourceType">
        <el-select v-model="recordList.sourceType" clearable>
          <el-option
            v-for="item in sourceTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门：" prop="deptId">
        <el-input v-model="recordList.deptId"></el-input>
      </el-form-item>
      <el-form-item label="表册：" prop="bookId">
        <el-input v-model="recordList.bookId"></el-input>
      </el-form-item>
      <el-form-item label="用户：" prop="custId">
        <el-input v-model="recordList.custId"></el-input>
      </el-form-item>
      <el-form-item label="用户名称：" prop="custName">
        <el-input v-model="recordList.custName"></el-input>
      </el-form-item>
      <el-form-item label="用户地址：" prop="custAddress">
        <el-input v-model="recordList.custAddress"></el-input>
      </el-form-item>
      <el-form-item label="表具：" prop="devId">
        <el-input v-model="recordList.devId"></el-input>
      </el-form-item>
      <el-form-item label="表具地址：" prop="devAddress">
        <el-input v-model="recordList.devAddress"></el-input>
      </el-form-item>
      <el-form-item label="应收月份：" prop="readMonth">
        <el-input v-model="recordList.readMonth"></el-input>
      </el-form-item>
      <el-form-item label="应收账务统计月份：" prop="recordMonth">
        <el-input v-model="recordList.recordMonth"></el-input>
      </el-form-item>
      <el-form-item label="业务流水号（抄表流水号/换表流水号）：" prop="bussinessId">
        <el-input v-model="recordList.bussinessId"></el-input>
      </el-form-item>
      <el-form-item label="抄表员：" prop="reader">
        <el-input v-model="recordList.reader"></el-input>
      </el-form-item>
      <el-form-item label="计费时间：" prop="calcTime">
        <el-input v-model="recordList.calcTime"></el-input>
      </el-form-item>
      <el-form-item label="上次计费时间：" prop="lastTime">
        <el-input v-model="recordList.lastTime"></el-input>
      </el-form-item>
      <el-form-item label="起数：" prop="lastCode">
        <el-input v-model="recordList.lastCode"></el-input>
      </el-form-item>
      <el-form-item label="当前计费时间：" prop="presentTime">
        <el-input v-model="recordList.presentTime"></el-input>
      </el-form-item>
      <el-form-item label="止数：" prop="presentCode">
        <el-input v-model="recordList.presentCode"></el-input>
      </el-form-item>
      <el-form-item label="用量占比：" prop="useRate">
        <el-input v-model="recordList.useRate"></el-input>
      </el-form-item>
      <el-form-item label="计费水量：" prop="useNum">
        <el-input v-model="recordList.useNum"></el-input>
      </el-form-item>
      <el-form-item label="价格编号：" prop="priceId">
        <el-input v-model="recordList.priceId"></el-input>
      </el-form-item>
      <el-form-item label="应收金额：" prop="recordMoney">
        <el-input v-model="recordList.recordMoney"></el-input>
      </el-form-item>
      <el-form-item label="欠费金额：" prop="dueMoney">
        <el-input v-model="recordList.dueMoney"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('recordListFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('recordListFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createRecordList, getRecordList, updateRecordList} from '@/api/recordList'
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultRecordList={
    tenantid: '',
    recordFlag: 0,
    sourceType: 0,
    deptId: '',
    bookId: '',
    custId: '',
    custName: '',
    custAddress: '',
    devId: '',
    devAddress: '',
    readMonth: '',
    recordMonth: '',
    bussinessId: '',
    reader: '',
    calcTime: '',
    lastTime: '',
    lastCode: '',
    presentTime: '',
    presentCode: '',
    useRate: '',
    useNum: '',
    priceId: '',
    recordMoney: '',
    dueMoney: ''
  };
  const defaultRecordFlagOptions=[
    {
      value: 0,
      label: '被冲正'
    },
    {
      value: 1,
      label: '正常'
    },
    {
      value: 2,
      label: '冲正负记录'
    }
  ];
  const defaultSourceTypeOptions=[
    {
      value: 1,
      label: '抄表'
    },
    {
      value: 0,
      label: '换表'
    }
  ];
  export default {
    name: 'RecordListDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        recordList:Object.assign({}, defaultRecordList),
        rules: {
          tenantid: [
            {required: true, message: '请输入租户', trigger: 'blur'}
          ],
          recordFlag: [
            {required: true, message: '请选择标识', trigger: 'blur'}
          ],
          sourceType: [
            {required: true, message: '请选择来源', trigger: 'blur'}
          ],
          deptId: [
            {required: true, message: '请输入部门', trigger: 'blur'}
          ],
          bookId: [
            {required: true, message: '请输入表册', trigger: 'blur'}
          ],
          custId: [
            {required: true, message: '请输入用户', trigger: 'blur'}
          ],
          custName: [
            {required: true, message: '请输入用户名称', trigger: 'blur'}
          ],
          custAddress: [
            {required: true, message: '请输入用户地址', trigger: 'blur'}
          ],
          devId: [
            {required: true, message: '请输入表具', trigger: 'blur'}
          ],
          devAddress: [
            {required: true, message: '请输入表具地址', trigger: 'blur'}
          ],
          readMonth: [
            {required: true, message: '请输入应收月份', trigger: 'blur'}
          ],
          recordMonth: [
            {required: true, message: '请输入应收账务统计月份', trigger: 'blur'}
          ],
          bussinessId: [
            {required: true, message: '请输入业务流水号（抄表流水号/换表流水号）', trigger: 'blur'}
          ],
          reader: [
            {required: true, message: '请输入抄表员', trigger: 'blur'}
          ],
          calcTime: [
            {required: true, message: '请输入计费时间', trigger: 'blur'}
          ],
          lastTime: [
            {required: true, message: '请输入上次计费时间', trigger: 'blur'}
          ],
          lastCode: [
            {required: true, message: '请输入起数', trigger: 'blur'}
          ],
          presentTime: [
            {required: true, message: '请输入当前计费时间', trigger: 'blur'}
          ],
          presentCode: [
            {required: true, message: '请输入止数', trigger: 'blur'}
          ],
          useRate: [
            {required: true, message: '请输入用量占比', trigger: 'blur'}
          ],
          useNum: [
            {required: true, message: '请输入计费水量', trigger: 'blur'}
          ],
          priceId: [
            {required: true, message: '请输入价格编号', trigger: 'blur'}
          ],
          recordMoney: [
            {required: true, message: '请输入应收金额', trigger: 'blur'}
          ],
          dueMoney: [
            {required: true, message: '请输入欠费金额', trigger: 'blur'}
          ]
        },
        recordFlagOptions: Object.assign({},defaultRecordFlagOptions),
        sourceTypeOptions: Object.assign({},defaultSourceTypeOptions)
      }
    },
    created() {
      if (this.isEdit) {
        getRecordList(this.$route.query.id).then(response => {
          this.recordList = response.data;
        });
      }else{
        this.recordList = Object.assign({},defaultRecordList);
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
                updateRecordList(this.$route.query.id, this.recordList).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createRecordList(this.recordList).then(response => {
                  this.$refs[formName].resetFields();
                  this.recordList = Object.assign({},defaultRecordList);
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
        this.recordList = Object.assign({},defaultRecordList);
      }
    }
  }
</script>
<style>
</style>


