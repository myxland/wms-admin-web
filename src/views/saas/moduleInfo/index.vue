<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchModuleInfoList()"
            type="primary"
            size="small">
            查询结果
          </el-button>
          <el-button
            style="float:right;margin-right: 15px"
            @click="handleResetSearch()"
            size="small">
            重置
          </el-button>
        </div>
        <div style="margin-top: 15px">
          <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
            <el-form-item label="模块名称：">
              <el-input style="width: 203px" v-model="listQuery.moduleName" placeholder="模块名称"></el-input>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addModuleInfo()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="moduleInfoTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="模块名称" width="" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.moduleName}}</template>
        </el-table-column>
        <el-table-column label="计费模式" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billingMode | formatBillingMode}}</template>
        </el-table-column>
        <el-table-column label="计费周期" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billingCycle | formatBillingCycle}}</template>
        </el-table-column>
        <el-table-column label="基础版" width="100" align="left" header-align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleBasicEditionOnChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.basicEditionOn">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="高级版" width="100" align="left" header-align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleAdvanceEditionOnChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.advanceEditionOn">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="旗舰版" width="100" align="left" header-align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleUltimateEditionOnChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.ultimateEditionOn">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="开放对象" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.openTarget | formatOpenTarget}}</template>
        </el-table-column>
        <el-table-column label="运行环境" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.runEnv | formatRunEnv}}</template>
        </el-table-column>
        <el-table-column label="依赖模块" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.relyModuleName}}</template>
        </el-table-column>        
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {fetchList, deleteModuleInfo, updateBasicEditionOn, updateAdvanceEditionOn, updateUltimateEditionOn, updateModuleOn} from '@/api/moduleInfo'
  import {fetchList as fetchModuleInfoList} from '@/api/moduleInfo';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    moduleName: null,
    openTarget: null,
    runEnv: null,
    relyModuleId: null,
    billingMode: null,
    billingCycle: null,
    basicEditionOn: null,
    advanceEditionOn: null,
    ultimateEditionOn: null,
    moduleOn: null,
    moduleAppid: null
  };
  const defaultOpenTargetOptions=[
    {
      value: 1,
      label: '使用单位'
    },
    {
      value: 2,
      label: '水表厂商'
    },
    {
      value: 3,
      label: '代收机构'
    },
    {
      value: 4,
      label: '内部运营'
    },
    {
      value: 5,
      label: '分销商'
    }
  ];
  const defaultRunEnvOptions=[
    {
      value: 1,
      label: 'PC端'
    },
    {
      value: 2,
      label: '移动端'
    },
    {
      value: 3,
      label: '微信端'
    },
    {
      value: 4,
      label: '支付宝端'
    },
    {
      value: 5,
      label: 'API接口'
    },
    {
      value: 6,
      label: '自助终端'
    }
  ];
  const defaultBillingModeOptions=[
    {
      value: 1,
      label: '默认开通'
    },
    {
      value: 2,
      label: '免费'
    },
    {
      value: 3,
      label: '按量付费'
    },
    {
      value: 4,
      label: '固定价格'
    },
    {
      value: 5,
      label: '阶梯价格'
    }
  ];
  const defaultBillingCycleOptions=[
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
  const defaultBasicEditionOnOptions=[
    {
      value: 1,
      label: '开放'
    },
    {
      value: 0,
      label: '不开放'
    }
  ];
  const defaultAdvanceEditionOnOptions=[
    {
      value: 1,
      label: '开放'
    },
    {
      value: 0,
      label: '不开放'
    }
  ];
  const defaultUltimateEditionOnOptions=[
    {
      value: 1,
      label: '开放'
    },
    {
      value: 0,
      label: '不开放'
    }
  ];
  const defaultModuleOnOptions=[
    {
      value: 1,
      label: '发布 '
    },
    {
      value: 0,
      label: '未发布'
    }
  ];
  
  export default {
    name: 'moduleInfoList',
    data() {
      return {
        operates: [
          {
            label: "发布",
            value: "activeModuleOn"
          },
          {
            label: "收回",
            value: "inactiveModuleOn"
          }
        ],
        operateType: null,
        moduleId: null,
        listQuery:Object.assign({},defaultListQuery,this.$route.query),
        list: null,
        total: null,
        listLoading: true,
        openTargetOptions: Object.assign({},defaultOpenTargetOptions),
        runEnvOptions: Object.assign({},defaultRunEnvOptions),
        billingModeOptions: Object.assign({},defaultBillingModeOptions),
        billingCycleOptions: Object.assign({},defaultBillingCycleOptions),
        basicEditionOnOptions: Object.assign({},defaultBasicEditionOnOptions),
        advanceEditionOnOptions: Object.assign({},defaultAdvanceEditionOnOptions),
        ultimateEditionOnOptions: Object.assign({},defaultUltimateEditionOnOptions),
        moduleOnOptions: Object.assign({},defaultModuleOnOptions),
        moduleInfoOptions:[],
        multipleSelection: []
      }
    },
    created() {
      this.getList();
      this.getModuleInfoList();
      let moduleId = this.$route.query.moduleId;
      if(moduleId){
        this.moduleId = moduleId;
        this.listQuery.moduleId = moduleId;
      }
    },
    filters:{
      formatOpenTarget(openTarget){
        for(let i=0;i<defaultOpenTargetOptions.length;i++){
          if(openTarget===defaultOpenTargetOptions[i].value){
            return defaultOpenTargetOptions[i].label;
          }
        }
      },
      formatRunEnv(runEnv){
        for(let i=0;i<defaultRunEnvOptions.length;i++){
          if(runEnv===defaultRunEnvOptions[i].value){
            return defaultRunEnvOptions[i].label;
          }
        }
      },
      formatBillingMode(billingMode){
        for(let i=0;i<defaultBillingModeOptions.length;i++){
          if(billingMode===defaultBillingModeOptions[i].value){
            return defaultBillingModeOptions[i].label;
          }
        }
      },
      formatBillingCycle(billingCycle){
        for(let i=0;i<defaultBillingCycleOptions.length;i++){
          if(billingCycle===defaultBillingCycleOptions[i].value){
            return defaultBillingCycleOptions[i].label;
          }
        }
      },
      formatBasicEditionOn(basicEditionOn){
        for(let i=0;i<defaultBasicEditionOnOptions.length;i++){
          if(basicEditionOn===defaultBasicEditionOnOptions[i].value){
            return defaultBasicEditionOnOptions[i].label;
          }
        }
      },
      formatAdvanceEditionOn(advanceEditionOn){
        for(let i=0;i<defaultAdvanceEditionOnOptions.length;i++){
          if(advanceEditionOn===defaultAdvanceEditionOnOptions[i].value){
            return defaultAdvanceEditionOnOptions[i].label;
          }
        }
      },
      formatUltimateEditionOn(ultimateEditionOn){
        for(let i=0;i<defaultUltimateEditionOnOptions.length;i++){
          if(ultimateEditionOn===defaultUltimateEditionOnOptions[i].value){
            return defaultUltimateEditionOnOptions[i].label;
          }
        }
      },
      formatModuleOn(moduleOn){
        for(let i=0;i<defaultModuleOnOptions.length;i++){
          if(moduleOn===defaultModuleOnOptions[i].value){
            return defaultModuleOnOptions[i].label;
          }
        }
      },
    },
    methods: {
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
          this.totalPage = response.data.totalPage;
          this.pageSize = response.data.pageSize;
        });
      },
      getModuleInfoList() {
        fetchModuleInfoList({pageNum:1,pageSize:500}).then(response => {
          this.moduleInfoOptions = [];
          let moduleInfoList = response.data.list;
          for(let i=0;i<moduleInfoList.length;i++){
            this.moduleInfoOptions.push({label:moduleInfoList[i].moduleName,value:moduleInfoList[i].id});
          }
        });
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery, this.$route.query);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleView(index, row) {
        this.$router.push({path: '/saas/viewModuleInfo', query: {id: row.id, moduleId:this.moduleId}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/saas/updateModuleInfoWithModulePrice', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该模块信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteModuleInfo(row.id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleBasicEditionOnChange(index, row) {
        let data = new URLSearchParams();
        ;
        data.append("ids", row.id);
        data.append("basicEditionOn", row.basicEditionOn);
        updateBasicEditionOn(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.basicEditionOn === 0) {
            row.basicEditionOn = 1;
          } else {
            row.basicEditionOn = 0;
          }
        });
      },
      handleAdvanceEditionOnChange(index, row) {
        let data = new URLSearchParams();
        ;
        data.append("ids", row.id);
        data.append("advanceEditionOn", row.advanceEditionOn);
        updateAdvanceEditionOn(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.advanceEditionOn === 0) {
            row.advanceEditionOn = 1;
          } else {
            row.advanceEditionOn = 0;
          }
        });
      },
      handleUltimateEditionOnChange(index, row) {
        let data = new URLSearchParams();
        ;
        data.append("ids", row.id);
        data.append("ultimateEditionOn", row.ultimateEditionOn);
        updateUltimateEditionOn(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.ultimateEditionOn === 0) {
            row.ultimateEditionOn = 1;
          } else {
            row.ultimateEditionOn = 0;
          }
        });
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      searchModuleInfoList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleBatchOperate() {
        console.log(this.multipleSelection);
        if (this.multipleSelection < 1) {
          this.$message({
            message: '请选择一条记录',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }
        let data = new URLSearchParams();
        data.append("ids", ids);
        if(this.operateType=="activeModuleOn" || this.operateType=="inactiveModuleOn"){
          let moduleOn = 0;
          if(this.operateType=="activeModuleOn"){
            moduleOn = 1;
          }
          data.append("moduleOn", moduleOn);
          updateModuleOn(data).then(response => {
            this.getList();
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 1000
            });
          });
        }
        else {
          this.$message({
            message: '请选择批量操作类型',
            type: 'warning',
            duration: 1000
          });
          return;
        }
      },
      addModuleInfo() {
        //this.$router.push({path: '/saas/addModuleInfo', query: {moduleId:this.moduleId}})
        this.$router.push({path: '/saas/addModuleInfoWithModulePrice', query: {}})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


