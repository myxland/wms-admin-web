<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tenantBooklet" :rules="rules" ref="tenantBookletFrom" label-width="150px">
      <el-form-item label="表册ID：" prop="id">
        {{tenantBooklet.id}}
      </el-form-item>
      <el-form-item label="租户ID：" prop="tenantId">
        {{tenantBooklet.tenantName}}
      </el-form-item>
      <el-form-item label="所属部门ID：" prop="bookletDepartmentId">
      	{{tenantBooklet.bookletDepartmentId}}
      </el-form-item>
      <el-form-item label="所属供水区域ID：" prop="bookletWaterAreaId">
      	{{tenantBooklet.bookletWaterAreaId}}
      </el-form-item>
      <el-form-item label="表册代码：" prop="bookletCode">
      	{{tenantBooklet.bookletCode}}
      </el-form-item>
      <el-form-item label="表册名称：" prop="bookletName">
      	{{tenantBooklet.bookletName}}
      </el-form-item>
      <el-form-item label="抄表员ID：" prop="bookletReadEmployeeId">
      	{{tenantBooklet.bookletReadEmployeeId}}
      </el-form-item>
      <el-form-item label="收费员ID：" prop="bookletChargeEmployeeId">
      	{{tenantBooklet.bookletChargeEmployeeId}}
      </el-form-item>
      <el-form-item label="结算间隔周期[月]：" prop="bookletSettleCycleInterval">
      	{{tenantBooklet.bookletSettleCycleInterval}}
      </el-form-item>
      <el-form-item label="最后一次结算月份：" prop="bookletLastSettleMonth">
        {{tenantBooklet.bookletLastSettleMonth}}
      </el-form-item>
      <el-form-item label="下次计划结算月份：" prop="bookletNextSettleMonth">
        {{tenantBooklet.bookletNextSettleMonth}}
      </el-form-item>
      <el-form-item label="表册状态：" prop="bookletStatus">
        {{tenantBooklet.bookletStatus | formatBookletStatus}}
      </el-form-item>
      <el-form-item label="表册可用状态：" prop="bookletOn">
        <el-switch
          v-model="tenantBooklet.bookletOn"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTenantBooklet} from '@/api/tenantBooklet'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {formatDate} from '@/utils/date';

  const defaultTenantBooklet={
    tenantId: '',
    bookletDepartmentId: '',
    bookletWaterAreaId: '',
    bookletCode: '',
    bookletName: '',
    bookletReadEmployeeId: '',
    bookletChargeEmployeeId: '',
    bookletSettleCycleInterval: 0,
    bookletLastSettleMonth: '',
    bookletNextSettleMonth: '',
    bookletStatus: '',
    bookletOn: 1
  };
  const defaultBookletStatusOptions=[
    {
      value: 1,
      label: '抄表进行中'
    },
    {
      value: 2,
      label: '抄表截止'
    }
  ];
  export default {
    name: 'TenantBookletView',
    data() {
      return {
        tenantBooklet:Object.assign({}, defaultTenantBooklet),
        bookletStatusOptions: Object.assign({},defaultBookletStatusOptions),
        rules: {
        }
      }
    },
    created() {
      getTenantBooklet(this.$route.query.id).then(response => {
	      let data = response.data;
	      data.bookletLastSettleMonth = formatDate(new Date(data.bookletLastSettleMonth), 'yyyy-MM-dd');
	      data.bookletNextSettleMonth = formatDate(new Date(data.bookletNextSettleMonth), 'yyyy-MM-dd');
	      this.tenantBooklet = data;
	      //this.tenantBooklet = response.data;
      });
    },
    filters: {
      formatBookletStatus(bookletStatus){
      	for(let i=0;i<defaultBookletStatusOptions.length;i++){
      		if(bookletStatus===defaultBookletStatusOptions[i].value){
      			return defaultBookletStatusOptions[i].label;
      		}
      	}
      },
    },
    methods: {
    }
  }
</script>
<style>
</style>