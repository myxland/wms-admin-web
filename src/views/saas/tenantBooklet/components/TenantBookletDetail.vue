<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantBooklet" :rules="rules" ref="tenantBookletFrom" label-width="150px">
      <el-form-item label="表册ID：" prop="id">
        <el-input v-model="tenantBooklet.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        <el-select v-model="tenantBooklet.tenantId" placeholder="请选择租户ID" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属部门ID：" prop="bookletDepartmentId">
        <el-input v-model="tenantBooklet.bookletDepartmentId"></el-input>
      </el-form-item>
      <el-form-item label="所属供水区域ID：" prop="bookletWaterAreaId">
        <el-input v-model="tenantBooklet.bookletWaterAreaId"></el-input>
      </el-form-item>
      <el-form-item label="表册代码：" prop="bookletCode">
        <el-input v-model="tenantBooklet.bookletCode"></el-input>
      </el-form-item>
      <el-form-item label="表册名称：" prop="bookletName">
        <el-input v-model="tenantBooklet.bookletName"></el-input>
      </el-form-item>
      <el-form-item label="抄表员ID：" prop="bookletReadEmployeeId">
        <el-input v-model="tenantBooklet.bookletReadEmployeeId"></el-input>
      </el-form-item>
      <el-form-item label="收费员ID：" prop="bookletChargeEmployeeId">
        <el-input v-model="tenantBooklet.bookletChargeEmployeeId"></el-input>
      </el-form-item>
      <el-form-item label="结算间隔周期[月]：" prop="bookletSettleCycleInterval">
        <el-input-number v-model="tenantBooklet.bookletSettleCycleInterval" :min="0" placeholder="结算间隔周期[月]"></el-input-number>
      </el-form-item>
      <el-form-item label="最后一次结算月份：" prop="bookletLastSettleMonth">
        <el-date-picker
                class="input-width"
                v-model="tenantBooklet.bookletLastSettleMonth"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择最后一次结算月份">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="下次计划结算月份：" prop="bookletNextSettleMonth">
        <el-date-picker
                class="input-width"
                v-model="tenantBooklet.bookletNextSettleMonth"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择下次计划结算月份">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="表册状态：" prop="bookletStatus">
        <el-select
          v-model="tenantBooklet.bookletStatus"
          clearable
          placeholder="请选择表册状态">
          <el-option
            v-for="item in bookletStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="表册可用状态：" prop="bookletOn">
        <el-switch
          v-model="tenantBooklet.bookletOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantBookletFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantBookletFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantBooklet, getTenantBooklet, updateTenantBooklet} from '@/api/tenantBooklet'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantBooklet={
    tenantId: '',
    bookletDepartmentId: '',
    bookletWaterAreaId: '',
    bookletCode: '',
    bookletName: '',
    bookletReadEmployeeId: '',
    bookletChargeEmployeeId: '',
    bookletSettleCycleInterval: 0,
    bookletLastSettleMonth: '',
    bookletNextSettleMonth: '',
    bookletStatus: '',
    bookletOn: 1
  };
  const defaultBookletStatusOptions=[
    {
      value: 1,
      label: '抄表进行中'
    },
    {
      value: 2,
      label: '抄表截止'
    }
  ];
  export default {
    name: 'TenantBookletDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantBooklet:Object.assign({}, defaultTenantBooklet, this.$route.query),
        tenantInfoOptions:[],
        bookletStatusOptions: Object.assign({},defaultBookletStatusOptions),
        rules: {
          tenantId: [
            {required: true, message: '请输入租户ID', trigger: 'blur'}
          ],
          bookletDepartmentId: [
            {required: true, message: '请输入所属部门ID', trigger: 'blur'}
          ],
          bookletWaterAreaId: [
            {required: true, message: '请输入所属供水区域ID', trigger: 'blur'}
          ],
          bookletCode: [
            {required: true, message: '请输入表册代码', trigger: 'blur'}
          ],
          bookletName: [
            {required: true, message: '请输入表册名称', trigger: 'blur'}
          ],
          bookletReadEmployeeId: [
            {required: true, message: '请输入抄表员ID', trigger: 'blur'}
          ],
          bookletChargeEmployeeId: [
            {required: true, message: '请输入收费员ID', trigger: 'blur'}
          ],
          bookletSettleCycleInterval: [
            {required: true, message: '请输入结算间隔周期[月]', trigger: 'blur'}
          ],
          bookletNextSettleMonth: [
            {required: true, message: '请输入下次计划结算月份', trigger: 'blur'}
          ],
          bookletStatus: [
            {required: true, message: '请选择表册状态', trigger: 'blur'}
          ],
          bookletOn: [
            {required: true, message: '请选择表册可用状态', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantBooklet(this.$route.query.id).then(response => {
	          let data = response.data;
	          data.bookletLastSettleMonth = formatDate(new Date(data.bookletLastSettleMonth), 'yyyy-MM-dd');
	          data.bookletNextSettleMonth = formatDate(new Date(data.bookletNextSettleMonth), 'yyyy-MM-dd');
	          this.tenantBooklet = data;
	          //this.tenantBooklet = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantBookletByTenantId(this.$route.query.tenantId).then(response => {
	          let data = response.data;
	          data.bookletLastSettleMonth = formatDate(new Date(data.bookletLastSettleMonth), 'yyyy-MM-dd');
	          data.bookletNextSettleMonth = formatDate(new Date(data.bookletNextSettleMonth), 'yyyy-MM-dd');
	          this.tenantBooklet = data;
	          //this.tenantBooklet = response.data;
        	});
        }
        
      }else{
        this.tenantBooklet = Object.assign({},defaultTenantBooklet,this.$route.query);
      }
      this.getTenantInfoList();
    },
    methods: {
      getTenantInfoList() {
        fetchTenantInfoList({pageNum:1,pageSize:500}).then(response => {
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
                updateTenantBooklet(this.$route.query.id, this.tenantBooklet).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantBooklet(this.tenantBooklet).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantBooklet = Object.assign({},defaultTenantBooklet);
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
        this.tenantBooklet = Object.assign({},defaultTenantBooklet);
      }
    }
  }
</script>
<style>
</style>


