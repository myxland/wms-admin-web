<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchTenantSmsList()"
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
            <el-form-item label="编号ID：">
              <el-input style="width: 203px" v-model="listQuery.id" placeholder="编号ID"></el-input>
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
            <el-form-item label="抄表账单通知：">
              <el-select v-model="listQuery.smsReadSendOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in smsReadSendOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="缴费成功通知：">
              <el-select v-model="listQuery.smsChargeSendOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in smsChargeSendOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="欠费通知：">
              <el-select v-model="listQuery.smsQfSendOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in smsQfSendOnOptions"
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
        @click="addTenantSms()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="tenantSmsTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号ID" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="租户" width="280" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantName}}</template>
        </el-table-column>
        <el-table-column label="签名" width="" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.smsSignature}}</template>
        </el-table-column>
        <el-table-column label="SP服务商" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.smsSpService}}</template>
        </el-table-column>
        <el-table-column label="抄表账单通知" width="120" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleSmsReadSendOnChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.smsReadSendOn">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="缴费成功通知" width="120" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleSmsChargeSendOnChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.smsChargeSendOn">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="欠费通知" width="120" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleSmsQfSendOnChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.smsQfSendOn">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="欠费通知天数" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.smsQfSendAfterDays}}</template>
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
  import {fetchList, deleteTenantSms, updateSmsReadSendOn, updateSmsChargeSendOn, updateSmsQfSendOn} from '@/api/tenantSms'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    smsSignature: null,
    smsSpService: null,
    smsReadSendOn: null,
    smsChargeSendOn: null,
    smsQfSendOn: null,
    smsQfSendAfterDays: null
  };
  const defaultSmsReadSendOnOptions=[
    {
      value: 1,
      label: '启用'
    },
    {
      value: 0,
      label: '不启用'
    }
  ];
  const defaultSmsChargeSendOnOptions=[
    {
      value: 1,
      label: '启用'
    },
    {
      value: 0,
      label: '不启用'
    }
  ];
  const defaultSmsQfSendOnOptions=[
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
    name: 'tenantSmsList',
    data() {
      return {
        operates: [
          {
            label: "开启抄表账单通知",
            value: "activeSmsReadSendOn"
          },
          {
            label: "不开启抄表账单通知",
            value: "inactiveSmsReadSendOn"
          },
          {
            label: "开启缴费成功通知",
            value: "activeSmsChargeSendOn"
          },
          {
            label: "不开启缴费成功通知",
            value: "inactiveSmsChargeSendOn"
          },
          {
            label: "开启欠费通知",
            value: "activeSmsQfSendOn"
          },
          {
            label: "不开启欠费通知",
            value: "inactiveSmsQfSendOn"
          }
        ],
        operateType: null,
        listQuery:Object.assign({},defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        smsReadSendOnOptions: Object.assign({},defaultSmsReadSendOnOptions),
        smsChargeSendOnOptions: Object.assign({},defaultSmsChargeSendOnOptions),
        smsQfSendOnOptions: Object.assign({},defaultSmsQfSendOnOptions),
        tenantInfoOptions:[],
        multipleSelection: []
      }
    },
    created() {
      this.getList();
      this.getTenantInfoList();
    },
    filters:{
      formatSmsReadSendOn(smsReadSendOn){
        for(let i=0;i<defaultSmsReadSendOnOptions.length;i++){
          if(smsReadSendOn===defaultSmsReadSendOnOptions[i].value){
            return defaultSmsReadSendOnOptions[i].label;
          }
        }
      },
      formatSmsChargeSendOn(smsChargeSendOn){
        for(let i=0;i<defaultSmsChargeSendOnOptions.length;i++){
          if(smsChargeSendOn===defaultSmsChargeSendOnOptions[i].value){
            return defaultSmsChargeSendOnOptions[i].label;
          }
        }
      },
      formatSmsQfSendOn(smsQfSendOn){
        for(let i=0;i<defaultSmsQfSendOnOptions.length;i++){
          if(smsQfSendOn===defaultSmsQfSendOnOptions[i].value){
            return defaultSmsQfSendOnOptions[i].label;
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
        this.$router.push({path: '/mbg/updateTenantSms', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该租户短信配置', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTenantSms(row.id).then(response => {
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
      handleSmsReadSendOnChange(index, row) {
        let data = new URLSearchParams();
        ;
        data.append("ids", row.id);
        data.append("smsReadSendOn", row.smsReadSendOn);
        updateSmsReadSendOn(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.smsReadSendOn === 0) {
            row.showStatus = 1;
          } else {
            row.smsReadSendOn = 0;
          }
        });
      },
      handleSmsChargeSendOnChange(index, row) {
        let data = new URLSearchParams();
        ;
        data.append("ids", row.id);
        data.append("smsChargeSendOn", row.smsChargeSendOn);
        updateSmsChargeSendOn(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.smsChargeSendOn === 0) {
            row.showStatus = 1;
          } else {
            row.smsChargeSendOn = 0;
          }
        });
      },
      handleSmsQfSendOnChange(index, row) {
        let data = new URLSearchParams();
        ;
        data.append("ids", row.id);
        data.append("smsQfSendOn", row.smsQfSendOn);
        updateSmsQfSendOn(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.smsQfSendOn === 0) {
            row.showStatus = 1;
          } else {
            row.smsQfSendOn = 0;
          }
        });
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      searchTenantSmsList() {
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

        if(this.operateType=="activeSmsReadSendOn" || this.operateType=="inactiveSmsReadSendOn"){
          let smsReadSendOn = 0;
          if(this.operateType=="activeSmsReadSendOn"){
            smsReadSendOn = 1;
          }
          data.append("smsReadSendOn", smsReadSendOn);
          updateSmsReadSendOn(data).then(response => {
            this.getList();
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 1000
            });
          });
        } else if (this.operateType=="activeSmsChargeSendOn" || this.operateType=="inactiveSmsChargeSendOn"){
          let smsChargeSendOn = 0;
          if(this.operateType=="activeSmsChargeSendOn"){
            smsChargeSendOn = 1;
          }
          data.append("smsChargeSendOn", smsChargeSendOn);
          updateSmsChargeSendOn(data).then(response => {
            this.getList();
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 1000
            });
          });
        } else if (this.operateType=="activeSmsQfSendOn" || this.operateType=="inactiveSmsQfSendOn"){
          let smsQfSendOn = 0;
          if(this.operateType=="activeSmsQfSendOn"){
            smsQfSendOn = 1;
          }
          data.append("smsQfSendOn", smsQfSendOn);
          updateSmsQfSendOn(data).then(response => {
            this.getList();
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 1000
            });
          });
        } else {
          this.$message({
            message: '请选择批量操作类型',
            type: 'warning',
            duration: 1000
          });
          return;
        }
      },
      addTenantSms() {
        this.$router.push({path: '/mbg/addTenantSms'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


