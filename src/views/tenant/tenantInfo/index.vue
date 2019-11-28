<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchTenantInfoList()"
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
            <el-form-item label="租户名称：">
              <el-input style="width: 203px" v-model="listQuery.tenantNameLike" placeholder="租户名称"></el-input>
            </el-form-item>
            <el-form-item label="显示名称：">
              <el-input style="width: 203px" v-model="listQuery.displayNameLike" placeholder="显示名称"></el-input>
            </el-form-item>
            <el-form-item label="联系人：">
              <el-input style="width: 203px" v-model="listQuery.tenantContact" placeholder="联系人"></el-input>
            </el-form-item>
            <el-form-item label="手机号码：">
              <el-input style="width: 203px" v-model="listQuery.tenantMobile" placeholder="手机号码"></el-input>
            </el-form-item>
            <el-form-item label="租户类型：">
              <el-select v-model="listQuery.tenantType" placeholder="全部" clearable>
                <el-option
                  v-for="item in tenantTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="租户状态：">
              <el-select v-model="listQuery.tenantStatus" placeholder="全部" clearable>
                <el-option
                  v-for="item in tenantStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="注册时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.regTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.regTimeEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="到期日期：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.endDateStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.endDateEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addTenantInfo()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="tenantInfoTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="租户编号" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="租户名称" width="" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantName}}</template>
        </el-table-column>
        <el-table-column label="显示名称" width="120" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.displayName}}</template>
        </el-table-column>
        <el-table-column label="联系人" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantContact}}</template>
        </el-table-column>
        <el-table-column label="手机号码" width="120" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantMobile}}</template>
        </el-table-column>
        <el-table-column label="租户类型" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantType | formatTenantType}}</template>
        </el-table-column>
        <el-table-column label="租户状态" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantStatus | formatTenantStatus}}</template>
        </el-table-column>
        <el-table-column label="到期日期" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.endDate | formatDate}}</template>
        </el-table-column>
        <el-table-column label="操作" width="580" align="center">
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
              @click="handleUpdateTenantConfig(scope.$index, scope.row)">配置
            </el-button>
            <el-button
              size="mini"
              @click="handleUpdateTenantAccount(scope.$index, scope.row)">账户
            </el-button>
            <el-button
              size="mini"
              @click="handleUpdateTenantSms(scope.$index, scope.row)">短信
            </el-button>
            <el-button
              size="mini"
              @click="handleUpdateTenantInvoice(scope.$index, scope.row)">发票
            </el-button>
            <el-button
              size="mini"
              @click="handleUpdateTenantBill(scope.$index, scope.row)">账单
            </el-button>
            <el-button
              size="mini"
              @click="handleUpdateTenantCustType(scope.$index, scope.row)">用户类型
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
  import {fetchList, deleteTenantInfo} from '@/api/tenantInfo'
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantNameLike: null,
    displayNameLike: null,
    tenantProvince: null,
    tenantCity: null,
    tenantArea: null,
    tenantAddress: null,
    tenantLinkman: null,
    tenantMobile: null,
    tenantTel: null,
    tenantEmail: null,
    tenantQq: null,
    tenantType: null,
    tenantStatus: null,
    regTime: null,
    regTimeStart: null,
    regTimeEnd: null,
    endDate: null,
    endDateStart: null,
    endDateEnd: null
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
  const defaultTenantStatusOptions=[
    {
      value: 1,
      label: '正式'
    },
    {
      value: 2,
      label: '试用'
    }
  ];
  
  export default {
    name: 'tenantInfoList',
    data() {
      return {
        operates: [
        ],
        operateType: null,
        listQuery:Object.assign({},defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        tenantTypeOptions: Object.assign({},defaultTenantTypeOptions),
        tenantStatusOptions: Object.assign({},defaultTenantStatusOptions),
        multipleSelection: []
      }
    },
    created() {
      this.getList();
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
      formatTenantType(tenantType){
        for(let i=0;i<defaultTenantTypeOptions.length;i++){
          if(tenantType===defaultTenantTypeOptions[i].value){
            return defaultTenantTypeOptions[i].label;
          }
        }
      },
      formatTenantStatus(tenantStatus){
        for(let i=0;i<defaultTenantStatusOptions.length;i++){
          if(tenantStatus===defaultTenantStatusOptions[i].value){
            return defaultTenantStatusOptions[i].label;
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
      handleView(index, row) {
        this.$router.push({path: '/tenant/viewTenantInfo', query: {id: row.id}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/tenant/updateTenantInfo', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该租户', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTenantInfo(row.id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      },
      handleUpdateTenantAccount(index, row) {
        this.$router.push({path: '/tenant/updateTenantAccount', query: {tenantId: row.id}})
      },
      handleUpdateTenantConfig(index, row) {
        this.$router.push({path: '/tenant/updateTenantConfig', query: {tenantId: row.id}})
      },
      handleUpdateTenantSms(index, row) {
        this.$router.push({path: '/tenant/updateTenantSms', query: {tenantId: row.id}})
      },
      handleUpdateTenantInvoice(index, row) {
        this.$router.push({path: '/tenant/updateTenantInvoice', query: {tenantId: row.id}})
      },
      handleUpdateTenantBill(index, row) {
        this.$router.push({path: '/tenant/updateTenantBill', query: {tenantId: row.id}})
      },
      handleUpdateTenantCustType(index, row) {
        this.$router.push({path: '/tenant/tenantCustType', query: {tenantId: row.id}})
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
      searchTenantInfoList() {
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
      addTenantInfo() {
        this.$router.push({path: '/tenant/addTenantInfo'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


