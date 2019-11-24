<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchIotDeviceDesignList()"
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
            <el-form-item label="父级系统编号：">
              <el-input style="width: 203px" v-model="listQuery.parentId" placeholder="父级系统编号"></el-input>
            </el-form-item>
            <el-form-item label="表具用途：">
              <el-select v-model="listQuery.devType" placeholder="全部" clearable>
                <el-option
                  v-for="item in devTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品型号编号：">
              <el-input style="width: 203px" v-model="listQuery.devVerId" placeholder="产品型号编号"></el-input>
            </el-form-item>
            <el-form-item label="设备出厂编号：">
              <el-input style="width: 203px" v-model="listQuery.devMacId" placeholder="设备出厂编号"></el-input>
            </el-form-item>
            <el-form-item label="模组编号：">
              <el-input style="width: 203px" v-model="listQuery.imei" placeholder="模组编号"></el-input>
            </el-form-item>
            <el-form-item label="通讯卡号：">
              <el-input style="width: 203px" v-model="listQuery.imsi" placeholder="通讯卡号"></el-input>
            </el-form-item>
            <el-form-item label="设备所属区域编号：">
              <el-input style="width: 203px" v-model="listQuery.areaId" placeholder="设备所属区域编号"></el-input>
            </el-form-item>
            <el-form-item label="用户编号：">
              <el-input style="width: 203px" v-model="listQuery.custId" placeholder="用户编号"></el-input>
            </el-form-item>
            <el-form-item label="安装地址：">
              <el-input style="width: 203px" v-model="listQuery.instAddress" placeholder="安装地址"></el-input>
            </el-form-item>
            <el-form-item label="地图X坐标：">
              <el-input style="width: 203px" v-model="listQuery.mapX" placeholder="地图X坐标"></el-input>
            </el-form-item>
            <el-form-item label="地图Y坐标：">
              <el-input style="width: 203px" v-model="listQuery.mapY" placeholder="地图Y坐标"></el-input>
            </el-form-item>
            <el-form-item label="地图显示图标：">
              <el-input style="width: 203px" v-model="listQuery.mapIcon" placeholder="地图显示图标"></el-input>
            </el-form-item>
            <el-form-item label="供应商编号：">
              <el-input style="width: 203px" v-model="listQuery.factId" placeholder="供应商编号"></el-input>
            </el-form-item>
            <el-form-item label="使用方编号：">
              <el-input style="width: 203px" v-model="listQuery.userId" placeholder="使用方编号"></el-input>
            </el-form-item>
            <el-form-item label="设备当前状态：">
              <el-input style="width: 203px" v-model="listQuery.devStatus" placeholder="设备当前状态"></el-input>
            </el-form-item>
            <el-form-item label="注册时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.devRegTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.devRegTimeEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="注册人：">
              <el-input style="width: 203px" v-model="listQuery.devRegister" placeholder="注册人"></el-input>
            </el-form-item>
            <el-form-item label="注册数据来源：">
              <el-input style="width: 203px" v-model="listQuery.devSegWay" placeholder="注册数据来源"></el-input>
            </el-form-item>
            <el-form-item label="发货时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.devSendoutTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.devSendoutTimeEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="发货人：">
              <el-input style="width: 203px" v-model="listQuery.devSendouter" placeholder="发货人"></el-input>
            </el-form-item>
            <el-form-item label="发货批次：">
              <el-input style="width: 203px" v-model="listQuery.devSendoutBatch" placeholder="发货批次"></el-input>
            </el-form-item>
            <el-form-item label="发货数据来源：">
              <el-input style="width: 203px" v-model="listQuery.devSendoutWay" placeholder="发货数据来源"></el-input>
            </el-form-item>
            <el-form-item label="入库时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.devPutinTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.devPutinTimeEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="入库人：">
              <el-input style="width: 203px" v-model="listQuery.devPutiner" placeholder="入库人"></el-input>
            </el-form-item>
            <el-form-item label="入库数据来源：">
              <el-input style="width: 203px" v-model="listQuery.devPutinWay" placeholder="入库数据来源"></el-input>
            </el-form-item>
            <el-form-item label="安装时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.devInstTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.devInstTimeEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="安装人：">
              <el-input style="width: 203px" v-model="listQuery.devInster" placeholder="安装人"></el-input>
            </el-form-item>
            <el-form-item label="安装数据来源：">
              <el-input style="width: 203px" v-model="listQuery.devInstWay" placeholder="安装数据来源"></el-input>
            </el-form-item>
            <el-form-item label="最后一次上传时间：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.devLastUpTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.devLastUpTimeEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="最后一次上传ID：">
              <el-input style="width: 203px" v-model="listQuery.devLastUpId" placeholder="最后一次上传ID"></el-input>
            </el-form-item>
            <el-form-item label="表册编号：">
              <el-input style="width: 203px" v-model="listQuery.bookletId" placeholder="表册编号"></el-input>
            </el-form-item>
            <el-form-item label="最后一次计费日期：">
              <el-date-picker
                class="input-width"
                v-model="listQuery.lastCalcDateStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
              <el-date-picker
                class="input-width"
                v-model="listQuery.lastCalcDateEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="年累计用水量：">
              <el-input style="width: 203px" v-model="listQuery.yearusenum" placeholder="年累计用水量"></el-input>
            </el-form-item>
            <el-form-item label="最后一次计费止码：">
              <el-input style="width: 203px" v-model="listQuery.lastCalcCode" placeholder="最后一次计费止码"></el-input>
            </el-form-item>
            <el-form-item label="设备编号：">
              <el-input style="width: 203px" v-model="listQuery.devNo" placeholder="设备编号"></el-input>
            </el-form-item>
            <el-form-item label="上传渠道类型：">
              <el-select v-model="listQuery.channelType" placeholder="全部" clearable>
                <el-option
                  v-for="item in channelTypeOptions"
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
        @click="addIotDeviceDesign()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="iotDeviceDesignTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="系统编号" width="180" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="父级系统编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.parentId}}</template>
        </el-table-column>
        <el-table-column label="表具用途" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devType | formatDevType}}</template>
        </el-table-column>
        <el-table-column label="产品型号编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devVerId}}</template>
        </el-table-column>
        <el-table-column label="设备出厂编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devMacId}}</template>
        </el-table-column>
        <el-table-column label="模组编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.imei}}</template>
        </el-table-column>
        <el-table-column label="通讯卡号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.imsi}}</template>
        </el-table-column>
        <el-table-column label="设备所属区域编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.areaId}}</template>
        </el-table-column>
        <el-table-column label="用户编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.custId}}</template>
        </el-table-column>
        <el-table-column label="安装地址" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.instAddress}}</template>
        </el-table-column>
        <el-table-column label="地图X坐标" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.mapX}}</template>
        </el-table-column>
        <el-table-column label="地图Y坐标" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.mapY}}</template>
        </el-table-column>
        <el-table-column label="地图显示图标" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.mapIcon}}</template>
        </el-table-column>
        <el-table-column label="供应商编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.factId}}</template>
        </el-table-column>
        <el-table-column label="使用方编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.userId}}</template>
        </el-table-column>
        <el-table-column label="设备当前状态" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devStatus}}</template>
        </el-table-column>
        <el-table-column label="注册时间" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devRegTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="注册人" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devRegister}}</template>
        </el-table-column>
        <el-table-column label="注册数据来源" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devSegWay}}</template>
        </el-table-column>
        <el-table-column label="发货时间" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devSendoutTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="发货人" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devSendouter}}</template>
        </el-table-column>
        <el-table-column label="发货批次" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devSendoutBatch}}</template>
        </el-table-column>
        <el-table-column label="发货数据来源" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devSendoutWay}}</template>
        </el-table-column>
        <el-table-column label="入库时间" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devPutinTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="入库人" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devPutiner}}</template>
        </el-table-column>
        <el-table-column label="入库数据来源" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devPutinWay}}</template>
        </el-table-column>
        <el-table-column label="安装时间" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devInstTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="安装人" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devInster}}</template>
        </el-table-column>
        <el-table-column label="安装数据来源" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devInstWay}}</template>
        </el-table-column>
        <el-table-column label="最后一次上传时间" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devLastUpTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="最后一次上传ID" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devLastUpId}}</template>
        </el-table-column>
        <el-table-column label="表册编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.bookletId}}</template>
        </el-table-column>
        <el-table-column label="最后一次计费日期" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.lastCalcDate | formatDate}}</template>
        </el-table-column>
        <el-table-column label="年累计用水量" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.yearusenum | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="最后一次计费止码" width="100" align="right" header-align="center">
          <template slot-scope="scope">{{scope.row.lastCalcCode | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="设备编号" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.devNo}}</template>
        </el-table-column>
        <el-table-column label="上传渠道类型" width="100" align="left" header-align="center">
          <template slot-scope="scope">{{scope.row.channelType | formatChannelType}}</template>
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
  import {fetchList, deleteIotDeviceDesign} from '@/api/iotDeviceDesign'
  import {formatDate} from '@/utils/date';
  import accounting from 'accounting';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    parentId: null,
    devType: null,
    devVerId: null,
    devMacId: null,
    imei: null,
    imsi: null,
    areaId: null,
    custId: null,
    instAddress: null,
    mapX: null,
    mapY: null,
    mapIcon: null,
    factId: null,
    userId: null,
    devStatus: null,
    devRegTime: null,
    devRegTimeStart: null,
    devRegTimeEnd: null,
    devRegister: null,
    devSegWay: null,
    devSendoutTime: null,
    devSendoutTimeStart: null,
    devSendoutTimeEnd: null,
    devSendouter: null,
    devSendoutBatch: null,
    devSendoutWay: null,
    devPutinTime: null,
    devPutinTimeStart: null,
    devPutinTimeEnd: null,
    devPutiner: null,
    devPutinWay: null,
    devInstTime: null,
    devInstTimeStart: null,
    devInstTimeEnd: null,
    devInster: null,
    devInstWay: null,
    devLastUpTime: null,
    devLastUpTimeStart: null,
    devLastUpTimeEnd: null,
    devLastUpId: null,
    bookletId: null,
    lastCalcDate: null,
    lastCalcDateStart: null,
    lastCalcDateEnd: null,
    yearusenum: null,
    lastCalcCode: null,
    devNo: null,
    channelType: null
  };
  const defaultDevTypeOptions=[
    {
      value: 1,
      label: '贸易结算'
    },
    {
      value: 2,
      label: '数据监测'
    }
  ];
  const defaultChannelTypeOptions=[
  ];
  
  export default {
    name: 'iotDeviceDesignList',
    data() {
      return {
        operates: [
        ],
        operateType: null,
        listQuery:Object.assign({},defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        devTypeOptions: Object.assign({},defaultDevTypeOptions),
        channelTypeOptions: Object.assign({},defaultChannelTypeOptions),
        multipleSelection: []
      }
    },
    created() {
      this.getList();
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
      formatMoney(money){
        // 指定货币符号、保留小数位、千位间隔符
        return accounting.formatMoney(money,'',2,'');
      },
      formatDevType(devType){
        for(let i=0;i<defaultDevTypeOptions.length;i++){
          if(devType===defaultDevTypeOptions[i].value){
            return defaultDevTypeOptions[i].label;
          }
        }
      },
      formatChannelType(channelType){
        for(let i=0;i<defaultChannelTypeOptions.length;i++){
          if(channelType===defaultChannelTypeOptions[i].value){
            return defaultChannelTypeOptions[i].label;
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
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/dev/updateIotDeviceDesign', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该设备信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteIotDeviceDesign(row.id).then(response => {
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
      searchIotDeviceDesignList() {
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
      addIotDeviceDesign() {
        this.$router.push({path: '/dev/addIotDeviceDesign'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


