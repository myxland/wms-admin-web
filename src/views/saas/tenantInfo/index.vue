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
            <el-form-item label="租户名称：">
              <el-input style="width: 203px" v-model="listQuery.tenantName" placeholder="租户名称"></el-input>
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
        <el-table-column label="租户名称" width="" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantName}}</template>
        </el-table-column>
        <el-table-column label="账户余额" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantBalance | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="透支额度" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.teanantOverdraw | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="联系人" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantLinkman}}</template>
        </el-table-column>
        <el-table-column label="手机号码" width="120" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantLinkmanMobile}}</template>
        </el-table-column>
        <el-table-column label="租户类型" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantType | formatTenantType}}</template>
        </el-table-column>
        <el-table-column label="注册时间" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantRegisterTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleConsume(scope.$index, scope.row)">充值
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
  import {fetchList, deleteTenantInfo} from '@/api/tenantInfo'
  import {formatDate} from '@/utils/date';
  import accounting from 'accounting';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantName: null,
    tenantBalance: null,
    teanantOverdraw: null,
    tenantDisplayName: null,
    tenantProvince: null,
    tenantCity: null,
    tenantCountyTown: null,
    tenantLinkAddress: null,
    tenantLinkman: null,
    tenantLinkmanMobile: null,
    tenantLinkmanTel: null,
    tenantLinkmanEmail: null,
    tenantLinkmanQq: null,
    tenantType: null,
    tenantRegisterTime: null,
    tenantRegisterTimeStart: null,
    tenantRegisterTimeEnd: null,
    invoiceType: null,
    invoiceName: null,
    invoiceTaxNo: null,
    invoiceAddress: null,
    invoiceTel: null,
    invoiceBankCode: null,
    invoiceBankName: null,
    invoiceBankAccountNo: null,
    tenantAccesskey: null
  };
  const defaultTenantTypeOptions=[
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
  const defaultInvoiceTypeOptions=[
    {
      value: 1,
      label: '普通纸制发票'
    },
    {
      value: 2,
      label: '普通电子发票'
    },
    {
      value: 3,
      label: '专用纸制发票'
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
        invoiceTypeOptions: Object.assign({},defaultInvoiceTypeOptions),
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
      formatMoney(money){
        // 指定货币符号、保留小数位、千位间隔符
        return accounting.formatMoney(money,'',2,'');
      },
      formatTenantType(tenantType){
        for(let i=0;i<defaultTenantTypeOptions.length;i++){
          if(tenantType===defaultTenantTypeOptions[i].value){
            return defaultTenantTypeOptions[i].label;
          }
        }
      },
      formatInvoiceType(invoiceType){
        for(let i=0;i<defaultInvoiceTypeOptions.length;i++){
          if(invoiceType===defaultInvoiceTypeOptions[i].value){
            return defaultInvoiceTypeOptions[i].label;
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
        this.$router.push({path: '/saas/viewTenantInfo', query: {id: row.id}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/saas/updateTenantInfo', query: {id: row.id}})
      },
      handleConsume(index, row) {
        this.$router.push({path: '/saas/addTenantConsumptionBillByTenantConsume', query: {tenantId: row.id}})
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
        this.$router.push({path: '/saas/addTenantInfo'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


