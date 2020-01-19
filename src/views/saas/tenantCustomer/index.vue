<template>  
  <el-container>
    <el-aside width="420px">
      <el-card class="filter-container" shadow="never">
              <div style="margin-top: 15px">
                <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                  <el-form-item>
                    <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="请输入编号名称地址等条件"></el-input>
                  </el-form-item>            
                </el-form>
                <el-button
                  @click="searchTenantCustomerList()"
                  type="primary"
                  size="small">
                  查询结果
                </el-button>
              </div>
          </el-card>    
          <div class="table-container">
            <el-table ref="tenantCustomerTable"
                      :data="list"
                      style="width: 100%"
                      v-loading="listLoading"
                      @row-click="tenantCustomerTableRowClick"
                      border
            >
              <el-table-column label="编号" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.customerCode}}</template>
              </el-table-column>
              <el-table-column label="名称" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.customerName}}</template>
              </el-table-column>
              <el-table-column label="地址" width="218" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.customerAddress}}</template>
              </el-table-column>
            </el-table>
          </div>
    </el-aside>
    <el-main>
       <el-card shadow="never">
        <el-form :model="tenantCustomer" :inline="true" ref="tenantCustomerFrom" label-width="150px">          
          <el-form-item label="用户代码：" prop="customerCode">
            <el-input v-model="tenantCustomer.customerCode"></el-input>
          </el-form-item>
          <el-form-item label="用户名称：" prop="customerName">
            <el-input v-model="tenantCustomer.customerName"></el-input>
          </el-form-item>
          <el-form-item label="用户状态：" prop="customerStatus">
            <el-select
              v-model="tenantCustomer.customerStatus"
              placeholder="">
              <el-option
                v-for="item in customerStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户地址：" prop="customerAddress">
            <el-input v-model="tenantCustomer.customerAddress" style="width:568px"></el-input>
          </el-form-item>
          <el-form-item label="用户预存余额：" prop="customerBalanceMoney">
            <el-input-number v-model="tenantCustomer.customerBalanceMoney" :min="0" :precision="2" placeholder="用户预存余额"></el-input-number>
          </el-form-item>
          <el-form-item label="用户类别：" prop="customerTypeId">
            <el-input v-model="tenantCustomer.customerTypeId"></el-input>
          </el-form-item>
          <el-form-item label="建档时间：" prop="customerRegisterTime">
            <el-date-picker
                    class="input-width"
                    v-model="tenantCustomer.customerRegisterTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="请选择建档时间">
            </el-date-picker>
          </el-form-item>          
          <el-form-item label="用户缴费方式：" prop="customerPaymentMethod">
            <el-select
              v-model="tenantCustomer.customerPaymentMethod"
              clearable
              placeholder="请选择用户缴费方式">
              <el-option
                v-for="item in customerPaymentMethodOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="开票名称：" prop="invoiceName">
            <el-input v-model="tenantCustomer.invoiceName"></el-input>
          </el-form-item>
          <el-form-item label="税号：" prop="invoiceTaxNo">
            <el-input v-model="tenantCustomer.invoiceTaxNo"></el-input>
          </el-form-item>
          <el-form-item label="开票类别：" prop="invoiceType">
            <el-select
              v-model="tenantCustomer.invoiceType"
              clearable
              placeholder="请选择开票类别">
              <el-option
                v-for="item in invoiceTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户行账号：" prop="invoiceBankAccountNo">
            <el-input v-model="tenantCustomer.invoiceBankAccountNo"></el-input>
          </el-form-item>
          <el-form-item label="开户行名称：" prop="invoiceBankName">
            <el-input v-model="tenantCustomer.invoiceBankName"></el-input>
          </el-form-item>
          <el-form-item label="开户行行号：" prop="invoiceBankCode">
            <el-input v-model="tenantCustomer.invoiceBankCode"></el-input>
          </el-form-item>
          <el-form-item label="开票地址：" prop="invoiceAddress">
            <el-input v-model="tenantCustomer.invoiceAddress" style="width:568px"></el-input>
          </el-form-item>
          <el-form-item label="开票电话：" prop="invoiceTel">
            <el-input v-model="tenantCustomer.invoiceTel"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <el-tabs v-model="activeTab" type="card" >
        <el-tab-pane label="欠费账单" name="arrears">
          <div class="table-container">
            <el-table ref="tenantReceivableTable"
                      :data="tenantReceivableList"
                      style="width: 100%"
                      @selection-change="tenantReceivableHandleSelectionChange"
                      v-loading="tenantReceivableListLoading"
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
        </el-tab-pane>
        <el-tab-pane label="已缴账单" name="paid">配置管理</el-tab-pane>
        <el-tab-pane label="缴费历史" name="payment">缴费历史</el-tab-pane>
        <el-tab-pane label="抄表计划" name="read">抄表计划</el-tab-pane>
        <el-tab-pane label="用户变更记录" name="change">用户变更记录</el-tab-pane>
        <el-tab-pane label="水表信息" name="meter">水表信息</el-tab-pane>
        <el-tab-pane label="联系人" name="linkman">联系人</el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>  
</template>
<script>
  import {fetchList, getTenantCustomer, deleteTenantCustomer} from '@/api/tenantCustomer'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  import accounting from 'accounting';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 500,
    keyword:null,
    tenantId:null
  };
  const defaultCustomerStatusOptions=[
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
      label: '消户'
    }
  ];
  const defaultCustomerPaymentMethodOptions=[
    {
      value: 1,
      label: '坐收'
    },
    {
      value: 2,
      label: '走收'
    },
    {
      value: 3,
      label: '代扣'
    },
    {
      value: 4,
      label: '托收'
    }
  ];
  const defaultInvoiceTypeOptions=[
    {
      value: 1,
      label: '普通纸制发票'
    },
    {
      value: 2,
      label: '普通电子发票'
    },
    {
      value: 3,
      label: '专用纸制发票'
    }
  ];
  export default {
    name: 'tenantCustomerList',
    data() {
      return {
        operates: [
        ],
        tenantCustomer:{},
        activeTab:"arrears",
        operateType: null,
        tenantId: null,
        listQuery:Object.assign({},defaultListQuery,this.$route.query),
        customerStatusOptions: Object.assign({},defaultCustomerStatusOptions),
        customerPaymentMethodOptions: Object.assign({},defaultCustomerPaymentMethodOptions),
        invoiceTypeOptions: Object.assign({},defaultInvoiceTypeOptions),
        list: null,
        total: null,
        listLoading: true,        
        multipleSelection: []
      }
    },
    created() {
      //页面初始化不加载数据列表
      //this.getList();
      this.listLoading = false;
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
      }
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
      searchTenantCustomerList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      tenantCustomerTableRowClick(row) {
        let id = row.id;
        getTenantCustomer(id).then(response => {
          this.tenantCustomer = response.data;
        });
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


