<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchSystemInfoList()"
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
            <el-form-item label="系统编号：">
              <el-input style="width: 203px" v-model="listQuery.id" placeholder="系统编号"></el-input>
            </el-form-item>
            <el-form-item label="系统名称：">
              <el-input style="width: 203px" v-model="listQuery.systemName" placeholder="系统名称"></el-input>
            </el-form-item>
            <el-form-item label="发布状态：">
              <el-select v-model="listQuery.issueOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in issueOnOptions"
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
        @click="addSystemInfo()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="systemInfoTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="系统编号" width="80" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="系统名称" width="200" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.systemName}}</template>
        </el-table-column>
        <el-table-column label="开放对象" width="100" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantType | formatTenantType}}</template>
        </el-table-column>
        <el-table-column label="运行环境" width="100" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.runtimeEnvironment | formatRuntimeEnvironment}}</template>
        </el-table-column>
        <el-table-column label="依赖系统" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.dependentSystemId}}</template>
        </el-table-column>
        <el-table-column label="价格政策" width="100" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.priceType | formatPriceType}}</template>
        </el-table-column>
        <el-table-column label="计费周期" width="100" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.billCycle | formatBillCycle}}</template>
        </el-table-column>
        <el-table-column label="开放基础版" width="100" align="center" header-align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleBasicOnChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.basicOn">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="开放高级版" width="100" align="center" header-align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleAdvanceOnChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.advanceOn">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="开放旗舰版" width="100" align="center" header-align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleUltimateOnChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.ultimateOn">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="发布状态" width="100" align="center" header-align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleIssueOnChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.issueOn">
            </el-switch>
          </template>
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
  import {fetchList, deleteSystemInfo, updateBasicOn, updateAdvanceOn, updateUltimateOn, updateIssueOn, batchUpdateIssueOn} from '@/api/systemInfo'
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    systemName: null,
    tenantType: null,
    runtimeEnvironment: null,
    dependentSystemId: null,
    priceType: null,
    billCycle: null,
    basicOn: null,
    advanceOn: null,
    ultimateOn: null,
    issueOn: null
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
  const defaultRuntimeEnvironmentOptions=[
    {
      value: 0,
      label: 'PC'
    },
    {
      value: 1,
      label: '移动端'
    }
  ];
  const defaultPriceTypeOptions=[
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
  const defaultBillCycleOptions=[
    {
      value: 0,
      label: '实时'
    },
    {
      value: 1,
      label: '按天'
    },
    {
      value: 2,
      label: '按月'
    },
    {
      value: 3,
      label: '按年'
    }
  ];
  const defaultBasicOnOptions=[
    {
      value: 0,
      label: '未开放'
    },
    {
      value: 1,
      label: '开放'
    }
  ];
  const defaultAdvanceOnOptions=[
    {
      value: 0,
      label: '未开放'
    },
    {
      value: 1,
      label: '开放'
    }
  ];
  const defaultUltimateOnOptions=[
    {
      value: 0,
      label: '未开放'
    },
    {
      value: 1,
      label: '开放'
    }
  ];
  const defaultIssueOnOptions=[
    {
      value: 0,
      label: '未发布'
    },
    {
      value: 1,
      label: '已发布'
    }
  ];
  
  export default {
    name: 'systemInfoList',
    data() {
      return {
        operates: [
          {
            label: "设置发布状态未发布",
            value: "setIssueOn0"
          },
          {
            label: "设置发布状态已发布",
            value: "setIssueOn1"
          }
        ],
        operateType: null,
        listQuery:Object.assign({},defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        tenantTypeOptions: Object.assign({},defaultTenantTypeOptions),
        runtimeEnvironmentOptions: Object.assign({},defaultRuntimeEnvironmentOptions),
        priceTypeOptions: Object.assign({},defaultPriceTypeOptions),
        billCycleOptions: Object.assign({},defaultBillCycleOptions),
        basicOnOptions: Object.assign({},defaultBasicOnOptions),
        advanceOnOptions: Object.assign({},defaultAdvanceOnOptions),
        ultimateOnOptions: Object.assign({},defaultUltimateOnOptions),
        issueOnOptions: Object.assign({},defaultIssueOnOptions),
        multipleSelection: []
      }
    },
    created() {
      this.getList();
    },
    filters:{
      formatTenantType(tenantType){
        for(let i=0;i<defaultTenantTypeOptions.length;i++){
          if(tenantType===defaultTenantTypeOptions[i].value){
            return defaultTenantTypeOptions[i].label;
          }
        }
      },
      formatRuntimeEnvironment(runtimeEnvironment){
        for(let i=0;i<defaultRuntimeEnvironmentOptions.length;i++){
          if(runtimeEnvironment===defaultRuntimeEnvironmentOptions[i].value){
            return defaultRuntimeEnvironmentOptions[i].label;
          }
        }
      },
      formatPriceType(priceType){
        for(let i=0;i<defaultPriceTypeOptions.length;i++){
          if(priceType===defaultPriceTypeOptions[i].value){
            return defaultPriceTypeOptions[i].label;
          }
        }
      },
      formatBillCycle(billCycle){
        for(let i=0;i<defaultBillCycleOptions.length;i++){
          if(billCycle===defaultBillCycleOptions[i].value){
            return defaultBillCycleOptions[i].label;
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
      formatIssueOn(issueOn){
        for(let i=0;i<defaultIssueOnOptions.length;i++){
          if(issueOn===defaultIssueOnOptions[i].value){
            return defaultIssueOnOptions[i].label;
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
        this.$router.push({path: '/wms/updateSystemInfo', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该系统信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteSystemInfo(row.id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      },
      handleBasicOnChange(index, row) {
        var data = new URLSearchParams();
        data.append("id", row.id);
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
        var data = new URLSearchParams();
        data.append("id", row.id);
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
        var data = new URLSearchParams();
        data.append("id", row.id);
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
      handleIssueOnChange(index, row) {
        var data = new URLSearchParams();
        data.append("id", row.id);
        data.append("issueOn", row.issueOn);
        updateIssueOn(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.issueOn === 0) {
            row.issueOn = 1;
          } else {
            row.issueOn = 0;
          }
        });
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      searchSystemInfoList() {
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
        let issueOn = 0;
        if (this.operateType === 'setIssueOn0') {
          issueOn = 0;
        }
        else if (this.operateType === 'setIssueOn1') {
          issueOn = 1;
        }
        else {
          this.$message({
            message: '请选择批量操作类型',
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
        data.append("issueOn", issueOn);
        batchUpdateIssueOn(data).then(response => {
          this.getList();
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      addSystemInfo() {
        this.$router.push({path: '/wms/addSystemInfo'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


