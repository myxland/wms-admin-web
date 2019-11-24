<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchDevReadCurrList()"
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
            <el-form-item label="抄表月份：">
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
            <el-form-item label="表具系统编号：">
              <el-input style="width: 203px" v-model="listQuery.devId" placeholder="表具系统编号"></el-input>
            </el-form-item>
            <el-form-item label="父表具编号：">
              <el-input style="width: 203px" v-model="listQuery.parentDevId" placeholder="父表具编号"></el-input>
            </el-form-item>
            <el-form-item label="本次计费前当年累计水量：">
              <el-input style="width: 203px" v-model="listQuery.yearUseNum" placeholder="本次计费前当年累计水量"></el-input>
            </el-form-item>
            <el-form-item label="上次计费日期：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.lastCalcDateStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.lastCalcDateEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="上次计费止码：">
              <el-input style="width: 203px" v-model="listQuery.lastCalcCode" placeholder="上次计费止码"></el-input>
            </el-form-item>
            <el-form-item label="抄表人编号：">
              <el-input style="width: 203px" v-model="listQuery.currReadEmpId" placeholder="抄表人编号"></el-input>
            </el-form-item>
            <el-form-item label="本次抄表日期：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.currReadDateStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.currReadDateEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="本次抄表止码：">
              <el-input style="width: 203px" v-model="listQuery.currReadCode" placeholder="本次抄表止码"></el-input>
            </el-form-item>
            <el-form-item label="表次表具状况：">
              <el-input style="width: 203px" v-model="listQuery.currDevStatus" placeholder="表次表具状况"></el-input>
            </el-form-item>
            <el-form-item label="本次抄表水量：">
              <el-input style="width: 203px" v-model="listQuery.currUseNum" placeholder="本次抄表水量"></el-input>
            </el-form-item>
            <el-form-item label="本次计费水量：">
              <el-input style="width: 203px" v-model="listQuery.currCalcUseNum" placeholder="本次计费水量"></el-input>
            </el-form-item>
            <el-form-item label="抄表来源：">
              <el-select v-model="listQuery.readSource" placeholder="全部" clearable>
                <el-option
                  v-for="item in readSourceOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="抄表状态：">
              <el-select v-model="listQuery.readStatus" placeholder="全部" clearable>
                <el-option
                  v-for="item in readStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审核状态：">
              <el-select v-model="listQuery.checkResult" placeholder="全部" clearable>
                <el-option
                  v-for="item in checkResultOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="处理状态：">
              <el-select v-model="listQuery.procReault" placeholder="全部" clearable>
                <el-option
                  v-for="item in procReaultOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审核人：">
              <el-input style="width: 203px" v-model="listQuery.procMan" placeholder="审核人"></el-input>
            </el-form-item>
            <el-form-item label="审核时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.procTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.procTimeEnd"
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
        @click="addDevReadCurr()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="devReadCurrTable"
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
        <el-table-column label="抄表月份" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.readMonth | formatDate}}</template>
        </el-table-column>
        <el-table-column label="表具系统编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devId}}</template>
        </el-table-column>
        <el-table-column label="父表具编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.parentDevId}}</template>
        </el-table-column>
        <el-table-column label="本次计费前当年累计水量" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.yearUseNum | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="上次计费日期" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.lastCalcDate | formatDate}}</template>
        </el-table-column>
        <el-table-column label="上次计费止码" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.lastCalcCode | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="抄表人编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.currReadEmpId}}</template>
        </el-table-column>
        <el-table-column label="本次抄表日期" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.currReadDate | formatDate}}</template>
        </el-table-column>
        <el-table-column label="本次抄表止码" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.currReadCode | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="表次表具状况" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.currDevStatus}}</template>
        </el-table-column>
        <el-table-column label="本次抄表水量" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.currUseNum | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="本次计费水量" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.currCalcUseNum | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="抄表来源" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.readSource | formatReadSource}}</template>
        </el-table-column>
        <el-table-column label="抄表状态" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.readStatus | formatReadStatus}}</template>
        </el-table-column>
        <el-table-column label="审核状态" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.checkResult | formatCheckResult}}</template>
        </el-table-column>
        <el-table-column label="处理状态" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.procReault | formatProcReault}}</template>
        </el-table-column>
        <el-table-column label="审核人" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.procMan}}</template>
        </el-table-column>
        <el-table-column label="审核时间" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.procTime | formatTime}}</template>
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
  import {fetchList, deleteDevReadCurr} from '@/api/devReadCurr'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  import accounting from 'accounting';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    readMonth: null,
    readMonthStart: null,
    readMonthEnd: null,
    devId: null,
    parentDevId: null,
    yearUseNum: null,
    lastCalcDate: null,
    lastCalcDateStart: null,
    lastCalcDateEnd: null,
    lastCalcCode: null,
    currReadEmpId: null,
    currReadDate: null,
    currReadDateStart: null,
    currReadDateEnd: null,
    currReadCode: null,
    currDevStatus: null,
    currUseNum: null,
    currCalcUseNum: null,
    readSource: null,
    readStatus: null,
    checkResult: null,
    procReault: null,
    procMan: null,
    procTime: null,
    procTimeStart: null,
    procTimeEnd: null
  };
  const defaultReadSourceOptions=[
    {
      value: 1,
      label: '移动抄表'
    },
    {
      value: 2,
      label: '人工入账'
    },
    {
      value: 3,
      label: '远传表'
    }
  ];
  const defaultReadStatusOptions=[
    {
      value: 1,
      label: '未抄'
    },
    {
      value: 2,
      label: '已抄'
    }
  ];
  const defaultCheckResultOptions=[
    {
      value: 1,
      label: '正常'
    },
    {
      value: 2,
      label: '异常'
    }
  ];
  const defaultProcReaultOptions=[
    {
      value: 1,
      label: '已计费'
    },
    {
      value: 2,
      label: '待审核'
    },
    {
      value: 3,
      label: '已审核'
    }
  ];
  
  export default {
    name: 'devReadCurrList',
    data() {
      return {
        operates: [
        ],
        operateType: null,
        listQuery:Object.assign({},defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        readSourceOptions: Object.assign({},defaultReadSourceOptions),
        readStatusOptions: Object.assign({},defaultReadStatusOptions),
        checkResultOptions: Object.assign({},defaultCheckResultOptions),
        procReaultOptions: Object.assign({},defaultProcReaultOptions),
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
      formatReadSource(readSource){
        for(let i=0;i<defaultReadSourceOptions.length;i++){
          if(readSource===defaultReadSourceOptions[i].value){
            return defaultReadSourceOptions[i].label;
          }
        }
      },
      formatReadStatus(readStatus){
        for(let i=0;i<defaultReadStatusOptions.length;i++){
          if(readStatus===defaultReadStatusOptions[i].value){
            return defaultReadStatusOptions[i].label;
          }
        }
      },
      formatCheckResult(checkResult){
        for(let i=0;i<defaultCheckResultOptions.length;i++){
          if(checkResult===defaultCheckResultOptions[i].value){
            return defaultCheckResultOptions[i].label;
          }
        }
      },
      formatProcReault(procReault){
        for(let i=0;i<defaultProcReaultOptions.length;i++){
          if(procReault===defaultProcReaultOptions[i].value){
            return defaultProcReaultOptions[i].label;
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
        this.$router.push({path: '/cust/updateDevReadCurr', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该抄表信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteDevReadCurr(row.id).then(response => {
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
      searchDevReadCurrList() {
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
      addDevReadCurr() {
        this.$router.push({path: '/cust/addDevReadCurr'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


