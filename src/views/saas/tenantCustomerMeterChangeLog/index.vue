<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchTenantCustomerMeterChangeLogList()"
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
            <el-form-item label="变更日志ID：">
              <el-input style="width: 203px" v-model="listQuery.id" placeholder="变更日志ID"></el-input>
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
            <el-form-item label="新用户ID：">
              <el-input style="width: 203px" v-model="listQuery.csutomerIdNew" placeholder="新用户ID"></el-input>
            </el-form-item>
            <el-form-item label="用户名称：">
              <el-input style="width: 203px" v-model="listQuery.customerName" placeholder="用户名称"></el-input>
            </el-form-item>
            <el-form-item label="新用户名称：">
              <el-input style="width: 203px" v-model="listQuery.customerNameNew" placeholder="新用户名称"></el-input>
            </el-form-item>
            <el-form-item label="用户地址：">
              <el-input style="width: 203px" v-model="listQuery.customerAddress" placeholder="用户地址"></el-input>
            </el-form-item>
            <el-form-item label="新用户地址：">
              <el-input style="width: 203px" v-model="listQuery.customerAddressNew" placeholder="新用户地址"></el-input>
            </el-form-item>
            <el-form-item label="用户类别ID：">
              <el-input style="width: 203px" v-model="listQuery.customerTypeId" placeholder="用户类别ID"></el-input>
            </el-form-item>
            <el-form-item label="新用户类别ID：">
              <el-input style="width: 203px" v-model="listQuery.customerTypeIdNew" placeholder="新用户类别ID"></el-input>
            </el-form-item>
            <el-form-item label="用户状态：">
              <el-select v-model="listQuery.customerStatus" placeholder="全部" clearable>
                <el-option
                  v-for="item in customerStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="新用户状态：">
              <el-select v-model="listQuery.customerStatusNew" placeholder="全部" clearable>
                <el-option
                  v-for="item in customerStatusNewOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收费方式：">
              <el-select v-model="listQuery.customerPaymentMethod" placeholder="全部" clearable>
                <el-option
                  v-for="item in customerPaymentMethodOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="新收费方式：">
              <el-select v-model="listQuery.customerPaymentMethodNew" placeholder="全部" clearable>
                <el-option
                  v-for="item in customerPaymentMethodNewOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开票类别：">
              <el-select v-model="listQuery.invoiceType" placeholder="全部" clearable>
                <el-option
                  v-for="item in invoiceTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="新开票类别：">
              <el-select v-model="listQuery.invoiceTypeNew" placeholder="全部" clearable>
                <el-option
                  v-for="item in invoiceTypeNewOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开票名称：">
              <el-input style="width: 203px" v-model="listQuery.invoiceName" placeholder="开票名称"></el-input>
            </el-form-item>
            <el-form-item label="新开票名称：">
              <el-input style="width: 203px" v-model="listQuery.invoiceNameNew" placeholder="新开票名称"></el-input>
            </el-form-item>
            <el-form-item label="税号：">
              <el-input style="width: 203px" v-model="listQuery.invoiceTaxNo" placeholder="税号"></el-input>
            </el-form-item>
            <el-form-item label="新税号：">
              <el-input style="width: 203px" v-model="listQuery.invoiceTaxNoNew" placeholder="新税号"></el-input>
            </el-form-item>
            <el-form-item label="开票地址：">
              <el-input style="width: 203px" v-model="listQuery.invoiceAddress" placeholder="开票地址"></el-input>
            </el-form-item>
            <el-form-item label="新开票地址：">
              <el-input style="width: 203px" v-model="listQuery.invoiceAddressNew" placeholder="新开票地址"></el-input>
            </el-form-item>
            <el-form-item label="开票电话：">
              <el-input style="width: 203px" v-model="listQuery.invoiceTel" placeholder="开票电话"></el-input>
            </el-form-item>
            <el-form-item label="新开票电话：">
              <el-input style="width: 203px" v-model="listQuery.invoiceTelNew" placeholder="新开票电话"></el-input>
            </el-form-item>
            <el-form-item label="开户行行号：">
              <el-input style="width: 203px" v-model="listQuery.invoiceBankCode" placeholder="开户行行号"></el-input>
            </el-form-item>
            <el-form-item label="新开户行行号：">
              <el-input style="width: 203px" v-model="listQuery.invoiceBankCodeNew" placeholder="新开户行行号"></el-input>
            </el-form-item>
            <el-form-item label="开户行名称：">
              <el-input style="width: 203px" v-model="listQuery.invoiceBankName" placeholder="开户行名称"></el-input>
            </el-form-item>
            <el-form-item label="新开户行名称：">
              <el-input style="width: 203px" v-model="listQuery.invoiceBankNameNew" placeholder="新开户行名称"></el-input>
            </el-form-item>
            <el-form-item label="开户行账号：">
              <el-input style="width: 203px" v-model="listQuery.invoiceBankAccountNo" placeholder="开户行账号"></el-input>
            </el-form-item>
            <el-form-item label="新开户行账号：">
              <el-input style="width: 203px" v-model="listQuery.invoiceBankAccountNoNew" placeholder="新开户行账号"></el-input>
            </el-form-item>
            <el-form-item label="水表ID：">
              <el-input style="width: 203px" v-model="listQuery.meterId" placeholder="水表ID"></el-input>
            </el-form-item>
            <el-form-item label="价格分类ID：">
              <el-input style="width: 203px" v-model="listQuery.priceTypeId" placeholder="价格分类ID"></el-input>
            </el-form-item>
            <el-form-item label="新价格分类ID：">
              <el-input style="width: 203px" v-model="listQuery.priceTypeIdNew" placeholder="新价格分类ID"></el-input>
            </el-form-item>
            <el-form-item label="水表止码：">
              <el-input style="width: 203px" v-model="listQuery.meterLastSettlePointer" placeholder="水表止码"></el-input>
            </el-form-item>
            <el-form-item label="新水表止码：">
              <el-input style="width: 203px" v-model="listQuery.meterLastSettlePointerNew" placeholder="新水表止码"></el-input>
            </el-form-item>
            <el-form-item label="水表厂商ID：">
              <el-input style="width: 203px" v-model="listQuery.manufactorId" placeholder="水表厂商ID"></el-input>
            </el-form-item>
            <el-form-item label="新水表厂商ID：">
              <el-input style="width: 203px" v-model="listQuery.manufactorIdNew" placeholder="新水表厂商ID"></el-input>
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
            <el-form-item label="新水表类型：">
              <el-select v-model="listQuery.meterTypeNew" placeholder="全部" clearable>
                <el-option
                  v-for="item in meterTypeNewOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="水表口径ID：">
              <el-input style="width: 203px" v-model="listQuery.caliberId" placeholder="水表口径ID"></el-input>
            </el-form-item>
            <el-form-item label="新水表口径ID：">
              <el-input style="width: 203px" v-model="listQuery.caliberIdNew" placeholder="新水表口径ID"></el-input>
            </el-form-item>
            <el-form-item label="水表表身码：">
              <el-input style="width: 203px" v-model="listQuery.meterMachineCode" placeholder="水表表身码"></el-input>
            </el-form-item>
            <el-form-item label="新水表表身码：">
              <el-input style="width: 203px" v-model="listQuery.meterMachineCodeNew" placeholder="新水表表身码"></el-input>
            </el-form-item>
            <el-form-item label="远传系统编号：">
              <el-input style="width: 203px" v-model="listQuery.meterIotCode" placeholder="远传系统编号"></el-input>
            </el-form-item>
            <el-form-item label="新远传系统编号：">
              <el-input style="width: 203px" v-model="listQuery.meterIotCodeNew" placeholder="新远传系统编号"></el-input>
            </el-form-item>
            <el-form-item label="人口数：">
              <el-input style="width: 203px" v-model="listQuery.meterPeoples" placeholder="人口数"></el-input>
            </el-form-item>
            <el-form-item label="新人口数：">
              <el-input style="width: 203px" v-model="listQuery.meterPeoplesNew" placeholder="新人口数"></el-input>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addTenantCustomerMeterChangeLog()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="tenantCustomerMeterChangeLogTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border
      >
        <el-table-column label="变更日志ID" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="租户ID" width="280" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantName}}</template>
        </el-table-column>
        <el-table-column label="用户ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.customerId}}</template>
        </el-table-column>
        <el-table-column label="新用户ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.csutomerIdNew}}</template>
        </el-table-column>
        <el-table-column label="用户名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.customerName}}</template>
        </el-table-column>
        <el-table-column label="新用户名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.customerNameNew}}</template>
        </el-table-column>
        <el-table-column label="用户地址" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.customerAddress}}</template>
        </el-table-column>
        <el-table-column label="新用户地址" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.customerAddressNew}}</template>
        </el-table-column>
        <el-table-column label="用户类别ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.customerTypeId}}</template>
        </el-table-column>
        <el-table-column label="新用户类别ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.customerTypeIdNew}}</template>
        </el-table-column>
        <el-table-column label="用户状态" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.customerStatus | formatCustomerStatus}}</template>
        </el-table-column>
        <el-table-column label="新用户状态" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.customerStatusNew | formatCustomerStatusNew}}</template>
        </el-table-column>
        <el-table-column label="收费方式" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.customerPaymentMethod | formatCustomerPaymentMethod}}</template>
        </el-table-column>
        <el-table-column label="新收费方式" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.customerPaymentMethodNew | formatCustomerPaymentMethodNew}}</template>
        </el-table-column>
        <el-table-column label="开票类别" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.invoiceType | formatInvoiceType}}</template>
        </el-table-column>
        <el-table-column label="新开票类别" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.invoiceTypeNew | formatInvoiceTypeNew}}</template>
        </el-table-column>
        <el-table-column label="开票名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.invoiceName}}</template>
        </el-table-column>
        <el-table-column label="新开票名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.invoiceNameNew}}</template>
        </el-table-column>
        <el-table-column label="税号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.invoiceTaxNo}}</template>
        </el-table-column>
        <el-table-column label="新税号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.invoiceTaxNoNew}}</template>
        </el-table-column>
        <el-table-column label="开票地址" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.invoiceAddress}}</template>
        </el-table-column>
        <el-table-column label="新开票地址" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.invoiceAddressNew}}</template>
        </el-table-column>
        <el-table-column label="开票电话" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.invoiceTel}}</template>
        </el-table-column>
        <el-table-column label="新开票电话" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.invoiceTelNew}}</template>
        </el-table-column>
        <el-table-column label="开户行行号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.invoiceBankCode}}</template>
        </el-table-column>
        <el-table-column label="新开户行行号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.invoiceBankCodeNew}}</template>
        </el-table-column>
        <el-table-column label="开户行名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.invoiceBankName}}</template>
        </el-table-column>
        <el-table-column label="新开户行名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.invoiceBankNameNew}}</template>
        </el-table-column>
        <el-table-column label="开户行账号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.invoiceBankAccountNo}}</template>
        </el-table-column>
        <el-table-column label="新开户行账号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.invoiceBankAccountNoNew}}</template>
        </el-table-column>
        <el-table-column label="水表ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterId}}</template>
        </el-table-column>
        <el-table-column label="价格分类ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.priceTypeId}}</template>
        </el-table-column>
        <el-table-column label="新价格分类ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.priceTypeIdNew}}</template>
        </el-table-column>
        <el-table-column label="水表止码" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.meterLastSettlePointer | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="新水表止码" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.meterLastSettlePointerNew | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="水表厂商ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.manufactorId}}</template>
        </el-table-column>
        <el-table-column label="新水表厂商ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.manufactorIdNew}}</template>
        </el-table-column>
        <el-table-column label="水表类型" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterType | formatMeterType}}</template>
        </el-table-column>
        <el-table-column label="新水表类型" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterTypeNew | formatMeterTypeNew}}</template>
        </el-table-column>
        <el-table-column label="水表口径ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.caliberId}}</template>
        </el-table-column>
        <el-table-column label="新水表口径ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.caliberIdNew}}</template>
        </el-table-column>
        <el-table-column label="水表表身码" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterMachineCode}}</template>
        </el-table-column>
        <el-table-column label="新水表表身码" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterMachineCodeNew}}</template>
        </el-table-column>
        <el-table-column label="远传系统编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterIotCode}}</template>
        </el-table-column>
        <el-table-column label="新远传系统编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterIotCodeNew}}</template>
        </el-table-column>
        <el-table-column label="人口数" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterPeoples}}</template>
        </el-table-column>
        <el-table-column label="新人口数" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.meterPeoplesNew}}</template>
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
  import {fetchList, deleteTenantCustomerMeterChangeLog} from '@/api/tenantCustomerMeterChangeLog'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import accounting from 'accounting';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    customerId: null,
    csutomerIdNew: null,
    customerName: null,
    customerNameNew: null,
    customerAddress: null,
    customerAddressNew: null,
    customerTypeId: null,
    customerTypeIdNew: null,
    customerStatus: null,
    customerStatusNew: null,
    customerPaymentMethod: null,
    customerPaymentMethodNew: null,
    invoiceType: null,
    invoiceTypeNew: null,
    invoiceName: null,
    invoiceNameNew: null,
    invoiceTaxNo: null,
    invoiceTaxNoNew: null,
    invoiceAddress: null,
    invoiceAddressNew: null,
    invoiceTel: null,
    invoiceTelNew: null,
    invoiceBankCode: null,
    invoiceBankCodeNew: null,
    invoiceBankName: null,
    invoiceBankNameNew: null,
    invoiceBankAccountNo: null,
    invoiceBankAccountNoNew: null,
    meterId: null,
    priceTypeId: null,
    priceTypeIdNew: null,
    meterLastSettlePointer: null,
    meterLastSettlePointerNew: null,
    manufactorId: null,
    manufactorIdNew: null,
    meterType: null,
    meterTypeNew: null,
    caliberId: null,
    caliberIdNew: null,
    meterMachineCode: null,
    meterMachineCodeNew: null,
    meterIotCode: null,
    meterIotCodeNew: null,
    meterPeoples: null,
    meterPeoplesNew: null
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
  const defaultCustomerStatusNewOptions=[
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
  const defaultCustomerPaymentMethodNewOptions=[
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
  const defaultInvoiceTypeNewOptions=[
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
  const defaultMeterTypeNewOptions=[
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
  
  export default {
    name: 'tenantCustomerMeterChangeLogList',
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
        customerStatusOptions: Object.assign({},defaultCustomerStatusOptions),
        customerStatusNewOptions: Object.assign({},defaultCustomerStatusNewOptions),
        customerPaymentMethodOptions: Object.assign({},defaultCustomerPaymentMethodOptions),
        customerPaymentMethodNewOptions: Object.assign({},defaultCustomerPaymentMethodNewOptions),
        invoiceTypeOptions: Object.assign({},defaultInvoiceTypeOptions),
        invoiceTypeNewOptions: Object.assign({},defaultInvoiceTypeNewOptions),
        meterTypeOptions: Object.assign({},defaultMeterTypeOptions),
        meterTypeNewOptions: Object.assign({},defaultMeterTypeNewOptions),
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
      formatMoney(money){
        // 指定货币符号、保留小数位、千位间隔符
        return accounting.formatMoney(money,'',2,'');
      },
      formatCustomerStatus(customerStatus){
        for(let i=0;i<defaultCustomerStatusOptions.length;i++){
          if(customerStatus===defaultCustomerStatusOptions[i].value){
            return defaultCustomerStatusOptions[i].label;
          }
        }
      },
      formatCustomerStatusNew(customerStatusNew){
        for(let i=0;i<defaultCustomerStatusNewOptions.length;i++){
          if(customerStatusNew===defaultCustomerStatusNewOptions[i].value){
            return defaultCustomerStatusNewOptions[i].label;
          }
        }
      },
      formatCustomerPaymentMethod(customerPaymentMethod){
        for(let i=0;i<defaultCustomerPaymentMethodOptions.length;i++){
          if(customerPaymentMethod===defaultCustomerPaymentMethodOptions[i].value){
            return defaultCustomerPaymentMethodOptions[i].label;
          }
        }
      },
      formatCustomerPaymentMethodNew(customerPaymentMethodNew){
        for(let i=0;i<defaultCustomerPaymentMethodNewOptions.length;i++){
          if(customerPaymentMethodNew===defaultCustomerPaymentMethodNewOptions[i].value){
            return defaultCustomerPaymentMethodNewOptions[i].label;
          }
        }
      },
      formatInvoiceType(invoiceType){
        for(let i=0;i<defaultInvoiceTypeOptions.length;i++){
          if(invoiceType===defaultInvoiceTypeOptions[i].value){
            return defaultInvoiceTypeOptions[i].label;
          }
        }
      },
      formatInvoiceTypeNew(invoiceTypeNew){
        for(let i=0;i<defaultInvoiceTypeNewOptions.length;i++){
          if(invoiceTypeNew===defaultInvoiceTypeNewOptions[i].value){
            return defaultInvoiceTypeNewOptions[i].label;
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
      formatMeterTypeNew(meterTypeNew){
        for(let i=0;i<defaultMeterTypeNewOptions.length;i++){
          if(meterTypeNew===defaultMeterTypeNewOptions[i].value){
            return defaultMeterTypeNewOptions[i].label;
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
        this.$router.push({path: '/saas/viewTenantCustomerMeterChangeLog', query: {id: row.id, tenantId:this.tenantId}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/saas/updateTenantCustomerMeterChangeLog', query: {id: row.id, tenantId:this.tenantId}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该信息变更', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTenantCustomerMeterChangeLog(row.id).then(response => {
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
      searchTenantCustomerMeterChangeLogList() {
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
      addTenantCustomerMeterChangeLog() {
        this.$router.push({path: '/saas/addTenantCustomerMeterChangeLog', query: {tenantId:this.tenantId}})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


