<template> 
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="填写基本信息"></el-step>
      <el-step title="填写联系信息"></el-step>
      <el-step title="填写配置信息"></el-step>
      <el-step title="填写系统信息"></el-step>
    </el-steps>
    <tenant-basic-detail
      v-show="showStatus[0]"
      v-model="tenantInfoParam"
      :is-edit="isEdit"
      @nextStep="nextStep">
    </tenant-basic-detail>
    <tenant-link-detail
      v-show="showStatus[1]"
      v-model="tenantInfoParam"
      :is-edit="isEdit"
      @nextStep="nextStep"
      @prevStep="prevStep">
    </tenant-link-detail>
    <tenant-config-detail
      v-show="showStatus[2]"
      v-model="tenantInfoParam"
      :is-edit="isEdit"
      @nextStep="nextStep"
      @prevStep="prevStep">
    </tenant-config-detail>
    <tenant-system-detail
      v-show="showStatus[3]"
      v-model="tenantInfoParam"
      :is-edit="isEdit"
      @prevStep="prevStep"
      @finishCommit="finishCommit">
    </tenant-system-detail>
  </el-card>
</template>
<script>
  import TenantBasicDetail from './TenantBasicDetail';
  import TenantLinkDetail from './TenantLinkDetail';
  import TenantConfigDetail from './TenantConfigDetail';
  import TenantSystemDetail from './TenantSystemDetail';
  
  import {createTenantInfo,getTenantInfo,updateTenantInfo} from '@/api/tenantInfo';

  const defaultTenantInfoParam = {
    tenantName: '',
    tenantBalance: '',
    tenantDisplayName: '',
    tenantProvince: '',
    tenantCity: '',
    tenantArea: '',
    tenantAddress: '',
    tenantLinkman: '',
    tenantMobile: '',
    tenantPhone: '',
    tenantEmail: '',
    tenantQq: '',
    tenantType: 0,
    tenantStatus: 0,
    registerDate: '',
    expireDate: '',
    creditNumber: '',
    invoiceAddress: '',
    bankNo: '',
    bankName: '',
    bankAccount: '',
    partChargeOn: 0,
    fineOn: 0,
    fineDay: 0,
    fineRate: '',
    fineRateCap: '',
    productLadderList: [{count: 0,discount: 0,price: 0}],
    //租户系统
    tenantSystemList: [{systemId: null,systemOrder: 0,systemEdition: 0,systemStatus: 0}]
  };
  export default {
    name: 'TenantInfoDetail',
    components: {TenantBasicDetail, TenantLinkDetail, TenantConfigDetail, TenantSystemDetail},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        active: 0,
        tenantInfoParam: Object.assign({}, defaultTenantInfoParam),
        showStatus: [true, false, false, false]
      }
    },
    created(){
      if(this.isEdit){
        getTenantInfo(this.$route.query.id).then(response=>{
          this.tenantInfoParam=response.data;
        });
      }
    },
    methods: {
      hideAll() {
        for (let i = 0; i < this.showStatus.length; i++) {
          this.showStatus[i] = false;
        }
      },
      prevStep() {
        if (this.active > 0 && this.active < this.showStatus.length) {
          this.active--;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },
      nextStep() {
        if (this.active < this.showStatus.length - 1) {
          this.active++;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },
      finishCommit(isEdit) {
        this.$confirm('是否要提交该租户', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(isEdit){
            updateTenantInfo(this.$route.query.id,this.tenantInfoParam).then(response=>{
              this.$message({
                type: 'success',
                message: '提交成功',
                duration:1000
              });
              this.$router.back();
            });
          }else{
            createTenantInfo(this.tenantInfoParam).then(response=>{
              this.$message({
                type: 'success',
                message: '提交成功',
                duration:1000
              });
              location.reload();
            });
          }
        })
      }
    }
  }
</script>
<style>
  .form-container {
    width: 800px;
  }
</style>


