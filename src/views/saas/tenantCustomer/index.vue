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
                      v-loading="tenantReceivableListLoading"
                      border
            >
              <el-table-column type="selection" width="60" align="center"></el-table-column>
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
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已缴账单" name="paid">配置管理</el-tab-pane>
        <el-tab-pane label="缴费历史" name="payment">缴费历史</el-tab-pane>
        <el-tab-pane label="抄表计划" name="read">
          <div class="table-container">
            <el-table ref="tenantMeterReadLogCurrentTable"
                      :data="tenantMeterReadLogCurrentList"
                      style="width: 100%"
                      v-loading="tenantMeterReadLogCurrentListLoading"
                      border
            >
              <el-table-column label="抄表计划" width="180" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.id}}</template>
              </el-table-column>
              <el-table-column label="租户ID" width="280" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.tenantName}}</template>
              </el-table-column>
              <el-table-column label="结算月份" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.readMonth | formatDate}}</template>
              </el-table-column>
              <el-table-column label="水表ID" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.meterId}}</template>
              </el-table-column>
              <el-table-column label="结算前水表当年累计水量" width="100" align="right" header-align="center">
                <template slot-scope="scope">{{scope.row.meterYearTotalWatersBefore | formatMoney}}</template>
              </el-table-column>
              <el-table-column label="结算开始时间" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.settleStartTime}}</template>
              </el-table-column>
              <el-table-column label="结算开始指针" width="100" align="right" header-align="center">
                <template slot-scope="scope">{{scope.row.settleStartPointer | formatMoney}}</template>
              </el-table-column>
              <el-table-column label="本次抄表时间" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.currentReadTime | formatTime}}</template>
              </el-table-column>
              <el-table-column label="本次抄表指针" width="100" align="right" header-align="center">
                <template slot-scope="scope">{{scope.row.currentReadPointer | formatMoney}}</template>
              </el-table-column>
              <el-table-column label="抄表员ID" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.readEmployeeId}}</template>
              </el-table-column>
              <el-table-column label="表次抄表状况" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.meterStatusId}}</template>
              </el-table-column>
              <el-table-column label="应结算水量" width="100" align="right" header-align="center">
                <template slot-scope="scope">{{scope.row.settleWaters | formatMoney}}</template>
              </el-table-column>
              <el-table-column label="应收水量" width="100" align="right" header-align="center">
                <template slot-scope="scope">{{scope.row.receivableWaters | formatMoney}}</template>
              </el-table-column>
              <el-table-column label="抄表来源" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.readSource | formatReadSource}}</template>
              </el-table-column>
              <el-table-column label="抄表状态" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.readStatus | formatReadStatus}}</template>
              </el-table-column>
              <el-table-column label="检查结果" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.checkResult | formatCheckResult}}</template>
              </el-table-column>
              <el-table-column label="处理结果" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.processReault | formatProcessReault}}</template>
              </el-table-column>
              <el-table-column label="处理人" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.processEmployeeId}}</template>
              </el-table-column>
              <el-table-column label="处理时间" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.processTime | formatTime}}</template>
              </el-table-column>
              <el-table-column label="处理方式" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.processType | formatProcessType}}</template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="用户变更记录" name="change">
          <div class="table-container">
            <el-table ref="tenantCustomerMeterChangeLogTable"
                      :data="tenantCustomerMeterChangeLogList"
                      style="width: 100%"
                      v-loading="tenantCustomerMeterChangeLogListLoading"
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
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="水表信息" name="meter">
          <div class="table-container">
            <el-table ref="tenantMeterTable"
                      :data="tenantMeterList"
                      style="width: 100%"
                      v-loading="tenantMeterListLoading"
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
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="联系人" name="linkman">
          <div class="table-container">
            <el-table ref="tenantCustomerLinkmanTable"
                      :data="tenantCustomerLinkmanList"
                      style="width: 100%"
                      v-loading="tenantCustomerLinkmanListLoading"
                      border
            >
              <el-table-column label="联系人ID" width="180" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.id}}</template>
              </el-table-column>
              <el-table-column label="租户ID" width="280" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.tenantName}}</template>
              </el-table-column>
              <el-table-column label="客户ID" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.customerId}}</template>
              </el-table-column>
              <el-table-column label="联系人姓名" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.linkmanName}}</template>
              </el-table-column>
              <el-table-column label="联系人地址" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.linkmanAddress}}</template>
              </el-table-column>
              <el-table-column label="主联系人" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.linkmanMainOn | formatLinkmanMainOn}}</template>
              </el-table-column>
              <el-table-column label="性别" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.linkmanSex | formatLinkmanSex}}</template>
              </el-table-column>
              <el-table-column label="出生日期" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.linkmanBirthday | formatDate}}</template>
              </el-table-column>
              <el-table-column label="手机号码" width="120" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.linkmanMobile}}</template>
              </el-table-column>
              <el-table-column label="固定电话号码" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.linkmanTel}}</template>
              </el-table-column>
              <el-table-column label="邮箱地址" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.linkmanEmail}}</template>
              </el-table-column>
              <el-table-column label="微信号" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.linkmanPersonalWx}}</template>
              </el-table-column>
              <el-table-column label="QQ号" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.linkmanQq}}</template>
              </el-table-column>
              <el-table-column label="备注" width="100" align="left" header-align="center">
                <template slot-scope="scope">{{scope.row.linkmanRemark}}</template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>  
</template>
<script>
  import {fetchList, getTenantCustomer, deleteTenantCustomer} from '@/api/tenantCustomer'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {fetchList as fetchTenantReceivableList} from '@/api/tenantReceivable';
  import {fetchList as fetchTenantCustomerLinkmanList} from '@/api/tenantCustomerLinkman';
  import {fetchList as fetchTenantMeterList} from '@/api/tenantMeter';
  import {fetchList as fetchTenantCustomerMeterChangeLogList} from '@/api/tenantCustomerMeterChangeLog';
  import {fetchList as fetchTenantMeterReadLogCurrentList} from '@/api/tenantMeterReadLogCurrent';
  import {formatDate} from '@/utils/date';
  import accounting from 'accounting';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 500,
    keyword:"c",
    tenantId:null
  };
  const defaultTabListQuery = {
    pageNum: 1,
    pageSize: 500,
    customerId:null,
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
        listTabQuery:Object.assign({},defaultTabListQuery,this.$route.query),
        customerStatusOptions: Object.assign({},defaultCustomerStatusOptions),
        customerPaymentMethodOptions: Object.assign({},defaultCustomerPaymentMethodOptions),
        invoiceTypeOptions: Object.assign({},defaultInvoiceTypeOptions),
        list: null,
        tenantReceivableList:null,
        tenantCustomerLinkmanList:null,
        tenantCustomerMeterChangeLogList:null,
        tenantMeterReadLogCurrentList:null,
        tenantMeterList:null,
        total: null,
        listLoading: true, 
        tenantReceivableListLoading:true,
        tenantCustomerLinkmanListLoading:true,
        tenantMeterListLoading:true, 
        tenantCustomerMeterChangeLogListLoading:true,
        tenantMeterReadLogCurrentListLoading:true,      
        multipleSelection: []
      }
    },
    created() {
      //页面初始化不加载数据列表
      //this.getList();
      this.listLoading = false;
      this.tenantReceivableListLoading = false;
      this.tenantCustomerLinkmanListLoading = false;
      this.tenantMeterListLoading = false;
      this.tenantCustomerMeterChangeLogListLoading = false;
      this.tenantMeterReadLogCurrentListLoading = false;   
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
        //加载用户信息
        getTenantCustomer(id).then(response => {
          this.tenantCustomer = response.data;
        });
        //加载欠费信息
        this.tenantReceivableListLoading = true;
        fetchTenantReceivableList(Object.assign(this.listTabQuery,{"customerId":id})).then(response => {
          this.tenantReceivableListLoading = false;
          this.tenantReceivableList = response.data.list;
        });

        //加载抄表计划信息
        this.tenantMeterReadLogCurrentListLoading = true;
        fetchTenantMeterReadLogCurrentList(Object.assign(this.listTabQuery,{"customerId":id})).then(response => {
          this.tenantMeterReadLogCurrentListLoading = false;
          this.tenantMeterReadLogCurrentList = response.data.list;
        });

        //加载用户变更记录信息
        this.tenantCustomerMeterChangeLogListLoading = true;
        fetchTenantCustomerMeterChangeLogList(Object.assign(this.listTabQuery,{"customerId":id})).then(response => {
          this.tenantCustomerMeterChangeLogListLoading = false;
          this.tenantCustomerMeterChangeLogList = response.data.list;
        });

        //加载水表信息
        this.tenantMeterListLoading = true;
        fetchTenantMeterList(Object.assign(this.listTabQuery,{"customerId":id})).then(response => {
          this.tenantMeterListLoading = false;
          this.tenantMeterList = response.data.list;
        });

        //加载联系人信息
        this.tenantCustomerLinkmanListLoading = true;
        fetchTenantCustomerLinkmanList(Object.assign(this.listTabQuery,{"customerId":id})).then(response => {
          this.tenantCustomerLinkmanListLoading = false;
          this.tenantCustomerLinkmanList = response.data.list;
        });
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


