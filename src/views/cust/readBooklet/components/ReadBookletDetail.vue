<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="readBooklet" :rules="rules" ref="readBookletFrom" label-width="150px">
      <el-form-item label="系统编号：" prop="id">
        <el-input v-model="readBooklet.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="readBooklet.tenantId" placeholder="请选择租户" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="表册名称：" prop="bookletName">
        <el-input v-model="readBooklet.bookletName"></el-input>
      </el-form-item>
      <el-form-item label="表册类型：" prop="bookletType" clearable>
        <el-select
          v-model="readBooklet.bookletType"
          placeholder="请选择表册类型">
          <el-option
            v-for="item in bookletTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="抄表负责人编号：" prop="readEmpId">
        <el-input v-model="readBooklet.readEmpId"></el-input>
      </el-form-item>
      <el-form-item label="收费负责人编号：" prop="payEmpId">
        <el-input v-model="readBooklet.payEmpId"></el-input>
      </el-form-item>
      <el-form-item label="抄表间隔周期_月：" prop="calcCycleInterval">
        <el-input v-model="readBooklet.calcCycleInterval"></el-input>
      </el-form-item>
      <el-form-item label="最后一次抄表月份：" prop="calcMonthLast">
        <el-input v-model="readBooklet.calcMonthLast"></el-input>
      </el-form-item>
      <el-form-item label="下次抄表月份：" prop="calcMonthNext">
        <el-input v-model="readBooklet.calcMonthNext"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('readBookletFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('readBookletFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createReadBooklet, getReadBooklet, updateReadBooklet} from '@/api/readBooklet'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultReadBooklet={
    tenantId: '',
    bookletName: '',
    bookletType: '',
    readEmpId: '',
    payEmpId: '',
    calcCycleInterval: 0,
    calcMonthLast: '',
    calcMonthNext: ''
  };
  const defaultBookletTypeOptions=[
    {
      value: 1,
      label: '远传表'
    },
    {
      value: 2,
      label: '机械表'
    }
  ];
  export default {
    name: 'ReadBookletDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        readBooklet:Object.assign({}, defaultReadBooklet),
        tenantInfoOptions:[],
        bookletTypeOptions: Object.assign({},defaultBookletTypeOptions),
        rules: {
          tenantId: [
            {required: true, message: '请输入租户编号', trigger: 'blur'}
          ],
          bookletName: [
            {required: true, message: '请输入表册名称', trigger: 'blur'}
          ],
          readEmpId: [
            {required: true, message: '请输入抄表负责人编号', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getReadBooklet(this.$route.query.id).then(response => {
          this.readBooklet = response.data;
        });
      }else{
        this.readBooklet = Object.assign({},defaultReadBooklet);
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
                updateReadBooklet(this.$route.query.id, this.readBooklet).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createReadBooklet(this.readBooklet).then(response => {
                  this.$refs[formName].resetFields();
                  this.readBooklet = Object.assign({},defaultReadBooklet);
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
        this.readBooklet = Object.assign({},defaultReadBooklet);
      }
    }
  }
</script>
<style>
</style>


