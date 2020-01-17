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
            <el-form-item label="价格类别ID：">
              <el-input style="width: 203px" v-model="listQuery.id" placeholder="价格类别ID"></el-input>
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
              <el-input style="width: 203px" v-model="listQuery.bottomWaters" placeholder="保底水量"></el-input>
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
              <el-input style="width: 203px" v-model="listQuery.topWaters" placeholder="封顶水量"></el-input>
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
              <el-input style="width: 203px" v-model="listQuery.reduceWaters" placeholder="固定减免水量"></el-input>
            </el-form-item>
            <el-form-item label="固定减免水量下限：">
              <el-input style="width: 203px" v-model="listQuery.reduceLowerlimit" placeholder="固定减免水量下限"></el-input>
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
              <el-input style="width: 203px" v-model="listQuery.fixedWaters" placeholder="固定征收水量"></el-input>
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
                border
      >
        <el-table-column label="价格类别ID" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="租户ID" width="280" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantName}}</template>
        </el-table-column>
        <el-table-column label="价格类别名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.priceTypeName}}</template>
        </el-table-column>
        <el-table-column label="启用保底水量" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.bottomOn | formatBottomOn}}</template>
        </el-table-column>
        <el-table-column label="保底水量" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.bottomWaters | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="启用封顶水量" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.topOn | formatTopOn}}</template>
        </el-table-column>
        <el-table-column label="封顶水量" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.topWaters | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="启用固定减免" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.reduceOn | formatReduceOn}}</template>
        </el-table-column>
        <el-table-column label="固定减免水量" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.reduceWaters | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="固定减免水量下限" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.reduceLowerlimit | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="启用固定水量征收" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.fixedOn | formatFixedOn}}</template>
        </el-table-column>
        <el-table-column label="固定征收水量" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.fixedWaters | formatMoney}}</template>
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
  import {fetchList, deleteTenantPriceType} from '@/api/tenantPriceType'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import accounting from 'accounting';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    priceTypeName: null,
    bottomOn: null,
    bottomWaters: null,
    topOn: null,
    topWaters: null,
    reduceOn: null,
    reduceWaters: null,
    reduceLowerlimit: null,
    fixedOn: null,
    fixedWaters: null
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
        tenantId: null,
        listQuery:Object.assign({},defaultListQuery,this.$route.query),
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
      let tenantId = this.$route.query.tenantId;
      if(tenantId){
        this.tenantId = tenantId;
        this.listQuery.tenantId = tenantId;
      }
    },
    filters:{
      formatMoney(money){
        // 指定货币符号、保留小数位、千位间隔符
        return accounting.formatMoney(money,'',2,'');
      },
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
        this.$router.push({path: '/saas/viewTenantPriceType', query: {id: row.id, tenantId:this.tenantId}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/saas/updateTenantPriceType', query: {id: row.id, tenantId:this.tenantId}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该水价分类', '提示', {
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
        this.$router.push({path: '/saas/addTenantPriceType', query: {tenantId:this.tenantId}})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


