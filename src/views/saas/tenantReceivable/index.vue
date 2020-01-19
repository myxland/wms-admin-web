<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchTenantReceivableList()"
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
            <el-form-item label="应收账ID：">
              <el-input style="width: 203px" v-model="listQuery.id" placeholder="应收账ID"></el-input>
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
            <el-form-item label="应收账状态：">
              <el-select v-model="listQuery.receivableStatus" placeholder="全部" clearable>
                <el-option
                  v-for="item in receivableStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="应收类型：">
              <el-select v-model="listQuery.receivableType" placeholder="全部" clearable>
                <el-option
                  v-for="item in receivableTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门ID：">
              <el-input style="width: 203px" v-model="listQuery.departmentId" placeholder="部门ID"></el-input>
            </el-form-item>
            <el-form-item label="表册ID：">
              <el-input style="width: 203px" v-model="listQuery.bookletId" placeholder="表册ID"></el-input>
            </el-form-item>
            <el-form-item label="表册代码：">
              <el-input style="width: 203px" v-model="listQuery.bookletCode" placeholder="表册代码"></el-input>
            </el-form-item>
            <el-form-item label="用户ID：">
              <el-input style="width: 203px" v-model="listQuery.customerId" placeholder="用户ID"></el-input>
            </el-form-item>
            <el-form-item label="用户代码：">
              <el-input style="width: 203px" v-model="listQuery.customerCode" placeholder="用户代码"></el-input>
            </el-form-item>
            <el-form-item label="用户名称：">
              <el-input style="width: 203px" v-model="listQuery.customerName" placeholder="用户名称"></el-input>
            </el-form-item>
            <el-form-item label="用户地址：">
              <el-input style="width: 203px" v-model="listQuery.customerAddress" placeholder="用户地址"></el-input>
            </el-form-item>
            <el-form-item label="水表ID：">
              <el-input style="width: 203px" v-model="listQuery.meterId" placeholder="水表ID"></el-input>
            </el-form-item>
            <el-form-item label="水表代码：">
              <el-input style="width: 203px" v-model="listQuery.meterCode" placeholder="水表代码"></el-input>
            </el-form-item>
            <el-form-item label="表具地址：">
              <el-input style="width: 203px" v-model="listQuery.meterAddress" placeholder="表具地址"></el-input>
            </el-form-item>
            <el-form-item label="抄表员ID：">
              <el-input style="width: 203px" v-model="listQuery.readEmployeeId" placeholder="抄表员ID"></el-input>
            </el-form-item>
            <el-form-item label="应收账时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.receivableTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.receivableTimeEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
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
            <el-form-item label="结算截止时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.settleEndTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.settleEndTimeEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结算截止指针：">
              <el-input style="width: 203px" v-model="listQuery.settleEndPointer" placeholder="结算截止指针"></el-input>
            </el-form-item>
            <el-form-item label="应结算水量：">
              <el-input style="width: 203px" v-model="listQuery.settleWaters" placeholder="应结算水量"></el-input>
            </el-form-item>
            <el-form-item label="价格类别ID：">
              <el-input style="width: 203px" v-model="listQuery.priceTypeId" placeholder="价格类别ID"></el-input>
            </el-form-item>
            <el-form-item label="应收水量：">
              <el-input style="width: 203px" v-model="listQuery.receivableWaters" placeholder="应收水量"></el-input>
            </el-form-item>
            <el-form-item label="应收金额：">
              <el-input style="width: 203px" v-model="listQuery.receivableMoney" placeholder="应收金额"></el-input>
            </el-form-item>
            <el-form-item label="欠费金额：">
              <el-input style="width: 203px" v-model="listQuery.arrearsMoney" placeholder="欠费金额"></el-input>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addTenantReceivable()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="tenantReceivableTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border
      >
        <el-table-column label="应收账ID" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="租户ID" width="280" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantName}}</template>
        </el-table-column>
        <el-table-column label="应收账状态" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.receivableStatus | formatReceivableStatus}}</template>
        </el-table-column>
        <el-table-column label="应收类型" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.receivableType | formatReceivableType}}</template>
        </el-table-column>
        <el-table-column label="部门ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.departmentId}}</template>
        </el-table-column>
        <el-table-column label="表册ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.bookletId}}</template>
        </el-table-column>
        <el-table-column label="表册代码" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.bookletCode}}</template>
        </el-table-column>
        <el-table-column label="用户ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.customerId}}</template>
        </el-table-column>
        <el-table-column label="用户代码" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.customerCode}}</template>
        </el-table-column>
        <el-table-column label="用户名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.customerName}}</template>
        </el-table-column>
        <el-table-column label="用户地址" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.customerAddress}}</template>
        </el-table-column>
        <el-table-column label="水表ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterId}}</template>
        </el-table-column>
        <el-table-column label="水表代码" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterCode}}</template>
        </el-table-column>
        <el-table-column label="表具地址" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterAddress}}</template>
        </el-table-column>
        <el-table-column label="抄表员ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.readEmployeeId}}</template>
        </el-table-column>
        <el-table-column label="应收账时间" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.receivableTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="结算开始时间" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.settleStartTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="结算开始指针" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.settleStartPointer | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="结算截止时间" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.settleEndTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="结算截止指针" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.settleEndPointer | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="应结算水量" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.settleWaters | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="价格类别ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.priceTypeId}}</template>
        </el-table-column>
        <el-table-column label="应收水量" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.receivableWaters | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="应收金额" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.receivableMoney | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="欠费金额" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.arrearsMoney | formatMoney}}</template>
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
  import {fetchList, deleteTenantReceivable} from '@/api/tenantReceivable'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  import accounting from 'accounting';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    receivableStatus: null,
    receivableType: null,
    departmentId: null,
    bookletId: null,
    bookletCode: null,
    customerId: null,
    customerCode: null,
    customerName: null,
    customerAddress: null,
    meterId: null,
    meterCode: null,
    meterAddress: null,
    readEmployeeId: null,
    receivableTime: null,
    receivableTimeStart: null,
    receivableTimeEnd: null,
    settleStartTime: null,
    settleStartTimeStart: null,
    settleStartTimeEnd: null,
    settleStartPointer: null,
    settleEndTime: null,
    settleEndTimeStart: null,
    settleEndTimeEnd: null,
    settleEndPointer: null,
    settleWaters: null,
    priceTypeId: null,
    receivableWaters: null,
    receivableMoney: null,
    arrearsMoney: null
  };
  const defaultReceivableStatusOptions=[
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
  const defaultReceivableTypeOptions=[
    {
      value: 1,
      label: '抄表'
    },
    {
      value: 2,
      label: '换表'
    },
    {
      value: 3,
      label: '追补'
    }
  ];
  
  export default {
    name: 'tenantReceivableList',
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
        receivableStatusOptions: Object.assign({},defaultReceivableStatusOptions),
        receivableTypeOptions: Object.assign({},defaultReceivableTypeOptions),
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
      formatReceivableStatus(receivableStatus){
        for(let i=0;i<defaultReceivableStatusOptions.length;i++){
          if(receivableStatus===defaultReceivableStatusOptions[i].value){
            return defaultReceivableStatusOptions[i].label;
          }
        }
      },
      formatReceivableType(receivableType){
        for(let i=0;i<defaultReceivableTypeOptions.length;i++){
          if(receivableType===defaultReceivableTypeOptions[i].value){
            return defaultReceivableTypeOptions[i].label;
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
        this.$router.push({path: '/saas/viewTenantReceivable', query: {id: row.id, tenantId:this.tenantId}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/saas/updateTenantReceivable', query: {id: row.id, tenantId:this.tenantId}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该应收明细', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTenantReceivable(row.id).then(response => {
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
      searchTenantReceivableList() {
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
      addTenantReceivable() {
        this.$router.push({path: '/saas/addTenantReceivable', query: {tenantId:this.tenantId}})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


