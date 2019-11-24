<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantPriceDetail" :rules="rules" ref="tenantPriceDetailFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        <el-input v-model="tenantPriceDetail.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="tenantPriceDetail.tenantId" placeholder="请选择租户" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格类别：" prop="priceTypeId">
        <el-select v-model="tenantPriceDetail.priceTypeId" placeholder="请选择价格类别" clearable>
                <el-option
                  v-for="item in tenantPriceTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="费用项目：" prop="priceItemId">
        <el-select v-model="tenantPriceDetail.priceItemId" placeholder="请选择费用项目" clearable>
                <el-option
                  v-for="item in tenantPriceItemOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="计算方法：" prop="calcType" clearable>
        <el-select
          v-model="tenantPriceDetail.calcType"
          placeholder="请选择计算方法">
          <el-option
            v-for="item in calcTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="指定价格：" prop="price">
        <el-input-number v-model="tenantPriceDetail.price" label="指定价格" precision="2"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantPriceDetailFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantPriceDetailFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantPriceDetail, getTenantPriceDetail, updateTenantPriceDetail} from '@/api/tenantPriceDetail'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {fetchList as fetchTenantPriceTypeList} from '@/api/tenantPriceType';
  import {fetchList as fetchTenantPriceItemList} from '@/api/tenantPriceItem';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantPriceDetail={
    tenantId: '',
    priceTypeId: '',
    priceItemId: '',
    calcType: '',
    price: ''
  };
  const defaultCalcTypeOptions=[
    {
      value: 1,
      label: '固定单价'
    },
    {
      value: 2,
      label: '固定金额'
    },
    {
      value: 3,
      label: '阶梯价格'
    }
  ];
  export default {
    name: 'TenantPriceDetailDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantPriceDetail:Object.assign({}, defaultTenantPriceDetail),
        tenantInfoOptions:[],
        tenantPriceTypeOptions:[],
        tenantPriceItemOptions:[],
        calcTypeOptions: Object.assign({},defaultCalcTypeOptions),
        rules: {
          tenantId: [
            {required: true, message: '请输入租户编号', trigger: 'blur'}
          ],
          priceTypeId: [
            {required: true, message: '请输入价格类别', trigger: 'blur'}
          ],
          priceItemId: [
            {required: true, message: '请输入费用项目', trigger: 'blur'}
          ],
          calcType: [
            {required: true, message: '请选择计算方法', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getTenantPriceDetail(this.$route.query.id).then(response => {
          this.tenantPriceDetail = response.data;
        });
      }else{
        this.tenantPriceDetail = Object.assign({},defaultTenantPriceDetail);
      }
      this.getTenantInfoList();
      this.getTenantPriceTypeList();
      this.getTenantPriceItemList();
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
      getTenantPriceTypeList() {
        fetchTenantPriceTypeList({pageNum:1,pageSize:100}).then(response => {
          this.tenantPriceTypeOptions = [];
          let tenantPriceTypeList = response.data.list;
          for(let i=0;i<tenantPriceTypeList.length;i++){
            this.tenantPriceTypeOptions.push({label:tenantPriceTypeList[i].priceTypeName,value:tenantPriceTypeList[i].id});
          }
        });
      },
      getTenantPriceItemList() {
        fetchTenantPriceItemList({pageNum:1,pageSize:100}).then(response => {
          this.tenantPriceItemOptions = [];
          let tenantPriceItemList = response.data.list;
          for(let i=0;i<tenantPriceItemList.length;i++){
            this.tenantPriceItemOptions.push({label:tenantPriceItemList[i].priceItemName,value:tenantPriceItemList[i].id});
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
                updateTenantPriceDetail(this.$route.query.id, this.tenantPriceDetail).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantPriceDetail(this.tenantPriceDetail).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantPriceDetail = Object.assign({},defaultTenantPriceDetail);
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
        this.tenantPriceDetail = Object.assign({},defaultTenantPriceDetail);
      }
    }
  }
</script>
<style>
</style>


