<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchModuleMenuList()"
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
            <el-form-item label="服务模块ID：">
              <el-select v-model="listQuery.moduleId" placeholder="请选择服务模块ID" :disabled="this.$route.query.moduleId?true:false" clearable>
                <el-option
                  v-for="item in moduleInfoOptions"
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
        @click="addModuleMenuByRoot()"
        size="mini">
        添加一级菜单
      </el-button>
      <el-button
        class="btn-add"
        @click="addModuleMenuByParent()"
        size="mini">
        添加子级菜单
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="moduleMenuTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border
                row-key="id"
                lazy
                :load="load"
                :tree-props="{hasChildren: 'hasChildren'}"
                >
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="菜单ID" width="300" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="菜单名称" width="" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.menuName}}</template>
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
  import {fetchList, deleteModuleMenu, updateBasicEditionOn, updateAdvanceEditionOn, updateUltimateEditionOn} from '@/api/moduleMenu'
  import {fetchList as fetchModuleInfoList} from '@/api/moduleInfo';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    moduleId: null,
    menuName: null,
    menuOrder: null,
    menuIcon: null,
    menuParentId: null,
    basicEditionOn: null,
    advanceEditionOn: null,
    ultimateEditionOn: null,
    basicUrl: null,
    advanceUrl: null,
    ultimateUrl: null,
    parentId: null
  };
  const defaultBasicEditionOnOptions=[
    {
      value: 1,
      label: '开放'
    },
    {
      value: 0,
      label: '不开放'
    }
  ];
  const defaultAdvanceEditionOnOptions=[
    {
      value: 1,
      label: '开放'
    },
    {
      value: 0,
      label: '不开放'
    }
  ];
  const defaultUltimateEditionOnOptions=[
    {
      value: 1,
      label: '开放'
    },
    {
      value: 0,
      label: '不开放'
    }
  ];
  
  export default {
    name: 'moduleMenuList',
    data() {
      return {
        operates: [
        ],
        operateType: null,
        moduleId: null,
        listQuery:Object.assign({},defaultListQuery,this.$route.query),
        list: null,
        total: null,
        listLoading: true,
        basicEditionOnOptions: Object.assign({},defaultBasicEditionOnOptions),
        advanceEditionOnOptions: Object.assign({},defaultAdvanceEditionOnOptions),
        ultimateEditionOnOptions: Object.assign({},defaultUltimateEditionOnOptions),
        moduleInfoOptions:[],
        multipleSelection: []
      }
    },
    created() {
      this.getList();
      this.getModuleInfoList();
      let moduleId = this.$route.query.moduleId;
      if(moduleId){
        this.moduleId = moduleId;
        this.listQuery.moduleId = moduleId;
      }
    },
    filters:{
      formatBasicEditionOn(basicEditionOn){
        for(let i=0;i<defaultBasicEditionOnOptions.length;i++){
          if(basicEditionOn===defaultBasicEditionOnOptions[i].value){
            return defaultBasicEditionOnOptions[i].label;
          }
        }
      },
      formatAdvanceEditionOn(advanceEditionOn){
        for(let i=0;i<defaultAdvanceEditionOnOptions.length;i++){
          if(advanceEditionOn===defaultAdvanceEditionOnOptions[i].value){
            return defaultAdvanceEditionOnOptions[i].label;
          }
        }
      },
      formatUltimateEditionOn(ultimateEditionOn){
        for(let i=0;i<defaultUltimateEditionOnOptions.length;i++){
          if(ultimateEditionOn===defaultUltimateEditionOnOptions[i].value){
            return defaultUltimateEditionOnOptions[i].label;
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
      load(row, treeNode, resolve) {
        //setTimeout(() => {
        //  resolve([])},1000)
        //alert(JSON.stringify(row));
        //alert(JSON.stringify(treeNode));
        //alert(row.id);
        let parentId = row.id;
        this.listLoading = true;
        this.listQuery = Object.assign({},this.listQuery,{"parentId":parentId});
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          resolve(response.data.list);
          //this.list = response.data.list;
          //this.total = response.data.total;
          //this.totalPage = response.data.totalPage;
          //this.pageSize = response.data.pageSize;
        });
      },
      getModuleInfoList() {
        fetchModuleInfoList({pageNum:1,pageSize:500}).then(response => {
          this.moduleInfoOptions = [];
          let moduleInfoList = response.data.list;
          for(let i=0;i<moduleInfoList.length;i++){
            this.moduleInfoOptions.push({label:moduleInfoList[i].moduleName,value:moduleInfoList[i].id});
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
        this.$router.push({path: '/saas/viewModuleMenu', query: {id: row.id, moduleId:this.moduleId}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/saas/updateModuleMenu', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该模块菜单', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteModuleMenu(row.id).then(response => {
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
      handleBasicEditionOnChange(index, row) {
        let data = new URLSearchParams();
        ;
        data.append("ids", row.id);
        data.append("basicEditionOn", row.basicEditionOn);
        updateBasicEditionOn(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.basicEditionOn === 0) {
            row.basicEditionOn = 1;
          } else {
            row.basicEditionOn = 0;
          }
        });
      },
      handleAdvanceEditionOnChange(index, row) {
        let data = new URLSearchParams();
        ;
        data.append("ids", row.id);
        data.append("advanceEditionOn", row.advanceEditionOn);
        updateAdvanceEditionOn(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.advanceEditionOn === 0) {
            row.advanceEditionOn = 1;
          } else {
            row.advanceEditionOn = 0;
          }
        });
      },
      handleUltimateEditionOnChange(index, row) {
        let data = new URLSearchParams();
        ;
        data.append("ids", row.id);
        data.append("ultimateEditionOn", row.ultimateEditionOn);
        updateUltimateEditionOn(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.ultimateEditionOn === 0) {
            row.ultimateEditionOn = 1;
          } else {
            row.ultimateEditionOn = 0;
          }
        });
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      searchModuleMenuList() {
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
      addModuleMenu() {
        this.$router.push({path: '/saas/addModuleMenu', query: {moduleId:this.moduleId}})
      },
      addModuleMenuByRoot() {
        this.$router.push({path: '/saas/addModuleMenu', query: {moduleId:this.moduleId}})
      },
      addModuleMenuByParent() {
        //检查是否选择父级菜单
        if (this.multipleSelection.length != 1) {
          this.$message({
            message: '请选择一条记录',
            type: 'warning',
            duration: 1000
          });
          return;
        }        

        this.$router.push({path: '/saas/addModuleMenu', query: {moduleId:this.moduleId,menuParentId:this.multipleSelection[0].id}})
      } 
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


