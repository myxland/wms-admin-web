<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchTenantConfigList()"
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
            <el-form-item label="租户编号：">
              <el-input style="width: 203px" v-model="listQuery.id" placeholder="租户编号"></el-input>
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
            <el-form-item label="是否启用部分缴费：">
              <el-select v-model="listQuery.partChargeOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in partChargeOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否启用违约金：">
              <el-select v-model="listQuery.overDuefineOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in overDuefineOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="违约金宽限天数：">
              <el-input style="width: 203px" v-model="listQuery.overDuefineDay" placeholder="违约金宽限天数"></el-input>
            </el-form-item>
            <el-form-item label="违约金每天收取比例：">
              <el-input style="width: 203px" v-model="listQuery.overDuefineRatio" placeholder="违约金每天收取比例"></el-input>
            </el-form-item>
            <el-form-item label="违约金封顶比例：">
              <el-input style="width: 203px" v-model="listQuery.overDuefineTopRatio" placeholder="违约金封顶比例"></el-input>
            </el-form-item>
            <el-form-item label="预存抵扣方式：">
              <el-select v-model="listQuery.ycdkType" placeholder="全部" clearable>
                <el-option
                  v-for="item in ycdkTypeOptions"
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
        @click="addTenantConfig()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="tenantConfigTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="租户编号" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="租户" width="280" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantName}}</template>
        </el-table-column>
        <el-table-column label="是否启用部分缴费" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.partChargeOn | formatPartChargeOn}}</template>
        </el-table-column>
        <el-table-column label="是否启用违约金" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.overDuefineOn | formatOverDuefineOn}}</template>
        </el-table-column>
        <el-table-column label="违约金宽限天数" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.overDuefineDay}}</template>
        </el-table-column>
        <el-table-column label="违约金每天收取比例" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.overDuefineRatio}}</template>
        </el-table-column>
        <el-table-column label="违约金封顶比例" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.overDuefineTopRatio}}</template>
        </el-table-column>
        <el-table-column label="预存抵扣方式" width="" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.ycdkType | formatYcdkType}}</template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleView(scope.$index, scope.row)">查看
            </el-button>
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
  import {fetchList, deleteTenantConfig} from '@/api/tenantConfig'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import accounting from 'accounting';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    partChargeOn: null,
    overDuefineOn: null,
    overDuefineDay: null,
    overDuefineRatio: null,
    overDuefineTopRatio: null,
    ycdkType: null
  };
  const defaultPartChargeOnOptions=[
    {
      value: 1,
      label: '启用'
    },
    {
      value: 0,
      label: '不启用'
    }
  ];
  const defaultOverDuefineOnOptions=[
    {
      value: 1,
      label: '启用'
    },
    {
      value: 0,
      label: '不启用'
    }
  ];
  const defaultYcdkTypeOptions=[
    {
      value: 1,
      label: '抄表后即时抵扣'
    },
    {
      value: 2,
      label: '人工发起抵扣'
    }
  ];
  
  export default {
    name: 'tenantConfigList',
    data() {
      return {
        operates: [
        ],
        operateType: null,
        listQuery:Object.assign({},defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        partChargeOnOptions: Object.assign({},defaultPartChargeOnOptions),
        overDuefineOnOptions: Object.assign({},defaultOverDuefineOnOptions),
        ycdkTypeOptions: Object.assign({},defaultYcdkTypeOptions),
        tenantInfoOptions:[],
        multipleSelection: []
      }
    },
    created() {
      this.getList();
      this.getTenantInfoList();
    },
    filters:{
      formatMoney(money){
        // 指定货币符号、保留小数位、千位间隔符
        return accounting.formatMoney(money,'',2,'');
      },
      formatPartChargeOn(partChargeOn){
        for(let i=0;i<defaultPartChargeOnOptions.length;i++){
          if(partChargeOn===defaultPartChargeOnOptions[i].value){
            return defaultPartChargeOnOptions[i].label;
          }
        }
      },
      formatOverDuefineOn(overDuefineOn){
        for(let i=0;i<defaultOverDuefineOnOptions.length;i++){
          if(overDuefineOn===defaultOverDuefineOnOptions[i].value){
            return defaultOverDuefineOnOptions[i].label;
          }
        }
      },
      formatYcdkType(ycdkType){
        for(let i=0;i<defaultYcdkTypeOptions.length;i++){
          if(ycdkType===defaultYcdkTypeOptions[i].value){
            return defaultYcdkTypeOptions[i].label;
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
        fetchTenantInfoList({pageNum:1,pageSize:500}).then(response => {
          this.tenantInfoOptions = [];
          let tenantInfoList = response.data.list;
          for(let i=0;i<tenantInfoList.length;i++){
            this.tenantInfoOptions.push({label:tenantInfoList[i].tenantName,value:tenantInfoList[i].id});
          }
        });
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleView(index, row) {
        this.$router.push({path: '/tenant/viewTenantConfig', query: {id: row.id}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/tenant/updateTenantConfig', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该租户基础配置', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTenantConfig(row.id).then(response => {
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
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      searchTenantConfigList() {
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
      },
      addTenantConfig() {
        this.$router.push({path: '/tenant/addTenantConfig'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


