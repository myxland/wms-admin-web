<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchTenantCustomerLinkmanList()"
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
            <el-form-item label="联系人ID：">
              <el-input style="width: 203px" v-model="listQuery.id" placeholder="联系人ID"></el-input>
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
            <el-form-item label="客户ID：">
              <el-input style="width: 203px" v-model="listQuery.customerId" placeholder="客户ID"></el-input>
            </el-form-item>
            <el-form-item label="联系人姓名：">
              <el-input style="width: 203px" v-model="listQuery.linkmanName" placeholder="联系人姓名"></el-input>
            </el-form-item>
            <el-form-item label="联系人地址：">
              <el-input style="width: 203px" v-model="listQuery.linkmanAddress" placeholder="联系人地址"></el-input>
            </el-form-item>
            <el-form-item label="主联系人：">
              <el-select v-model="listQuery.linkmanMainOn" placeholder="全部" clearable>
                <el-option
                  v-for="item in linkmanMainOnOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="性别：">
              <el-select v-model="listQuery.linkmanSex" placeholder="全部" clearable>
                <el-option
                  v-for="item in linkmanSexOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.linkmanBirthdayStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.linkmanBirthdayEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="手机号码：">
              <el-input style="width: 203px" v-model="listQuery.linkmanMobile" placeholder="手机号码"></el-input>
            </el-form-item>
            <el-form-item label="固定电话号码：">
              <el-input style="width: 203px" v-model="listQuery.linkmanTel" placeholder="固定电话号码"></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址：">
              <el-input style="width: 203px" v-model="listQuery.linkmanEmail" placeholder="邮箱地址"></el-input>
            </el-form-item>
            <el-form-item label="微信号：">
              <el-input style="width: 203px" v-model="listQuery.linkmanPersonalWx" placeholder="微信号"></el-input>
            </el-form-item>
            <el-form-item label="QQ号：">
              <el-input style="width: 203px" v-model="listQuery.linkmanQq" placeholder="QQ号"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input style="width: 203px" v-model="listQuery.linkmanRemark" placeholder="备注"></el-input>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addTenantCustomerLinkman()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="tenantCustomerLinkmanTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border
      >
        <el-table-column label="联系人ID" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="租户ID" width="280" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.tenantName}}</template>
        </el-table-column>
        <el-table-column label="客户ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.customerId}}</template>
        </el-table-column>
        <el-table-column label="联系人姓名" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.linkmanName}}</template>
        </el-table-column>
        <el-table-column label="联系人地址" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.linkmanAddress}}</template>
        </el-table-column>
        <el-table-column label="主联系人" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.linkmanMainOn | formatLinkmanMainOn}}</template>
        </el-table-column>
        <el-table-column label="性别" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.linkmanSex | formatLinkmanSex}}</template>
        </el-table-column>
        <el-table-column label="出生日期" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.linkmanBirthday | formatDate}}</template>
        </el-table-column>
        <el-table-column label="手机号码" width="120" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.linkmanMobile}}</template>
        </el-table-column>
        <el-table-column label="固定电话号码" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.linkmanTel}}</template>
        </el-table-column>
        <el-table-column label="邮箱地址" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.linkmanEmail}}</template>
        </el-table-column>
        <el-table-column label="微信号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.linkmanPersonalWx}}</template>
        </el-table-column>
        <el-table-column label="QQ号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.linkmanQq}}</template>
        </el-table-column>
        <el-table-column label="备注" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.linkmanRemark}}</template>
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
  import {fetchList, deleteTenantCustomerLinkman} from '@/api/tenantCustomerLinkman'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    tenantId: null,
    customerId: null,
    linkmanName: null,
    linkmanAddress: null,
    linkmanMainOn: null,
    linkmanSex: null,
    linkmanBirthday: null,
    linkmanBirthdayStart: null,
    linkmanBirthdayEnd: null,
    linkmanMobile: null,
    linkmanTel: null,
    linkmanEmail: null,
    linkmanPersonalWx: null,
    linkmanQq: null,
    linkmanRemark: null
  };
  const defaultLinkmanMainOnOptions=[
    {
      value: 1,
      label: '是'
    },
    {
      value: 0,
      label: '否'
    }
  ];
  const defaultLinkmanSexOptions=[
    {
      value: 1,
      label: '男'
    },
    {
      value: 2,
      label: '女'
    }
  ];
  
  export default {
    name: 'tenantCustomerLinkmanList',
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
        linkmanMainOnOptions: Object.assign({},defaultLinkmanMainOnOptions),
        linkmanSexOptions: Object.assign({},defaultLinkmanSexOptions),
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
      formatLinkmanMainOn(linkmanMainOn){
        for(let i=0;i<defaultLinkmanMainOnOptions.length;i++){
          if(linkmanMainOn===defaultLinkmanMainOnOptions[i].value){
            return defaultLinkmanMainOnOptions[i].label;
          }
        }
      },
      formatLinkmanSex(linkmanSex){
        for(let i=0;i<defaultLinkmanSexOptions.length;i++){
          if(linkmanSex===defaultLinkmanSexOptions[i].value){
            return defaultLinkmanSexOptions[i].label;
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
        this.$router.push({path: '/saas/viewTenantCustomerLinkman', query: {id: row.id, tenantId:this.tenantId}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/saas/updateTenantCustomerLinkman', query: {id: row.id, tenantId:this.tenantId}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该用户联系人', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTenantCustomerLinkman(row.id).then(response => {
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
      searchTenantCustomerLinkmanList() {
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
      addTenantCustomerLinkman() {
        this.$router.push({path: '/saas/addTenantCustomerLinkman', query: {tenantId:this.tenantId}})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


