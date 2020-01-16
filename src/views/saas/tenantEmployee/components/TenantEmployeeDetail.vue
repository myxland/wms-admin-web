<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantEmployee" :rules="rules" ref="tenantEmployeeFrom" label-width="150px">
      <el-form-item label="员工ID：" prop="id">
        <el-input v-model="tenantEmployee.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        <el-select v-model="tenantEmployee.tenantId" placeholder="请选择租户ID" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="员工名称：" prop="employeeName">
        <el-input v-model="tenantEmployee.employeeName"></el-input>
      </el-form-item>
      <el-form-item label="登录密码：" prop="employeePassword">
        <el-input v-model="tenantEmployee.employeePassword"></el-input>
      </el-form-item>
      <el-form-item label="员工所属部门ID：" prop="employeeDepartmentId">
        <el-input v-model="tenantEmployee.employeeDepartmentId"></el-input>
      </el-form-item>
      <el-form-item label="可登录系统：" prop="employeeLoginOn">
        <el-switch
          v-model="tenantEmployee.employeeLoginOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="员工状态：" prop="employeeStatus">
        <el-select
          v-model="tenantEmployee.employeeStatus"
          clearable
          placeholder="请选择员工状态">
          <el-option
            v-for="item in employeeStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="员工手机号：" prop="employeeMobile">
        <el-input v-model="tenantEmployee.employeeMobile"></el-input>
      </el-form-item>
      <el-form-item label="员工邮箱：" prop="employeeEmail">
        <el-input v-model="tenantEmployee.employeeEmail"></el-input>
      </el-form-item>
      <el-form-item label="员工个人微信号：" prop="employeePersonalWx">
        <el-input v-model="tenantEmployee.employeePersonalWx"></el-input>
      </el-form-item>
      <el-form-item label="员工企业微信号：" prop="employeeEnterpriceWx">
        <el-input v-model="tenantEmployee.employeeEnterpriceWx"></el-input>
      </el-form-item>
      <el-form-item label="钉钉号：" prop="employeeDingding">
        <el-input v-model="tenantEmployee.employeeDingding"></el-input>
      </el-form-item>
      <el-form-item label="操作员创建类型：" prop="employeeCreateType">
        <el-select
          v-model="tenantEmployee.employeeCreateType"
          clearable
          placeholder="请选择操作员创建类型">
          <el-option
            v-for="item in employeeCreateTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantEmployeeFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantEmployeeFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantEmployee, getTenantEmployee, updateTenantEmployee} from '@/api/tenantEmployee'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantEmployee={
    tenantId: '',
    employeeName: '',
    employeePassword: '',
    employeeDepartmentId: '',
    employeeLoginOn: 1,
    employeeStatus: '',
    employeeMobile: '',
    employeeEmail: '',
    employeePersonalWx: '',
    employeeEnterpriceWx: '',
    employeeDingding: '',
    employeeCreateType: ''
  };
  const defaultEmployeeStatusOptions=[
    {
      value: 1,
      label: '在职'
    },
    {
      value: 2,
      label: '离职'
    },
    {
      value: 3,
      label: '禁用'
    }
  ];
  const defaultEmployeeCreateTypeOptions=[
    {
      value: 1,
      label: '平台默认创建'
    },
    {
      value: 2,
      label: '租户自建'
    }
  ];
  export default {
    name: 'TenantEmployeeDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantEmployee:Object.assign({}, defaultTenantEmployee, this.$route.query),
        tenantInfoOptions:[],
        employeeStatusOptions: Object.assign({},defaultEmployeeStatusOptions),
        employeeCreateTypeOptions: Object.assign({},defaultEmployeeCreateTypeOptions),
        rules: {
          tenantId: [
            {required: true, message: '请输入租户ID', trigger: 'blur'}
          ],
          employeeName: [
            {required: true, message: '请输入员工名称', trigger: 'blur'}
          ],
          employeePassword: [
            {required: true, message: '请输入登录密码', trigger: 'blur'}
          ],
          employeeDepartmentId: [
            {required: true, message: '请输入员工所属部门ID', trigger: 'blur'}
          ],
          employeeLoginOn: [
            {required: true, message: '请选择可登录系统', trigger: 'blur'}
          ],
          employeeStatus: [
            {required: true, message: '请选择员工状态', trigger: 'blur'}
          ],
          employeeMobile: [
            {required: true, message: '请输入员工手机号', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantEmployee(this.$route.query.id).then(response => {
	          this.tenantEmployee = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantEmployeeByTenantId(this.$route.query.tenantId).then(response => {
	          this.tenantEmployee = response.data;
        	});
        }
        
      }else{
        this.tenantEmployee = Object.assign({},defaultTenantEmployee,this.$route.query);
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
                updateTenantEmployee(this.$route.query.id, this.tenantEmployee).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantEmployee(this.tenantEmployee).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantEmployee = Object.assign({},defaultTenantEmployee);
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
        this.tenantEmployee = Object.assign({},defaultTenantEmployee);
      }
    }
  }
</script>
<style>
</style>


