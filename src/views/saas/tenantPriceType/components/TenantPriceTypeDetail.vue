<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantPriceType" :rules="rules" ref="tenantPriceTypeFrom" label-width="150px">
      <el-form-item label="价格类别ID：" prop="id">
        <el-input v-model="tenantPriceType.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        <el-select v-model="tenantPriceType.tenantId" placeholder="请选择租户ID" :disabled="this.$route.query.tenantId?true:false" clearable>
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
      <el-form-item label="保底水量：" prop="bottomWaters">
        <el-input-number v-model="tenantPriceType.bottomWaters" :min="0" :precision="2" placeholder="保底水量"></el-input-number>
      </el-form-item>
      <el-form-item label="启用封顶水量：" prop="topOn">
        <el-switch
          v-model="tenantPriceType.topOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="封顶水量：" prop="topWaters">
        <el-input-number v-model="tenantPriceType.topWaters" :min="0" :precision="2" placeholder="封顶水量"></el-input-number>
      </el-form-item>
      <el-form-item label="启用固定减免：" prop="reduceOn">
        <el-switch
          v-model="tenantPriceType.reduceOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="固定减免水量：" prop="reduceWaters">
        <el-input-number v-model="tenantPriceType.reduceWaters" :min="0" :precision="2" placeholder="固定减免水量"></el-input-number>
      </el-form-item>
      <el-form-item label="固定减免水量下限：" prop="reduceLowerlimit">
        <el-input-number v-model="tenantPriceType.reduceLowerlimit" :min="0" :precision="2" placeholder="固定减免水量下限"></el-input-number>
      </el-form-item>
      <el-form-item label="启用固定水量征收：" prop="fixedOn">
        <el-switch
          v-model="tenantPriceType.fixedOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="固定征收水量：" prop="fixedWaters">
        <el-input-number v-model="tenantPriceType.fixedWaters" :min="0" :precision="2" placeholder="固定征收水量"></el-input-number>
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
    bottomWaters: null,
    topOn: 1,
    topWaters: null,
    reduceOn: 1,
    reduceWaters: null,
    reduceLowerlimit: null,
    fixedOn: 1,
    fixedWaters: null
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
        tenantPriceType:Object.assign({}, defaultTenantPriceType, this.$route.query),
        tenantInfoOptions:[],
        rules: {
          tenantId: [
            {required: true, message: '请输入租户ID', trigger: 'blur'}
          ],
          priceTypeName: [
            {required: true, message: '请输入价格类别名称', trigger: 'blur'}
          ],
          bottomOn: [
            {required: true, message: '请选择启用保底水量', trigger: 'blur'}
          ],
          topOn: [
            {required: true, message: '请选择启用封顶水量', trigger: 'blur'}
          ],
          reduceOn: [
            {required: true, message: '请选择启用固定减免', trigger: 'blur'}
          ],
          fixedOn: [
            {required: true, message: '请选择启用固定水量征收', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantPriceType(this.$route.query.id).then(response => {
	          this.tenantPriceType = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantPriceTypeByTenantId(this.$route.query.tenantId).then(response => {
	          this.tenantPriceType = response.data;
        	});
        }
        
      }else{
        this.tenantPriceType = Object.assign({},defaultTenantPriceType,this.$route.query);
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


