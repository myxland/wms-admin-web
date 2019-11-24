<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchTenantPriceStepList()"
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
            <el-form-item label="价格类别：">
              <el-input style="width: 203px" v-model="listQuery.priceTypeId" placeholder="价格类别"></el-input>
            </el-form-item>
            <el-form-item label="费用项目：">
              <el-input style="width: 203px" v-model="listQuery.priceItemId" placeholder="费用项目"></el-input>
            </el-form-item>
            <el-form-item label="阶梯号：">
              <el-input style="width: 203px" v-model="listQuery.stepId" placeholder="阶梯号"></el-input>
            </el-form-item>
            <el-form-item label="起始量：">
              <el-input style="width: 203px" v-model="listQuery.startNum" placeholder="起始量"></el-input>
            </el-form-item>
            <el-form-item label="终止量：">
              <el-input style="width: 203px" v-model="listQuery.endNum" placeholder="终止量"></el-input>
            </el-form-item>
            <el-form-item label="价格：">
              <el-input style="width: 203px" v-model="listQuery.price" placeholder="价格"></el-input>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addTenantPriceStep()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="tenantPriceStepTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="系统ID" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="租户" width="280" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantName}}</template>
        </el-table-column>
        <el-table-column label="价格类别" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.priceTypeName}}</template>
        </el-table-column>
        <el-table-column label="费用项目" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.priceItemName}}</template>
        </el-table-column>
        <el-table-column label="阶梯号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.stepId}}</template>
        </el-table-column>
        <el-table-column label="起始量" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.startNum}}</template>
        </el-table-column>
        <el-table-column label="终止量" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.endNum}}</template>
        </el-table-column>
        <el-table-column label="价格" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.price | formatMoney}}</template>
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
  import {fetchList, deleteTenantPriceStep} from '@/api/tenantPriceStep'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import accounting from 'accounting';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    priceTypeId: null,
    priceItemId: null,
    stepId: null,
    startNum: null,
    endNum: null,
    price: null
  };
  
  export default {
    name: 'tenantPriceStepList',
    data() {
      return {
        operates: [
        ],
        operateType: null,
        listQuery:Object.assign({},defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
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
        fetchTenantInfoList({pageNum:1,pageSize:100}).then(response => {
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
      handleUpdate(index, row) {
        this.$router.push({path: '/mbg/updateTenantPriceStep', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该价格阶梯', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTenantPriceStep(row.id).then(response => {
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
      searchTenantPriceStepList() {
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
      addTenantPriceStep() {
        this.$router.push({path: '/mbg/addTenantPriceStep'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


