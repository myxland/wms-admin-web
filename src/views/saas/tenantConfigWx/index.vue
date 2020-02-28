<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchTenantConfigWxList()"
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
            <el-form-item label="微信配置ID：">
              <el-input style="width: 203px" v-model="listQuery.id" placeholder="微信配置ID"></el-input>
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
            <el-form-item label="微信公众号APPID：">
              <el-input style="width: 203px" v-model="listQuery.wxAppid" placeholder="微信公众号APPID"></el-input>
            </el-form-item>
            <el-form-item label="微信公众号AppSecret：">
              <el-input style="width: 203px" v-model="listQuery.wxAppsecret" placeholder="微信公众号AppSecret"></el-input>
            </el-form-item>
            <el-form-item label="微信商户ID：">
              <el-input style="width: 203px" v-model="listQuery.wxAccountId" placeholder="微信商户ID"></el-input>
            </el-form-item>
            <el-form-item label="微信商户API密钥：">
              <el-input style="width: 203px" v-model="listQuery.wxAccountApiKey" placeholder="微信商户API密钥"></el-input>
            </el-form-item>
            <el-form-item label="微信公众号首页显示图片名称：">
              <el-input style="width: 203px" v-model="listQuery.wxTitlePictureFileName" placeholder="微信公众号首页显示图片名称"></el-input>
            </el-form-item>
            <el-form-item label="微信公众号显示服务电话：">
              <el-input style="width: 203px" v-model="listQuery.wxServiceTel" placeholder="微信公众号显示服务电话"></el-input>
            </el-form-item>
            <el-form-item label="开启出账微信通知：">
              <el-select v-model="listQuery.wxReceivableNoticeOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in wxReceivableNoticeOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开启付款微信通知：">
              <el-select v-model="listQuery.wxPaymentNoticeOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in wxPaymentNoticeOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开启用户预存款变动微信通知：">
              <el-select v-model="listQuery.wxBalanceMoneyChangeNoticeOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in wxBalanceMoneyChangeNoticeOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开启欠费催缴微信通知：">
              <el-select v-model="listQuery.wxArrearsNoticeOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in wxArrearsNoticeOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出账微信通知模板：">
              <el-input style="width: 203px" v-model="listQuery.wxReceivableNoticeTemplate" placeholder="出账微信通知模板"></el-input>
            </el-form-item>
            <el-form-item label="付款微信通知模板：">
              <el-input style="width: 203px" v-model="listQuery.wxPaymentNoticeTemplate" placeholder="付款微信通知模板"></el-input>
            </el-form-item>
            <el-form-item label="用户预存款变动微信通知模板：">
              <el-input style="width: 203px" v-model="listQuery.wxBalanceMoneyChangeNoticeTemplate" placeholder="用户预存款变动微信通知模板"></el-input>
            </el-form-item>
            <el-form-item label="欠费催缴微信通知模板：">
              <el-input style="width: 203px" v-model="listQuery.wxArrearsNoticeTemplate" placeholder="欠费催缴微信通知模板"></el-input>
            </el-form-item>
            <el-form-item label="进入催缴的欠费天数：">
              <el-input style="width: 203px" v-model="listQuery.wxArrearsDays" placeholder="进入催缴的欠费天数"></el-input>
            </el-form-item>
            <el-form-item label="每月多少号进行欠费催缴：">
              <el-input style="width: 203px" v-model="listQuery.wxArrearsNoticeDay" placeholder="每月多少号进行欠费催缴"></el-input>
            </el-form-item>
            <el-form-item label="欠费催缴开始时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.wxArrearsNoticeStartTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.wxArrearsNoticeStartTimeEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="欠费催缴结束时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.wxArrearsNoticeEndTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.wxArrearsNoticeEndTimeEnd"
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
        @click="addTenantConfigWx()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="tenantConfigWxTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border
      >
        <el-table-column label="微信配置ID" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="租户ID" width="280" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantName}}</template>
        </el-table-column>
        <el-table-column label="微信公众号APPID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.wxAppid}}</template>
        </el-table-column>
        <el-table-column label="微信公众号AppSecret" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.wxAppsecret}}</template>
        </el-table-column>
        <el-table-column label="微信商户ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.wxAccountId}}</template>
        </el-table-column>
        <el-table-column label="微信商户API密钥" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.wxAccountApiKey}}</template>
        </el-table-column>
        <el-table-column label="微信公众号首页显示图片名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.wxTitlePictureFileName}}</template>
        </el-table-column>
        <el-table-column label="微信公众号显示服务电话" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.wxServiceTel}}</template>
        </el-table-column>
        <el-table-column label="开启出账微信通知" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.wxReceivableNoticeOn | formatWxReceivableNoticeOn}}</template>
        </el-table-column>
        <el-table-column label="开启付款微信通知" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.wxPaymentNoticeOn | formatWxPaymentNoticeOn}}</template>
        </el-table-column>
        <el-table-column label="开启用户预存款变动微信通知" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.wxBalanceMoneyChangeNoticeOn | formatWxBalanceMoneyChangeNoticeOn}}</template>
        </el-table-column>
        <el-table-column label="开启欠费催缴微信通知" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.wxArrearsNoticeOn | formatWxArrearsNoticeOn}}</template>
        </el-table-column>
        <el-table-column label="出账微信通知模板" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.wxReceivableNoticeTemplate}}</template>
        </el-table-column>
        <el-table-column label="付款微信通知模板" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.wxPaymentNoticeTemplate}}</template>
        </el-table-column>
        <el-table-column label="用户预存款变动微信通知模板" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.wxBalanceMoneyChangeNoticeTemplate}}</template>
        </el-table-column>
        <el-table-column label="欠费催缴微信通知模板" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.wxArrearsNoticeTemplate}}</template>
        </el-table-column>
        <el-table-column label="进入催缴的欠费天数" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.wxArrearsDays}}</template>
        </el-table-column>
        <el-table-column label="每月多少号进行欠费催缴" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.wxArrearsNoticeDay}}</template>
        </el-table-column>
        <el-table-column label="欠费催缴开始时间" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.wxArrearsNoticeStartTime}}</template>
        </el-table-column>
        <el-table-column label="欠费催缴结束时间" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.wxArrearsNoticeEndTime}}</template>
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
  import {fetchList, deleteTenantConfigWx} from '@/api/tenantConfigWx'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    wxAppid: null,
    wxAppsecret: null,
    wxAccountId: null,
    wxAccountApiKey: null,
    wxTitlePictureFileName: null,
    wxServiceTel: null,
    wxReceivableNoticeOn: null,
    wxPaymentNoticeOn: null,
    wxBalanceMoneyChangeNoticeOn: null,
    wxArrearsNoticeOn: null,
    wxReceivableNoticeTemplate: null,
    wxPaymentNoticeTemplate: null,
    wxBalanceMoneyChangeNoticeTemplate: null,
    wxArrearsNoticeTemplate: null,
    wxArrearsDays: null,
    wxArrearsNoticeDay: null,
    wxArrearsNoticeStartTime: null,
    wxArrearsNoticeStartTimeStart: null,
    wxArrearsNoticeStartTimeEnd: null,
    wxArrearsNoticeEndTime: null,
    wxArrearsNoticeEndTimeStart: null,
    wxArrearsNoticeEndTimeEnd: null
  };
  const defaultWxReceivableNoticeOnOptions=[
    {
      value: 1,
      label: '开启'
    },
    {
      value: 0,
      label: '不开启'
    }
  ];
  const defaultWxPaymentNoticeOnOptions=[
    {
      value: 1,
      label: '开启'
    },
    {
      value: 0,
      label: '不开启'
    }
  ];
  const defaultWxBalanceMoneyChangeNoticeOnOptions=[
    {
      value: 1,
      label: '开启'
    },
    {
      value: 0,
      label: '不开启'
    }
  ];
  const defaultWxArrearsNoticeOnOptions=[
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
    name: 'tenantConfigWxList',
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
        wxReceivableNoticeOnOptions: Object.assign({},defaultWxReceivableNoticeOnOptions),
        wxPaymentNoticeOnOptions: Object.assign({},defaultWxPaymentNoticeOnOptions),
        wxBalanceMoneyChangeNoticeOnOptions: Object.assign({},defaultWxBalanceMoneyChangeNoticeOnOptions),
        wxArrearsNoticeOnOptions: Object.assign({},defaultWxArrearsNoticeOnOptions),
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
      formatWxReceivableNoticeOn(wxReceivableNoticeOn){
        for(let i=0;i<defaultWxReceivableNoticeOnOptions.length;i++){
          if(wxReceivableNoticeOn===defaultWxReceivableNoticeOnOptions[i].value){
            return defaultWxReceivableNoticeOnOptions[i].label;
          }
        }
      },
      formatWxPaymentNoticeOn(wxPaymentNoticeOn){
        for(let i=0;i<defaultWxPaymentNoticeOnOptions.length;i++){
          if(wxPaymentNoticeOn===defaultWxPaymentNoticeOnOptions[i].value){
            return defaultWxPaymentNoticeOnOptions[i].label;
          }
        }
      },
      formatWxBalanceMoneyChangeNoticeOn(wxBalanceMoneyChangeNoticeOn){
        for(let i=0;i<defaultWxBalanceMoneyChangeNoticeOnOptions.length;i++){
          if(wxBalanceMoneyChangeNoticeOn===defaultWxBalanceMoneyChangeNoticeOnOptions[i].value){
            return defaultWxBalanceMoneyChangeNoticeOnOptions[i].label;
          }
        }
      },
      formatWxArrearsNoticeOn(wxArrearsNoticeOn){
        for(let i=0;i<defaultWxArrearsNoticeOnOptions.length;i++){
          if(wxArrearsNoticeOn===defaultWxArrearsNoticeOnOptions[i].value){
            return defaultWxArrearsNoticeOnOptions[i].label;
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
        this.$router.push({path: '/saas/viewTenantConfigWx', query: {id: row.id, tenantId:this.tenantId}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/saas/updateTenantConfigWx', query: {id: row.id, tenantId:this.tenantId}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该微信参数设置', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTenantConfigWx(row.id).then(response => {
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
      searchTenantConfigWxList() {
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
      addTenantConfigWx() {
        this.$router.push({path: '/saas/addTenantConfigWx', query: {tenantId:this.tenantId}})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


