<template> 
  <div class="app-container">
  <el-card class="filter-container" shadow="never">
    <el-form :model="tenantEmployee" :rules="rules" ref="tenantEmployeeFrom" label-width="150px">
      <el-form-item label="系统ID：" prop="id">
        <el-input v-model="tenantEmployee.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="租户：" prop="tenantId">
        <el-select v-model="tenantEmployee.tenantId" placeholder="请选择租户" :disabled="this.$route.query.tenantId?true:false" clearable>
                <el-option
                  v-for="item in tenantInfoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="员工名称：" prop="empName">
        <el-input v-model="tenantEmployee.empName" :disabled="true"></el-input>
      </el-form-item>      
      <el-form-item>
        <div class="table-container">
          <el-table ref="tenantRoleTable"
                    :data="list"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    v-loading="listLoading"
                    border>
            <el-table-column type="selection" width="60" align="center"></el-table-column>
            <el-table-column label="系统ID" width="180" align="left" header-align="center">
              <template slot-scope="scope">{{scope.row.id}}</template>
            </el-table-column>
            <el-table-column label="角色名称" width="" align="left" header-align="center">
              <template slot-scope="scope">{{scope.row.roleName}}</template>
            </el-table-column>
            <el-table-column label="角色说明" width="100" align="left" header-align="center">
              <template slot-scope="scope">{{scope.row.roleRemark}}</template>
            </el-table-column>        
          </el-table>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tenantEmployeeFrom')">提交</el-button>
      </el-form-item>
    </el-form>

  </el-card>
  
  </div>
</template>
<script>
  import {getTenantEmployee, updateTenantEmployee} from '@/api/tenantEmployee'
  import {fetchList as fetchTenantInfoList} from '@/api/tenantInfo';
  import {fetchList as fetchTenantRoleList} from '@/api/tenantRole';
  import {fetchList as fetchTenantEmployeeRoleList,createBatchTenantEmployeeRoleByEmpId} from '@/api/tenantEmployeeRole';
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTenantEmployee={
    tenantId: '',
    empName: ''
  };
  export default {
    name: 'TenantEmployeeDetail',
    components:{SingleUpload},
    props: {
    },
    data() {
      return {
        list: null,         
        total: null,
        listLoading: true,
        multipleSelection:[],
        tenantEmployee:Object.assign({}, defaultTenantEmployee, this.$route.query),
        tenantInfoOptions:[],       
        rules: {
         
        }
      }
    },
    created() {
      this.getList();
      if (this.$route.query.id) {
          getTenantEmployee(this.$route.query.id).then(response => {
          this.tenantEmployee = response.data;
        });
      }
      else if (this.$route.query.tenantId) {
        getTenantEmployeeByTenantId(this.$route.query.tenantId).then(response => {
          this.tenantEmployee = response.data;
        });
      }
      this.getTenantInfoList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        fetchTenantRoleList({pageNum:1,pageSize:500,tenantId:this.$route.query.tenantId}).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          //this.total = response.data.total;
          //this.totalPage = response.data.totalPage;
          //this.pageSize = response.data.pageSize;

          this.$refs.tenantRoleTable.clearSelection();
          //this.multipleSelection=[];
          fetchTenantEmployeeRoleList({pageNum:1,pageSize:500,empId:this.$route.query.id,tenantId:this.$route.query.tenantId}).then(response => {
            let tenantEmployeeRoleList = response.data.list;
            for(let i=0;i<tenantEmployeeRoleList.length;i++){
              //this.multipleSelection.push(tenantEmployeeRoleList[i].roleId);              
              for(let n=0;n<this.$refs.tenantRoleTable.data.length;n++){
                if(tenantEmployeeRoleList[i].roleId == this.$refs.tenantRoleTable.data[n].id){
                  this.$refs.tenantRoleTable.toggleRowSelection(this.$refs.tenantRoleTable.data[n],true);
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

              //updateTenantEmployee(this.$route.query.id, this.tenantEmployee).then(response => {
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
                roleIds:this.multipleSelection.map(function(elem,index){
                      return elem.id;
                }).join(",")
              };

              createBatchTenantEmployeeRoleByEmpId(this.$route.query.id,tenantEmployeeRoleBatchData).then(response => {
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


