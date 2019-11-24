<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantPriceType" :rules="rules" ref="tenantPriceTypeFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        <el-input v-model="tenantPriceType.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="tenantPriceType.tenantId" placeholder="请选择租户" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格类别名称：" prop="priceTypeName">
        <el-input v-model="tenantPriceType.priceTypeName"></el-input>
      </el-form-item>
      <el-form-item label="启用保底水量：" prop="bottomOn">
        <el-switch
          v-model="tenantPriceType.bottomOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="保底水量：" prop="bottomNum">
        <el-input v-model="tenantPriceType.bottomNum"></el-input>
      </el-form-item>
      <el-form-item label="启用封顶水量：" prop="topOn">
        <el-switch
          v-model="tenantPriceType.topOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="封顶水量：" prop="topNum">
        <el-input v-model="tenantPriceType.topNum"></el-input>
      </el-form-item>
      <el-form-item label="启用固定减免：" prop="reduceOn">
        <el-switch
          v-model="tenantPriceType.reduceOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="固定减免水量：" prop="reduceNum">
        <el-input v-model="tenantPriceType.reduceNum"></el-input>
      </el-form-item>
      <el-form-item label="减免起始水量：" prop="reduceLowerLimit">
        <el-input v-model="tenantPriceType.reduceLowerLimit"></el-input>
      </el-form-item>
      <el-form-item label="启用固定水量征收：" prop="fixedOn">
        <el-switch
          v-model="tenantPriceType.fixedOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="固定征收水量：" prop="fixedNum">
        <el-input v-model="tenantPriceType.fixedNum"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantPriceTypeFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantPriceTypeFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantPriceType, getTenantPriceType, updateTenantPriceType} from '@/api/tenantPriceType'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantPriceType={
    tenantId: '',
    priceTypeName: '',
    bottomOn: 1,
    bottomNum: 0,
    topOn: 1,
    topNum: 0,
    reduceOn: 1,
    reduceNum: 0,
    reduceLowerLimit: 0,
    fixedOn: 1,
    fixedNum: 0
  };
  export default {
    name: 'TenantPriceTypeDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantPriceType:Object.assign({}, defaultTenantPriceType),
        tenantInfoOptions:[],
        rules: {
          tenantId: [
            {required: true, message: '请输入租户编号', trigger: 'blur'}
          ],
          priceTypeName: [
            {required: true, message: '请输入价格类别名称', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getTenantPriceType(this.$route.query.id).then(response => {
          this.tenantPriceType = response.data;
        });
      }else{
        this.tenantPriceType = Object.assign({},defaultTenantPriceType);
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
                updateTenantPriceType(this.$route.query.id, this.tenantPriceType).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantPriceType(this.tenantPriceType).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantPriceType = Object.assign({},defaultTenantPriceType);
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
        this.tenantPriceType = Object.assign({},defaultTenantPriceType);
      }
    }
  }
</script>
<style>
</style>


