<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchTenantSystemList()"
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
              <el-select v-model="listQuery.tenantId" placeholder="请选择租户" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="模块：">
              <el-select v-model="listQuery.sysId" placeholder="请选择模块" clearable>
                <el-option
                  v-for="item in systemDesignOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开通版本：">
              <el-select v-model="listQuery.sysEdition" placeholder="全部" clearable>
                <el-option
                  v-for="item in sysEditionOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="模块状态：">
              <el-select v-model="listQuery.sysStatus" placeholder="全部" clearable>
                <el-option
                  v-for="item in sysStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="价格体系：">
              <el-select v-model="listQuery.sysPriceType" placeholder="全部" clearable>
                <el-option
                  v-for="item in sysPriceTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开通时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.sysOpenDateStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.sysOpenDateEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="到期时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.sysEndDateStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.sysEndDateEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="开始计费日期：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.sysStartChargeDateStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.sysStartChargeDateEnd"
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
        @click="addTenantSystem()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="tenantSystemTable"
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
        <el-table-column label="模块" width="200" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.moduleName}}</template>
        </el-table-column>
        <el-table-column label="模块排序" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.sysOrder}}</template>
        </el-table-column>
        <el-table-column label="开通版本" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.sysEdition | formatSysEdition}}</template>
        </el-table-column>
        <el-table-column label="模块状态" width="100" align="left">
          <template slot-scope="scope">
            <el-switch
              @change="handleSysStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.sysStatus">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="价格体系" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.sysPriceType | formatSysPriceType}}</template>
        </el-table-column>
        <el-table-column label="开通时间" width="100" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.sysOpenDate | formatTime}}</template>
        </el-table-column>
        <el-table-column label="到期时间" width="100" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.sysEndDate | formatTime}}</template>
        </el-table-column>
        <el-table-column label="开始计费日期" width="100" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.sysStartChargeDate | formatDate}}</template>
        </el-table-column>
        <el-table-column label="欠费金额" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.sysArrears | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="透支额度" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.sysOverdraft | formatMoney}}</template>
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
  import {fetchList, deleteTenantSystem, updateSysStatus} from '@/api/tenantSystem'
  import {fetchList as fetchSystemDesignList} from '@/api/systemDesign';
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  import accounting from 'accounting';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    sysId: null,
    sysDispName: null,
    sysOrder: null,
    sysEdition: null,
    sysStatus: null,
    sysPriceType: null,
    sysOpenDate: null,
    sysOpenDateStart: null,
    sysOpenDateEnd: null,
    sysEndDate: null,
    sysEndDateStart: null,
    sysEndDateEnd: null,
    sysStartChargeDate: null,
    sysStartChargeDateStart: null,
    sysStartChargeDateEnd: null,
    sysArrears: null,
    sysOverdraft: null
  };
  const defaultSysEditionOptions=[
    {
      value: 1,
      label: '基础版'
    },
    {
      value: 2,
      label: '高级版'
    },
    {
      value: 3,
      label: '旗舰版'
    }
  ];
  const defaultSysStatusOptions=[
    {
      value: 1,
      label: '开通'
    },
    {
      value: 0,
      label: '未开通'
    }
  ];
  const defaultSysPriceTypeOptions=[
    {
      value: 1,
      label: '标准价格'
    },
    {
      value: 2,
      label: '指定价格'
    }
  ];
  
  export default {
    name: 'tenantSystemList',
    data() {
      return {
        operates: [
        ],
        operateType: null,
        listQuery:Object.assign({},defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        sysEditionOptions: Object.assign({},defaultSysEditionOptions),
        sysStatusOptions: Object.assign({},defaultSysStatusOptions),
        sysPriceTypeOptions: Object.assign({},defaultSysPriceTypeOptions),
        systemDesignOptions:[],
        tenantInfoOptions:[],
        multipleSelection: []
      }
    },
    created() {
      this.getList();
      this.getSystemDesignList();
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
      formatSysEdition(sysEdition){
        for(let i=0;i<defaultSysEditionOptions.length;i++){
          if(sysEdition===defaultSysEditionOptions[i].value){
            return defaultSysEditionOptions[i].label;
          }
        }
      },
      formatSysStatus(sysStatus){
        for(let i=0;i<defaultSysStatusOptions.length;i++){
          if(sysStatus===defaultSysStatusOptions[i].value){
            return defaultSysStatusOptions[i].label;
          }
        }
      },
      formatSysPriceType(sysPriceType){
        for(let i=0;i<defaultSysPriceTypeOptions.length;i++){
          if(sysPriceType===defaultSysPriceTypeOptions[i].value){
            return defaultSysPriceTypeOptions[i].label;
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
      getSystemDesignList() {
        fetchSystemDesignList({pageNum:1,pageSize:100}).then(response => {
          this.systemDesignOptions = [];
          let systemDesignList = response.data.list;
          for(let i=0;i<systemDesignList.length;i++){
            this.systemDesignOptions.push({label:systemDesignList[i].moduleName,value:systemDesignList[i].id});
          }
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
        this.$router.push({path: '/mbg/updateTenantSystem', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该租户模块', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTenantSystem(row.id).then(response => {
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
      handleSysStatusChange(index, row) {
        let data = new URLSearchParams();
        ;
        data.append("ids", row.id);
        data.append("sysStatus", row.sysStatus);
        updateSysStatus(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.sysStatus === 0) {
            row.sysStatus = 1;
          } else {
            row.sysStatus = 0;
          }
        });
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      searchTenantSystemList() {
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
      addTenantSystem() {
        this.$router.push({path: '/mbg/addTenantSystem'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


