<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="custContact" :rules="rules" ref="custContactFrom" label-width="150px">
      <el-form-item label="系统编号：" prop="id">
        <el-input v-model="custContact.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="custContact.tenantId" placeholder="请选择租户" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户编号：" prop="custId">
        <el-input v-model="custContact.custId"></el-input>
      </el-form-item>
      <el-form-item label="联系人姓名：" prop="contactName">
        <el-input v-model="custContact.contactName"></el-input>
      </el-form-item>
      <el-form-item label="主联系人：" prop="mainOn">
        <el-switch
          v-model="custContact.mainOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="性别：" prop="gender" clearable>
        <el-select
          v-model="custContact.gender"
          placeholder="请选择性别">
          <el-option
            v-for="item in genderOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="生日：" prop="birthday">
        <el-input v-model="custContact.birthday"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：" prop="mobile">
        <el-input v-model="custContact.mobile"></el-input>
      </el-form-item>
      <el-form-item label="固定电话号码：" prop="tel">
        <el-input v-model="custContact.tel"></el-input>
      </el-form-item>
      <el-form-item label="邮箱地址：" prop="email">
        <el-input v-model="custContact.email"></el-input>
      </el-form-item>
      <el-form-item label="微信号：" prop="personalWx">
        <el-input v-model="custContact.personalWx"></el-input>
      </el-form-item>
      <el-form-item label="QQ号：" prop="qq">
        <el-input v-model="custContact.qq"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input v-model="custContact.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('custContactFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('custContactFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createCustContact, getCustContact, updateCustContact} from '@/api/custContact'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultCustContact={
    tenantId: '',
    custId: '',
    contactName: '',
    mainOn: 1,
    gender: '',
    birthday: '',
    mobile: '',
    tel: '',
    email: '',
    personalWx: '',
    qq: 0,
    remark: ''
  };
  const defaultGenderOptions=[
    {
      value: 1,
      label: '男'
    },
    {
      value: 2,
      label: '女'
    }
  ];
  export default {
    name: 'CustContactDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        custContact:Object.assign({}, defaultCustContact),
        tenantInfoOptions:[],
        genderOptions: Object.assign({},defaultGenderOptions),
        rules: {
          custId: [
            {required: true, message: '请输入用户编号', trigger: 'blur'}
          ],
          contactName: [
            {required: true, message: '请输入联系人姓名', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getCustContact(this.$route.query.id).then(response => {
          this.custContact = response.data;
        });
      }else{
        this.custContact = Object.assign({},defaultCustContact);
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
                updateCustContact(this.$route.query.id, this.custContact).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createCustContact(this.custContact).then(response => {
                  this.$refs[formName].resetFields();
                  this.custContact = Object.assign({},defaultCustContact);
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
        this.custContact = Object.assign({},defaultCustContact);
      }
    }
  }
</script>
<style>
</style>


