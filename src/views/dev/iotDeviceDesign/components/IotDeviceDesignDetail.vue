<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="iotDeviceDesign" :rules="rules" ref="iotDeviceDesignFrom" label-width="150px">
      <el-form-item label="系统编号：" prop="id">
        <el-input v-model="iotDeviceDesign.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="父级系统编号：" prop="parentId">
        <el-input v-model="iotDeviceDesign.parentId"></el-input>
      </el-form-item>
      <el-form-item label="表具用途：" prop="devType" clearable>
        <el-select
          v-model="iotDeviceDesign.devType"
          placeholder="请选择表具用途">
          <el-option
            v-for="item in devTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item label="产品型号编号：" prop="devVerId">
        <el-input v-model="iotDeviceDesign.devVerId"></el-input>
      </el-form-item>
      <el-form-item label="设备出厂编号：" prop="devMacId">
        <el-input v-model="iotDeviceDesign.devMacId"></el-input>
      </el-form-item>
      <el-form-item label="模组编号：" prop="imei">
        <el-input v-model="iotDeviceDesign.imei"></el-input>
      </el-form-item>
      <el-form-item label="通讯卡号：" prop="imsi">
        <el-input v-model="iotDeviceDesign.imsi"></el-input>
      </el-form-item>
      <el-form-item label="设备所属区域编号：" prop="areaId">
        <el-input v-model="iotDeviceDesign.areaId"></el-input>
      </el-form-item>
      <el-form-item label="用户编号：" prop="custId">
        <el-input v-model="iotDeviceDesign.custId"></el-input>
      </el-form-item>
      <el-form-item label="安装地址：" prop="instAddress">
        <el-input v-model="iotDeviceDesign.instAddress"></el-input>
      </el-form-item>
      <el-form-item label="地图X坐标：" prop="mapX">
        <el-input v-model="iotDeviceDesign.mapX"></el-input>
      </el-form-item>
      <el-form-item label="地图Y坐标：" prop="mapY">
        <el-input v-model="iotDeviceDesign.mapY"></el-input>
      </el-form-item>
      <el-form-item label="地图显示图标：" prop="mapIcon">
        <el-input v-model="iotDeviceDesign.mapIcon"></el-input>
      </el-form-item>
      <el-form-item label="供应商编号：" prop="factId">
        <el-input v-model="iotDeviceDesign.factId"></el-input>
      </el-form-item>
      <el-form-item label="使用方编号：" prop="userId">
        <el-input v-model="iotDeviceDesign.userId"></el-input>
      </el-form-item>
      <el-form-item label="设备当前状态：" prop="devStatus">
        <el-input v-model="iotDeviceDesign.devStatus"></el-input>
      </el-form-item>
      <el-form-item label="注册时间：" prop="devRegTime">
        <el-input v-model="iotDeviceDesign.devRegTime"></el-input>
      </el-form-item>
      <el-form-item label="注册人：" prop="devRegister">
        <el-input v-model="iotDeviceDesign.devRegister"></el-input>
      </el-form-item>
      <el-form-item label="注册数据来源：" prop="devSegWay">
        <el-input v-model="iotDeviceDesign.devSegWay"></el-input>
      </el-form-item>
      <el-form-item label="发货时间：" prop="devSendoutTime">
        <el-input v-model="iotDeviceDesign.devSendoutTime"></el-input>
      </el-form-item>
      <el-form-item label="发货人：" prop="devSendouter">
        <el-input v-model="iotDeviceDesign.devSendouter"></el-input>
      </el-form-item>
      <el-form-item label="发货批次：" prop="devSendoutBatch">
        <el-input v-model="iotDeviceDesign.devSendoutBatch"></el-input>
      </el-form-item>
      <el-form-item label="发货数据来源：" prop="devSendoutWay">
        <el-input v-model="iotDeviceDesign.devSendoutWay"></el-input>
      </el-form-item>
      <el-form-item label="入库时间：" prop="devPutinTime">
        <el-input v-model="iotDeviceDesign.devPutinTime"></el-input>
      </el-form-item>
      <el-form-item label="入库人：" prop="devPutiner">
        <el-input v-model="iotDeviceDesign.devPutiner"></el-input>
      </el-form-item>
      <el-form-item label="入库数据来源：" prop="devPutinWay">
        <el-input v-model="iotDeviceDesign.devPutinWay"></el-input>
      </el-form-item>
      <el-form-item label="安装时间：" prop="devInstTime">
        <el-input v-model="iotDeviceDesign.devInstTime"></el-input>
      </el-form-item>
      <el-form-item label="安装人：" prop="devInster">
        <el-input v-model="iotDeviceDesign.devInster"></el-input>
      </el-form-item>
      <el-form-item label="安装数据来源：" prop="devInstWay">
        <el-input v-model="iotDeviceDesign.devInstWay"></el-input>
      </el-form-item>
      <el-form-item label="最后一次上传时间：" prop="devLastUpTime">
        <el-input v-model="iotDeviceDesign.devLastUpTime"></el-input>
      </el-form-item>
      <el-form-item label="最后一次上传ID：" prop="devLastUpId">
        <el-input v-model="iotDeviceDesign.devLastUpId"></el-input>
      </el-form-item>
      <el-form-item label="表册编号：" prop="bookletId">
        <el-input v-model="iotDeviceDesign.bookletId"></el-input>
      </el-form-item>
      <el-form-item label="最后一次计费日期：" prop="lastCalcDate">
        <el-input v-model="iotDeviceDesign.lastCalcDate"></el-input>
      </el-form-item>
      <el-form-item label="年累计用水量：" prop="yearusenum">
        <el-input v-model="iotDeviceDesign.yearusenum"></el-input>
      </el-form-item>
      <el-form-item label="最后一次计费止码：" prop="lastCalcCode">
        <el-input v-model="iotDeviceDesign.lastCalcCode"></el-input>
      </el-form-item>
      <el-form-item label="设备编号：" prop="devNo">
        <el-input v-model="iotDeviceDesign.devNo"></el-input>
      </el-form-item>
      <el-form-item label="上传渠道类型：" prop="channelType" clearable>
        <el-select
          v-model="iotDeviceDesign.channelType"
          placeholder="请选择上传渠道类型">
          <el-option
            v-for="item in channelTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>      
      <el-form-item>
        <el-button type="primary" @click="onSubmit('iotDeviceDesignFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('iotDeviceDesignFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createIotDeviceDesign, getIotDeviceDesign, updateIotDeviceDesign} from '@/api/iotDeviceDesign'
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultIotDeviceDesign={
    parentId: '',
    devType: '',
    devVerId: 0,
    devMacId: '',
    imei: '',
    imsi: '',
    areaId: 0,
    custId: '',
    instAddress: '',
    mapX: '',
    mapY: '',
    mapIcon: '',
    factId: '',
    userId: '',
    devStatus: 0,
    devRegTime: '',
    devRegister: '',
    devSegWay: 0,
    devSendoutTime: '',
    devSendouter: '',
    devSendoutBatch: '',
    devSendoutWay: 0,
    devPutinTime: '',
    devPutiner: '',
    devPutinWay: 0,
    devInstTime: '',
    devInster: '',
    devInstWay: 0,
    devLastUpTime: '',
    devLastUpId: '',
    bookletId: '',
    lastCalcDate: '',
    yearusenum: '',
    lastCalcCode: '',
    devNo: '',
    channelType: ''
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
    name: 'IotDeviceDesignDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        iotDeviceDesign:Object.assign({}, defaultIotDeviceDesign),
        devTypeOptions: Object.assign({},defaultDevTypeOptions),
        channelTypeOptions: Object.assign({},defaultChannelTypeOptions),
        rules: {
          devVerId: [
            {required: true, message: '请输入产品型号编号', trigger: 'blur'}
          ],
          devMacId: [
            {required: true, message: '请输入设备出厂编号', trigger: 'blur'}
          ],
          devStatus: [
            {required: true, message: '请输入设备当前状态', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getIotDeviceDesign(this.$route.query.id).then(response => {
          this.iotDeviceDesign = response.data;
        });
      }else{
        this.iotDeviceDesign = Object.assign({},defaultIotDeviceDesign);
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateIotDeviceDesign(this.$route.query.id, this.iotDeviceDesign).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createIotDeviceDesign(this.iotDeviceDesign).then(response => {
                  this.$refs[formName].resetFields();
                  this.iotDeviceDesign = Object.assign({},defaultIotDeviceDesign);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.iotDeviceDesign = Object.assign({},defaultIotDeviceDesign);
      }
    }
  }
</script>
<style>
</style>


