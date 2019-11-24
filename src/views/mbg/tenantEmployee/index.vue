<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchTenantEmployeeList()"
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
            <el-form-item label="员工名称：">
              <el-input style="width: 203px" v-model="listQuery.empName" placeholder="员工名称"></el-input>
            </el-form-item>
            <el-form-item label="登录密码：">
              <el-input style="width: 203px" v-model="listQuery.empPassword" placeholder="登录密码"></el-input>
            </el-form-item>
            <el-form-item label="员工部门：">
              <el-input style="width: 203px" v-model="listQuery.deptId" placeholder="员工部门"></el-input>
            </el-form-item>
            <el-form-item label="可登录系统：">
              <el-select v-model="listQuery.loginOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in loginOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="员工状态：">
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
            <el-form-item label="员工个人微信号：">
              <el-input style="width: 203px" v-model="listQuery.empPersonalWx" placeholder="员工个人微信号"></el-input>
            </el-form-item>
            <el-form-item label="员工企业微信号：">
              <el-input style="width: 203px" v-model="listQuery.empEnterpriceWx" placeholder="员工企业微信号"></el-input>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addTenantEmployee()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="tenantEmployeeTable"
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
        <el-table-column label="员工名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.empName}}</template>
        </el-table-column>
        <el-table-column label="登录密码" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.empPassword}}</template>
        </el-table-column>
        <el-table-column label="员工部门" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.deptId}}</template>
        </el-table-column>
        <el-table-column label="可登录系统" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.loginOn | formatLoginOn}}</template>
        </el-table-column>
        <el-table-column label="员工状态" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.empStatus | formatEmpStatus}}</template>
        </el-table-column>
        <el-table-column label="员工手机号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.empMobile}}</template>
        </el-table-column>
        <el-table-column label="员工邮箱" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.empEmail}}</template>
        </el-table-column>
        <el-table-column label="员工个人微信号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.empPersonalWx}}</template>
        </el-table-column>
        <el-table-column label="员工企业微信号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.empEnterpriceWx}}</template>
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
  import {fetchList, deleteTenantEmployee} from '@/api/tenantEmployee'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    empName: null,
    empPassword: null,
    deptId: null,
    loginOn: null,
    empStatus: null,
    empMobile: null,
    empEmail: null,
    empPersonalWx: null,
    empEnterpriceWx: null
  };
  const defaultLoginOnOptions=[
    {
      value: 1,
      label: '可登录'
    },
    {
      value: 0,
      label: '不能登录'
    }
  ];
  const defaultEmpStatusOptions=[
    {
      value: 1,
      label: '在职'
    },
    {
      value: 2,
      label: '离职'
    },
    {
      value: 3,
      label: '禁用'
    }
  ];
  
  export default {
    name: 'tenantEmployeeList',
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
        tenantInfoOptions:[],
        multipleSelection: []
      }
    },
    created() {
      this.getList();
      this.getTenantInfoList();
    },
    filters:{
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
        this.$router.push({path: '/mbg/updateTenantEmployee', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该租户员工', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTenantEmployee(row.id).then(response => {
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
      searchTenantEmployeeList() {
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
      addTenantEmployee() {
        this.$router.push({path: '/mbg/addTenantEmployee'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


