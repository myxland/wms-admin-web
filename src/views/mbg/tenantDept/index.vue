<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchTenantDeptList()"
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
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addTenantDept()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <el-tree
         :props="props"
          ref="tree"
          lazy
          :load="loadNode"
          node-key="id"
          :expand-on-click-node="false"
    >
          <span class="tree-node" slot-scope="{ node, data }" :title="data.name">
            <span>{{ data.name }}</span>
          </span>
    </el-tree>
    <div class="table-container">
      <el-table ref="tenantDeptTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="系统ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="上级部门" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.parentDeptId}}</template>
        </el-table-column>
        <el-table-column label="租户" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantName}}</template>
        </el-table-column>
        <el-table-column label="部门名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.deptName}}</template>
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
  import {fetchList, fetchRootList, deleteTenantDept} from '@/api/tenantDept'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    parentDeptId: null,
    tenantId: null,
    deptName: null
  };
  
  export default {
    name: 'tenantDeptList',
    data() {
      return {
        props: {
          label: 'name',
          children: 'child',
          isLeaf: 'leaf'
        },
        operates: [
        ],
        operateType: null,
        listQuery:Object.assign({},defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        tenantInfoOptions:[],
        multipleSelection: []
      }
    },
    created() {
      this.getList();
      this.getTenantInfoList();
    },
    filters:{
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
      loadNode(node, resolve) {
        console.log(node)
        // console.log(resolve)
        if (node.level === 0) {
          fetchRootList({pageNum:1,pageSize:100}).then(response => {
            var rootData = [];
            let tenantDeptList = response.data.list;
            for(let i=0;i<tenantDeptList.length;i++){
              rootData.push({name:tenantDeptList[i].id+"_"+tenantDeptList[i].tenantName+"_"+tenantDeptList[i].deptName,id:tenantDeptList[i].id});
            }
            return resolve(rootData);

          });

          //return resolve([{ name: '第一级', id: '1' }, { name: '第一级02', id: '2' }])
          // 这里resolve的数据是后台给的,id用于之后点击发起请求时的参数
        } else {
          this.getTreeChild(node.data.id, resolve)
        }
      },
      getTreeChild(id, resolve) {
        fetchList({pageNum:1,pageSize:100,parentDeptId:id}).then(response => {
            var rootData = [];
            let tenantDeptList = response.data.list;
            for(let i=0;i<tenantDeptList.length;i++){
              rootData.push({name:tenantDeptList[i].id+"_"+tenantDeptList[i].tenantName+"_"+tenantDeptList[i].deptName,id:tenantDeptList[i].id});
            }
            return resolve(rootData);

        });
        
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/mbg/updateTenantDept', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该租户部门', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTenantDept(row.id).then(response => {
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
      searchTenantDeptList() {
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
      addTenantDept() {
        this.$router.push({path: '/mbg/addTenantDept'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


