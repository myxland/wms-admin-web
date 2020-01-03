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
            <el-form-item label="：">
              <el-input style="width: 203px" v-model="listQuery.id" placeholder=""></el-input>
            </el-form-item>
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
            <el-form-item label="菜单名称：">
              <el-input style="width: 203px" v-model="listQuery.menuName" placeholder="菜单名称"></el-input>
            </el-form-item>
            <el-form-item label="菜单排序：">
              <el-input style="width: 203px" v-model="listQuery.menuOrder" placeholder="菜单排序"></el-input>
            </el-form-item>
            <el-form-item label="菜单图标：">
              <el-input style="width: 203px" v-model="listQuery.menuIcon" placeholder="菜单图标"></el-input>
            </el-form-item>
            <el-form-item label="父菜单ID：">
              <el-input style="width: 203px" v-model="listQuery.menuParentId" placeholder="父菜单ID"></el-input>
            </el-form-item>
            <el-form-item label="开放基础版：">
              <el-select v-model="listQuery.basicEditionOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in basicEditionOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开放高级版：">
              <el-select v-model="listQuery.advanceEditionOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in advanceEditionOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开放旗舰版：">
              <el-select v-model="listQuery.ultimateEditionOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in ultimateEditionOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="基础版链接地址：">
              <el-input style="width: 203px" v-model="listQuery.basicUrl" placeholder="基础版链接地址"></el-input>
            </el-form-item>
            <el-form-item label="高级版链接地址：">
              <el-input style="width: 203px" v-model="listQuery.advanceUrl" placeholder="高级版链接地址"></el-input>
            </el-form-item>
            <el-form-item label="旗舰版链接地址：">
              <el-input style="width: 203px" v-model="listQuery.ultimateUrl" placeholder="旗舰版链接地址"></el-input>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addModuleMenu()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="moduleMenuTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column label="" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="服务模块ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.moduleName}}</template>
        </el-table-column>
        <el-table-column label="菜单名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.menuName}}</template>
        </el-table-column>
        <el-table-column label="菜单排序" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.menuOrder}}</template>
        </el-table-column>
        <el-table-column label="菜单图标" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.menuIcon}}</template>
        </el-table-column>
        <el-table-column label="父菜单ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.menuParentId}}</template>
        </el-table-column>
        <el-table-column label="开放基础版" width="100" align="left" header-align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleBasicEditionOnChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.basicEditionOn">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="开放高级版" width="100" align="left" header-align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleAdvanceEditionOnChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.advanceEditionOn">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="开放旗舰版" width="100" align="left" header-align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleUltimateEditionOnChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.ultimateEditionOn">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="基础版链接地址" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.basicUrl}}</template>
        </el-table-column>
        <el-table-column label="高级版链接地址" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.advanceUrl}}</template>
        </el-table-column>
        <el-table-column label="旗舰版链接地址" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.ultimateUrl}}</template>
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
    ultimateUrl: null
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
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


