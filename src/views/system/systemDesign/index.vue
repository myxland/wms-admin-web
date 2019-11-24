<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchSystemDesignList()"
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
            <el-form-item label="系统ID：">
              <el-input style="width: 203px" v-model="listQuery.id" placeholder="系统ID"></el-input>
            </el-form-item>
            <el-form-item label="依赖模块：">
              <el-input style="width: 203px" v-model="listQuery.relyId" placeholder="依赖模块"></el-input>
            </el-form-item>
            <el-form-item label="模块名称：">
              <el-input style="width: 203px" v-model="listQuery.moduleName" placeholder="模块名称"></el-input>
            </el-form-item>
            <el-form-item label="开放对象：">
              <el-select v-model="listQuery.openTenantType" placeholder="全部" clearable>
                <el-option
                  v-for="item in openTenantTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="运行环境：">
              <el-select v-model="listQuery.runEnvType" placeholder="全部" clearable>
                <el-option
                  v-for="item in runEnvTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="价格政策：">
              <el-select v-model="listQuery.pricePolicyType" placeholder="全部" clearable>
                <el-option
                  v-for="item in pricePolicyTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="计费周期：">
              <el-select v-model="listQuery.billCycleType" placeholder="全部" clearable>
                <el-option
                  v-for="item in billCycleTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开放基础版：">
              <el-select v-model="listQuery.basicOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in basicOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开放高级版：">
              <el-select v-model="listQuery.advanceOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in advanceOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开放旗舰版：">
              <el-select v-model="listQuery.ultimateOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in ultimateOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="功能发布：">
              <el-select v-model="listQuery.moduleReleaseOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in moduleReleaseOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addSystemDesign()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="systemDesignTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="系统ID" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="依赖模块" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.relyId}}</template>
        </el-table-column>
        <el-table-column label="模块名称" align="left" header-align="center">
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
        <el-table-column label="开放基础版" width="100" align="left">
          <template slot-scope="scope">
            <el-switch
              @change="handleBasicOnChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.basicOn">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="开放高级版" width="100" align="left">
          <template slot-scope="scope">
            <el-switch
              @change="handleAdvanceOnChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.advanceOn">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="开放旗舰版" width="100" align="left">
          <template slot-scope="scope">
            <el-switch
              @change="handleUltimateOnChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.ultimateOn">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="功能发布" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.moduleReleaseOn | formatModuleReleaseOn}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
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
  import {fetchList, deleteSystemDesign, updateBasicOn, updateAdvanceOn, updateUltimateOn, updateModuleReleaseOn} from '@/api/systemDesign'
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    relyId: null,
    moduleName: null,
    openTenantType: null,
    runEnvType: null,
    pricePolicyType: null,
    billCycleType: null,
    basicOn: null,
    advanceOn: null,
    ultimateOn: null,
    moduleReleaseOn: null
  };
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
  const defaultBasicOnOptions=[
    {
      value: 1,
      label: '开放'
    },
    {
      value: 0,
      label: '不开放'
    }
  ];
  const defaultAdvanceOnOptions=[
    {
      value: 1,
      label: '开放'
    },
    {
      value: 0,
      label: '不开放'
    }
  ];
  const defaultUltimateOnOptions=[
    {
      value: 1,
      label: '开放'
    },
    {
      value: 0,
      label: '不开放'
    }
  ];
  const defaultModuleReleaseOnOptions=[
    {
      value: 1,
      label: '已发布'
    },
    {
      value: 0,
      label: '未发布'
    }
  ];
  
  export default {
    name: 'systemDesignList',
    data() {
      return {
        operates: [
          {
            label: "已发布功能发布",
            value: "activeModuleReleaseOn"
          },
          {
            label: "未发布功能发布",
            value: "inactiveModuleReleaseOn"
          }
        ],
        operateType: null,
        listQuery:Object.assign({},defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        openTenantTypeOptions: Object.assign({},defaultOpenTenantTypeOptions),
        runEnvTypeOptions: Object.assign({},defaultRunEnvTypeOptions),
        pricePolicyTypeOptions: Object.assign({},defaultPricePolicyTypeOptions),
        billCycleTypeOptions: Object.assign({},defaultBillCycleTypeOptions),
        basicOnOptions: Object.assign({},defaultBasicOnOptions),
        advanceOnOptions: Object.assign({},defaultAdvanceOnOptions),
        ultimateOnOptions: Object.assign({},defaultUltimateOnOptions),
        moduleReleaseOnOptions: Object.assign({},defaultModuleReleaseOnOptions),
        multipleSelection: []
      }
    },
    created() {
      this.getList();
    },
    filters:{
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
      },
      formatBasicOn(basicOn){
        for(let i=0;i<defaultBasicOnOptions.length;i++){
          if(basicOn===defaultBasicOnOptions[i].value){
            return defaultBasicOnOptions[i].label;
          }
        }
      },
      formatAdvanceOn(advanceOn){
        for(let i=0;i<defaultAdvanceOnOptions.length;i++){
          if(advanceOn===defaultAdvanceOnOptions[i].value){
            return defaultAdvanceOnOptions[i].label;
          }
        }
      },
      formatUltimateOn(ultimateOn){
        for(let i=0;i<defaultUltimateOnOptions.length;i++){
          if(ultimateOn===defaultUltimateOnOptions[i].value){
            return defaultUltimateOnOptions[i].label;
          }
        }
      },
      formatModuleReleaseOn(moduleReleaseOn){
        for(let i=0;i<defaultModuleReleaseOnOptions.length;i++){
          if(moduleReleaseOn===defaultModuleReleaseOnOptions[i].value){
            return defaultModuleReleaseOnOptions[i].label;
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
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/system/updateSystemDesign', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该系统定义', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteSystemDesign(row.id).then(response => {
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
      handleBasicOnChange(index, row) {
        let data = new URLSearchParams();
        ;
        data.append("ids", row.id);
        data.append("basicOn", row.basicOn);
        updateBasicOn(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.basicOn === 0) {
            row.basicOn = 1;
          } else {
            row.basicOn = 0;
          }
        });
      },
      handleAdvanceOnChange(index, row) {
        let data = new URLSearchParams();
        ;
        data.append("ids", row.id);
        data.append("advanceOn", row.advanceOn);
        updateAdvanceOn(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.advanceOn === 0) {
            row.advanceOn = 1;
          } else {
            row.advanceOn = 0;
          }
        });
      },
      handleUltimateOnChange(index, row) {
        let data = new URLSearchParams();
        ;
        data.append("ids", row.id);
        data.append("ultimateOn", row.ultimateOn);
        updateUltimateOn(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.ultimateOn === 0) {
            row.ultimateOn = 1;
          } else {
            row.ultimateOn = 0;
          }
        });
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      searchSystemDesignList() {
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
        if(this.operateType=="activeModuleReleaseOn" || this.operateType=="inactiveModuleReleaseOn"){
          let moduleReleaseOn = 0;
          if(this.operateType=="activeModuleReleaseOn"){
            moduleReleaseOn = 1;
          }
          data.append("moduleReleaseOn", moduleReleaseOn);
          updateModuleReleaseOn(data).then(response => {
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
      addSystemDesign() {
        this.$router.push({path: '/system/addSystemDesign'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


