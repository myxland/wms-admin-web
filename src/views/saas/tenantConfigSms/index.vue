<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchTenantConfigSmsList()"
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
            <el-form-item label="短信配置ID：">
              <el-input style="width: 203px" v-model="listQuery.id" placeholder="短信配置ID"></el-input>
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
            <el-form-item label="短信签名：">
              <el-input style="width: 203px" v-model="listQuery.smsSignature" placeholder="短信签名"></el-input>
            </el-form-item>
            <el-form-item label="开启出账短信通知：">
              <el-select v-model="listQuery.smsReceivableNoticeOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in smsReceivableNoticeOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开启付款短信通知：">
              <el-select v-model="listQuery.smsPaymentNoticeOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in smsPaymentNoticeOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开启用户预存款变动短信通知：">
              <el-select v-model="listQuery.smsBalanceMoneyChangeNoticeOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in smsBalanceMoneyChangeNoticeOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开启欠费催缴短信通知：">
              <el-select v-model="listQuery.smsArrearsNoticeOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in smsArrearsNoticeOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出账短信通知模板：">
              <el-input style="width: 203px" v-model="listQuery.smsReceivableNoticeTemplate" placeholder="出账短信通知模板"></el-input>
            </el-form-item>
            <el-form-item label="付款短信通知模板：">
              <el-input style="width: 203px" v-model="listQuery.smsPaymentNoticeTemplate" placeholder="付款短信通知模板"></el-input>
            </el-form-item>
            <el-form-item label="用户预存款变动短信通知模板：">
              <el-input style="width: 203px" v-model="listQuery.smsBalanceMoneyChangeNoticeTemplate" placeholder="用户预存款变动短信通知模板"></el-input>
            </el-form-item>
            <el-form-item label="欠费催缴短信通知模板：">
              <el-input style="width: 203px" v-model="listQuery.smsArrearsNoticeTemplate" placeholder="欠费催缴短信通知模板"></el-input>
            </el-form-item>
            <el-form-item label="进入催缴的欠费天数：">
              <el-input style="width: 203px" v-model="listQuery.smsArrearsDays" placeholder="进入催缴的欠费天数"></el-input>
            </el-form-item>
            <el-form-item label="每月多少号进行欠费催缴：">
              <el-input style="width: 203px" v-model="listQuery.smsArrearsNoticeDay" placeholder="每月多少号进行欠费催缴"></el-input>
            </el-form-item>
            <el-form-item label="欠费催缴开始时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.smsArrearsNoticeStartTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.smsArrearsNoticeStartTimeEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="欠费催缴结束时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.smsArrearsNoticeEndTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.smsArrearsNoticeEndTimeEnd"
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
        @click="addTenantConfigSms()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="tenantConfigSmsTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border
      >
        <el-table-column label="短信配置ID" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="租户ID" width="280" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantName}}</template>
        </el-table-column>
        <el-table-column label="短信签名" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.smsSignature}}</template>
        </el-table-column>
        <el-table-column label="开启出账短信通知" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.smsReceivableNoticeOn | formatSmsReceivableNoticeOn}}</template>
        </el-table-column>
        <el-table-column label="开启付款短信通知" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.smsPaymentNoticeOn | formatSmsPaymentNoticeOn}}</template>
        </el-table-column>
        <el-table-column label="开启用户预存款变动短信通知" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.smsBalanceMoneyChangeNoticeOn | formatSmsBalanceMoneyChangeNoticeOn}}</template>
        </el-table-column>
        <el-table-column label="开启欠费催缴短信通知" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.smsArrearsNoticeOn | formatSmsArrearsNoticeOn}}</template>
        </el-table-column>
        <el-table-column label="出账短信通知模板" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.smsReceivableNoticeTemplate}}</template>
        </el-table-column>
        <el-table-column label="付款短信通知模板" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.smsPaymentNoticeTemplate}}</template>
        </el-table-column>
        <el-table-column label="用户预存款变动短信通知模板" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.smsBalanceMoneyChangeNoticeTemplate}}</template>
        </el-table-column>
        <el-table-column label="欠费催缴短信通知模板" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.smsArrearsNoticeTemplate}}</template>
        </el-table-column>
        <el-table-column label="进入催缴的欠费天数" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.smsArrearsDays}}</template>
        </el-table-column>
        <el-table-column label="每月多少号进行欠费催缴" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.smsArrearsNoticeDay}}</template>
        </el-table-column>
        <el-table-column label="欠费催缴开始时间" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.smsArrearsNoticeStartTime}}</template>
        </el-table-column>
        <el-table-column label="欠费催缴结束时间" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.smsArrearsNoticeEndTime}}</template>
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
  import {fetchList, deleteTenantConfigSms} from '@/api/tenantConfigSms'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    smsSignature: null,
    smsReceivableNoticeOn: null,
    smsPaymentNoticeOn: null,
    smsBalanceMoneyChangeNoticeOn: null,
    smsArrearsNoticeOn: null,
    smsReceivableNoticeTemplate: null,
    smsPaymentNoticeTemplate: null,
    smsBalanceMoneyChangeNoticeTemplate: null,
    smsArrearsNoticeTemplate: null,
    smsArrearsDays: null,
    smsArrearsNoticeDay: null,
    smsArrearsNoticeStartTime: null,
    smsArrearsNoticeStartTimeStart: null,
    smsArrearsNoticeStartTimeEnd: null,
    smsArrearsNoticeEndTime: null,
    smsArrearsNoticeEndTimeStart: null,
    smsArrearsNoticeEndTimeEnd: null
  };
  const defaultSmsReceivableNoticeOnOptions=[
    {
      value: 1,
      label: '开启'
    },
    {
      value: 0,
      label: '不开启'
    }
  ];
  const defaultSmsPaymentNoticeOnOptions=[
    {
      value: 1,
      label: '开启'
    },
    {
      value: 0,
      label: '不开启'
    }
  ];
  const defaultSmsBalanceMoneyChangeNoticeOnOptions=[
    {
      value: 1,
      label: '开启'
    },
    {
      value: 0,
      label: '不开启'
    }
  ];
  const defaultSmsArrearsNoticeOnOptions=[
    {
      value: 1,
      label: '开启'
    },
    {
      value: 0,
      label: '不开启'
    }
  ];
  
  export default {
    name: 'tenantConfigSmsList',
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
        smsReceivableNoticeOnOptions: Object.assign({},defaultSmsReceivableNoticeOnOptions),
        smsPaymentNoticeOnOptions: Object.assign({},defaultSmsPaymentNoticeOnOptions),
        smsBalanceMoneyChangeNoticeOnOptions: Object.assign({},defaultSmsBalanceMoneyChangeNoticeOnOptions),
        smsArrearsNoticeOnOptions: Object.assign({},defaultSmsArrearsNoticeOnOptions),
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
      formatSmsReceivableNoticeOn(smsReceivableNoticeOn){
        for(let i=0;i<defaultSmsReceivableNoticeOnOptions.length;i++){
          if(smsReceivableNoticeOn===defaultSmsReceivableNoticeOnOptions[i].value){
            return defaultSmsReceivableNoticeOnOptions[i].label;
          }
        }
      },
      formatSmsPaymentNoticeOn(smsPaymentNoticeOn){
        for(let i=0;i<defaultSmsPaymentNoticeOnOptions.length;i++){
          if(smsPaymentNoticeOn===defaultSmsPaymentNoticeOnOptions[i].value){
            return defaultSmsPaymentNoticeOnOptions[i].label;
          }
        }
      },
      formatSmsBalanceMoneyChangeNoticeOn(smsBalanceMoneyChangeNoticeOn){
        for(let i=0;i<defaultSmsBalanceMoneyChangeNoticeOnOptions.length;i++){
          if(smsBalanceMoneyChangeNoticeOn===defaultSmsBalanceMoneyChangeNoticeOnOptions[i].value){
            return defaultSmsBalanceMoneyChangeNoticeOnOptions[i].label;
          }
        }
      },
      formatSmsArrearsNoticeOn(smsArrearsNoticeOn){
        for(let i=0;i<defaultSmsArrearsNoticeOnOptions.length;i++){
          if(smsArrearsNoticeOn===defaultSmsArrearsNoticeOnOptions[i].value){
            return defaultSmsArrearsNoticeOnOptions[i].label;
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
        this.$router.push({path: '/saas/viewTenantConfigSms', query: {id: row.id, tenantId:this.tenantId}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/saas/updateTenantConfigSms', query: {id: row.id, tenantId:this.tenantId}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该短信参数设置', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTenantConfigSms(row.id).then(response => {
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
      searchTenantConfigSmsList() {
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
      addTenantConfigSms() {
        this.$router.push({path: '/saas/addTenantConfigSms', query: {tenantId:this.tenantId}})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


