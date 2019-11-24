<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchSystemMenuDesignList()"
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
            <el-form-item label="父菜单编号：">
              <el-input style="width: 203px" v-model="listQuery.parentMenuId" placeholder="父菜单编号"></el-input>
            </el-form-item>
            <el-form-item label="模块：">
              <el-select v-model="listQuery.sysId" placeholder="请选择模块" clearable>
                <el-option
                  v-for="item in systemDesignOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="菜单名称：">
              <el-input style="width: 203px" v-model="listQuery.menuName" placeholder="菜单名称"></el-input>
            </el-form-item>
            <el-form-item label="开放基础版：">
              <el-select v-model="listQuery.basicOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in basicOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开放高级版：">
              <el-select v-model="listQuery.advanceOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in advanceOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开放旗舰版：">
              <el-select v-model="listQuery.ultimateOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in ultimateOnOptions"
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
        @click="addSystemMenuDesign()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="systemMenuDesignTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="系统ID" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="父菜单编号" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.parentMenuId}}</template>
        </el-table-column>
        <el-table-column label="模块" width="180" align="left" header-align="center">
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
        <el-table-column label="开放基础版" width="100" align="left">
          <template slot-scope="scope">
            <el-switch
              @change="handleBasicOnChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.basicOn">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="开放高级版" width="100" align="left">
          <template slot-scope="scope">
            <el-switch
              @change="handleAdvanceOnChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.advanceOn">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="开放旗舰版" width="100" align="left">
          <template slot-scope="scope">
            <el-switch
              @change="handleUltimateOnChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.ultimateOn">
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
  import {fetchList, deleteSystemMenuDesign, updateBasicOn, updateAdvanceOn, updateUltimateOn} from '@/api/systemMenuDesign'
  import {fetchList as fetchSystemDesignList} from '@/api/systemDesign';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    parentMenuId: null,
    sysId: null,
    menuName: null,
    menuOrder: null,
    menuIcon: null,
    basicOn: null,
    advanceOn: null,
    ultimateOn: null,
    basicUrl: null,
    advanceUrl: null,
    ultimateUrl: null
  };
  const defaultBasicOnOptions=[
    {
      value: 1,
      label: '开放'
    },
    {
      value: 0,
      label: '不开放'
    }
  ];
  const defaultAdvanceOnOptions=[
    {
      value: 1,
      label: '开放'
    },
    {
      value: 0,
      label: '不开放'
    }
  ];
  const defaultUltimateOnOptions=[
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
    name: 'systemMenuDesignList',
    data() {
      return {
        operates: [
        ],
        operateType: null,
        listQuery:Object.assign({},defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        basicOnOptions: Object.assign({},defaultBasicOnOptions),
        advanceOnOptions: Object.assign({},defaultAdvanceOnOptions),
        ultimateOnOptions: Object.assign({},defaultUltimateOnOptions),
        systemDesignOptions:[],
        multipleSelection: []
      }
    },
    created() {
      this.getList();
      this.getSystemDesignList();
    },
    filters:{
      formatBasicOn(basicOn){
        for(let i=0;i<defaultBasicOnOptions.length;i++){
          if(basicOn===defaultBasicOnOptions[i].value){
            return defaultBasicOnOptions[i].label;
          }
        }
      },
      formatAdvanceOn(advanceOn){
        for(let i=0;i<defaultAdvanceOnOptions.length;i++){
          if(advanceOn===defaultAdvanceOnOptions[i].value){
            return defaultAdvanceOnOptions[i].label;
          }
        }
      },
      formatUltimateOn(ultimateOn){
        for(let i=0;i<defaultUltimateOnOptions.length;i++){
          if(ultimateOn===defaultUltimateOnOptions[i].value){
            return defaultUltimateOnOptions[i].label;
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
      getSystemDesignList() {
        fetchSystemDesignList({pageNum:1,pageSize:100}).then(response => {
          this.systemDesignOptions = [];
          let systemDesignList = response.data.list;
          for(let i=0;i<systemDesignList.length;i++){
            this.systemDesignOptions.push({label:systemDesignList[i].moduleName,value:systemDesignList[i].id});
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
        this.$router.push({path: '/system/updateSystemMenuDesign', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该模块菜单', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteSystemMenuDesign(row.id).then(response => {
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
      handleBasicOnChange(index, row) {
        let data = new URLSearchParams();
        ;
        data.append("ids", row.id);
        data.append("basicOn", row.basicOn);
        updateBasicOn(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.basicOn === 0) {
            row.basicOn = 1;
          } else {
            row.basicOn = 0;
          }
        });
      },
      handleAdvanceOnChange(index, row) {
        let data = new URLSearchParams();
        ;
        data.append("ids", row.id);
        data.append("advanceOn", row.advanceOn);
        updateAdvanceOn(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.advanceOn === 0) {
            row.advanceOn = 1;
          } else {
            row.advanceOn = 0;
          }
        });
      },
      handleUltimateOnChange(index, row) {
        let data = new URLSearchParams();
        ;
        data.append("ids", row.id);
        data.append("ultimateOn", row.ultimateOn);
        updateUltimateOn(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.ultimateOn === 0) {
            row.ultimateOn = 1;
          } else {
            row.ultimateOn = 0;
          }
        });
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      searchSystemMenuDesignList() {
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
      addSystemMenuDesign() {
        this.$router.push({path: '/system/addSystemMenuDesign'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


