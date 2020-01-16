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
            <el-form-item label="员工ID：">
              <el-input style="width: 203px" v-model="listQuery.id" placeholder="员工ID"></el-input>
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
            <el-form-item label="员工名称：">
              <el-input style="width: 203px" v-model="listQuery.employeeName" placeholder="员工名称"></el-input>
            </el-form-item>
            <el-form-item label="登录密码：">
              <el-input style="width: 203px" v-model="listQuery.employeePassword" placeholder="登录密码"></el-input>
            </el-form-item>
            <el-form-item label="员工所属部门ID：">
              <el-input style="width: 203px" v-model="listQuery.employeeDepartmentId" placeholder="员工所属部门ID"></el-input>
            </el-form-item>
            <el-form-item label="可登录系统：">
              <el-select v-model="listQuery.employeeLoginOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in employeeLoginOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="员工状态：">
              <el-select v-model="listQuery.employeeStatus" placeholder="全部" clearable>
                <el-option
                  v-for="item in employeeStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="员工手机号：">
              <el-input style="width: 203px" v-model="listQuery.employeeMobile" placeholder="员工手机号"></el-input>
            </el-form-item>
            <el-form-item label="员工邮箱：">
              <el-input style="width: 203px" v-model="listQuery.employeeEmail" placeholder="员工邮箱"></el-input>
            </el-form-item>
            <el-form-item label="员工个人微信号：">
              <el-input style="width: 203px" v-model="listQuery.employeePersonalWx" placeholder="员工个人微信号"></el-input>
            </el-form-item>
            <el-form-item label="员工企业微信号：">
              <el-input style="width: 203px" v-model="listQuery.employeeEnterpriceWx" placeholder="员工企业微信号"></el-input>
            </el-form-item>
            <el-form-item label="钉钉号：">
              <el-input style="width: 203px" v-model="listQuery.employeeDingding" placeholder="钉钉号"></el-input>
            </el-form-item>
            <el-form-item label="操作员创建类型：">
              <el-select v-model="listQuery.employeeCreateType" placeholder="全部" clearable>
                <el-option
                  v-for="item in employeeCreateTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
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
                border
      >
        <el-table-column label="员工ID" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="租户ID" width="280" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantName}}</template>
        </el-table-column>
        <el-table-column label="员工名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.employeeName}}</template>
        </el-table-column>
        <el-table-column label="登录密码" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.employeePassword}}</template>
        </el-table-column>
        <el-table-column label="员工所属部门ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.employeeDepartmentId}}</template>
        </el-table-column>
        <el-table-column label="可登录系统" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.employeeLoginOn | formatEmployeeLoginOn}}</template>
        </el-table-column>
        <el-table-column label="员工状态" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.employeeStatus | formatEmployeeStatus}}</template>
        </el-table-column>
        <el-table-column label="员工手机号" width="120" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.employeeMobile}}</template>
        </el-table-column>
        <el-table-column label="员工邮箱" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.employeeEmail}}</template>
        </el-table-column>
        <el-table-column label="员工个人微信号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.employeePersonalWx}}</template>
        </el-table-column>
        <el-table-column label="员工企业微信号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.employeeEnterpriceWx}}</template>
        </el-table-column>
        <el-table-column label="钉钉号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.employeeDingding}}</template>
        </el-table-column>
        <el-table-column label="操作员创建类型" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.employeeCreateType | formatEmployeeCreateType}}</template>
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
  import {fetchList, deleteTenantEmployee} from '@/api/tenantEmployee'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    employeeName: null,
    employeePassword: null,
    employeeDepartmentId: null,
    employeeLoginOn: null,
    employeeStatus: null,
    employeeMobile: null,
    employeeEmail: null,
    employeePersonalWx: null,
    employeeEnterpriceWx: null,
    employeeDingding: null,
    employeeCreateType: null
  };
  const defaultEmployeeLoginOnOptions=[
    {
      value: 1,
      label: '可登录'
    },
    {
      value: 0,
      label: '不能登录'
    }
  ];
  const defaultEmployeeStatusOptions=[
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
  const defaultEmployeeCreateTypeOptions=[
    {
      value: 1,
      label: '平台默认创建'
    },
    {
      value: 2,
      label: '租户自建'
    }
  ];
  
  export default {
    name: 'tenantEmployeeList',
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
        employeeLoginOnOptions: Object.assign({},defaultEmployeeLoginOnOptions),
        employeeStatusOptions: Object.assign({},defaultEmployeeStatusOptions),
        employeeCreateTypeOptions: Object.assign({},defaultEmployeeCreateTypeOptions),
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
      formatEmployeeLoginOn(employeeLoginOn){
        for(let i=0;i<defaultEmployeeLoginOnOptions.length;i++){
          if(employeeLoginOn===defaultEmployeeLoginOnOptions[i].value){
            return defaultEmployeeLoginOnOptions[i].label;
          }
        }
      },
      formatEmployeeStatus(employeeStatus){
        for(let i=0;i<defaultEmployeeStatusOptions.length;i++){
          if(employeeStatus===defaultEmployeeStatusOptions[i].value){
            return defaultEmployeeStatusOptions[i].label;
          }
        }
      },
      formatEmployeeCreateType(employeeCreateType){
        for(let i=0;i<defaultEmployeeCreateTypeOptions.length;i++){
          if(employeeCreateType===defaultEmployeeCreateTypeOptions[i].value){
            return defaultEmployeeCreateTypeOptions[i].label;
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
        this.$router.push({path: '/saas/viewTenantEmployee', query: {id: row.id, tenantId:this.tenantId}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/saas/updateTenantEmployee', query: {id: row.id, tenantId:this.tenantId}})
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
        this.$router.push({path: '/saas/addTenantEmployee', query: {tenantId:this.tenantId}})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


