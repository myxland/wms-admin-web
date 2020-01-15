<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchTenantRoleList()"
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
            <el-form-item label="角色ID：">
              <el-input style="width: 203px" v-model="listQuery.id" placeholder="角色ID"></el-input>
            </el-form-item>
            <el-form-item label="角色名称：">
              <el-input style="width: 203px" v-model="listQuery.roleName" placeholder="角色名称"></el-input>
            </el-form-item>
            <el-form-item label="创建类型：">
              <el-select v-model="listQuery.createType" placeholder="全部" clearable>
                <el-option
                  v-for="item in createTypeOptions"
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
        @click="addTenantRole()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="tenantRoleTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column label="角色ID" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="租户ID" width="280" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantName}}</template>
        </el-table-column>
        <el-table-column label="角色名称" width="" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.roleName}}</template>
        </el-table-column>
        <el-table-column label="角色备注" width="200" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.roleRemark}}</template>
        </el-table-column>
        <el-table-column label="创建类型" width="140" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.createType | formatCreateType}}</template>
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
  import {fetchList, deleteTenantRole} from '@/api/tenantRole'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    roleName: null,
    roleRemark: null,
    createType: null
  };
  const defaultCreateTypeOptions=[
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
    name: 'tenantRoleList',
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
        createTypeOptions: Object.assign({},defaultCreateTypeOptions),
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
    watch:{
      $route: function(newVal, oldVal) {
        //console.log(oldVal); //oldVa 上一次url
        //console.log(newVal); //newVal 这一次的url
        if (newVal != oldVal) {
          //this.loading();//重新调用加载函数
          this.getList();
          let tenantId = this.$route.query.tenantId;
          if(tenantId){
            this.tenantId = tenantId;
            this.listQuery.tenantId = tenantId;
          }
        }
      }
    },
    filters:{
      formatCreateType(createType){
        for(let i=0;i<defaultCreateTypeOptions.length;i++){
          if(createType===defaultCreateTypeOptions[i].value){
            return defaultCreateTypeOptions[i].label;
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
        this.$router.push({path: '/saas/viewTenantRole', query: {id: row.id, tenantId:this.tenantId}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/saas/updateTenantRole', query: {id: row.id, tenantId:this.tenantId}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该角色信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTenantRole(row.id).then(response => {
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
      searchTenantRoleList() {
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
      addTenantRole() {
        this.$router.push({path: '/saas/addTenantRole', query: {tenantId:this.tenantId}})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


