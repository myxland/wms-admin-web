<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchCustDevList()"
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
            <el-form-item label="系统编号：">
              <el-input style="width: 203px" v-model="listQuery.id" placeholder="系统编号"></el-input>
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
            <el-form-item label="表具编号：">
              <el-input style="width: 203px" v-model="listQuery.devId" placeholder="表具编号"></el-input>
            </el-form-item>
            <el-form-item label="价格类别编号：">
              <el-input style="width: 203px" v-model="listQuery.priceTypeId" placeholder="价格类别编号"></el-input>
            </el-form-item>
            <el-form-item label="用水类别编号：">
              <el-input style="width: 203px" v-model="listQuery.waterTypeId" placeholder="用水类别编号"></el-input>
            </el-form-item>
            <el-form-item label="排序：">
              <el-input style="width: 203px" v-model="listQuery.devOrder" placeholder="排序"></el-input>
            </el-form-item>
            <el-form-item label="混合类型：">
              <el-select v-model="listQuery.waterMixType" placeholder="全部" clearable>
                <el-option
                  v-for="item in waterMixTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="本价格用水量占比或定量：">
              <el-input style="width: 203px" v-model="listQuery.waterScale" placeholder="本价格用水量占比或定量"></el-input>
            </el-form-item>
            <el-form-item label="水量计算方法：">
              <el-select v-model="listQuery.waterCalcType" placeholder="全部" clearable>
                <el-option
                  v-for="item in waterCalcTypeOptions"
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
        @click="addCustDev()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="custDevTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="系统编号" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="租户" width="280" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantName}}</template>
        </el-table-column>
        <el-table-column label="表具编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devId}}</template>
        </el-table-column>
        <el-table-column label="价格类别编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.priceTypeName}}</template>
        </el-table-column>
        <el-table-column label="用水类别编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.waterTypeName}}</template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devOrder}}</template>
        </el-table-column>
        <el-table-column label="混合类型" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.waterMixType | formatWaterMixType}}</template>
        </el-table-column>
        <el-table-column label="本价格用水量占比或定量" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.waterScale}}</template>
        </el-table-column>
        <el-table-column label="水量计算方法" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.waterCalcType | formatWaterCalcType}}</template>
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
  import {fetchList, deleteCustDev} from '@/api/custDev'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import accounting from 'accounting';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    devId: null,
    priceTypeId: null,
    waterTypeId: null,
    devOrder: null,
    waterMixType: null,
    waterScale: null,
    waterCalcType: null
  };
  const defaultWaterMixTypeOptions=[
    {
      value: 1,
      label: '定量'
    },
    {
      value: 2,
      label: '比例'
    }
  ];
  const defaultWaterCalcTypeOptions=[
    {
      value: 1,
      label: '向上取整'
    },
    {
      value: 2,
      label: '向下取整'
    },
    {
      value: 3,
      label: '保留两位小数'
    }
  ];
  
  export default {
    name: 'custDevList',
    data() {
      return {
        operates: [
        ],
        operateType: null,
        listQuery:Object.assign({},defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        waterMixTypeOptions: Object.assign({},defaultWaterMixTypeOptions),
        waterCalcTypeOptions: Object.assign({},defaultWaterCalcTypeOptions),
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
      formatWaterMixType(waterMixType){
        for(let i=0;i<defaultWaterMixTypeOptions.length;i++){
          if(waterMixType===defaultWaterMixTypeOptions[i].value){
            return defaultWaterMixTypeOptions[i].label;
          }
        }
      },
      formatWaterCalcType(waterCalcType){
        for(let i=0;i<defaultWaterCalcTypeOptions.length;i++){
          if(waterCalcType===defaultWaterCalcTypeOptions[i].value){
            return defaultWaterCalcTypeOptions[i].label;
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
        this.$router.push({path: '/cust/updateCustDev', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该用户表具', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteCustDev(row.id).then(response => {
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
      searchCustDevList() {
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
      addCustDev() {
        this.$router.push({path: '/cust/addCustDev'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


