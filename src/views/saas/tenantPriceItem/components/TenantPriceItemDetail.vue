<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantPriceItem" :rules="rules" ref="tenantPriceItemFrom" label-width="150px">
      <el-form-item label="费用项目ID：" prop="id">
        <el-input v-model="tenantPriceItem.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        <el-select v-model="tenantPriceItem.tenantId" placeholder="请选择租户ID" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="费用项目名称：" prop="priceItemName">
        <el-input v-model="tenantPriceItem.priceItemName"></el-input>
      </el-form-item>
      <el-form-item label="税率：" prop="priceItemTaxRate">
        <el-input-number v-model="tenantPriceItem.priceItemTaxRate" :min="0" :precision="4" placeholder="税率"></el-input-number>
      </el-form-item>
      <el-form-item label="对应税控项目编号：" prop="priceItemTaxId">
        <el-input v-model="tenantPriceItem.priceItemTaxId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantPriceItemFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantPriceItemFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantPriceItem, getTenantPriceItem, updateTenantPriceItem} from '@/api/tenantPriceItem'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantPriceItem={
    tenantId: '',
    priceItemName: '',
    priceItemTaxRate: null,
    priceItemTaxId: ''
  };
  export default {
    name: 'TenantPriceItemDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantPriceItem:Object.assign({}, defaultTenantPriceItem, this.$route.query),
        tenantInfoOptions:[],
        rules: {
          tenantId: [
            {required: true, message: '请输入租户ID', trigger: 'blur'}
          ],
          priceItemName: [
            {required: true, message: '请输入费用项目名称', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getTenantPriceItem(this.$route.query.id).then(response => {
	          this.tenantPriceItem = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getTenantPriceItemByTenantId(this.$route.query.tenantId).then(response => {
	          this.tenantPriceItem = response.data;
        	});
        }
        
      }else{
        this.tenantPriceItem = Object.assign({},defaultTenantPriceItem,this.$route.query);
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
                updateTenantPriceItem(this.$route.query.id, this.tenantPriceItem).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantPriceItem(this.tenantPriceItem).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantPriceItem = Object.assign({},defaultTenantPriceItem);
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
        this.tenantPriceItem = Object.assign({},defaultTenantPriceItem);
      }
    }
  }
</script>
<style>
</style>


