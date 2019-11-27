<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchTenantBillList()"
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
            <el-form-item label="编号ID：">
              <el-input style="width: 203px" v-model="listQuery.id" placeholder="编号ID"></el-input>
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
            <el-form-item label="用户发票开具方式：">
              <el-select v-model="listQuery.billPrintType" placeholder="全部" clearable>
                <el-option
                  v-for="item in billPrintTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发票备注定义：">
              <el-input style="width: 203px" v-model="listQuery.billRemark" placeholder="发票备注定义"></el-input>
            </el-form-item>
            <el-form-item label="电子发票服务商：">
              <el-input style="width: 203px" v-model="listQuery.billService" placeholder="电子发票服务商"></el-input>
            </el-form-item>
            <el-form-item label="接入代码：">
              <el-input style="width: 203px" v-model="listQuery.billJrdm" placeholder="接入代码"></el-input>
            </el-form-item>
            <el-form-item label="签名值参数：">
              <el-input style="width: 203px" v-model="listQuery.billQmcs" placeholder="签名值参数"></el-input>
            </el-form-item>
            <el-form-item label="税控盘编号：">
              <el-input style="width: 203px" v-model="listQuery.billSkpbh" placeholder="税控盘编号"></el-input>
            </el-form-item>
            <el-form-item label="税控盘口令：">
              <el-input style="width: 203px" v-model="listQuery.billSkpkl" placeholder="税控盘口令"></el-input>
            </el-form-item>
            <el-form-item label="税务数字证书密码：">
              <el-input style="width: 203px" v-model="listQuery.billKeypwd" placeholder="税务数字证书密码"></el-input>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addTenantBill()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="tenantBillTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号ID" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="租户" width="280" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantName}}</template>
        </el-table-column>
        <el-table-column label="用户发票开具方式" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billPrintType | formatBillPrintType}}</template>
        </el-table-column>
        <el-table-column label="发票备注定义" width="" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billRemark}}</template>
        </el-table-column>
        <el-table-column label="电子发票服务商" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billService}}</template>
        </el-table-column>
        <el-table-column label="接入代码" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billJrdm}}</template>
        </el-table-column>
        <el-table-column label="签名值参数" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billQmcs}}</template>
        </el-table-column>
        <el-table-column label="税控盘编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billSkpbh}}</template>
        </el-table-column>
        <el-table-column label="税控盘口令" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billSkpkl}}</template>
        </el-table-column>
        <el-table-column label="税务数字证书密码" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billKeypwd}}</template>
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
  import {fetchList, deleteTenantBill} from '@/api/tenantBill'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    billPrintType: null,
    billRemark: null,
    billService: null,
    billJrdm: null,
    billQmcs: null,
    billSkpbh: null,
    billSkpkl: null,
    billKeypwd: null
  };
  const defaultBillPrintTypeOptions=[
    {
      value: 1,
      label: '按实收开票'
    },
    {
      value: 2,
      label: '按应收开票'
    }
  ];
  
  export default {
    name: 'tenantBillList',
    data() {
      return {
        operates: [
        ],
        operateType: null,
        listQuery:Object.assign({},defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        billPrintTypeOptions: Object.assign({},defaultBillPrintTypeOptions),
        tenantInfoOptions:[],
        multipleSelection: []
      }
    },
    created() {
      this.getList();
      this.getTenantInfoList();
    },
    filters:{
      formatBillPrintType(billPrintType){
        for(let i=0;i<defaultBillPrintTypeOptions.length;i++){
          if(billPrintType===defaultBillPrintTypeOptions[i].value){
            return defaultBillPrintTypeOptions[i].label;
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
        this.$router.push({path: '/tenant/viewTenantBill', query: {id: row.id}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/tenant/updateTenantBill', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该租户账单配置', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTenantBill(row.id).then(response => {
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
      searchTenantBillList() {
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
      addTenantBill() {
        this.$router.push({path: '/tenant/addTenantBill'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


