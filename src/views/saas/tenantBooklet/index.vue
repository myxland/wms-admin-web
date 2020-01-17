<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchTenantBookletList()"
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
            <el-form-item label="表册ID：">
              <el-input style="width: 203px" v-model="listQuery.id" placeholder="表册ID"></el-input>
            </el-form-item>
            <el-form-item label="租户ID：">
              <el-select v-model="listQuery.tenantId" placeholder="请选择租户ID" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属部门ID：">
              <el-input style="width: 203px" v-model="listQuery.bookletDepartmentId" placeholder="所属部门ID"></el-input>
            </el-form-item>
            <el-form-item label="所属供水区域ID：">
              <el-input style="width: 203px" v-model="listQuery.bookletWaterAreaId" placeholder="所属供水区域ID"></el-input>
            </el-form-item>
            <el-form-item label="表册代码：">
              <el-input style="width: 203px" v-model="listQuery.bookletCode" placeholder="表册代码"></el-input>
            </el-form-item>
            <el-form-item label="表册名称：">
              <el-input style="width: 203px" v-model="listQuery.bookletName" placeholder="表册名称"></el-input>
            </el-form-item>
            <el-form-item label="抄表员ID：">
              <el-input style="width: 203px" v-model="listQuery.bookletReadEmployeeId" placeholder="抄表员ID"></el-input>
            </el-form-item>
            <el-form-item label="收费员ID：">
              <el-input style="width: 203px" v-model="listQuery.bookletChargeEmployeeId" placeholder="收费员ID"></el-input>
            </el-form-item>
            <el-form-item label="结算间隔周期[月]：">
              <el-input style="width: 203px" v-model="listQuery.bookletSettleCycleInterval" placeholder="结算间隔周期[月]"></el-input>
            </el-form-item>
            <el-form-item label="最后一次结算月份：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.bookletLastSettleMonthStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.bookletLastSettleMonthEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="下次计划结算月份：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.bookletNextSettleMonthStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.bookletNextSettleMonthEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="表册状态：">
              <el-select v-model="listQuery.bookletStatus" placeholder="全部" clearable>
                <el-option
                  v-for="item in bookletStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="表册可用状态：">
              <el-select v-model="listQuery.bookletOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in bookletOnOptions"
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
        @click="addTenantBooklet()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="tenantBookletTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border
      >
        <el-table-column label="表册ID" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="租户ID" width="280" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantName}}</template>
        </el-table-column>
        <el-table-column label="所属部门ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.bookletDepartmentId}}</template>
        </el-table-column>
        <el-table-column label="所属供水区域ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.bookletWaterAreaId}}</template>
        </el-table-column>
        <el-table-column label="表册代码" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.bookletCode}}</template>
        </el-table-column>
        <el-table-column label="表册名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.bookletName}}</template>
        </el-table-column>
        <el-table-column label="抄表员ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.bookletReadEmployeeId}}</template>
        </el-table-column>
        <el-table-column label="收费员ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.bookletChargeEmployeeId}}</template>
        </el-table-column>
        <el-table-column label="结算间隔周期[月]" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.bookletSettleCycleInterval}}</template>
        </el-table-column>
        <el-table-column label="最后一次结算月份" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.bookletLastSettleMonth | formatDate}}</template>
        </el-table-column>
        <el-table-column label="下次计划结算月份" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.bookletNextSettleMonth | formatDate}}</template>
        </el-table-column>
        <el-table-column label="表册状态" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.bookletStatus | formatBookletStatus}}</template>
        </el-table-column>
        <el-table-column label="表册可用状态" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.bookletOn | formatBookletOn}}</template>
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
  import {fetchList, deleteTenantBooklet} from '@/api/tenantBooklet'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    bookletDepartmentId: null,
    bookletWaterAreaId: null,
    bookletCode: null,
    bookletName: null,
    bookletReadEmployeeId: null,
    bookletChargeEmployeeId: null,
    bookletSettleCycleInterval: null,
    bookletLastSettleMonth: null,
    bookletLastSettleMonthStart: null,
    bookletLastSettleMonthEnd: null,
    bookletNextSettleMonth: null,
    bookletNextSettleMonthStart: null,
    bookletNextSettleMonthEnd: null,
    bookletStatus: null,
    bookletOn: null
  };
  const defaultBookletStatusOptions=[
    {
      value: 1,
      label: '抄表进行中'
    },
    {
      value: 2,
      label: '抄表截止'
    }
  ];
  const defaultBookletOnOptions=[
    {
      value: 1,
      label: '可用'
    },
    {
      value: 0,
      label: '禁用'
    }
  ];
  
  export default {
    name: 'tenantBookletList',
    data() {
      return {
        operates: [
        ],
        operateType: null,
        tenantId: null,
        listQuery:Object.assign({},defaultListQuery,this.$route.query),
        list: null,
        total: null,
        listLoading: true,
        bookletStatusOptions: Object.assign({},defaultBookletStatusOptions),
        bookletOnOptions: Object.assign({},defaultBookletOnOptions),
        tenantInfoOptions:[],
        multipleSelection: []
      }
    },
    created() {
      this.getList();
      this.getTenantInfoList();
      let tenantId = this.$route.query.tenantId;
      if(tenantId){
        this.tenantId = tenantId;
        this.listQuery.tenantId = tenantId;
      }
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
      formatBookletStatus(bookletStatus){
        for(let i=0;i<defaultBookletStatusOptions.length;i++){
          if(bookletStatus===defaultBookletStatusOptions[i].value){
            return defaultBookletStatusOptions[i].label;
          }
        }
      },
      formatBookletOn(bookletOn){
        for(let i=0;i<defaultBookletOnOptions.length;i++){
          if(bookletOn===defaultBookletOnOptions[i].value){
            return defaultBookletOnOptions[i].label;
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
        this.listQuery = Object.assign({}, defaultListQuery, this.$route.query);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleView(index, row) {
        this.$router.push({path: '/saas/viewTenantBooklet', query: {id: row.id, tenantId:this.tenantId}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/saas/updateTenantBooklet', query: {id: row.id, tenantId:this.tenantId}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该租户表册', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTenantBooklet(row.id).then(response => {
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
      searchTenantBookletList() {
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
      addTenantBooklet() {
        this.$router.push({path: '/saas/addTenantBooklet', query: {tenantId:this.tenantId}})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


