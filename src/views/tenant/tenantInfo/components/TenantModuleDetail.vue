<template> 
  <div class="app-container">
  <el-card class="filter-container" shadow="never">
    <el-form :model="tenantInfo" :rules="rules" ref="tenantInfoFrom" label-width="150px">
      <el-form-item label="租户编号：" prop="id">
        <el-input v-model="tenantInfo.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户名称：" prop="tenantName">
        <el-input v-model="tenantInfo.tenantName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="显示名称：" prop="displayName">
        <el-input v-model="tenantInfo.displayName" :disabled="true"></el-input>
      </el-form-item>      
      <el-form-item label="租户类型：" prop="tenantType">
        <el-select
          v-model="tenantInfo.tenantType"
          :disabled="true" 
          placeholder="请选择租户类型"
          clearable
          >
          <el-option
            v-for="item in tenantTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item>
        <div class="table-container">
          <el-table ref="moduleInfoTable"
                    :data="list"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    v-loading="listLoading"
                    border>
            <el-table-column type="selection" width="60" align="center"></el-table-column>
            <el-table-column label="系统ID" width="180" align="left" header-align="center">
              <template slot-scope="scope">{{scope.row.id}}</template>
            </el-table-column>
            <el-table-column label="依赖模块编码" width="180" align="left" header-align="center">
              <template slot-scope="scope">{{scope.row.relyId}}</template>
            </el-table-column>
            <el-table-column label="模块名称" width="" align="left" header-align="center">
              <template slot-scope="scope">{{scope.row.moduleName}}</template>
            </el-table-column>
            <el-table-column label="开放对象" width="100" align="left" header-align="center">
              <template slot-scope="scope">{{scope.row.openTenantType | formatOpenTenantType}}</template>
            </el-table-column>
            <el-table-column label="运行环境" width="100" align="left" header-align="center">
              <template slot-scope="scope">{{scope.row.runEnvType | formatRunEnvType}}</template>
            </el-table-column>
            <el-table-column label="价格政策" width="100" align="left" header-align="center">
              <template slot-scope="scope">{{scope.row.pricePolicyType | formatPricePolicyType}}</template>
            </el-table-column>
            <el-table-column label="计费周期" width="100" align="left" header-align="center">
              <template slot-scope="scope">{{scope.row.billCycleType | formatBillCycleType}}</template>
            </el-table-column>    
          </el-table>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantInfoFrom')">提交</el-button>        
      </el-form-item>
    </el-form>
  </el-card>
  </div>
</template>
<script>
  import {createTenantInfo, getTenantInfo, updateTenantInfo} from '@/api/tenantInfo'
  import {fetchList as fetchModuleInfoList} from '@/api/moduleInfo';
  import {fetchList as fetchTenantModuleList,createBatchTenantModuleByTenantId} from '@/api/tenantModule';
  import {formatDate} from '@/utils/date';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantInfo={
    tenantName: '',
    displayName: '',   
    tenantType: ''
  };
  const defaultTenantTypeOptions=[
    {
      value: 1,
      label: '使用单位'
    },
    {
      value: 2,
      label: '供应单位'
    },
    {
      value: 3,
      label: '内部运营'
    }
  ];  
  const defaultOpenTenantTypeOptions=[
    {
      value: 1,
      label: '使用单位'
    },
    {
      value: 2,
      label: '供应单位'
    },
    {
      value: 3,
      label: '内部运营'
    }
  ];
  const defaultRunEnvTypeOptions=[
    {
      value: 1,
      label: 'PC'
    },
    {
      value: 2,
      label: '移动端'
    }
  ];
  const defaultPricePolicyTypeOptions=[
    {
      value: 0,
      label: '免费'
    },
    {
      value: 1,
      label: '按量付费'
    },
    {
      value: 2,
      label: '固定价格'
    }
  ];
  const defaultBillCycleTypeOptions=[
    {
      value: 1,
      label: '实时'
    },
    {
      value: 2,
      label: '按天'
    },
    {
      value: 3,
      label: '按月'
    },
    {
      value: 4,
      label: '按年'
    }
  ];
  export default {
    name: 'TenantInfoModuleDetail',
    components:{SingleUpload},
    props: {
    },
    data() {
      return {
        list: null,         
        total: null,
        listLoading: true,
        multipleSelection:[],
        tenantInfo:Object.assign({}, defaultTenantInfo),
        tenantTypeOptions: Object.assign({},defaultTenantTypeOptions),
        rules: {
          
        }
      }
    },
    created() {
      this.getList();
      getTenantInfo(this.$route.query.id).then(response => {
          let data = response.data;
          this.tenantInfo = data;
          //this.tenantInfo = response.data;
      });
    },
    filters: {
      formatOpenTenantType(openTenantType){
        for(let i=0;i<defaultOpenTenantTypeOptions.length;i++){
          if(openTenantType===defaultOpenTenantTypeOptions[i].value){
            return defaultOpenTenantTypeOptions[i].label;
          }
        }
      },
      formatRunEnvType(runEnvType){
        for(let i=0;i<defaultRunEnvTypeOptions.length;i++){
          if(runEnvType===defaultRunEnvTypeOptions[i].value){
            return defaultRunEnvTypeOptions[i].label;
          }
        }
      },
      formatPricePolicyType(pricePolicyType){
        for(let i=0;i<defaultPricePolicyTypeOptions.length;i++){
          if(pricePolicyType===defaultPricePolicyTypeOptions[i].value){
            return defaultPricePolicyTypeOptions[i].label;
          }
        }
      },
      formatBillCycleType(billCycleType){
        for(let i=0;i<defaultBillCycleTypeOptions.length;i++){
          if(billCycleType===defaultBillCycleTypeOptions[i].value){
            return defaultBillCycleTypeOptions[i].label;
          }
        }
      }
    },
    methods: {
      getList() {
        this.listLoading = true;
        fetchModuleInfoList({pageNum:1,pageSize:500,openTenantType:this.$route.query.tenantType}).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          //this.total = response.data.total;
          //this.totalPage = response.data.totalPage;
          //this.pageSize = response.data.pageSize;

          this.$refs.moduleInfoTable.clearSelection();
          //this.multipleSelection=[];
          fetchTenantModuleList({pageNum:1,pageSize:500,tenantId:this.$route.query.id}).then(response => {
            let tenantModuleList = response.data.list;
            for(let i=0;i<tenantModuleList.length;i++){
              //this.multipleSelection.push(tenantModuleList[i].roleId);              
              for(let n=0;n<this.$refs.moduleInfoTable.data.length;n++){
                if(tenantModuleList[i].moduleId == this.$refs.moduleInfoTable.data[n].id){
                  this.$refs.moduleInfoTable.toggleRowSelection(this.$refs.moduleInfoTable.data[n],true);
                }
              }
            }
            
          });

        });

        
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              //
              let tenantModuleBatchData = {
                moduleIds:this.multipleSelection.map(function(elem,index){
                      return elem.id;
                }).join(",")
              };

              createBatchTenantModuleByTenantId(this.$route.query.id,tenantModuleBatchData).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  //this.$router.back();
                  this.$router.push({path: '/tenant/tenantModule', query: {tenantId:this.$route.query.id}})
              });
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
      }
    }
  }
</script>
<style>
</style>


