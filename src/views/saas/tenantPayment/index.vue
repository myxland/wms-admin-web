<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchTenantPaymentList()"
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
            <el-form-item label="实收账ID：">
              <el-input style="width: 203px" v-model="listQuery.id" placeholder="实收账ID"></el-input>
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
            <el-form-item label="内部生成的订单号：">
              <el-input style="width: 203px" v-model="listQuery.outTransno" placeholder="内部生成的订单号"></el-input>
            </el-form-item>
            <el-form-item label="外部如微信支付宝传入的订单号：">
              <el-input style="width: 203px" v-model="listQuery.inTransno" placeholder="外部如微信支付宝传入的订单号"></el-input>
            </el-form-item>
            <el-form-item label="付款时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.payTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.payTimeEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="实收账状态：">
              <el-select v-model="listQuery.paymentStatus" placeholder="全部" clearable>
                <el-option
                  v-for="item in paymentStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户ID：">
              <el-input style="width: 203px" v-model="listQuery.customerId" placeholder="用户ID"></el-input>
            </el-form-item>
            <el-form-item label="收款部门ID：">
              <el-input style="width: 203px" v-model="listQuery.chargeDepartmentId" placeholder="收款部门ID"></el-input>
            </el-form-item>
            <el-form-item label="收费员ID：">
              <el-input style="width: 203px" v-model="listQuery.chargeEmployeeId" placeholder="收费员ID"></el-input>
            </el-form-item>
            <el-form-item label="付款途径：">
              <el-select v-model="listQuery.payChannels" placeholder="全部" clearable>
                <el-option
                  v-for="item in payChannelsOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="付款方式：">
              <el-select v-model="listQuery.payMethod" placeholder="全部" clearable>
                <el-option
                  v-for="item in payMethodOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户上期预存余额：">
              <el-input style="width: 203px" v-model="listQuery.customerBalanceMoneyBefore" placeholder="用户上期预存余额"></el-input>
            </el-form-item>
            <el-form-item label="用户付款金额：">
              <el-input style="width: 203px" v-model="listQuery.customerPayMoney" placeholder="用户付款金额"></el-input>
            </el-form-item>
            <el-form-item label="用户预存发生值：">
              <el-input style="width: 203px" v-model="listQuery.customerBalanceMoneyHappen" placeholder="用户预存发生值"></el-input>
            </el-form-item>
            <el-form-item label="所缴欠费金额：">
              <el-input style="width: 203px" v-model="listQuery.payTheArrearsMoney" placeholder="所缴欠费金额"></el-input>
            </el-form-item>
            <el-form-item label="所缴违约金金额：">
              <el-input style="width: 203px" v-model="listQuery.payTheLateFeeMoney" placeholder="所缴违约金金额"></el-input>
            </el-form-item>
            <el-form-item label="用户本期预存余额：">
              <el-input style="width: 203px" v-model="listQuery.customerBalanceMoneyAfter" placeholder="用户本期预存余额"></el-input>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addTenantPayment()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="tenantPaymentTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border
      >
        <el-table-column label="实收账ID" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="租户ID" width="280" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantName}}</template>
        </el-table-column>
        <el-table-column label="内部生成的订单号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.outTransno}}</template>
        </el-table-column>
        <el-table-column label="外部如微信支付宝传入的订单号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.inTransno}}</template>
        </el-table-column>
        <el-table-column label="付款时间" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.payTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="实收账状态" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.paymentStatus | formatPaymentStatus}}</template>
        </el-table-column>
        <el-table-column label="用户ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.customerId}}</template>
        </el-table-column>
        <el-table-column label="收款部门ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.chargeDepartmentId}}</template>
        </el-table-column>
        <el-table-column label="收费员ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.chargeEmployeeId}}</template>
        </el-table-column>
        <el-table-column label="付款途径" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.payChannels | formatPayChannels}}</template>
        </el-table-column>
        <el-table-column label="付款方式" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.payMethod | formatPayMethod}}</template>
        </el-table-column>
        <el-table-column label="用户上期预存余额" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.customerBalanceMoneyBefore | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="用户付款金额" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.customerPayMoney | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="用户预存发生值" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.customerBalanceMoneyHappen | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="所缴欠费金额" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.payTheArrearsMoney | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="所缴违约金金额" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.payTheLateFeeMoney | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="用户本期预存余额" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.customerBalanceMoneyAfter | formatMoney}}</template>
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
  import {fetchList, deleteTenantPayment} from '@/api/tenantPayment'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  import accounting from 'accounting';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    outTransno: null,
    inTransno: null,
    payTime: null,
    payTimeStart: null,
    payTimeEnd: null,
    paymentStatus: null,
    customerId: null,
    chargeDepartmentId: null,
    chargeEmployeeId: null,
    payChannels: null,
    payMethod: null,
    customerBalanceMoneyBefore: null,
    customerPayMoney: null,
    customerBalanceMoneyHappen: null,
    payTheArrearsMoney: null,
    payTheLateFeeMoney: null,
    customerBalanceMoneyAfter: null
  };
  const defaultPaymentStatusOptions=[
    {
      value: 1,
      label: '正常'
    },
    {
      value: 2,
      label: '被退款'
    },
    {
      value: 3,
      label: '退款记录'
    }
  ];
  const defaultPayChannelsOptions=[
    {
      value: 1,
      label: '柜台'
    },
    {
      value: 2,
      label: '银行'
    },
    {
      value: 3,
      label: '线上'
    },
    {
      value: 4,
      label: '走收'
    },
    {
      value: 5,
      label: '系统处理'
    }
  ];
  const defaultPayMethodOptions=[
    {
      value: 0,
      label: '预存抵扣'
    },
    {
      value: 1,
      label: '现金'
    },
    {
      value: 2,
      label: '支票'
    },
    {
      value: 3,
      label: '刷卡'
    },
    {
      value: 4,
      label: '电汇'
    },
    {
      value: 5,
      label: '代扣'
    },
    {
      value: 6,
      label: '托收'
    },
    {
      value: 7,
      label: '微信生活缴费'
    },
    {
      value: 8,
      label: '支付宝生活缴费'
    },
    {
      value: 9,
      label: '微信公众号'
    },
    {
      value: 10,
      label: '微信扫码[用户被扫]'
    },
    {
      value: 11,
      label: '支付宝扫码[用户被扫]'
    },
    {
      value: 12,
      label: '微信扫码[用户主扫]'
    },
    {
      value: 13,
      label: '支付宝扫码[用户主扫]'
    }
  ];
  
  export default {
    name: 'tenantPaymentList',
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
        paymentStatusOptions: Object.assign({},defaultPaymentStatusOptions),
        payChannelsOptions: Object.assign({},defaultPayChannelsOptions),
        payMethodOptions: Object.assign({},defaultPayMethodOptions),
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
      formatPaymentStatus(paymentStatus){
        for(let i=0;i<defaultPaymentStatusOptions.length;i++){
          if(paymentStatus===defaultPaymentStatusOptions[i].value){
            return defaultPaymentStatusOptions[i].label;
          }
        }
      },
      formatPayChannels(payChannels){
        for(let i=0;i<defaultPayChannelsOptions.length;i++){
          if(payChannels===defaultPayChannelsOptions[i].value){
            return defaultPayChannelsOptions[i].label;
          }
        }
      },
      formatPayMethod(payMethod){
        for(let i=0;i<defaultPayMethodOptions.length;i++){
          if(payMethod===defaultPayMethodOptions[i].value){
            return defaultPayMethodOptions[i].label;
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
        this.$router.push({path: '/saas/viewTenantPayment', query: {id: row.id, tenantId:this.tenantId}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/saas/updateTenantPayment', query: {id: row.id, tenantId:this.tenantId}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该实收总账，记录每次缴费的总信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTenantPayment(row.id).then(response => {
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
      searchTenantPaymentList() {
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
      addTenantPayment() {
        this.$router.push({path: '/saas/addTenantPayment', query: {tenantId:this.tenantId}})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


