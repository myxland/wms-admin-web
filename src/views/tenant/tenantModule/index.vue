<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchTenantModuleList()"
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
              <el-select v-model="listQuery.tenantId" placeholder="请选择租户" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="模块：">
              <el-select v-model="listQuery.moduleId" placeholder="请选择模块" :disabled="this.$route.query.moduleId?true:false" clearable>
                <el-option
                  v-for="item in moduleInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="模块显示名称：">
              <el-input style="width: 203px" v-model="listQuery.moduleDisplayName" placeholder="模块显示名称"></el-input>
            </el-form-item>
            <el-form-item label="模块排序：">
              <el-input style="width: 203px" v-model="listQuery.moduleOrder" placeholder="模块排序"></el-input>
            </el-form-item>
            <el-form-item label="开通版本：">
              <el-select v-model="listQuery.moduleEdition" placeholder="全部" clearable>
                <el-option
                  v-for="item in moduleEditionOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="模块状态：">
              <el-select v-model="listQuery.moduleStatus" placeholder="全部" clearable>
                <el-option
                  v-for="item in moduleStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="价格体系：">
              <el-select v-model="listQuery.modulePriceType" placeholder="全部" clearable>
                <el-option
                  v-for="item in modulePriceTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开通时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.moduleOpenDateStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.moduleOpenDateEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="到期时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.moduleEndDateStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.moduleEndDateEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="开始计费日期：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.moduleStartChargeDateStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.moduleStartChargeDateEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="欠费金额：">
              <el-input style="width: 203px" v-model="listQuery.moduleArrears" placeholder="欠费金额"></el-input>
            </el-form-item>
            <el-form-item label="透支额度：">
              <el-input style="width: 203px" v-model="listQuery.moduleOverdraft" placeholder="透支额度"></el-input>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addTenantModule()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="tenantModuleTable"
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
        <el-table-column label="模块" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.moduleName}}</template>
        </el-table-column>
        <el-table-column label="模块显示名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.moduleDisplayName}}</template>
        </el-table-column>
        <el-table-column label="模块排序" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.moduleOrder}}</template>
        </el-table-column>
        <el-table-column label="开通版本" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.moduleEdition | formatModuleEdition}}</template>
        </el-table-column>
        <el-table-column label="模块状态" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.moduleStatus | formatModuleStatus}}</template>
        </el-table-column>
        <el-table-column label="价格体系" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.modulePriceType | formatModulePriceType}}</template>
        </el-table-column>
        <el-table-column label="开通时间" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.moduleOpenDate | formatTime}}</template>
        </el-table-column>
        <el-table-column label="到期时间" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.moduleEndDate | formatTime}}</template>
        </el-table-column>
        <el-table-column label="开始计费日期" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.moduleStartChargeDate | formatDate}}</template>
        </el-table-column>
        <el-table-column label="欠费金额" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.moduleArrears | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="透支额度" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.moduleOverdraft | formatMoney}}</template>
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
  import {fetchList, deleteTenantModule} from '@/api/tenantModule'
  import {fetchList as fetchModuleInfoList} from '@/api/moduleInfo';
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  import accounting from 'accounting';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    moduleId: null,
    moduleDisplayName: null,
    moduleOrder: null,
    moduleEdition: null,
    moduleStatus: null,
    modulePriceType: null,
    moduleOpenDate: null,
    moduleOpenDateStart: null,
    moduleOpenDateEnd: null,
    moduleEndDate: null,
    moduleEndDateStart: null,
    moduleEndDateEnd: null,
    moduleStartChargeDate: null,
    moduleStartChargeDateStart: null,
    moduleStartChargeDateEnd: null,
    moduleArrears: null,
    moduleOverdraft: null
  };
  const defaultModuleEditionOptions=[
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
  const defaultModuleStatusOptions=[
    {
      value: 1,
      label: '开通'
    },
    {
      value: 0,
      label: '未开通'
    }
  ];
  const defaultModulePriceTypeOptions=[
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
    name: 'tenantModuleList',
    data() {
      return {
        operates: [
        ],
        operateType: null,
        tenantId: null,
        moduleId: null,
        listQuery:Object.assign({},defaultListQuery,this.$route.query),
        list: null,
        total: null,
        listLoading: true,
        moduleEditionOptions: Object.assign({},defaultModuleEditionOptions),
        moduleStatusOptions: Object.assign({},defaultModuleStatusOptions),
        modulePriceTypeOptions: Object.assign({},defaultModulePriceTypeOptions),
        moduleInfoOptions:[],
        tenantInfoOptions:[],
        multipleSelection: []
      }
    },
    created() {
      this.getList();
      this.getModuleInfoList();
      this.getTenantInfoList();
      let tenantId = this.$route.query.tenantId;
      if(tenantId){
        this.tenantId = tenantId;
        this.listQuery.tenantId = tenantId;
      }
      let moduleId = this.$route.query.moduleId;
      if(moduleId){
        this.moduleId = moduleId;
        this.listQuery.moduleId = moduleId;
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
      formatModuleEdition(moduleEdition){
        for(let i=0;i<defaultModuleEditionOptions.length;i++){
          if(moduleEdition===defaultModuleEditionOptions[i].value){
            return defaultModuleEditionOptions[i].label;
          }
        }
      },
      formatModuleStatus(moduleStatus){
        for(let i=0;i<defaultModuleStatusOptions.length;i++){
          if(moduleStatus===defaultModuleStatusOptions[i].value){
            return defaultModuleStatusOptions[i].label;
          }
        }
      },
      formatModulePriceType(modulePriceType){
        for(let i=0;i<defaultModulePriceTypeOptions.length;i++){
          if(modulePriceType===defaultModulePriceTypeOptions[i].value){
            return defaultModulePriceTypeOptions[i].label;
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
      getModuleInfoList() {
        fetchModuleInfoList({pageNum:1,pageSize:500}).then(response => {
          this.moduleInfoOptions = [];
          let moduleInfoList = response.data.list;
          for(let i=0;i<moduleInfoList.length;i++){
            this.moduleInfoOptions.push({label:moduleInfoList[i].moduleName,value:moduleInfoList[i].id});
          }
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
        this.$router.push({path: '/tenant/viewTenantModule', query: {id: row.id, tenantId:this.tenantId, moduleId:this.moduleId}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/tenant/updateTenantModule', query: {id: row.id, tenantId:this.tenantId}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该租户模块', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTenantModule(row.id).then(response => {
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
      searchTenantModuleList() {
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
      addTenantModule() {
        this.$router.push({path: '/tenant/addTenantModule', query: {tenantId:this.tenantId,moduleId:this.moduleId}})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


