<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchEmployeeList()"
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
            <el-form-item label="编号：">
              <el-input style="width: 203px" v-model="listQuery.id" placeholder="编号"></el-input>
            </el-form-item>
            <el-form-item label="名称：">
              <el-input style="width: 203px" v-model="listQuery.empName" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item label="密码：">
              <el-input style="width: 203px" v-model="listQuery.empPassword" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item label="能否登录：">
              <el-select v-model="listQuery.loginOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in loginOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态：">
              <el-select v-model="listQuery.empStatus" placeholder="全部" clearable>
                <el-option
                  v-for="item in empStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="员工手机号：">
              <el-input style="width: 203px" v-model="listQuery.empMobile" placeholder="员工手机号"></el-input>
            </el-form-item>
            <el-form-item label="员工邮箱：">
              <el-input style="width: 203px" v-model="listQuery.empEmail" placeholder="员工邮箱"></el-input>
            </el-form-item>
            <el-form-item label="个人微信：">
              <el-input style="width: 203px" v-model="listQuery.empPersonalWx" placeholder="个人微信"></el-input>
            </el-form-item>
            <el-form-item label="企业微信：">
              <el-input style="width: 203px" v-model="listQuery.empEnterpriceWx" placeholder="企业微信"></el-input>
            </el-form-item>
            <el-form-item label="创建时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.empCreateTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.empCreateTimeEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="更新时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.empUpdateTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.empUpdateTimeEnd"
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
        @click="addEmployee()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="employeeTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="120" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="名称" width="120" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.empName}}</template>
        </el-table-column>
        <el-table-column label="密码" width="120" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.empPassword}}</template>
        </el-table-column>
        <el-table-column label="能否登录" width="100" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.loginOn | formatLoginOn}}</template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.empStatus | formatEmpStatus}}</template>
        </el-table-column>
        <el-table-column label="员工手机号" width="120" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.empMobile}}</template>
        </el-table-column>
        <el-table-column label="员工邮箱" width="120" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.empEmail}}</template>
        </el-table-column>
        <el-table-column label="个人微信" width="120" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.empPersonalWx}}</template>
        </el-table-column>
        <el-table-column label="企业微信" width="120" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.empEnterpriceWx}}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="120" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.empCreateTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="更新时间" width="120" align="center" header-align="center">
          <template slot-scope="scope">{{scope.row.empUpdateTime | formatTime}}</template>
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
  import {fetchList, deleteEmployee} from '@/api/employee'
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    empName: null,
    empPassword: null,
    loginOn: null,
    empStatus: null,
    empMobile: null,
    empEmail: null,
    empPersonalWx: null,
    empEnterpriceWx: null,
    empCreateTime: null,
    empCreateTimeStart: null,
    empCreateTimeEnd: null,
    empUpdateTime: null,
    empUpdateTimeStart: null,
    empUpdateTimeEnd: null
  };
  const defaultLoginOnOptions=[
    {
      value: 0,
      label: '不能登录'
    },
    {
      value: 1,
      label: '可登录'
    }
  ];
  const defaultEmpStatusOptions=[
    {
      value: 0,
      label: '禁用'
    },
    {
      value: 1,
      label: '在职'
    },
    {
      value: 2,
      label: '离职'
    }
  ];
  
  export default {
    name: 'employeeList',
    data() {
      return {
        operates: [
        ],
        operateType: null,
        listQuery:Object.assign({},defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        loginOnOptions: Object.assign({},defaultLoginOnOptions),
        empStatusOptions: Object.assign({},defaultEmpStatusOptions),
        multipleSelection: []
      }
    },
    created() {
      this.getList();
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
      formatLoginOn(loginOn){
        for(let i=0;i<defaultLoginOnOptions.length;i++){
          if(loginOn===defaultLoginOnOptions[i].value){
            return defaultLoginOnOptions[i].label;
          }
        }
      },
      formatEmpStatus(empStatus){
        for(let i=0;i<defaultEmpStatusOptions.length;i++){
          if(empStatus===defaultEmpStatusOptions[i].value){
            return defaultEmpStatusOptions[i].label;
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
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/wms/updateEmployee', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该员工', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteEmployee(row.id).then(response => {
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
      searchEmployeeList() {
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
      addEmployee() {
        this.$router.push({path: '/wms/addEmployee'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


