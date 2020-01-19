<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchTenantMeterList()"
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
            <el-form-item label="水表ID：">
              <el-input style="width: 203px" v-model="listQuery.id" placeholder="水表ID"></el-input>
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
            <el-form-item label="用户ID：">
              <el-input style="width: 203px" v-model="listQuery.customerId" placeholder="用户ID"></el-input>
            </el-form-item>
            <el-form-item label="水表表册ID：">
              <el-input style="width: 203px" v-model="listQuery.meterBookletId" placeholder="水表表册ID"></el-input>
            </el-form-item>
            <el-form-item label="上级水表ID：">
              <el-input style="width: 203px" v-model="listQuery.meterParentId" placeholder="上级水表ID"></el-input>
            </el-form-item>
            <el-form-item label="水表编号：">
              <el-input style="width: 203px" v-model="listQuery.meterCode" placeholder="水表编号"></el-input>
            </el-form-item>
            <el-form-item label="水表地址：">
              <el-input style="width: 203px" v-model="listQuery.meterAddress" placeholder="水表地址"></el-input>
            </el-form-item>
            <el-form-item label="家庭人数：">
              <el-input style="width: 203px" v-model="listQuery.meterPeoples" placeholder="家庭人数"></el-input>
            </el-form-item>
            <el-form-item label="表身号码[钢印号等]：">
              <el-input style="width: 203px" v-model="listQuery.meterMachineCode" placeholder="表身号码[钢印号等]"></el-input>
            </el-form-item>
            <el-form-item label="用途：">
              <el-select v-model="listQuery.meterUseType" placeholder="全部" clearable>
                <el-option
                  v-for="item in meterUseTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="厂商ID：">
              <el-input style="width: 203px" v-model="listQuery.meterManufactorId" placeholder="厂商ID"></el-input>
            </el-form-item>
            <el-form-item label="水表类型：">
              <el-select v-model="listQuery.meterType" placeholder="全部" clearable>
                <el-option
                  v-for="item in meterTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="水表口径ID：">
              <el-input style="width: 203px" v-model="listQuery.caliberId" placeholder="水表口径ID"></el-input>
            </el-form-item>
            <el-form-item label="用水分类ID：">
              <el-input style="width: 203px" v-model="listQuery.meterWaterTypeId" placeholder="用水分类ID"></el-input>
            </el-form-item>
            <el-form-item label="价格分类ID：">
              <el-input style="width: 203px" v-model="listQuery.priceTypeId" placeholder="价格分类ID"></el-input>
            </el-form-item>
            <el-form-item label="采集系统代码：">
              <el-input style="width: 203px" v-model="listQuery.meterIotCode" placeholder="采集系统代码"></el-input>
            </el-form-item>
            <el-form-item label="水表安装日期：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.meterInstallDateStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.meterInstallDateEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="水表建档日期：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.meterRegisterTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.meterRegisterTimeEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="水表状态：">
              <el-select v-model="listQuery.meterStatus" placeholder="全部" clearable>
                <el-option
                  v-for="item in meterStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年累计用水量：">
              <el-input style="width: 203px" v-model="listQuery.meterYearTotalWaters" placeholder="年累计用水量"></el-input>
            </el-form-item>
            <el-form-item label="最后一次结算日期：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.meterLastSettleTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.meterLastSettleTimeEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="最后一次结算指针：">
              <el-input style="width: 203px" v-model="listQuery.meterLastSettlePointer" placeholder="最后一次结算指针"></el-input>
            </el-form-item>
            <el-form-item label="水表欠费总金额：">
              <el-input style="width: 203px" v-model="listQuery.meterArrearsMoney" placeholder="水表欠费总金额"></el-input>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addTenantMeter()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="tenantMeterTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border
                row-key="id"
                lazy
                :load="load"
                :tree-props="{hasChildren: 'hasChildren'}"
      >
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="水表ID" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="租户ID" width="280" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantName}}</template>
        </el-table-column>
        <el-table-column label="用户ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.customerId}}</template>
        </el-table-column>
        <el-table-column label="水表表册ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterBookletId}}</template>
        </el-table-column>
        <el-table-column label="上级水表ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterParentId}}</template>
        </el-table-column>
        <el-table-column label="水表编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterCode}}</template>
        </el-table-column>
        <el-table-column label="水表地址" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterAddress}}</template>
        </el-table-column>
        <el-table-column label="家庭人数" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterPeoples}}</template>
        </el-table-column>
        <el-table-column label="表身号码[钢印号等]" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterMachineCode}}</template>
        </el-table-column>
        <el-table-column label="用途" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterUseType | formatMeterUseType}}</template>
        </el-table-column>
        <el-table-column label="厂商ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterManufactorId}}</template>
        </el-table-column>
        <el-table-column label="水表类型" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterType | formatMeterType}}</template>
        </el-table-column>
        <el-table-column label="水表口径ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.caliberId}}</template>
        </el-table-column>
        <el-table-column label="用水分类ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterWaterTypeId}}</template>
        </el-table-column>
        <el-table-column label="价格分类ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.priceTypeId}}</template>
        </el-table-column>
        <el-table-column label="采集系统代码" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterIotCode}}</template>
        </el-table-column>
        <el-table-column label="水表安装日期" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterInstallDate | formatDate}}</template>
        </el-table-column>
        <el-table-column label="水表建档日期" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterRegisterTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="水表状态" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterStatus | formatMeterStatus}}</template>
        </el-table-column>
        <el-table-column label="年累计用水量" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.meterYearTotalWaters | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="最后一次结算日期" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterLastSettleTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="最后一次结算指针" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.meterLastSettlePointer | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="水表欠费总金额" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.meterArrearsMoney | formatMoney}}</template>
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
  import {fetchList, deleteTenantMeter} from '@/api/tenantMeter'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  import accounting from 'accounting';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    parentId: null,
    id: null,
    tenantId: null,
    customerId: null,
    meterBookletId: null,
    meterParentId: null,
    meterCode: null,
    meterAddress: null,
    meterPeoples: null,
    meterMachineCode: null,
    meterUseType: null,
    meterManufactorId: null,
    meterType: null,
    caliberId: null,
    meterWaterTypeId: null,
    priceTypeId: null,
    meterIotCode: null,
    meterInstallDate: null,
    meterInstallDateStart: null,
    meterInstallDateEnd: null,
    meterRegisterTime: null,
    meterRegisterTimeStart: null,
    meterRegisterTimeEnd: null,
    meterStatus: null,
    meterYearTotalWaters: null,
    meterLastSettleTime: null,
    meterLastSettleTimeStart: null,
    meterLastSettleTimeEnd: null,
    meterLastSettlePointer: null,
    meterArrearsMoney: null
  };
  const defaultMeterUseTypeOptions=[
    {
      value: 1,
      label: '水费结算'
    },
    {
      value: 2,
      label: '水量考核'
    }
  ];
  const defaultMeterTypeOptions=[
    {
      value: 1,
      label: '机械表'
    },
    {
      value: 2,
      label: '远传表'
    },
    {
      value: 3,
      label: 'IC卡表'
    }
  ];
  const defaultMeterStatusOptions=[
    {
      value: 1,
      label: '正常'
    },
    {
      value: 2,
      label: '暂停'
    },
    {
      value: 3,
      label: '拆表'
    }
  ];
  
  export default {
    name: 'tenantMeterList',
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
        meterUseTypeOptions: Object.assign({},defaultMeterUseTypeOptions),
        meterTypeOptions: Object.assign({},defaultMeterTypeOptions),
        meterStatusOptions: Object.assign({},defaultMeterStatusOptions),
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
      formatMeterUseType(meterUseType){
        for(let i=0;i<defaultMeterUseTypeOptions.length;i++){
          if(meterUseType===defaultMeterUseTypeOptions[i].value){
            return defaultMeterUseTypeOptions[i].label;
          }
        }
      },
      formatMeterType(meterType){
        for(let i=0;i<defaultMeterTypeOptions.length;i++){
          if(meterType===defaultMeterTypeOptions[i].value){
            return defaultMeterTypeOptions[i].label;
          }
        }
      },
      formatMeterStatus(meterStatus){
        for(let i=0;i<defaultMeterStatusOptions.length;i++){
          if(meterStatus===defaultMeterStatusOptions[i].value){
            return defaultMeterStatusOptions[i].label;
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
      load(row, treeNode, resolve) {
        let parentId = row.id;
        this.listLoading = true;
        this.listQuery = Object.assign({},this.listQuery,{"parentId":parentId});
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          resolve(response.data.list);
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
        this.$router.push({path: '/saas/viewTenantMeter', query: {id: row.id, tenantId:this.tenantId}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/saas/updateTenantMeter', query: {id: row.id, tenantId:this.tenantId}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该水表信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTenantMeter(row.id).then(response => {
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
      searchTenantMeterList() {
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
      addTenantMeter() {
        this.$router.push({path: '/saas/addTenantMeter', query: {tenantId:this.tenantId}})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


