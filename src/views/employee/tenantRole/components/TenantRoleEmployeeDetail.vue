<template> 
  <div class="app-container">
  <el-card class="filter-container" shadow="never">
    <el-form :model="tenantRole" :rules="rules" ref="tenantRoleFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        <el-input v-model="tenantRole.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="tenantRole.tenantId" placeholder="请选择租户" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色名称：" prop="roleName">
        <el-input v-model="tenantRole.roleName" :disabled="true"></el-input>
      </el-form-item>      
      <el-form-item>
        <div class="table-container">
          <el-table ref="tenantEmployeeTable"
                    :data="list"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    v-loading="listLoading"
                    border>
            <el-table-column type="selection" width="60" align="center"></el-table-column>
            <el-table-column label="系统ID" width="180" align="left" header-align="center">
              <template slot-scope="scope">{{scope.row.id}}</template>
            </el-table-column>
            <el-table-column label="员工名称" width="" align="left" header-align="center">
              <template slot-scope="scope">{{scope.row.roleName}}</template>
            </el-table-column>
            <el-table-column label="员工部门" width="100" align="left" header-align="center">
              <template slot-scope="scope">{{scope.row.deptName}}</template>
            </el-table-column>
            <el-table-column label="员工手机号" width="120" align="left" header-align="center">
              <template slot-scope="scope">{{scope.row.empMobile}}</template>
            </el-table-column>      
          </el-table>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantRoleFrom')">提交</el-button>
      </el-form-item>
    </el-form>

  </el-card>
  
  </div>
</template>
<script>
  import {getTenantRole, updateTenantRole} from '@/api/tenantRole'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {fetchList as fetchTenantEmployeeList} from '@/api/tenantEmployee';
  import {fetchList as fetchTenantEmployeeRoleList,createBatchTenantEmployeeRoleByRoleId} from '@/api/tenantEmployeeRole';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantRole={
    tenantId: '',
    roleName: ''
  };
  export default {
    name: 'TenantRoleEmployeeDetail',
    components:{SingleUpload},
    props: {
    },
    data() {
      return {
        list: null,         
        total: null,
        listLoading: true,
        multipleSelection:[],
        tenantRole:Object.assign({}, defaultTenantRole, this.$route.query),
        tenantInfoOptions:[],       
        rules: {
         
        }
      }
    },
    created() {
      this.getList();
      if (this.$route.query.id) {
          getTenantRole(this.$route.query.id).then(response => {
          this.tenantRole = response.data;
        });
      }
      else if (this.$route.query.tenantId) {
        getTenantRoleByTenantId(this.$route.query.tenantId).then(response => {
          this.tenantRole = response.data;
        });
      }
      this.getTenantInfoList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        fetchTenantEmployeeList({pageNum:1,pageSize:500,tenantId:this.$route.query.tenantId}).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          //this.total = response.data.total;
          //this.totalPage = response.data.totalPage;
          //this.pageSize = response.data.pageSize;

          this.$refs.tenantEmployeeTable.clearSelection();
          //this.multipleSelection=[];
          fetchTenantEmployeeRoleList({pageNum:1,pageSize:500,roleId:this.$route.query.id,tenantId:this.$route.query.tenantId}).then(response => {
            let tenantEmployeeRoleList = response.data.list;
            for(let i=0;i<tenantEmployeeRoleList.length;i++){
              //this.multipleSelection.push(tenantEmployeeRoleList[i].roleId);              
              for(let n=0;n<this.$refs.tenantEmployeeTable.data.length;n++){
                if(tenantEmployeeRoleList[i].empId == this.$refs.tenantEmployeeTable.data[n].id){
                  this.$refs.tenantEmployeeTable.toggleRowSelection(this.$refs.tenantEmployeeTable.data[n],true);
                }
              }
            }
            
          });

        });

        
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              //alert(this.multipleSelection.length);
              //alert(this.multipleSelection[0].id);
              //return;

              //updateTenantEmployee(this.$route.query.id, this.tenantRole).then(response => {
              //    this.$refs[formName].resetFields();
              //    this.$message({
              //      message: '修改成功',
              //      type: 'success',
              //      duration:1000
              //    });
              //    this.$router.back();
              //});

              let tenantEmployeeRoleBatchData = {
                tenantId:this.$route.query.tenantId,
                empIds:this.multipleSelection.map(function(elem,index){
                      return elem.id;
                }).join(",")
              };

              createBatchTenantEmployeeRoleByRoleId(this.$route.query.id,tenantEmployeeRoleBatchData).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
              });

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
      }
    }
  }
</script>
<style>
</style>


