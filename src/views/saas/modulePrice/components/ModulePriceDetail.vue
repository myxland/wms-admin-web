<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="modulePrice" :rules="rules" ref="modulePriceFrom" label-width="150px">
      <el-form-item label="模块价格ID：" prop="id">
        <el-input v-model="modulePrice.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="模块ID：" prop="moduleId">
        <el-select v-model="modulePrice.moduleId" placeholder="请选择模块ID" :disabled="this.$route.query.moduleId?true:false" clearable>
                <el-option
                  v-for="item in moduleInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模块版本：" prop="moduleEdition">
        <el-select
          v-model="modulePrice.moduleEdition"
          clearable
          placeholder="请选择模块版本">
          <el-option
            v-for="item in moduleEditionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="起始量：" prop="startNum">
        <el-input-number v-model="modulePrice.startNum" :min="0" placeholder="起始量"></el-input-number>
      </el-form-item>
      <el-form-item label="终止量：" prop="endNum">
        <el-input-number v-model="modulePrice.endNum" :min="0" placeholder="终止量"></el-input-number>
      </el-form-item>
      <el-form-item label="价格：" prop="priceMoney">
        <el-input-number v-model="modulePrice.priceMoney" :min="0" :precision="2" placeholder="价格"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('modulePriceFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('modulePriceFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createModulePrice, getModulePrice, updateModulePrice} from '@/api/modulePrice'
  import {fetchList as fetchModuleInfoList} from '@/api/moduleInfo';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultModulePrice={
    moduleId: '',
    moduleEdition: '',
    startNum: 0,
    endNum: 0,
    priceMoney: null
  };
  const defaultModuleEditionOptions=[
    {
      value: 1,
      label: '基础版'
    },
    {
      value: 2,
      label: '高级版'
    },
    {
      value: 3,
      label: '旗舰版'
    }
  ];
  export default {
    name: 'ModulePriceDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        modulePrice:Object.assign({}, defaultModulePrice, this.$route.query),
        moduleInfoOptions:[],
        moduleEditionOptions: Object.assign({},defaultModuleEditionOptions),
        rules: {
          moduleId: [
            {required: true, message: '请输入模块ID', trigger: 'blur'}
          ],
          moduleEdition: [
            {required: true, message: '请选择模块版本', trigger: 'blur'}
          ],
          startNum: [
            {required: true, message: '请输入起始量', trigger: 'blur'}
          ],
          endNum: [
            {required: true, message: '请输入终止量', trigger: 'blur'}
          ],
          priceMoney: [
            {required: true, message: '请输入价格', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
      	if (this.$route.query.id) {
          	getModulePrice(this.$route.query.id).then(response => {
	          this.modulePrice = response.data;
        	});
        }
        else if (this.$route.query.tenantId) {
          getModulePriceByTenantId(this.$route.query.tenantId).then(response => {
	          this.modulePrice = response.data;
        	});
        }
        
      }else{
        this.modulePrice = Object.assign({},defaultModulePrice,this.$route.query);
      }
      this.getModuleInfoList();
    },
    methods: {
      getModuleInfoList() {
        fetchModuleInfoList({pageNum:1,pageSize:500}).then(response => {
          this.moduleInfoOptions = [];
          let moduleInfoList = response.data.list;
          for(let i=0;i<moduleInfoList.length;i++){
            this.moduleInfoOptions.push({label:moduleInfoList[i].moduleName,value:moduleInfoList[i].id});
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
                updateModulePrice(this.$route.query.id, this.modulePrice).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createModulePrice(this.modulePrice).then(response => {
                  this.$refs[formName].resetFields();
                  this.modulePrice = Object.assign({},defaultModulePrice);
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
        this.modulePrice = Object.assign({},defaultModulePrice);
      }
    }
  }
</script>
<style>
</style>


