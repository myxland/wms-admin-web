<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchTenantPriceTypeList()"
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
            <el-form-item label="价格类别名称：">
              <el-input style="width: 203px" v-model="listQuery.priceTypeName" placeholder="价格类别名称"></el-input>
            </el-form-item>
            <el-form-item label="启用保底水量：">
              <el-select v-model="listQuery.bottomOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in bottomOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="保底水量：">
              <el-input style="width: 203px" v-model="listQuery.bottomNum" placeholder="保底水量"></el-input>
            </el-form-item>
            <el-form-item label="启用封顶水量：">
              <el-select v-model="listQuery.topOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in topOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="封顶水量：">
              <el-input style="width: 203px" v-model="listQuery.topNum" placeholder="封顶水量"></el-input>
            </el-form-item>
            <el-form-item label="启用固定减免：">
              <el-select v-model="listQuery.reduceOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in reduceOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="固定减免水量：">
              <el-input style="width: 203px" v-model="listQuery.reduceNum" placeholder="固定减免水量"></el-input>
            </el-form-item>
            <el-form-item label="减免起始水量：">
              <el-input style="width: 203px" v-model="listQuery.reduceLowerLimit" placeholder="减免起始水量"></el-input>
            </el-form-item>
            <el-form-item label="启用固定水量征收：">
              <el-select v-model="listQuery.fixedOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in fixedOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="固定征收水量：">
              <el-input style="width: 203px" v-model="listQuery.fixedNum" placeholder="固定征收水量"></el-input>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addTenantPriceType()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="tenantPriceTypeTable"
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
        <el-table-column label="价格类别名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.priceTypeName}}</template>
        </el-table-column>
        <el-table-column label="启用保底水量" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.bottomOn | formatBottomOn}}</template>
        </el-table-column>
        <el-table-column label="保底水量" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.bottomNum}}</template>
        </el-table-column>
        <el-table-column label="启用封顶水量" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.topOn | formatTopOn}}</template>
        </el-table-column>
        <el-table-column label="封顶水量" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.topNum}}</template>
        </el-table-column>
        <el-table-column label="启用固定减免" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.reduceOn | formatReduceOn}}</template>
        </el-table-column>
        <el-table-column label="固定减免水量" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.reduceNum}}</template>
        </el-table-column>
        <el-table-column label="减免起始水量" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.reduceLowerLimit}}</template>
        </el-table-column>
        <el-table-column label="启用固定水量征收" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.fixedOn | formatFixedOn}}</template>
        </el-table-column>
        <el-table-column label="固定征收水量" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.fixedNum}}</template>
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
  import {fetchList, deleteTenantPriceType} from '@/api/tenantPriceType'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    priceTypeName: null,
    bottomOn: null,
    bottomNum: null,
    topOn: null,
    topNum: null,
    reduceOn: null,
    reduceNum: null,
    reduceLowerLimit: null,
    fixedOn: null,
    fixedNum: null
  };
  const defaultBottomOnOptions=[
    {
      value: 1,
      label: '启用'
    },
    {
      value: 0,
      label: '不启用'
    }
  ];
  const defaultTopOnOptions=[
    {
      value: 1,
      label: '启用'
    },
    {
      value: 0,
      label: '不启用'
    }
  ];
  const defaultReduceOnOptions=[
    {
      value: 1,
      label: '启用'
    },
    {
      value: 0,
      label: '不启用'
    }
  ];
  const defaultFixedOnOptions=[
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
    name: 'tenantPriceTypeList',
    data() {
      return {
        operates: [
        ],
        operateType: null,
        listQuery:Object.assign({},defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        bottomOnOptions: Object.assign({},defaultBottomOnOptions),
        topOnOptions: Object.assign({},defaultTopOnOptions),
        reduceOnOptions: Object.assign({},defaultReduceOnOptions),
        fixedOnOptions: Object.assign({},defaultFixedOnOptions),
        tenantInfoOptions:[],
        multipleSelection: []
      }
    },
    created() {
      this.getList();
      this.getTenantInfoList();
    },
    filters:{
      formatBottomOn(bottomOn){
        for(let i=0;i<defaultBottomOnOptions.length;i++){
          if(bottomOn===defaultBottomOnOptions[i].value){
            return defaultBottomOnOptions[i].label;
          }
        }
      },
      formatTopOn(topOn){
        for(let i=0;i<defaultTopOnOptions.length;i++){
          if(topOn===defaultTopOnOptions[i].value){
            return defaultTopOnOptions[i].label;
          }
        }
      },
      formatReduceOn(reduceOn){
        for(let i=0;i<defaultReduceOnOptions.length;i++){
          if(reduceOn===defaultReduceOnOptions[i].value){
            return defaultReduceOnOptions[i].label;
          }
        }
      },
      formatFixedOn(fixedOn){
        for(let i=0;i<defaultFixedOnOptions.length;i++){
          if(fixedOn===defaultFixedOnOptions[i].value){
            return defaultFixedOnOptions[i].label;
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
        this.$router.push({path: '/mbg/updateTenantPriceType', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该价格类别', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTenantPriceType(row.id).then(response => {
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
      searchTenantPriceTypeList() {
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
      addTenantPriceType() {
        this.$router.push({path: '/mbg/addTenantPriceType'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


