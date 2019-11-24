<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantSystemPrice" :rules="rules" ref="tenantSystemPriceFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        <el-input v-model="tenantSystemPrice.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="tenantSystemPrice.tenantId" placeholder="请选择租户" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模块：" prop="sysId">
        <el-select v-model="tenantSystemPrice.sysId" placeholder="请选择模块" clearable>
                <el-option
                  v-for="item in systemDesignOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模块版本：" prop="sysEdition" clearable>
        <el-select
          v-model="tenantSystemPrice.sysEdition"
          placeholder="请选择模块版本">
          <el-option
            v-for="item in sysEditionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="起始量：" prop="startNum">
        <el-input v-model="tenantSystemPrice.startNum"></el-input>
      </el-form-item>
      <el-form-item label="终止量：" prop="endNum">
        <el-input v-model="tenantSystemPrice.endNum"></el-input>
      </el-form-item>
      <el-form-item label="价格：" prop="price">
        <el-input v-model="tenantSystemPrice.price"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantSystemPriceFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantSystemPriceFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantSystemPrice, getTenantSystemPrice, updateTenantSystemPrice} from '@/api/tenantSystemPrice'
  import {fetchList as fetchSystemDesignList} from '@/api/systemDesign';
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantSystemPrice={
    tenantId: '',
    sysId: '',
    sysEdition: '',
    startNum: 0,
    endNum: 0,
    price: ''
  };
  const defaultSysEditionOptions=[
    {
      value: 0,
      label: '基础版'
    },
    {
      value: 1,
      label: '高级版'
    },
    {
      value: 2,
      label: '旗舰版'
    }
  ];
  export default {
    name: 'TenantSystemPriceDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantSystemPrice:Object.assign({}, defaultTenantSystemPrice),
        systemDesignOptions:[],
        tenantInfoOptions:[],
        sysEditionOptions: Object.assign({},defaultSysEditionOptions),
        rules: {
          tenantId: [
            {required: true, message: '请输入租户编号', trigger: 'blur'}
          ],
          sysId: [
            {required: true, message: '请输入模块编号', trigger: 'blur'}
          ],
          sysEdition: [
            {required: true, message: '请选择模块版本', trigger: 'blur'}
          ],
          startNum: [
            {required: true, message: '请输入起始量', trigger: 'blur'}
          ],
          endNum: [
            {required: true, message: '请输入终止量', trigger: 'blur'}
          ],
          price: [
            {required: true, message: '请输入价格', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getTenantSystemPrice(this.$route.query.id).then(response => {
          this.tenantSystemPrice = response.data;
        });
      }else{
        this.tenantSystemPrice = Object.assign({},defaultTenantSystemPrice);
      }
      this.getSystemDesignList();
      this.getTenantInfoList();
    },
    methods: {
      getSystemDesignList() {
        fetchSystemDesignList({pageNum:1,pageSize:100}).then(response => {
          this.systemDesignOptions = [];
          let systemDesignList = response.data.list;
          for(let i=0;i<systemDesignList.length;i++){
            this.systemDesignOptions.push({label:systemDesignList[i].moduleName,value:systemDesignList[i].id});
          }
        });
      },
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
                updateTenantSystemPrice(this.$route.query.id, this.tenantSystemPrice).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantSystemPrice(this.tenantSystemPrice).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantSystemPrice = Object.assign({},defaultTenantSystemPrice);
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
        this.tenantSystemPrice = Object.assign({},defaultTenantSystemPrice);
      }
    }
  }
</script>
<style>
</style>


