<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="tenantInfoForm" size="small">
      <el-form-item>
      <el-table :data="value.tenantSystemList"
                  style="width: 100%" border>
          <el-table-column
            label="系统"
            align="center"
            width="120">
            <template slot-scope="scope">              
              <el-select v-model="scope.row.systemId" placeholder="请选择系统" clearable>
                <el-option
                  v-for="item in systemInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="系统"
            align="center"
            width="120">            
            <template slot-scope="scope">
              <el-input v-model="scope.row.systemId"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="顺序"
            align="center"
            width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.systemOrder"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="版本"
            align="center"
            width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.systemEdition" clearable>
                <el-option
                  v-for="item in systemEditionOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            align="center"
            width="120">            
            <template slot-scope="scope">
              <el-select v-model="scope.row.systemStatus" clearable>
                <el-option
                  v-for="item in systemStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="handleRemoveTenantSystemList(scope.$index, scope.row)">删除</el-button>
              <el-button type="text" @click="handleAddTenantSystemList(scope.$index, scope.row)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>      
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，填写配置信息</el-button>
        <el-button type="primary" size="medium" @click="handleFinishCommit">完成，提交租户信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>  
  import {getTenantInfo} from '@/api/tenantInfo';
  import {fetchList as fetchSystemInfoList} from '@/api/systemInfo';

  const defaultSystemEditionOptions=[
    {
      value: 0,
      label: '基础版'
    },
    {
      value: 1,
      label: '高级版'
    },
    {
      value: 2,
      label: '旗舰版'
    }
  ];

  const defaultSystemStatusOptions=[
    {
      value: 0,
      label: '未开通'
    },
    {
      value: 1,
      label: '开通'
    }
  ];

  const defaultTenantSystem = {
    systemId: null,
    systemOrder: 0,
    systemEdition: 0,
    systemStatus: 0
  };

  export default {
    name: "TenantSystemDetail",
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {        
        hasEditCreated:false,        
        rules: {
          
        },
        systemInfoOptions: [],
        systemEditionOptions: Object.assign({},defaultSystemEditionOptions),
        systemStatusOptions: Object.assign({},defaultSystemStatusOptions),
      };
    },
    created() {      
      this.getSystemInfoList();  
    },
    computed:{
      //租户的编号
      tenantInfoId(){
        return this.value.id;
      }
    },
    watch: {
      tenantInfoId:function(newValue){
        if(!this.isEdit)return;
        if(this.hasEditCreated)return;
        if(newValue===undefined||newValue==null||newValue===0)return;
        this.handleEditCreated();
      }
    },
    methods: {
      //处理编辑逻辑
      handleEditCreated(){
        this.hasEditCreated=true;
      },
      getSystemInfoList() {
        fetchSystemInfoList({pageNum: 1, pageSize: 10000}).then(response => {
          this.systemInfoOptions = [];
          let systemInfoList = response.data.list;
          for (let i = 0; i < systemInfoList.length; i++) {
            this.systemInfoOptions.push({label: "["+systemInfoList[i].id+"]"+systemInfoList[i].systemName, value: systemInfoList[i].id});
          }
        });
      },
      handleRemoveTenantSystemList(index, row) {
        let tenantSystemList = this.value.tenantSystemList;
        if (tenantSystemList.length === 1) {
          tenantSystemList.pop();
          tenantSystemList.push(defaultTenantSystem)
        } else {
          tenantSystemList.splice(index, 1);
        }
      },
      handleAddTenantSystemList(index, row) {
        let tenantSystemList = this.value.tenantSystemList;
        if (tenantSystemList.length < 3) {
          tenantSystemList.push(defaultTenantSystem)
        } else {
          this.$message({
            message: '最多只能添加三条',
            type: 'warning'
          });
        }
      },
      handlePrev(){
        this.$emit('prevStep')
      },      
      handleFinishCommit(){
        this.$emit('finishCommit',this.isEdit);
      }
    }
  }
</script>

<style scoped>
</style>
