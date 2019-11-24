<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchRecordListList()"
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
            <el-form-item label="编号：">
              <el-input style="width: 203px" v-model="listQuery.id" placeholder="编号"></el-input>
            </el-form-item>
            <el-form-item label="租户：">
              <el-input style="width: 203px" v-model="listQuery.tenantid" placeholder="租户"></el-input>
            </el-form-item>
            <el-form-item label="标识：">
              <el-select v-model="listQuery.recordFlag" placeholder="全部" clearable>
                <el-option
                  v-for="item in recordFlagOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="来源：">
              <el-select v-model="listQuery.sourceType" placeholder="全部" clearable>
                <el-option
                  v-for="item in sourceTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门：">
              <el-input style="width: 203px" v-model="listQuery.deptId" placeholder="部门"></el-input>
            </el-form-item>
            <el-form-item label="表册：">
              <el-input style="width: 203px" v-model="listQuery.bookId" placeholder="表册"></el-input>
            </el-form-item>
            <el-form-item label="用户：">
              <el-input style="width: 203px" v-model="listQuery.custId" placeholder="用户"></el-input>
            </el-form-item>
            <el-form-item label="用户名称：">
              <el-input style="width: 203px" v-model="listQuery.custName" placeholder="用户名称"></el-input>
            </el-form-item>
            <el-form-item label="用户地址：">
              <el-input style="width: 203px" v-model="listQuery.custAddress" placeholder="用户地址"></el-input>
            </el-form-item>
            <el-form-item label="表具：">
              <el-input style="width: 203px" v-model="listQuery.devId" placeholder="表具"></el-input>
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
                v-model="listQuery.recordMonthStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.recordMonthEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="业务流水号（抄表流水号/换表流水号）：">
              <el-input style="width: 203px" v-model="listQuery.bussinessId" placeholder="业务流水号（抄表流水号/换表流水号）"></el-input>
            </el-form-item>
            <el-form-item label="抄表员：">
              <el-input style="width: 203px" v-model="listQuery.reader" placeholder="抄表员"></el-input>
            </el-form-item>
            <el-form-item label="计费时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.calcTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.calcTimeEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="上次计费时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.lastTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.lastTimeEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="起数：">
              <el-input style="width: 203px" v-model="listQuery.lastCode" placeholder="起数"></el-input>
            </el-form-item>
            <el-form-item label="当前计费时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.presentTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.presentTimeEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="止数：">
              <el-input style="width: 203px" v-model="listQuery.presentCode" placeholder="止数"></el-input>
            </el-form-item>
            <el-form-item label="用量占比：">
              <el-input style="width: 203px" v-model="listQuery.useRate" placeholder="用量占比"></el-input>
            </el-form-item>
            <el-form-item label="计费水量：">
              <el-input style="width: 203px" v-model="listQuery.useNum" placeholder="计费水量"></el-input>
            </el-form-item>
            <el-form-item label="价格编号：">
              <el-input style="width: 203px" v-model="listQuery.priceId" placeholder="价格编号"></el-input>
            </el-form-item>
            <el-form-item label="应收金额：">
              <el-input style="width: 203px" v-model="listQuery.recordMoney" placeholder="应收金额"></el-input>
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
        @click="addRecordList()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="recordListTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="租户" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantid}}</template>
        </el-table-column>
        <el-table-column label="标识" width="100" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.recordFlag | formatRecordFlag}}</template>
        </el-table-column>
        <el-table-column label="来源" width="100" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.sourceType | formatSourceType}}</template>
        </el-table-column>
        <el-table-column label="部门" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.deptId}}</template>
        </el-table-column>
        <el-table-column label="表册" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.bookId}}</template>
        </el-table-column>
        <el-table-column label="用户" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.custId}}</template>
        </el-table-column>
        <el-table-column label="用户名称" width="120" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.custName}}</template>
        </el-table-column>
        <el-table-column label="用户地址" width="120" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.custAddress}}</template>
        </el-table-column>
        <el-table-column label="表具" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.devId}}</template>
        </el-table-column>
        <el-table-column label="表具地址" width="120" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devAddress}}</template>
        </el-table-column>
        <el-table-column label="应收月份" width="120" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.readMonth | formatDate}}</template>
        </el-table-column>
        <el-table-column label="应收账务统计月份" width="120" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.recordMonth | formatDate}}</template>
        </el-table-column>
        <el-table-column label="业务流水号（抄表流水号/换表流水号）" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.bussinessId}}</template>
        </el-table-column>
        <el-table-column label="抄表员" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.reader}}</template>
        </el-table-column>
        <el-table-column label="计费时间" width="120" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.calcTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="上次计费时间" width="120" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.lastTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="起数" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.lastCode}}</template>
        </el-table-column>
        <el-table-column label="当前计费时间" width="120" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.presentTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="止数" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.presentCode}}</template>
        </el-table-column>
        <el-table-column label="用量占比" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.useRate}}</template>
        </el-table-column>
        <el-table-column label="计费水量" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.useNum}}</template>
        </el-table-column>
        <el-table-column label="价格编号" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.priceId}}</template>
        </el-table-column>
        <el-table-column label="应收金额" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.recordMoney}}</template>
        </el-table-column>
        <el-table-column label="欠费金额" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.dueMoney}}</template>
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
  import {fetchList, deleteRecordList} from '@/api/recordList'
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantid: null,
    recordFlag: null,
    sourceType: null,
    deptId: null,
    bookId: null,
    custId: null,
    custName: null,
    custAddress: null,
    devId: null,
    devAddress: null,
    readMonth: null,
    readMonthStart: null,
    readMonthEnd: null,
    recordMonth: null,
    recordMonthStart: null,
    recordMonthEnd: null,
    bussinessId: null,
    reader: null,
    calcTime: null,
    calcTimeStart: null,
    calcTimeEnd: null,
    lastTime: null,
    lastTimeStart: null,
    lastTimeEnd: null,
    lastCode: null,
    presentTime: null,
    presentTimeStart: null,
    presentTimeEnd: null,
    presentCode: null,
    useRate: null,
    useNum: null,
    priceId: null,
    recordMoney: null,
    dueMoney: null
  };
  const defaultRecordFlagOptions=[
    {
      value: 0,
      label: '被冲正'
    },
    {
      value: 1,
      label: '正常'
    },
    {
      value: 2,
      label: '冲正负记录'
    }
  ];
  const defaultSourceTypeOptions=[
    {
      value: 1,
      label: '抄表'
    },
    {
      value: 0,
      label: '换表'
    }
  ];
  
  export default {
    name: 'recordListList',
    data() {
      return {
        operates: [
        ],
        operateType: null,
        listQuery:Object.assign({},defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        recordFlagOptions: Object.assign({},defaultRecordFlagOptions),
        sourceTypeOptions: Object.assign({},defaultSourceTypeOptions),
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
      formatRecordFlag(recordFlag){
        for(let i=0;i<defaultRecordFlagOptions.length;i++){
          if(recordFlag===defaultRecordFlagOptions[i].value){
            return defaultRecordFlagOptions[i].label;
          }
        }
      },
      formatSourceType(sourceType){
        for(let i=0;i<defaultSourceTypeOptions.length;i++){
          if(sourceType===defaultSourceTypeOptions[i].value){
            return defaultSourceTypeOptions[i].label;
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
        this.$router.push({path: '/wms/updateRecordList', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该应收账', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRecordList(row.id).then(response => {
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
      searchRecordListList() {
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
      addRecordList() {
        this.$router.push({path: '/wms/addRecordList'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


