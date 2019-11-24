<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchCustContactList()"
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
            <el-form-item label="联系人姓名：">
              <el-input style="width: 203px" v-model="listQuery.contactName" placeholder="联系人姓名"></el-input>
            </el-form-item>
            <el-form-item label="主联系人：">
              <el-select v-model="listQuery.mainOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in mainOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="性别：">
              <el-select v-model="listQuery.gender" placeholder="全部" clearable>
                <el-option
                  v-for="item in genderOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生日：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.birthdayStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.birthdayEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="手机号码：">
              <el-input style="width: 203px" v-model="listQuery.mobile" placeholder="手机号码"></el-input>
            </el-form-item>
            <el-form-item label="固定电话号码：">
              <el-input style="width: 203px" v-model="listQuery.tel" placeholder="固定电话号码"></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址：">
              <el-input style="width: 203px" v-model="listQuery.email" placeholder="邮箱地址"></el-input>
            </el-form-item>
            <el-form-item label="微信号：">
              <el-input style="width: 203px" v-model="listQuery.personalWx" placeholder="微信号"></el-input>
            </el-form-item>
            <el-form-item label="QQ号：">
              <el-input style="width: 203px" v-model="listQuery.qq" placeholder="QQ号"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input style="width: 203px" v-model="listQuery.remark" placeholder="备注"></el-input>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addCustContact()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="custContactTable"
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
        <el-table-column label="联系人姓名" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.contactName}}</template>
        </el-table-column>
        <el-table-column label="主联系人" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.mainOn | formatMainOn}}</template>
        </el-table-column>
        <el-table-column label="性别" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.gender | formatGender}}</template>
        </el-table-column>
        <el-table-column label="生日" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.birthday | formatDate}}</template>
        </el-table-column>
        <el-table-column label="手机号码" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.mobile}}</template>
        </el-table-column>
        <el-table-column label="固定电话号码" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tel}}</template>
        </el-table-column>
        <el-table-column label="邮箱地址" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.email}}</template>
        </el-table-column>
        <el-table-column label="微信号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.personalWx}}</template>
        </el-table-column>
        <el-table-column label="QQ号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.qq}}</template>
        </el-table-column>
        <el-table-column label="备注" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.remark}}</template>
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
  import {fetchList, deleteCustContact} from '@/api/custContact'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    custId: null,
    contactName: null,
    mainOn: null,
    gender: null,
    birthday: null,
    birthdayStart: null,
    birthdayEnd: null,
    mobile: null,
    tel: null,
    email: null,
    personalWx: null,
    qq: null,
    remark: null
  };
  const defaultMainOnOptions=[
    {
      value: 1,
      label: '是'
    },
    {
      value: 0,
      label: '否'
    }
  ];
  const defaultGenderOptions=[
    {
      value: 1,
      label: '男'
    },
    {
      value: 2,
      label: '女'
    }
  ];
  
  export default {
    name: 'custContactList',
    data() {
      return {
        operates: [
        ],
        operateType: null,
        listQuery:Object.assign({},defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        mainOnOptions: Object.assign({},defaultMainOnOptions),
        genderOptions: Object.assign({},defaultGenderOptions),
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
      formatMainOn(mainOn){
        for(let i=0;i<defaultMainOnOptions.length;i++){
          if(mainOn===defaultMainOnOptions[i].value){
            return defaultMainOnOptions[i].label;
          }
        }
      },
      formatGender(gender){
        for(let i=0;i<defaultGenderOptions.length;i++){
          if(gender===defaultGenderOptions[i].value){
            return defaultGenderOptions[i].label;
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
        this.$router.push({path: '/cust/updateCustContact', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该用户联系人', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteCustContact(row.id).then(response => {
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
      searchCustContactList() {
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
      addCustContact() {
        this.$router.push({path: '/cust/addCustContact'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


