<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchModulePriceList()"
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
            <el-form-item label="模块价格ID：">
              <el-input style="width: 203px" v-model="listQuery.id" placeholder="模块价格ID"></el-input>
            </el-form-item>
            <el-form-item label="模块ID：">
              <el-select v-model="listQuery.moduleId" placeholder="请选择模块ID" :disabled="this.$route.query.moduleId?true:false" clearable>
                <el-option
                  v-for="item in moduleInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="模块版本：">
              <el-select v-model="listQuery.moduleEdition" placeholder="全部" clearable>
                <el-option
                  v-for="item in moduleEditionOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="起始量：">
              <el-input style="width: 203px" v-model="listQuery.startNum" placeholder="起始量"></el-input>
            </el-form-item>
            <el-form-item label="终止量：">
              <el-input style="width: 203px" v-model="listQuery.endNum" placeholder="终止量"></el-input>
            </el-form-item>
            <el-form-item label="价格：">
              <el-input style="width: 203px" v-model="listQuery.priceMoney" placeholder="价格"></el-input>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addModulePrice()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="modulePriceTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column label="模块价格ID" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="模块ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.moduleName}}</template>
        </el-table-column>
        <el-table-column label="模块版本" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.moduleEdition | formatModuleEdition}}</template>
        </el-table-column>
        <el-table-column label="起始量" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.startNum}}</template>
        </el-table-column>
        <el-table-column label="终止量" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.endNum}}</template>
        </el-table-column>
        <el-table-column label="价格" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.priceMoney}}</template>
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
  import {fetchList, deleteModulePrice} from '@/api/modulePrice'
  import {fetchList as fetchModuleInfoList} from '@/api/moduleInfo';
  import accounting from 'accounting';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    moduleId: null,
    moduleEdition: null,
    startNum: null,
    endNum: null,
    priceMoney: null
  };
  const defaultModuleEditionOptions=[
    {
      value: 1,
      label: '基础版'
    },
    {
      value: 2,
      label: '高级版'
    },
    {
      value: 3,
      label: '旗舰版'
    }
  ];
  
  export default {
    name: 'modulePriceList',
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
        moduleEditionOptions: Object.assign({},defaultModuleEditionOptions),
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
      formatMoney(money){
        // 指定货币符号、保留小数位、千位间隔符
        return accounting.formatMoney(money,'',2,'');
      },
      formatModuleEdition(moduleEdition){
        for(let i=0;i<defaultModuleEditionOptions.length;i++){
          if(moduleEdition===defaultModuleEditionOptions[i].value){
            return defaultModuleEditionOptions[i].label;
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
        this.$router.push({path: '/saas/viewModulePrice', query: {id: row.id, moduleId:this.moduleId}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/saas/updateModulePrice', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该模块价格', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteModulePrice(row.id).then(response => {
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
      searchModulePriceList() {
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
      addModulePrice() {
        this.$router.push({path: '/saas/addModulePrice', query: {moduleId:this.moduleId}})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


