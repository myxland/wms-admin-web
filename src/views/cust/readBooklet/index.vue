<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchReadBookletList()"
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
            <el-form-item label="表册名称：">
              <el-input style="width: 203px" v-model="listQuery.bookletName" placeholder="表册名称"></el-input>
            </el-form-item>
            <el-form-item label="表册类型：">
              <el-select v-model="listQuery.bookletType" placeholder="全部" clearable>
                <el-option
                  v-for="item in bookletTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="抄表负责人编号：">
              <el-input style="width: 203px" v-model="listQuery.readEmpId" placeholder="抄表负责人编号"></el-input>
            </el-form-item>
            <el-form-item label="收费负责人编号：">
              <el-input style="width: 203px" v-model="listQuery.payEmpId" placeholder="收费负责人编号"></el-input>
            </el-form-item>
            <el-form-item label="抄表间隔周期_月：">
              <el-input style="width: 203px" v-model="listQuery.calcCycleInterval" placeholder="抄表间隔周期_月"></el-input>
            </el-form-item>
            <el-form-item label="最后一次抄表月份：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.calcMonthLastStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.calcMonthLastEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="下次抄表月份：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.calcMonthNextStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.calcMonthNextEnd"
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
        @click="addReadBooklet()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="readBookletTable"
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
        <el-table-column label="表册名称" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.bookletName}}</template>
        </el-table-column>
        <el-table-column label="表册类型" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.bookletType | formatBookletType}}</template>
        </el-table-column>
        <el-table-column label="抄表负责人编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.readEmpId}}</template>
        </el-table-column>
        <el-table-column label="收费负责人编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.payEmpId}}</template>
        </el-table-column>
        <el-table-column label="抄表间隔周期_月" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.calcCycleInterval}}</template>
        </el-table-column>
        <el-table-column label="最后一次抄表月份" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.calcMonthLast | formatDate}}</template>
        </el-table-column>
        <el-table-column label="下次抄表月份" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.calcMonthNext | formatDate}}</template>
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
  import {fetchList, deleteReadBooklet} from '@/api/readBooklet'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    bookletName: null,
    bookletType: null,
    readEmpId: null,
    payEmpId: null,
    calcCycleInterval: null,
    calcMonthLast: null,
    calcMonthLastStart: null,
    calcMonthLastEnd: null,
    calcMonthNext: null,
    calcMonthNextStart: null,
    calcMonthNextEnd: null
  };
  const defaultBookletTypeOptions=[
    {
      value: 1,
      label: '远传表'
    },
    {
      value: 2,
      label: '机械表'
    }
  ];
  
  export default {
    name: 'readBookletList',
    data() {
      return {
        operates: [
        ],
        operateType: null,
        listQuery:Object.assign({},defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        bookletTypeOptions: Object.assign({},defaultBookletTypeOptions),
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
      formatBookletType(bookletType){
        for(let i=0;i<defaultBookletTypeOptions.length;i++){
          if(bookletType===defaultBookletTypeOptions[i].value){
            return defaultBookletTypeOptions[i].label;
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
        this.$router.push({path: '/cust/updateReadBooklet', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该表册信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteReadBooklet(row.id).then(response => {
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
      searchReadBookletList() {
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
      addReadBooklet() {
        this.$router.push({path: '/cust/addReadBooklet'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


