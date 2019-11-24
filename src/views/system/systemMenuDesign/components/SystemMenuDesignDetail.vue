<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="systemMenuDesign" :rules="rules" ref="systemMenuDesignFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        <el-input v-model="systemMenuDesign.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="父菜单编号：" prop="parentMenuId">
        <el-input v-model="systemMenuDesign.parentMenuId"></el-input>
      </el-form-item>
      <el-form-item label="模块：" prop="sysId">
        <el-select v-model="systemMenuDesign.sysId" placeholder="请选择模块" clearable>
                <el-option
                  v-for="item in systemDesignOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单名称：" prop="menuName">
        <el-input v-model="systemMenuDesign.menuName"></el-input>
      </el-form-item>
      <el-form-item label="菜单排序：" prop="menuOrder">
        <el-input v-model="systemMenuDesign.menuOrder"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标：" prop="menuIcon">
        <el-input v-model="systemMenuDesign.menuIcon"></el-input>
      </el-form-item>
      <el-form-item label="开放基础版：" prop="basicOn">
        <el-switch
          v-model="systemMenuDesign.basicOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="开放高级版：" prop="advanceOn">
        <el-switch
          v-model="systemMenuDesign.advanceOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="开放旗舰版：" prop="ultimateOn">
        <el-switch
          v-model="systemMenuDesign.ultimateOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="基础版链接地址：" prop="basicUrl">
        <el-input v-model="systemMenuDesign.basicUrl"></el-input>
      </el-form-item>
      <el-form-item label="高级版链接地址：" prop="advanceUrl">
        <el-input v-model="systemMenuDesign.advanceUrl"></el-input>
      </el-form-item>
      <el-form-item label="旗舰版链接地址：" prop="ultimateUrl">
        <el-input v-model="systemMenuDesign.ultimateUrl"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('systemMenuDesignFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('systemMenuDesignFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createSystemMenuDesign, getSystemMenuDesign, updateSystemMenuDesign} from '@/api/systemMenuDesign'
  import {fetchList as fetchSystemDesignList} from '@/api/systemDesign';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultSystemMenuDesign={
    parentMenuId: '',
    sysId: '',
    menuName: '',
    menuOrder: 0,
    menuIcon: '',
    basicOn: 1,
    advanceOn: 1,
    ultimateOn: 1,
    basicUrl: '',
    advanceUrl: '',
    ultimateUrl: ''
  };
  export default {
    name: 'SystemMenuDesignDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        systemMenuDesign:Object.assign({}, defaultSystemMenuDesign),
        systemDesignOptions:[],
        rules: {
          sysId: [
            {required: true, message: '请输入模块编号', trigger: 'blur'}
          ],
          menuName: [
            {required: true, message: '请输入菜单名称', trigger: 'blur'}
          ],
          menuIcon: [
            {required: true, message: '请输入菜单图标', trigger: 'blur'}
          ],
          basicOn: [
            {required: true, message: '请选择开放基础版', trigger: 'blur'}
          ],
          advanceOn: [
            {required: true, message: '请选择开放高级版', trigger: 'blur'}
          ],
          ultimateOn: [
            {required: true, message: '请选择开放旗舰版', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getSystemMenuDesign(this.$route.query.id).then(response => {
          this.systemMenuDesign = response.data;
        });
      }else{
        this.systemMenuDesign = Object.assign({},defaultSystemMenuDesign);
      }
      this.getSystemDesignList();
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
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateSystemMenuDesign(this.$route.query.id, this.systemMenuDesign).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createSystemMenuDesign(this.systemMenuDesign).then(response => {
                  this.$refs[formName].resetFields();
                  this.systemMenuDesign = Object.assign({},defaultSystemMenuDesign);
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
        this.systemMenuDesign = Object.assign({},defaultSystemMenuDesign);
      }
    }
  }
</script>
<style>
</style>


