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
              <el-input style="width: 203px" v-model="listQuery.tenantName" placeholder="租户名称"></el-input>
            </el-form-item>
            <el-form-item label="显示名称：">
              <el-input style="width: 203px" v-model="listQuery.tenantDisplayName" placeholder="显示名称"></el-input>
            </el-form-item>
            <el-form-item label="手机号码：">
              <el-input style="width: 203px" v-model="listQuery.tenantMobile" placeholder="手机号码"></el-input>
            </el-form-item>
            <el-form-item label="注册时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.registerDateStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.registerDateEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="到期日期：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.expireDateStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.expireDateEnd"
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
        <el-table-column label="租户编号" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="租户名称" width="200" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantName}}</template>
        </el-table-column>
        <el-table-column label="账户余额" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantBalance}}</template>
        </el-table-column>
        <el-table-column label="显示名称" width="120" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantDisplayName}}</template>
        </el-table-column>
        <el-table-column label="联系人" width="120" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantLinkman}}</template>
        </el-table-column>
        <el-table-column label="手机号码" width="120" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantMobile}}</template>
        </el-table-column>
        <el-table-column label="租户类型" width="100" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantType | formatTenantType}}</template>
        </el-table-column>
        <el-table-column label="租户状态" width="100" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantStatus | formatTenantStatus}}</template>
        </el-table-column>
        <el-table-column label="到期日期" width="120" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.expireDate | formatDate}}</template>
        </el-table-column>
        <el-table-column label="部分缴费" width="100" align="center" header-align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handlePartChargeOnChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.partChargeOn">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="违约金" width="100" align="center" header-align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleFineOnChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.fineOn">
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
  import {fetchList, deleteTenantInfo, updatePartChargeOn, updateFineOn} from '@/api/tenantInfo'
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantName: null,
    tenantBalance: null,
    tenantDisplayName: null,
    tenantProvince: null,
    tenantCity: null,
    tenantArea: null,
    tenantAddress: null,
    tenantLinkman: null,
    tenantMobile: null,
    tenantPhone: null,
    tenantEmail: null,
    tenantQq: null,
    tenantType: null,
    tenantStatus: null,
    registerDate: null,
    registerDateStart: null,
    registerDateEnd: null,
    expireDate: null,
    expireDateStart: null,
    expireDateEnd: null,
    creditNumber: null,
    invoiceAddress: null,
    bankNo: null,
    bankName: null,
    bankAccount: null,
    partChargeOn: null,
    fineOn: null,
    fineDay: null,
    fineRate: null,
    fineRateCap: null
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
      value: 0,
      label: '试用'
    }
  ];
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
  const defaultFineOnOptions=[
    {
      value: 1,
      label: '启用'
    },
    {
      value: 0,
      label: '不启用'
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
        partChargeOnOptions: Object.assign({},defaultPartChargeOnOptions),
        fineOnOptions: Object.assign({},defaultFineOnOptions),
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
      formatPartChargeOn(partChargeOn){
        for(let i=0;i<defaultPartChargeOnOptions.length;i++){
          if(partChargeOn===defaultPartChargeOnOptions[i].value){
            return defaultPartChargeOnOptions[i].label;
          }
        }
      },
      formatFineOn(fineOn){
        for(let i=0;i<defaultFineOnOptions.length;i++){
          if(fineOn===defaultFineOnOptions[i].value){
            return defaultFineOnOptions[i].label;
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
        this.$router.push({path: '/wms/updateTenantInfo', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该租户表', '提示', {
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
      handlePartChargeOnChange(index, row) {
        var data = new URLSearchParams();
        data.append("id", row.id);
        data.append("partChargeOn", row.partChargeOn);
        updatePartChargeOn(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.partChargeOn === 0) {
            row.partChargeOn = 1;
          } else {
            row.partChargeOn = 0;
          }
        });
      },
      handleFineOnChange(index, row) {
        var data = new URLSearchParams();
        data.append("id", row.id);
        data.append("fineOn", row.fineOn);
        updateFineOn(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.fineOn === 0) {
            row.fineOn = 1;
          } else {
            row.fineOn = 0;
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
        this.$router.push({path: '/wms/addTenantInfo'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


