<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantCustomerLinkman" :rules="rules" ref="tenantCustomerLinkmanFrom" label-width="150px">
      <el-form-item label="联系人ID：" prop="id">
        <el-input v-model="tenantCustomerLinkman.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        <el-select v-model="tenantCustomerLinkman.tenantId" placeholder="请选择租户ID" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户ID：" prop="customerId">
        <el-input v-model="tenantCustomerLinkman.customerId"></el-input>
      </el-form-item>
      <el-form-item label="联系人姓名：" prop="linkmanName">
        <el-input v-model="tenantCustomerLinkman.linkmanName"></el-input>
      </el-form-item>
      <el-form-item label="联系人地址：" prop="linkmanAddress">
        <el-input v-model="tenantCustomerLinkman.linkmanAddress"></el-input>
      </el-form-item>
      <el-form-item label="主联系人：" prop="linkmanMainOn">
        <el-switch
          v-model="tenantCustomerLinkman.linkmanMainOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="性别：" prop="linkmanSex">
        <el-select
          v-model="tenantCustomerLinkman.linkmanSex"
          clearable
          placeholder="请选择性别">
          <el-option
            v-for="item in linkmanSexOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期：" prop="linkmanBirthday">
        <el-date-picker
                class="input-width"
                v-model="tenantCustomerLinkman.linkmanBirthday"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择出生日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="手机号码：" prop="linkmanMobile">
        <el-input v-model="tenantCustomerLinkman.linkmanMobile"></el-input>
      </el-form-item>
      <el-form-item label="固定电话号码：" prop="linkmanTel">
        <el-input v-model="tenantCustomerLinkman.linkmanTel"></el-input>
      </el-form-item>
      <el-form-item label="邮箱地址：" prop="linkmanEmail">
        <el-input v-model="tenantCustomerLinkman.linkmanEmail"></el-input>
      </el-form-item>
      <el-form-item label="微信号：" prop="linkmanPersonalWx">
        <el-input v-model="tenantCustomerLinkman.linkmanPersonalWx"></el-input>
      </el-form-item>
      <el-form-item label="QQ号：" prop="linkmanQq">
        <el-input v-model="tenantCustomerLinkman.linkmanQq"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="linkmanRemark">
        <el-input v-model="tenantCustomerLinkman.linkmanRemark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantCustomerLinkmanFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantCustomerLinkmanFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantCustomerLinkman, getTenantCustomerLinkman, updateTenantCustomerLinkman} from '@/api/tenantCustomerLinkman'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantCustomerLinkman={
    tenantId: '',
    customerId: '',
    linkmanName: '',
    linkmanAddress: '',
    linkmanMainOn: 1,
    linkmanSex: '',
    linkmanBirthday: '',
    linkmanMobile: '',
    linkmanTel: '',
    linkmanEmail: '',
    linkmanPersonalWx: '',
    linkmanQq: '',
    linkmanRemark: ''
  };
  const defaultLinkmanSexOptions=[
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
    name: 'TenantCustomerLinkmanDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantCustomerLinkman:Object.assign({}, defaultTenantCustomerLinkman, this.$route.query),
        tenantInfoOptions:[],
        linkmanSexOptions: Object.assign({},defaultLinkmanSexOptions),
        rules: {
          tenantId: [
            {required: true, message: '请输入租户ID', trigger: 'blur'}
          ],
          customerId: [
            {required: true, message: '请输入客户ID', trigger: 'blur'}
          ],
          linkmanName: [
            {required: true, message: '请输入联系人姓名', trigger: 'blur'}
          ],
          linkmanMainOn: [
            {required: true, message: '请选择主联系人', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantCustomerLinkman(this.$route.query.id).then(response => {
	          let data = response.data;
	          data.linkmanBirthday = formatDate(new Date(data.linkmanBirthday), 'yyyy-MM-dd');
	          this.tenantCustomerLinkman = data;
	          //this.tenantCustomerLinkman = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantCustomerLinkmanByTenantId(this.$route.query.tenantId).then(response => {
	          let data = response.data;
	          data.linkmanBirthday = formatDate(new Date(data.linkmanBirthday), 'yyyy-MM-dd');
	          this.tenantCustomerLinkman = data;
	          //this.tenantCustomerLinkman = response.data;
        	});
        }
        
      }else{
        this.tenantCustomerLinkman = Object.assign({},defaultTenantCustomerLinkman,this.$route.query);
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
                updateTenantCustomerLinkman(this.$route.query.id, this.tenantCustomerLinkman).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantCustomerLinkman(this.tenantCustomerLinkman).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantCustomerLinkman = Object.assign({},defaultTenantCustomerLinkman);
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
        this.tenantCustomerLinkman = Object.assign({},defaultTenantCustomerLinkman);
      }
    }
  }
</script>
<style>
</style>


