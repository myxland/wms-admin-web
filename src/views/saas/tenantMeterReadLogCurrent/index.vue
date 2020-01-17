<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchTenantMeterReadLogCurrentList()"
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
            <el-form-item label="抄表计划：">
              <el-input style="width: 203px" v-model="listQuery.id" placeholder="抄表计划"></el-input>
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
            <el-form-item label="结算月份：">
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
            <el-form-item label="水表ID：">
              <el-input style="width: 203px" v-model="listQuery.meterId" placeholder="水表ID"></el-input>
            </el-form-item>
            <el-form-item label="结算前水表当年累计水量：">
              <el-input style="width: 203px" v-model="listQuery.meterYearTotalWatersBefore" placeholder="结算前水表当年累计水量"></el-input>
            </el-form-item>
            <el-form-item label="结算开始时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.settleStartTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.settleStartTimeEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结算开始指针：">
              <el-input style="width: 203px" v-model="listQuery.settleStartPointer" placeholder="结算开始指针"></el-input>
            </el-form-item>
            <el-form-item label="本次抄表时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.currentReadTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.currentReadTimeEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="本次抄表指针：">
              <el-input style="width: 203px" v-model="listQuery.currentReadPointer" placeholder="本次抄表指针"></el-input>
            </el-form-item>
            <el-form-item label="抄表员ID：">
              <el-input style="width: 203px" v-model="listQuery.readEmployeeId" placeholder="抄表员ID"></el-input>
            </el-form-item>
            <el-form-item label="表次抄表状况：">
              <el-input style="width: 203px" v-model="listQuery.meterStatusId" placeholder="表次抄表状况"></el-input>
            </el-form-item>
            <el-form-item label="应结算水量：">
              <el-input style="width: 203px" v-model="listQuery.settleWaters" placeholder="应结算水量"></el-input>
            </el-form-item>
            <el-form-item label="应收水量：">
              <el-input style="width: 203px" v-model="listQuery.receivableWaters" placeholder="应收水量"></el-input>
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
            <el-form-item label="检查结果：">
              <el-select v-model="listQuery.checkResult" placeholder="全部" clearable>
                <el-option
                  v-for="item in checkResultOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="处理结果：">
              <el-select v-model="listQuery.processReault" placeholder="全部" clearable>
                <el-option
                  v-for="item in processReaultOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="处理人：">
              <el-input style="width: 203px" v-model="listQuery.processEmployeeId" placeholder="处理人"></el-input>
            </el-form-item>
            <el-form-item label="处理时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.processTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.processTimeEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="处理方式：">
              <el-select v-model="listQuery.processType" placeholder="全部" clearable>
                <el-option
                  v-for="item in processTypeOptions"
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
        @click="addTenantMeterReadLogCurrent()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="tenantMeterReadLogCurrentTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border
      >
        <el-table-column label="抄表计划" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="租户ID" width="280" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantName}}</template>
        </el-table-column>
        <el-table-column label="结算月份" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.readMonth | formatDate}}</template>
        </el-table-column>
        <el-table-column label="水表ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterId}}</template>
        </el-table-column>
        <el-table-column label="结算前水表当年累计水量" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.meterYearTotalWatersBefore | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="结算开始时间" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.settleStartTime}}</template>
        </el-table-column>
        <el-table-column label="结算开始指针" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.settleStartPointer | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="本次抄表时间" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.currentReadTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="本次抄表指针" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.currentReadPointer | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="抄表员ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.readEmployeeId}}</template>
        </el-table-column>
        <el-table-column label="表次抄表状况" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterStatusId}}</template>
        </el-table-column>
        <el-table-column label="应结算水量" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.settleWaters | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="应收水量" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.receivableWaters | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="抄表来源" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.readSource | formatReadSource}}</template>
        </el-table-column>
        <el-table-column label="抄表状态" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.readStatus | formatReadStatus}}</template>
        </el-table-column>
        <el-table-column label="检查结果" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.checkResult | formatCheckResult}}</template>
        </el-table-column>
        <el-table-column label="处理结果" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.processReault | formatProcessReault}}</template>
        </el-table-column>
        <el-table-column label="处理人" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.processEmployeeId}}</template>
        </el-table-column>
        <el-table-column label="处理时间" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.processTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="处理方式" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.processType | formatProcessType}}</template>
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
  import {fetchList, deleteTenantMeterReadLogCurrent} from '@/api/tenantMeterReadLogCurrent'
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
    meterId: null,
    meterYearTotalWatersBefore: null,
    settleStartTime: null,
    settleStartTimeStart: null,
    settleStartTimeEnd: null,
    settleStartPointer: null,
    currentReadTime: null,
    currentReadTimeStart: null,
    currentReadTimeEnd: null,
    currentReadPointer: null,
    readEmployeeId: null,
    meterStatusId: null,
    settleWaters: null,
    receivableWaters: null,
    readSource: null,
    readStatus: null,
    checkResult: null,
    processReault: null,
    processEmployeeId: null,
    processTime: null,
    processTimeStart: null,
    processTimeEnd: null,
    processType: null
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
      label: '远传表导入'
    },
    {
      value: 4,
      label: '远传表接口'
    }
  ];
  const defaultReadStatusOptions=[
    {
      value: 0,
      label: '未抄'
    },
    {
      value: 1,
      label: '已抄'
    }
  ];
  const defaultCheckResultOptions=[
    {
      value: 0,
      label: '正常'
    },
    {
      value: 1,
      label: '异常'
    }
  ];
  const defaultProcessReaultOptions=[
    {
      value: 1,
      label: '已处理'
    },
    {
      value: 2,
      label: '未处理'
    }
  ];
  const defaultProcessTypeOptions=[
    {
      value: 1,
      label: '重新抄表'
    },
    {
      value: 2,
      label: '通过'
    }
  ];
  
  export default {
    name: 'tenantMeterReadLogCurrentList',
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
        readSourceOptions: Object.assign({},defaultReadSourceOptions),
        readStatusOptions: Object.assign({},defaultReadStatusOptions),
        checkResultOptions: Object.assign({},defaultCheckResultOptions),
        processReaultOptions: Object.assign({},defaultProcessReaultOptions),
        processTypeOptions: Object.assign({},defaultProcessTypeOptions),
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
      formatProcessReault(processReault){
        for(let i=0;i<defaultProcessReaultOptions.length;i++){
          if(processReault===defaultProcessReaultOptions[i].value){
            return defaultProcessReaultOptions[i].label;
          }
        }
      },
      formatProcessType(processType){
        for(let i=0;i<defaultProcessTypeOptions.length;i++){
          if(processType===defaultProcessTypeOptions[i].value){
            return defaultProcessTypeOptions[i].label;
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
        this.$router.push({path: '/saas/viewTenantMeterReadLogCurrent', query: {id: row.id, tenantId:this.tenantId}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/saas/updateTenantMeterReadLogCurrent', query: {id: row.id, tenantId:this.tenantId}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该当期抄表计划', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTenantMeterReadLogCurrent(row.id).then(response => {
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
      searchTenantMeterReadLogCurrentList() {
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
      addTenantMeterReadLogCurrent() {
        this.$router.push({path: '/saas/addTenantMeterReadLogCurrent', query: {tenantId:this.tenantId}})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


