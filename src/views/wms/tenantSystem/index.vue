<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchTenantSystemList()"
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
            <el-form-item label="编号：">
              <el-input style="width: 203px" v-model="listQuery.id" placeholder="编号"></el-input>
            </el-form-item>
            <el-form-item label="租户：">
              <el-select v-model="listQuery.tenantId" placeholder="请选择租户" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="系统：">
              <el-select v-model="listQuery.systemId" placeholder="请选择系统" clearable>
                <el-option
                  v-for="item in systemInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="系统状态：">
              <el-select v-model="listQuery.systemStatus" placeholder="全部" clearable>
                <el-option
                  v-for="item in systemStatusOptions"
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
        @click="addTenantSystem()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="tenantSystemTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="租户编号" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantId}}</template>
        </el-table-column>
        <el-table-column label="系统编号" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.systemId}}</template>
        </el-table-column>
        <el-table-column label="系统显示名称" width="200" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.systemName}}</template>
        </el-table-column>
        <el-table-column label="系统排序" width="120" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.systemOrder}}</template>
        </el-table-column>
        <el-table-column label="开通版本" width="100" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.systemEdition | formatSystemEdition}}</template>
        </el-table-column>
        <el-table-column label="系统状态" width="100" align="center" header-align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleSystemStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.systemStatus">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="价格体系" width="100" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.systemPriceType | formatSystemPriceType}}</template>
        </el-table-column>
        <el-table-column label="开通时间" width="120" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.systemStartDate | formatTime}}</template>
        </el-table-column>
        <el-table-column label="到期时间" width="120" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.systemEndDate | formatTime}}</template>
        </el-table-column>
        <el-table-column label="开始计费日期" width="120" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.systemStartChargeDate | formatDate}}</template>
        </el-table-column>
        <el-table-column label="欠费金额" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.systemArrears}}</template>
        </el-table-column>
        <el-table-column label="透支额度" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.systemOverdraft}}</template>
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
  import {fetchList, deleteTenantSystem, updateSystemStatus, batchUpdateSystemStatus} from '@/api/tenantSystem'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo'
  import {fetchList as fetchSystemInfoList} from '@/api/systemInfo'
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    systemId: null,
    systemName: null,
    systemOrder: null,
    systemEdition: null,
    systemStatus: null,
    systemPriceType: null,
    systemStartDate: null,
    systemStartDateStart: null,
    systemStartDateEnd: null,
    systemEndDate: null,
    systemEndDateStart: null,
    systemEndDateEnd: null,
    systemStartChargeDate: null,
    systemStartChargeDateStart: null,
    systemStartChargeDateEnd: null,
    systemArrears: null,
    systemOverdraft: null
  };
  const defaultSystemEditionOptions=[
    {
      value: 0,
      label: '基础版'
    },
    {
      value: 1,
      label: '高级版'
    },
    {
      value: 2,
      label: '旗舰版'
    }
  ];
  const defaultSystemStatusOptions=[
    {
      value: 0,
      label: '未开通'
    },
    {
      value: 1,
      label: '开通'
    }
  ];
  const defaultSystemPriceTypeOptions=[
    {
      value: 0,
      label: '标准价格'
    },
    {
      value: 1,
      label: '指定价格'
    }
  ];
  
  export default {
    name: 'tenantSystemList',
    data() {
      return {
        operates: [
          {
            label: "设置系统状态未开通",
            value: "setSystemStatus0"
          },
          {
            label: "设置系统状态开通",
            value: "setSystemStatus1"
          }
        ],
        operateType: null,
        listQuery:Object.assign({},defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        tenantInfoOptions: [],
        systemInfoOptions: [],
        systemEditionOptions: Object.assign({},defaultSystemEditionOptions),
        systemStatusOptions: Object.assign({},defaultSystemStatusOptions),
        systemPriceTypeOptions: Object.assign({},defaultSystemPriceTypeOptions),
        multipleSelection: []
      }
    },
    created() {
      this.getList();
      this.getTenantInfoList();
      this.getSystemInfoList();
    },
    filters:{
      formatTime(time) {
        if(time==null||time===''){
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatDate(time) {
        if(time==null||time===''){
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd')
      },
      formatSystemEdition(systemEdition){
        for(let i=0;i<defaultSystemEditionOptions.length;i++){
          if(systemEdition===defaultSystemEditionOptions[i].value){
            return defaultSystemEditionOptions[i].label;
          }
        }
      },
      formatSystemStatus(systemStatus){
        for(let i=0;i<defaultSystemStatusOptions.length;i++){
          if(systemStatus===defaultSystemStatusOptions[i].value){
            return defaultSystemStatusOptions[i].label;
          }
        }
      },
      formatSystemPriceType(systemPriceType){
        for(let i=0;i<defaultSystemPriceTypeOptions.length;i++){
          if(systemPriceType===defaultSystemPriceTypeOptions[i].value){
            return defaultSystemPriceTypeOptions[i].label;
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
      getTenantInfoList() {
        fetchTenantInfoList({pageNum: 1, pageSize: 100}).then(response => {
          this.tenantInfoOptions = [];
          let tenantInfoList = response.data.list;
          for (let i = 0; i < tenantInfoList.length; i++) {
            this.tenantInfoOptions.push({label: tenantInfoList[i].tenantName, value: tenantInfoList[i].id});
          }
        });
      },
      getSystemInfoList() {
        fetchSystemInfoList({pageNum: 1, pageSize: 100}).then(response => {
          this.systemInfoOptions = [];
          let systemInfoList = response.data.list;
          for (let i = 0; i < systemInfoList.length; i++) {
            this.systemInfoOptions.push({label: systemInfoList[i].systemName, value: systemInfoList[i].id});
          }
        });
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/wms/updateTenantSystem', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该租户开通系统清单', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTenantSystem(row.id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      },
      handleSystemStatusChange(index, row) {
        var data = new URLSearchParams();
        data.append("id", row.id);
        data.append("systemStatus", row.systemStatus);
        updateSystemStatus(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.systemStatus === 0) {
            row.systemStatus = 1;
          } else {
            row.systemStatus = 0;
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
      searchTenantSystemList() {
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
        let systemStatus = 0;
        if (this.operateType === 'setSystemStatus0') {
          systemStatus = 0;
        }
        else if (this.operateType === 'setSystemStatus1') {
          systemStatus = 1;
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
        data.append("systemStatus", systemStatus);
        batchUpdateSystemStatus(data).then(response => {
          this.getList();
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      addTenantSystem() {
        this.$router.push({path: '/wms/addTenantSystem'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


