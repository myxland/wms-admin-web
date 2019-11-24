<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchTenantPriceDetailList()"
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
              <el-select v-model="listQuery.tenantId" placeholder="请选择租户" clearable @change="tenantIdChange">
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="价格类别：">
              <el-select v-model="listQuery.priceTypeId" placeholder="请选择价格类别" clearable>
                <el-option
                  v-for="item in tenantPriceTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="费用项目：">
              <el-select v-model="listQuery.priceItemId" placeholder="请选择费用项目" clearable>
                <el-option
                  v-for="item in tenantPriceItemOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="计算方法：">
              <el-select v-model="listQuery.calcType" placeholder="全部" clearable>
                <el-option
                  v-for="item in calcTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="指定价格：">
              <el-input style="width: 203px" v-model="listQuery.price" placeholder="指定价格"></el-input>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addTenantPriceDetail()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="tenantPriceDetailTable"
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
        <el-table-column label="计算方法" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.calcType | formatCalcType}}</template>
        </el-table-column>
        <el-table-column label="指定价格" width="100" align="right" header-align="center">
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
  import {fetchList, deleteTenantPriceDetail} from '@/api/tenantPriceDetail'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {fetchList as fetchTenantPriceTypeList} from '@/api/tenantPriceType';
  import {fetchList as fetchTenantPriceItemList} from '@/api/tenantPriceItem';
  import accounting from 'accounting';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    priceTypeId: null,
    priceItemId: null,
    calcType: null,
    price: null
  };
  const defaultCalcTypeOptions=[
    {
      value: 1,
      label: '固定单价'
    },
    {
      value: 2,
      label: '固定金额'
    },
    {
      value: 3,
      label: '阶梯价格'
    }
  ];
  
  export default {
    name: 'tenantPriceDetailList',
    data() {
      return {
        operates: [
        ],
        operateType: null,
        listQuery:Object.assign({},defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        calcTypeOptions: Object.assign({},defaultCalcTypeOptions),
        tenantInfoOptions:[],
        tenantPriceTypeOptions:[],
        tenantPriceItemOptions:[],
        multipleSelection: []
      }
    },
    created() {
      this.getList();
      this.getTenantInfoList();
      this.getTenantPriceTypeList();
      this.getTenantPriceItemList();
    },
    filters:{
      formatMoney(money){
        // 指定货币符号、保留小数位、千位间隔符
        return accounting.formatMoney(money,'',2,'');
      },
      formatCalcType(calcType){
        for(let i=0;i<defaultCalcTypeOptions.length;i++){
          if(calcType===defaultCalcTypeOptions[i].value){
            return defaultCalcTypeOptions[i].label;
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
      getTenantPriceTypeList(tenantId) {
        if(tenantId==null){
          this.tenantPriceTypeOptions = [];
          return;
        }
        fetchTenantPriceTypeList({pageNum:1,pageSize:100}).then(response => {
          this.tenantPriceTypeOptions = [];
          let tenantPriceTypeList = response.data.list;
          for(let i=0;i<tenantPriceTypeList.length;i++){
            this.tenantPriceTypeOptions.push({label:tenantPriceTypeList[i].priceTypeName,value:tenantPriceTypeList[i].id});
          }
        });
      },
      getTenantPriceItemList(tenantId) {
        if(tenantId==null){
          this.tenantPriceItemOptions = [];
          return;
        }
        fetchTenantPriceItemList({pageNum:1,pageSize:100}).then(response => {
          this.tenantPriceItemOptions = [];
          let tenantPriceItemList = response.data.list;
          for(let i=0;i<tenantPriceItemList.length;i++){
            this.tenantPriceItemOptions.push({label:tenantPriceItemList[i].priceItemName,value:tenantPriceItemList[i].id});
          }
        });
      },
      tenantIdChange(tenantId){
       //alert(tenantId);
        //alert(this.listQuery.tenantId);
        this.$options.methods.getTenantPriceTypeList(tenantId);
        this.$options.methods.getTenantPriceItemList(tenantId);
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/mbg/updateTenantPriceDetail', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该价格明细', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTenantPriceDetail(row.id).then(response => {
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
      searchTenantPriceDetailList() {
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
      addTenantPriceDetail() {
        this.$router.push({path: '/mbg/addTenantPriceDetail'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


