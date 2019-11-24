<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchDevRecListList()"
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
            <el-form-item label="应收账标识：">
              <el-select v-model="listQuery.recFlag" placeholder="全部" clearable>
                <el-option
                  v-for="item in recFlagOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="应收来源：">
              <el-select v-model="listQuery.recType" placeholder="全部" clearable>
                <el-option
                  v-for="item in recTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门编号：">
              <el-input style="width: 203px" v-model="listQuery.deptId" placeholder="部门编号"></el-input>
            </el-form-item>
            <el-form-item label="表册编号：">
              <el-input style="width: 203px" v-model="listQuery.bookletId" placeholder="表册编号"></el-input>
            </el-form-item>
            <el-form-item label="用户编号：">
              <el-input style="width: 203px" v-model="listQuery.custId" placeholder="用户编号"></el-input>
            </el-form-item>
            <el-form-item label="用户名称：">
              <el-input style="width: 203px" v-model="listQuery.custName" placeholder="用户名称"></el-input>
            </el-form-item>
            <el-form-item label="用户地址：">
              <el-input style="width: 203px" v-model="listQuery.custAddress" placeholder="用户地址"></el-input>
            </el-form-item>
            <el-form-item label="表具系统编号：">
              <el-input style="width: 203px" v-model="listQuery.devId" placeholder="表具系统编号"></el-input>
            </el-form-item>
            <el-form-item label="表具地址：">
              <el-input style="width: 203px" v-model="listQuery.devAddress" placeholder="表具地址"></el-input>
            </el-form-item>
            <el-form-item label="应收月份：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.readMonthStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.readMonthEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="应收账务统计月份：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.recMonthStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.recMonthEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="业务流水号：">
              <el-input style="width: 203px" v-model="listQuery.businessId" placeholder="业务流水号"></el-input>
            </el-form-item>
            <el-form-item label="抄表员编号：">
              <el-input style="width: 203px" v-model="listQuery.reader" placeholder="抄表员编号"></el-input>
            </el-form-item>
            <el-form-item label="计费时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.calcDateStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.calcDateEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="上次计费日期：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.lastDateStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.lastDateEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="起数：">
              <el-input style="width: 203px" v-model="listQuery.lastCode" placeholder="起数"></el-input>
            </el-form-item>
            <el-form-item label="当前计费日期：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.currDateStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.currDateEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="止数：">
              <el-input style="width: 203px" v-model="listQuery.currCode" placeholder="止数"></el-input>
            </el-form-item>
            <el-form-item label="用量占比：">
              <el-input style="width: 203px" v-model="listQuery.waterScale" placeholder="用量占比"></el-input>
            </el-form-item>
            <el-form-item label="计费水量：">
              <el-input style="width: 203px" v-model="listQuery.useNum" placeholder="计费水量"></el-input>
            </el-form-item>
            <el-form-item label="价格编号：">
              <el-input style="width: 203px" v-model="listQuery.priceTypeId" placeholder="价格编号"></el-input>
            </el-form-item>
            <el-form-item label="应收金额：">
              <el-input style="width: 203px" v-model="listQuery.recMoney" placeholder="应收金额"></el-input>
            </el-form-item>
            <el-form-item label="欠费金额：">
              <el-input style="width: 203px" v-model="listQuery.dueMoney" placeholder="欠费金额"></el-input>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addDevRecList()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="devRecListTable"
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
        <el-table-column label="应收账标识" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.recFlag | formatRecFlag}}</template>
        </el-table-column>
        <el-table-column label="应收来源" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.recType | formatRecType}}</template>
        </el-table-column>
        <el-table-column label="部门编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.deptId}}</template>
        </el-table-column>
        <el-table-column label="表册编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.bookletId}}</template>
        </el-table-column>
        <el-table-column label="用户编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.custId}}</template>
        </el-table-column>
        <el-table-column label="用户名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.custName}}</template>
        </el-table-column>
        <el-table-column label="用户地址" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.custAddress}}</template>
        </el-table-column>
        <el-table-column label="表具系统编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devId}}</template>
        </el-table-column>
        <el-table-column label="表具地址" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devAddress}}</template>
        </el-table-column>
        <el-table-column label="应收月份" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.readMonth | formatDate}}</template>
        </el-table-column>
        <el-table-column label="应收账务统计月份" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.recMonth | formatDate}}</template>
        </el-table-column>
        <el-table-column label="业务流水号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.businessId}}</template>
        </el-table-column>
        <el-table-column label="抄表员编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.reader}}</template>
        </el-table-column>
        <el-table-column label="计费时间" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.calcDate | formatDate}}</template>
        </el-table-column>
        <el-table-column label="上次计费日期" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.lastDate | formatDate}}</template>
        </el-table-column>
        <el-table-column label="起数" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.lastCode | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="当前计费日期" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.currDate | formatDate}}</template>
        </el-table-column>
        <el-table-column label="止数" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.currCode | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="用量占比" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.waterScale}}</template>
        </el-table-column>
        <el-table-column label="计费水量" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.useNum | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="价格编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.priceTypeId}}</template>
        </el-table-column>
        <el-table-column label="应收金额" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.recMoney | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="欠费金额" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.dueMoney | formatMoney}}</template>
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
  import {fetchList, deleteDevRecList} from '@/api/devRecList'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  import accounting from 'accounting';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    recFlag: null,
    recType: null,
    deptId: null,
    bookletId: null,
    custId: null,
    custName: null,
    custAddress: null,
    devId: null,
    devAddress: null,
    readMonth: null,
    readMonthStart: null,
    readMonthEnd: null,
    recMonth: null,
    recMonthStart: null,
    recMonthEnd: null,
    businessId: null,
    reader: null,
    calcDate: null,
    calcDateStart: null,
    calcDateEnd: null,
    lastDate: null,
    lastDateStart: null,
    lastDateEnd: null,
    lastCode: null,
    currDate: null,
    currDateStart: null,
    currDateEnd: null,
    currCode: null,
    waterScale: null,
    useNum: null,
    priceTypeId: null,
    recMoney: null,
    dueMoney: null
  };
  const defaultRecFlagOptions=[
    {
      value: 1,
      label: '正常'
    },
    {
      value: 2,
      label: '被冲正'
    },
    {
      value: 3,
      label: '冲正负记录'
    }
  ];
  const defaultRecTypeOptions=[
    {
      value: 1,
      label: '抄表'
    },
    {
      value: 2,
      label: '换表'
    }
  ];
  
  export default {
    name: 'devRecListList',
    data() {
      return {
        operates: [
        ],
        operateType: null,
        listQuery:Object.assign({},defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        recFlagOptions: Object.assign({},defaultRecFlagOptions),
        recTypeOptions: Object.assign({},defaultRecTypeOptions),
        tenantInfoOptions:[],
        multipleSelection: []
      }
    },
    created() {
      this.getList();
      this.getTenantInfoList();
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
      formatRecFlag(recFlag){
        for(let i=0;i<defaultRecFlagOptions.length;i++){
          if(recFlag===defaultRecFlagOptions[i].value){
            return defaultRecFlagOptions[i].label;
          }
        }
      },
      formatRecType(recType){
        for(let i=0;i<defaultRecTypeOptions.length;i++){
          if(recType===defaultRecTypeOptions[i].value){
            return defaultRecTypeOptions[i].label;
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
        this.$router.push({path: '/account/updateDevRecList', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该应收流水', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteDevRecList(row.id).then(response => {
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
      searchDevRecListList() {
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
      addDevRecList() {
        this.$router.push({path: '/account/addDevRecList'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


