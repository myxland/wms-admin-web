<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="userInfo" :rules="rules" ref="userInfoFrom" label-width="150px">
      <el-form-item label="户名：" prop="name">
        <el-input v-model="userInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="手机：" prop="mobile">
        <el-input v-model="userInfo.mobile"></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-select v-model="userInfo.status" clearable>
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别：" prop="gender">
        <el-select v-model="userInfo.gender" clearable>
          <el-option
            v-for="item in genderOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('userInfoFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('userInfoFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createUserInfo, getUserInfo, updateUserInfo} from '@/api/userInfo'
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultUserInfo={
    name: '',
    mobile: '',
    status: 0,
    createTime: '',
    gender: 0
  };
  const defaultStatusOptions=[
    {
      value: 0,
      label: '禁用'
    },
    {
      value: 1,
      label: '启用'
    }
  ];
  const defaultGenderOptions=[
    {
      value: 0,
      label: '未知'
    },
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
    name: 'UserInfoDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        userInfo:Object.assign({}, defaultUserInfo),
        rules: {
          name: [
            {required: true, message: '请输入户名', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入手机', trigger: 'blur'}
          ],
          status: [
            {required: true, message: '请选择状态', trigger: 'blur'}
          ],
          gender: [
            {required: true, message: '请选择性别', trigger: 'blur'}
          ]
        },
        statusOptions: Object.assign({},defaultStatusOptions),
        genderOptions: Object.assign({},defaultGenderOptions)
      }
    },
    created() {
      if (this.isEdit) {
        getUserInfo(this.$route.query.id).then(response => {
          this.userInfo = response.data;
        });
      }else{
        this.userInfo = Object.assign({},defaultUserInfo);
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
                updateUserInfo(this.$route.query.id, this.userInfo).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createUserInfo(this.userInfo).then(response => {
                  this.$refs[formName].resetFields();
                  this.userInfo = Object.assign({},defaultUserInfo);
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
        this.userInfo = Object.assign({},defaultUserInfo);
      }
    }
  }
</script>
<style>
</style>


