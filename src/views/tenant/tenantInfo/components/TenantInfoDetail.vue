<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantInfo" :rules="rules" ref="tenantInfoFrom" label-width="150px">
      <el-form-item label="租户编号：" prop="id">
        <el-input v-model="tenantInfo.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户名称：" prop="tenantName">
        <el-input v-model="tenantInfo.tenantName"></el-input>
      </el-form-item>
      <el-form-item label="显示名称：" prop="displayName">
        <el-input v-model="tenantInfo.displayName"></el-input>
      </el-form-item>
      <el-form-item label="省：" prop="tenantProvince">
        <el-input v-model="tenantInfo.tenantProvince"></el-input>
      </el-form-item>
      <el-form-item label="市：" prop="tenantCity">
        <el-input v-model="tenantInfo.tenantCity"></el-input>
      </el-form-item>
      <el-form-item label="区县：" prop="tenantArea">
        <el-input v-model="tenantInfo.tenantArea"></el-input>
      </el-form-item>
      <el-form-item label="联系地址：" prop="tenantAddress">
        <el-input v-model="tenantInfo.tenantAddress"></el-input>
      </el-form-item>
      <el-form-item label="联系人：" prop="tenantContact">
        <el-input v-model="tenantInfo.tenantContact"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：" prop="tenantMobile">
        <el-input v-model="tenantInfo.tenantMobile"></el-input>
      </el-form-item>
      <el-form-item label="单位电话：" prop="tenantTel">
        <el-input v-model="tenantInfo.tenantTel"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="tenantEmail">
        <el-input v-model="tenantInfo.tenantEmail"></el-input>
      </el-form-item>
      <el-form-item label="QQ号码：" prop="tenantQq">
        <el-input v-model="tenantInfo.tenantQq"></el-input>
      </el-form-item>
      <el-form-item label="租户类型：" prop="tenantType" clearable>
        <el-select
          v-model="tenantInfo.tenantType"
          placeholder="请选择租户类型">
          <el-option
            v-for="item in tenantTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="租户状态：" prop="tenantStatus" clearable>
        <el-select
          v-model="tenantInfo.tenantStatus"
          placeholder="请选择租户状态">
          <el-option
            v-for="item in tenantStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="注册时间：" prop="regTime">
        <el-date-picker
                class="input-width"
                v-model="tenantInfo.regTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                :disabled="true"
                placeholder="请选择注册时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="到期日期：" prop="endDate">
        <el-date-picker
                class="input-width"
                v-model="tenantInfo.endDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择到期日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantInfoFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantInfoFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantInfo, getTenantInfo, updateTenantInfo} from '@/api/tenantInfo'
  import {formatDate} from '@/utils/date';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantInfo={
    tenantName: '',
    displayName: '',
    tenantProvince: '',
    tenantCity: '',
    tenantArea: '',
    tenantAddress: '',
    tenantContact: '',
    tenantMobile: '',
    tenantTel: '',
    tenantEmail: '',
    tenantQq: '',
    tenantType: '',
    tenantStatus: '',
    regTime: '',
    endDate: ''
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
  const defaultTenantStatusOptions=[
    {
      value: 1,
      label: '正式'
    },
    {
      value: 2,
      label: '试用'
    }
  ];
  export default {
    name: 'TenantInfoDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantInfo:Object.assign({}, defaultTenantInfo),
        tenantTypeOptions: Object.assign({},defaultTenantTypeOptions),
        tenantStatusOptions: Object.assign({},defaultTenantStatusOptions),
        rules: {
          tenantName: [
            {required: true, message: '请输入租户名称', trigger: 'blur'}
          ],
          displayName: [
            {required: true, message: '请输入显示名称', trigger: 'blur'}
          ],
          tenantLinkman: [
            {required: true, message: '请输入联系人', trigger: 'blur'}
          ],
          tenantMobile: [
            {required: true, message: '请输入手机号码', trigger: 'blur'}
          ],
          tenantEmail: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
          tenantType: [
            {required: true, message: '请选择租户类型', trigger: 'blur'}
          ],
          tenantStatus: [
            {required: true, message: '请选择租户状态', trigger: 'blur'}
          ],
          endDate: [
            {required: true, message: '请输入到期日期', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getTenantInfo(this.$route.query.id).then(response => {
          let data = response.data;
          data.regTime = formatDate(new Date(data.regTime), 'yyyy-MM-dd hh:mm:ss');
          data.endDate = formatDate(new Date(data.endDate), 'yyyy-MM-dd');
          this.tenantInfo = data;
          //this.tenantInfo = response.data;
        });
      }else{
        this.tenantInfo = Object.assign({},defaultTenantInfo);
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
                updateTenantInfo(this.$route.query.id, this.tenantInfo).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantInfo(this.tenantInfo).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantInfo = Object.assign({},defaultTenantInfo);
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
        this.tenantInfo = Object.assign({},defaultTenantInfo);
      }
    }
  }
</script>
<style>
</style>


