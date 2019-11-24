<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchCustInfoChangeList()"
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
            <el-form-item label="系统编号：">
              <el-input style="width: 203px" v-model="listQuery.id" placeholder="系统编号"></el-input>
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
            <el-form-item label="用户编号：">
              <el-input style="width: 203px" v-model="listQuery.custId" placeholder="用户编号"></el-input>
            </el-form-item>
            <el-form-item label="变更日期：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.changeDateStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.changeDateEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="变更人：">
              <el-input style="width: 203px" v-model="listQuery.changer" placeholder="变更人"></el-input>
            </el-form-item>
            <el-form-item label="用户信息变更：">
              <el-select v-model="listQuery.baseChange" placeholder="全部" clearable>
                <el-option
                  v-for="item in baseChangeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开票信息变更：">
              <el-select v-model="listQuery.billChange" placeholder="全部" clearable>
                <el-option
                  v-for="item in billChangeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户状态变更：">
              <el-select v-model="listQuery.statusChange" placeholder="全部" clearable>
                <el-option
                  v-for="item in statusChangeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户名称：">
              <el-input style="width: 203px" v-model="listQuery.custName" placeholder="用户名称"></el-input>
            </el-form-item>
            <el-form-item label="变更前用户名称：">
              <el-input style="width: 203px" v-model="listQuery.custNameHis" placeholder="变更前用户名称"></el-input>
            </el-form-item>
            <el-form-item label="用户地址：">
              <el-input style="width: 203px" v-model="listQuery.custAddress" placeholder="用户地址"></el-input>
            </el-form-item>
            <el-form-item label="变更前用户地址：">
              <el-input style="width: 203px" v-model="listQuery.custAddressHis" placeholder="变更前用户地址"></el-input>
            </el-form-item>
            <el-form-item label="用户类别编号：">
              <el-input style="width: 203px" v-model="listQuery.custTypeId" placeholder="用户类别编号"></el-input>
            </el-form-item>
            <el-form-item label="变更前用户类别编号：">
              <el-input style="width: 203px" v-model="listQuery.custTypeIdHis" placeholder="变更前用户类别编号"></el-input>
            </el-form-item>
            <el-form-item label="立户日期：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.custRegistDateStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.custRegistDateEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="变更前立户日期：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.custRegistDateHisStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.custRegistDateHisEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="用户状态：">
              <el-select v-model="listQuery.custStatus" placeholder="全部" clearable>
                <el-option
                  v-for="item in custStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="变更前用户状态：">
              <el-select v-model="listQuery.custStatusHis" placeholder="全部" clearable>
                <el-option
                  v-for="item in custStatusHisOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收费方式：">
              <el-select v-model="listQuery.payType" placeholder="全部" clearable>
                <el-option
                  v-for="item in payTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="变更前收费方式：">
              <el-select v-model="listQuery.payTypeHis" placeholder="全部" clearable>
                <el-option
                  v-for="item in payTypeHisOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开票类别：">
              <el-select v-model="listQuery.billType" placeholder="全部" clearable>
                <el-option
                  v-for="item in billTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="变更前开票类别：">
              <el-select v-model="listQuery.billTypeHis" placeholder="全部" clearable>
                <el-option
                  v-for="item in billTypeHisOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开票名称：">
              <el-input style="width: 203px" v-model="listQuery.billName" placeholder="开票名称"></el-input>
            </el-form-item>
            <el-form-item label="变更前开票名称：">
              <el-input style="width: 203px" v-model="listQuery.billNameHis" placeholder="变更前开票名称"></el-input>
            </el-form-item>
            <el-form-item label="税号：">
              <el-input style="width: 203px" v-model="listQuery.billTaxnum" placeholder="税号"></el-input>
            </el-form-item>
            <el-form-item label="变更前税号：">
              <el-input style="width: 203px" v-model="listQuery.billTaxnumHis" placeholder="变更前税号"></el-input>
            </el-form-item>
            <el-form-item label="开票地址：">
              <el-input style="width: 203px" v-model="listQuery.billAddress" placeholder="开票地址"></el-input>
            </el-form-item>
            <el-form-item label="变更前开票地址：">
              <el-input style="width: 203px" v-model="listQuery.billAddressHis" placeholder="变更前开票地址"></el-input>
            </el-form-item>
            <el-form-item label="开票电话：">
              <el-input style="width: 203px" v-model="listQuery.billTel" placeholder="开票电话"></el-input>
            </el-form-item>
            <el-form-item label="变更前开票电话：">
              <el-input style="width: 203px" v-model="listQuery.billTelHis" placeholder="变更前开票电话"></el-input>
            </el-form-item>
            <el-form-item label="银行名称：">
              <el-input style="width: 203px" v-model="listQuery.billBank" placeholder="银行名称"></el-input>
            </el-form-item>
            <el-form-item label="变更前银行名称：">
              <el-input style="width: 203px" v-model="listQuery.billBankHis" placeholder="变更前银行名称"></el-input>
            </el-form-item>
            <el-form-item label="开户行行号：">
              <el-input style="width: 203px" v-model="listQuery.billBankId" placeholder="开户行行号"></el-input>
            </el-form-item>
            <el-form-item label="变更前开户行行号：">
              <el-input style="width: 203px" v-model="listQuery.billBankIdHis" placeholder="变更前开户行行号"></el-input>
            </el-form-item>
            <el-form-item label="开户行名称：">
              <el-input style="width: 203px" v-model="listQuery.billBankName" placeholder="开户行名称"></el-input>
            </el-form-item>
            <el-form-item label="变更前开户行名称：">
              <el-input style="width: 203px" v-model="listQuery.billBankNameHis" placeholder="变更前开户行名称"></el-input>
            </el-form-item>
            <el-form-item label="开户行账号：">
              <el-input style="width: 203px" v-model="listQuery.billBankAccount" placeholder="开户行账号"></el-input>
            </el-form-item>
            <el-form-item label="变更前开户行账号：">
              <el-input style="width: 203px" v-model="listQuery.billBankAccountHis" placeholder="变更前开户行账号"></el-input>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addCustInfoChange()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="custInfoChangeTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="系统编号" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="租户" width="280" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantName}}</template>
        </el-table-column>
        <el-table-column label="用户编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.custId}}</template>
        </el-table-column>
        <el-table-column label="变更日期" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.changeDate | formatDate}}</template>
        </el-table-column>
        <el-table-column label="变更人" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.changer}}</template>
        </el-table-column>
        <el-table-column label="用户信息变更" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.baseChange | formatBaseChange}}</template>
        </el-table-column>
        <el-table-column label="开票信息变更" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billChange | formatBillChange}}</template>
        </el-table-column>
        <el-table-column label="用户状态变更" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.statusChange | formatStatusChange}}</template>
        </el-table-column>
        <el-table-column label="用户名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.custName}}</template>
        </el-table-column>
        <el-table-column label="变更前用户名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.custNameHis}}</template>
        </el-table-column>
        <el-table-column label="用户地址" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.custAddress}}</template>
        </el-table-column>
        <el-table-column label="变更前用户地址" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.custAddressHis}}</template>
        </el-table-column>
        <el-table-column label="用户类别编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.custTypeId}}</template>
        </el-table-column>
        <el-table-column label="变更前用户类别编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.custTypeIdHis}}</template>
        </el-table-column>
        <el-table-column label="立户日期" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.custRegistDate | formatDate}}</template>
        </el-table-column>
        <el-table-column label="变更前立户日期" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.custRegistDateHis | formatDate}}</template>
        </el-table-column>
        <el-table-column label="用户状态" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.custStatus | formatCustStatus}}</template>
        </el-table-column>
        <el-table-column label="变更前用户状态" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.custStatusHis | formatCustStatusHis}}</template>
        </el-table-column>
        <el-table-column label="收费方式" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.payType | formatPayType}}</template>
        </el-table-column>
        <el-table-column label="变更前收费方式" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.payTypeHis | formatPayTypeHis}}</template>
        </el-table-column>
        <el-table-column label="开票类别" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billType | formatBillType}}</template>
        </el-table-column>
        <el-table-column label="变更前开票类别" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billTypeHis | formatBillTypeHis}}</template>
        </el-table-column>
        <el-table-column label="开票名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billName}}</template>
        </el-table-column>
        <el-table-column label="变更前开票名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billNameHis}}</template>
        </el-table-column>
        <el-table-column label="税号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billTaxnum}}</template>
        </el-table-column>
        <el-table-column label="变更前税号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billTaxnumHis}}</template>
        </el-table-column>
        <el-table-column label="开票地址" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billAddress}}</template>
        </el-table-column>
        <el-table-column label="变更前开票地址" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billAddressHis}}</template>
        </el-table-column>
        <el-table-column label="开票电话" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billTel}}</template>
        </el-table-column>
        <el-table-column label="变更前开票电话" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billTelHis}}</template>
        </el-table-column>
        <el-table-column label="银行名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billBank}}</template>
        </el-table-column>
        <el-table-column label="变更前银行名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billBankHis}}</template>
        </el-table-column>
        <el-table-column label="开户行行号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billBankId}}</template>
        </el-table-column>
        <el-table-column label="变更前开户行行号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billBankIdHis}}</template>
        </el-table-column>
        <el-table-column label="开户行名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billBankName}}</template>
        </el-table-column>
        <el-table-column label="变更前开户行名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billBankNameHis}}</template>
        </el-table-column>
        <el-table-column label="开户行账号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billBankAccount}}</template>
        </el-table-column>
        <el-table-column label="变更前开户行账号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.billBankAccountHis}}</template>
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
  import {fetchList, deleteCustInfoChange} from '@/api/custInfoChange'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    custId: null,
    changeDate: null,
    changeDateStart: null,
    changeDateEnd: null,
    changer: null,
    baseChange: null,
    billChange: null,
    statusChange: null,
    custName: null,
    custNameHis: null,
    custAddress: null,
    custAddressHis: null,
    custTypeId: null,
    custTypeIdHis: null,
    custRegistDate: null,
    custRegistDateStart: null,
    custRegistDateEnd: null,
    custRegistDateHis: null,
    custRegistDateHisStart: null,
    custRegistDateHisEnd: null,
    custStatus: null,
    custStatusHis: null,
    payType: null,
    payTypeHis: null,
    billType: null,
    billTypeHis: null,
    billName: null,
    billNameHis: null,
    billTaxnum: null,
    billTaxnumHis: null,
    billAddress: null,
    billAddressHis: null,
    billTel: null,
    billTelHis: null,
    billBank: null,
    billBankHis: null,
    billBankId: null,
    billBankIdHis: null,
    billBankName: null,
    billBankNameHis: null,
    billBankAccount: null,
    billBankAccountHis: null
  };
  const defaultBaseChangeOptions=[
    {
      value: 1,
      label: '是'
    },
    {
      value: 0,
      label: '否'
    }
  ];
  const defaultBillChangeOptions=[
    {
      value: 1,
      label: '是'
    },
    {
      value: 0,
      label: '否'
    }
  ];
  const defaultStatusChangeOptions=[
    {
      value: 1,
      label: '是'
    },
    {
      value: 0,
      label: '否'
    }
  ];
  const defaultCustStatusOptions=[
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
  const defaultCustStatusHisOptions=[
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
  const defaultPayTypeOptions=[
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
  const defaultPayTypeHisOptions=[
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
  const defaultBillTypeOptions=[
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
  const defaultBillTypeHisOptions=[
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
    name: 'custInfoChangeList',
    data() {
      return {
        operates: [
        ],
        operateType: null,
        listQuery:Object.assign({},defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        baseChangeOptions: Object.assign({},defaultBaseChangeOptions),
        billChangeOptions: Object.assign({},defaultBillChangeOptions),
        statusChangeOptions: Object.assign({},defaultStatusChangeOptions),
        custStatusOptions: Object.assign({},defaultCustStatusOptions),
        custStatusHisOptions: Object.assign({},defaultCustStatusHisOptions),
        payTypeOptions: Object.assign({},defaultPayTypeOptions),
        payTypeHisOptions: Object.assign({},defaultPayTypeHisOptions),
        billTypeOptions: Object.assign({},defaultBillTypeOptions),
        billTypeHisOptions: Object.assign({},defaultBillTypeHisOptions),
        tenantInfoOptions:[],
        multipleSelection: []
      }
    },
    created() {
      this.getList();
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
      formatBaseChange(baseChange){
        for(let i=0;i<defaultBaseChangeOptions.length;i++){
          if(baseChange===defaultBaseChangeOptions[i].value){
            return defaultBaseChangeOptions[i].label;
          }
        }
      },
      formatBillChange(billChange){
        for(let i=0;i<defaultBillChangeOptions.length;i++){
          if(billChange===defaultBillChangeOptions[i].value){
            return defaultBillChangeOptions[i].label;
          }
        }
      },
      formatStatusChange(statusChange){
        for(let i=0;i<defaultStatusChangeOptions.length;i++){
          if(statusChange===defaultStatusChangeOptions[i].value){
            return defaultStatusChangeOptions[i].label;
          }
        }
      },
      formatCustStatus(custStatus){
        for(let i=0;i<defaultCustStatusOptions.length;i++){
          if(custStatus===defaultCustStatusOptions[i].value){
            return defaultCustStatusOptions[i].label;
          }
        }
      },
      formatCustStatusHis(custStatusHis){
        for(let i=0;i<defaultCustStatusHisOptions.length;i++){
          if(custStatusHis===defaultCustStatusHisOptions[i].value){
            return defaultCustStatusHisOptions[i].label;
          }
        }
      },
      formatPayType(payType){
        for(let i=0;i<defaultPayTypeOptions.length;i++){
          if(payType===defaultPayTypeOptions[i].value){
            return defaultPayTypeOptions[i].label;
          }
        }
      },
      formatPayTypeHis(payTypeHis){
        for(let i=0;i<defaultPayTypeHisOptions.length;i++){
          if(payTypeHis===defaultPayTypeHisOptions[i].value){
            return defaultPayTypeHisOptions[i].label;
          }
        }
      },
      formatBillType(billType){
        for(let i=0;i<defaultBillTypeOptions.length;i++){
          if(billType===defaultBillTypeOptions[i].value){
            return defaultBillTypeOptions[i].label;
          }
        }
      },
      formatBillTypeHis(billTypeHis){
        for(let i=0;i<defaultBillTypeHisOptions.length;i++){
          if(billTypeHis===defaultBillTypeHisOptions[i].value){
            return defaultBillTypeHisOptions[i].label;
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
        this.$router.push({path: '/cust/updateCustInfoChange', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该用户变更', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteCustInfoChange(row.id).then(response => {
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
      searchCustInfoChangeList() {
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
      addCustInfoChange() {
        this.$router.push({path: '/cust/addCustInfoChange'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


