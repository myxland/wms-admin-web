<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantPriceStep" :rules="rules" ref="tenantPriceStepFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        <el-input v-model="tenantPriceStep.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="tenantPriceStep.tenantId" placeholder="请选择租户" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格类别：" prop="priceTypeId">
        <el-select v-model="tenantPriceStep.priceTypeId" placeholder="请选择价格类别" clearable>
                <el-option
                  v-for="item in tenantPriceTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="费用项目：" prop="priceItemId">
        <el-select v-model="tenantPriceStep.priceItemId" placeholder="请选择费用项目" clearable>
                <el-option
                  v-for="item in tenantPriceItemOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶梯号：" prop="stepId">
        <el-input-number v-model="tenantPriceStep.stepId" label="阶梯号"></el-input-number>
      </el-form-item>
      <el-form-item label="起始量：" prop="startNum">
        <el-input-number v-model="tenantPriceStep.startNum" label="起始量"></el-input-number>
      </el-form-item>
      <el-form-item label="终止量：" prop="endNum">
        <el-input-number v-model="tenantPriceStep.endNum" label="起始量"></el-input-number>
      </el-form-item>
      <el-form-item label="价格：" prop="price">
        <el-input-number v-model="tenantPriceStep.price" label="价格" :precision="2"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantPriceStepFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tenantPriceStepFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTenantPriceStep, getTenantPriceStep, updateTenantPriceStep} from '@/api/tenantPriceStep'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {fetchList as fetchTenantPriceTypeList} from '@/api/tenantPriceType';
  import {fetchList as fetchTenantPriceItemList} from '@/api/tenantPriceItem';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantPriceStep={
    tenantId: '',
    priceTypeId: '',
    priceItemId: '',
    stepId: '',
    startNum: 0,
    endNum: 0,
    price: ''
  };
  export default {
    name: 'TenantPriceStepDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tenantPriceStep:Object.assign({}, defaultTenantPriceStep),
        tenantInfoOptions:[],
        tenantPriceTypeOptions:[],
        tenantPriceItemOptions:[],
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
          stepId: [
            {required: true, message: '请输入阶梯号', trigger: 'blur'}
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
        getTenantPriceStep(this.$route.query.id).then(response => {
          this.tenantPriceStep = response.data;
        });
      }else{
        this.tenantPriceStep = Object.assign({},defaultTenantPriceStep);
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
                updateTenantPriceStep(this.$route.query.id, this.tenantPriceStep).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTenantPriceStep(this.tenantPriceStep).then(response => {
                  this.$refs[formName].resetFields();
                  this.tenantPriceStep = Object.assign({},defaultTenantPriceStep);
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
        this.tenantPriceStep = Object.assign({},defaultTenantPriceStep);
      }
    }
  }
</script>
<style>
</style>


