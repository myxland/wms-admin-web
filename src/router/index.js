import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  },
  {
    path: '/tenant',
    component: Layout,
    redirect: '/tenant/tenantInfo',
    name: 'tenant',
    meta: {title: '租户', icon: 'tenantInfo'},
    children: [{
      path: 'tenantInfo',
      name: 'tenantInfo',
      component: () => import('@/views/tenant/tenantInfo/index'),
      meta: {title: '租户列表', icon: 'tenantInfo-list'}
    },
      {
        path: 'addTenantInfo',
        name: 'addTenantInfo',
        component: () => import('@/views/tenant/tenantInfo/add'),
        meta: {title: '添加租户', icon: 'tenantInfo-add'},
        hidden: true
      },
      {
        path: 'updateTenantInfo',
        name: 'updateTenantInfo',
        component: () => import('@/views/tenant/tenantInfo/update'),
        meta: {title: '修改租户', icon: 'tenantInfo-add'},
        hidden: true
      },
      {
        path: 'tenantAccount',
        name: 'tenantAccount',
        component: () => import('@/views/tenant/tenantAccount/index'),
        meta: {title: '租户账户列表', icon: 'tenantAccount-list'}
      },
      {
        path: 'addTenantAccount',
        name: 'addTenantAccount',
        component: () => import('@/views/tenant/tenantAccount/add'),
        meta: {title: '添加租户账户', icon: 'tenantAccount-add'},
        hidden: true
      },
      {
        path: 'updateTenantAccount',
        name: 'updateTenantAccount',
        component: () => import('@/views/tenant/tenantAccount/update'),
        meta: {title: '修改租户账户', icon: 'tenantAccount-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/mbg',
    component: Layout,
    redirect: '/mbg/tenantSms',
    name: 'mbg',
    meta: {title: '租户短信配置', icon: 'tenantSms'},
    children: [{
      path: 'tenantSms',
      name: 'tenantSms',
      component: () => import('@/views/mbg/tenantSms/index'),
      meta: {title: '租户短信配置列表', icon: 'tenantSms-list'}
    },
      {
        path: 'addTenantSms',
        name: 'addTenantSms',
        component: () => import('@/views/mbg/tenantSms/add'),
        meta: {title: '添加租户短信配置', icon: 'tenantSms-add'},
        hidden: true
      },
      {
        path: 'updateTenantSms',
        name: 'updateTenantSms',
        component: () => import('@/views/mbg/tenantSms/update'),
        meta: {title: '修改租户短信配置', icon: 'tenantSms-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/mbg',
    component: Layout,
    redirect: '/mbg/tenantAccount',
    name: 'mbg',
    meta: {title: '租户账户', icon: 'tenantAccount'},
    children: [{
      path: 'tenantAccount',
      name: 'tenantAccount',
      component: () => import('@/views/mbg/tenantAccount/index'),
      meta: {title: '租户账户列表', icon: 'tenantAccount-list'}
    },
      {
        path: 'addTenantAccount',
        name: 'addTenantAccount',
        component: () => import('@/views/mbg/tenantAccount/add'),
        meta: {title: '添加租户账户', icon: 'tenantAccount-add'},
        hidden: true
      },
      {
        path: 'updateTenantAccount',
        name: 'updateTenantAccount',
        component: () => import('@/views/mbg/tenantAccount/update'),
        meta: {title: '修改租户账户', icon: 'tenantAccount-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/mbg',
    component: Layout,
    redirect: '/mbg/tenantBill',
    name: 'mbg',
    meta: {title: '租户账单配置', icon: 'tenantBill'},
    children: [{
      path: 'tenantBill',
      name: 'tenantBill',
      component: () => import('@/views/mbg/tenantBill/index'),
      meta: {title: '租户账单配置列表', icon: 'tenantBill-list'}
    },
      {
        path: 'addTenantBill',
        name: 'addTenantBill',
        component: () => import('@/views/mbg/tenantBill/add'),
        meta: {title: '添加租户账单配置', icon: 'tenantBill-add'},
        hidden: true
      },
      {
        path: 'updateTenantBill',
        name: 'updateTenantBill',
        component: () => import('@/views/mbg/tenantBill/update'),
        meta: {title: '修改租户账单配置', icon: 'tenantBill-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/systemDesign',
    name: 'system',
    meta: {title: '系统定义', icon: 'systemDesign'},
    children: [{
      path: 'systemDesign',
      name: 'systemDesign',
      component: () => import('@/views/system/systemDesign/index'),
      meta: {title: '系统定义列表', icon: 'systemDesign-list'}
    },
      {
        path: 'addSystemDesign',
        name: 'addSystemDesign',
        component: () => import('@/views/system/systemDesign/add'),
        meta: {title: '添加系统定义', icon: 'systemDesign-add'},
        hidden: true
      },
      {
        path: 'updateSystemDesign',
        name: 'updateSystemDesign',
        component: () => import('@/views/system/systemDesign/update'),
        meta: {title: '修改系统定义', icon: 'systemDesign-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/systemMenuDesign',
    name: 'system',
    meta: {title: '模块菜单', icon: 'systemMenuDesign'},
    children: [{
      path: 'systemMenuDesign',
      name: 'systemMenuDesign',
      component: () => import('@/views/system/systemMenuDesign/index'),
      meta: {title: '模块菜单列表', icon: 'systemMenuDesign-list'}
    },
      {
        path: 'addSystemMenuDesign',
        name: 'addSystemMenuDesign',
        component: () => import('@/views/system/systemMenuDesign/add'),
        meta: {title: '添加模块菜单', icon: 'systemMenuDesign-add'},
        hidden: true
      },
      {
        path: 'updateSystemMenuDesign',
        name: 'updateSystemMenuDesign',
        component: () => import('@/views/system/systemMenuDesign/update'),
        meta: {title: '修改模块菜单', icon: 'systemMenuDesign-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/systemPrice',
    name: 'system',
    meta: {title: '模块价格', icon: 'systemPrice'},
    children: [{
      path: 'systemPrice',
      name: 'systemPrice',
      component: () => import('@/views/system/systemPrice/index'),
      meta: {title: '模块价格列表', icon: 'systemPrice-list'}
    },
      {
        path: 'addSystemPrice',
        name: 'addSystemPrice',
        component: () => import('@/views/system/systemPrice/add'),
        meta: {title: '添加模块价格', icon: 'systemPrice-add'},
        hidden: true
      },
      {
        path: 'updateSystemPrice',
        name: 'updateSystemPrice',
        component: () => import('@/views/system/systemPrice/update'),
        meta: {title: '修改模块价格', icon: 'systemPrice-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/mbg',
    component: Layout,
    redirect: '/mbg/tenantSystem',
    name: 'mbg',
    meta: {title: '租户模块', icon: 'tenantSystem'},
    children: [{
      path: 'tenantSystem',
      name: 'tenantSystem',
      component: () => import('@/views/mbg/tenantSystem/index'),
      meta: {title: '租户模块列表', icon: 'tenantSystem-list'}
    },
      {
        path: 'addTenantSystem',
        name: 'addTenantSystem',
        component: () => import('@/views/mbg/tenantSystem/add'),
        meta: {title: '添加租户模块', icon: 'tenantSystem-add'},
        hidden: true
      },
      {
        path: 'updateTenantSystem',
        name: 'updateTenantSystem',
        component: () => import('@/views/mbg/tenantSystem/update'),
        meta: {title: '修改租户模块', icon: 'tenantSystem-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/mbg',
    component: Layout,
    redirect: '/mbg/tenantSystemPrice',
    name: 'mbg',
    meta: {title: '租户模块价格', icon: 'tenantSystemPrice'},
    children: [{
      path: 'tenantSystemPrice',
      name: 'tenantSystemPrice',
      component: () => import('@/views/mbg/tenantSystemPrice/index'),
      meta: {title: '租户模块价格列表', icon: 'tenantSystemPrice-list'}
    },
      {
        path: 'addTenantSystemPrice',
        name: 'addTenantSystemPrice',
        component: () => import('@/views/mbg/tenantSystemPrice/add'),
        meta: {title: '添加租户模块价格', icon: 'tenantSystemPrice-add'},
        hidden: true
      },
      {
        path: 'updateTenantSystemPrice',
        name: 'updateTenantSystemPrice',
        component: () => import('@/views/mbg/tenantSystemPrice/update'),
        meta: {title: '修改租户模块价格', icon: 'tenantSystemPrice-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/mbg',
    component: Layout,
    redirect: '/mbg/tenantDept',
    name: 'mbg',
    meta: {title: '租户部门', icon: 'tenantDept'},
    children: [{
      path: 'tenantDept',
      name: 'tenantDept',
      component: () => import('@/views/mbg/tenantDept/index'),
      meta: {title: '租户部门列表', icon: 'tenantDept-list'}
    },
      {
        path: 'addTenantDept',
        name: 'addTenantDept',
        component: () => import('@/views/mbg/tenantDept/add'),
        meta: {title: '添加租户部门', icon: 'tenantDept-add'},
        hidden: true
      },
      {
        path: 'updateTenantDept',
        name: 'updateTenantDept',
        component: () => import('@/views/mbg/tenantDept/update'),
        meta: {title: '修改租户部门', icon: 'tenantDept-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/mbg',
    component: Layout,
    redirect: '/mbg/tenantCustType',
    name: 'mbg',
    meta: {title: '用户类型', icon: 'tenantCustType'},
    children: [{
      path: 'tenantCustType',
      name: 'tenantCustType',
      component: () => import('@/views/mbg/tenantCustType/index'),
      meta: {title: '用户类型列表', icon: 'tenantCustType-list'}
    },
      {
        path: 'addTenantCustType',
        name: 'addTenantCustType',
        component: () => import('@/views/mbg/tenantCustType/add'),
        meta: {title: '添加用户类型', icon: 'tenantCustType-add'},
        hidden: true
      },
      {
        path: 'updateTenantCustType',
        name: 'updateTenantCustType',
        component: () => import('@/views/mbg/tenantCustType/update'),
        meta: {title: '修改用户类型', icon: 'tenantCustType-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/mbg',
    component: Layout,
    redirect: '/mbg/tenantWaterType',
    name: 'mbg',
    meta: {title: '用水类型', icon: 'tenantWaterType'},
    children: [{
      path: 'tenantWaterType',
      name: 'tenantWaterType',
      component: () => import('@/views/mbg/tenantWaterType/index'),
      meta: {title: '用水类型列表', icon: 'tenantWaterType-list'}
    },
      {
        path: 'addTenantWaterType',
        name: 'addTenantWaterType',
        component: () => import('@/views/mbg/tenantWaterType/add'),
        meta: {title: '添加用水类型', icon: 'tenantWaterType-add'},
        hidden: true
      },
      {
        path: 'updateTenantWaterType',
        name: 'updateTenantWaterType',
        component: () => import('@/views/mbg/tenantWaterType/update'),
        meta: {title: '修改用水类型', icon: 'tenantWaterType-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/mbg',
    component: Layout,
    redirect: '/mbg/tenantPriceType',
    name: 'mbg',
    meta: {title: '价格类别', icon: 'tenantPriceType'},
    children: [{
      path: 'tenantPriceType',
      name: 'tenantPriceType',
      component: () => import('@/views/mbg/tenantPriceType/index'),
      meta: {title: '价格类别列表', icon: 'tenantPriceType-list'}
    },
      {
        path: 'addTenantPriceType',
        name: 'addTenantPriceType',
        component: () => import('@/views/mbg/tenantPriceType/add'),
        meta: {title: '添加价格类别', icon: 'tenantPriceType-add'},
        hidden: true
      },
      {
        path: 'updateTenantPriceType',
        name: 'updateTenantPriceType',
        component: () => import('@/views/mbg/tenantPriceType/update'),
        meta: {title: '修改价格类别', icon: 'tenantPriceType-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/mbg',
    component: Layout,
    redirect: '/mbg/tenantPriceItem',
    name: 'mbg',
    meta: {title: '费用项目', icon: 'tenantPriceItem'},
    children: [{
      path: 'tenantPriceItem',
      name: 'tenantPriceItem',
      component: () => import('@/views/mbg/tenantPriceItem/index'),
      meta: {title: '费用项目列表', icon: 'tenantPriceItem-list'}
    },
      {
        path: 'addTenantPriceItem',
        name: 'addTenantPriceItem',
        component: () => import('@/views/mbg/tenantPriceItem/add'),
        meta: {title: '添加费用项目', icon: 'tenantPriceItem-add'},
        hidden: true
      },
      {
        path: 'updateTenantPriceItem',
        name: 'updateTenantPriceItem',
        component: () => import('@/views/mbg/tenantPriceItem/update'),
        meta: {title: '修改费用项目', icon: 'tenantPriceItem-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/mbg',
    component: Layout,
    redirect: '/mbg/tenantPriceStep',
    name: 'mbg',
    meta: {title: '价格阶梯', icon: 'tenantPriceStep'},
    children: [{
      path: 'tenantPriceStep',
      name: 'tenantPriceStep',
      component: () => import('@/views/mbg/tenantPriceStep/index'),
      meta: {title: '价格阶梯列表', icon: 'tenantPriceStep-list'}
    },
      {
        path: 'addTenantPriceStep',
        name: 'addTenantPriceStep',
        component: () => import('@/views/mbg/tenantPriceStep/add'),
        meta: {title: '添加价格阶梯', icon: 'tenantPriceStep-add'},
        hidden: true
      },
      {
        path: 'updateTenantPriceStep',
        name: 'updateTenantPriceStep',
        component: () => import('@/views/mbg/tenantPriceStep/update'),
        meta: {title: '修改价格阶梯', icon: 'tenantPriceStep-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/mbg',
    component: Layout,
    redirect: '/mbg/tenantPriceDetail',
    name: 'mbg',
    meta: {title: '价格明细', icon: 'tenantPriceDetail'},
    children: [{
      path: 'tenantPriceDetail',
      name: 'tenantPriceDetail',
      component: () => import('@/views/mbg/tenantPriceDetail/index'),
      meta: {title: '价格明细列表', icon: 'tenantPriceDetail-list'}
    },
      {
        path: 'addTenantPriceDetail',
        name: 'addTenantPriceDetail',
        component: () => import('@/views/mbg/tenantPriceDetail/add'),
        meta: {title: '添加价格明细', icon: 'tenantPriceDetail-add'},
        hidden: true
      },
      {
        path: 'updateTenantPriceDetail',
        name: 'updateTenantPriceDetail',
        component: () => import('@/views/mbg/tenantPriceDetail/update'),
        meta: {title: '修改价格明细', icon: 'tenantPriceDetail-add'},
        hidden: true
      }
    ]
  },  
  {
    path: '/mbg',
    component: Layout,
    redirect: '/mbg/tenantEmployee',
    name: 'mbg',
    meta: {title: '租户员工', icon: 'tenantEmployee'},
    children: [{
      path: 'tenantEmployee',
      name: 'tenantEmployee',
      component: () => import('@/views/mbg/tenantEmployee/index'),
      meta: {title: '租户员工列表', icon: 'tenantEmployee-list'}
    },
      {
        path: 'addTenantEmployee',
        name: 'addTenantEmployee',
        component: () => import('@/views/mbg/tenantEmployee/add'),
        meta: {title: '添加租户员工', icon: 'tenantEmployee-add'},
        hidden: true
      },
      {
        path: 'updateTenantEmployee',
        name: 'updateTenantEmployee',
        component: () => import('@/views/mbg/tenantEmployee/update'),
        meta: {title: '修改租户员工', icon: 'tenantEmployee-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/mbg',
    component: Layout,
    redirect: '/mbg/tenantRole',
    name: 'mbg',
    meta: {title: '租户角色', icon: 'tenantRole'},
    children: [{
      path: 'tenantRole',
      name: 'tenantRole',
      component: () => import('@/views/mbg/tenantRole/index'),
      meta: {title: '租户角色列表', icon: 'tenantRole-list'}
    },
      {
        path: 'addTenantRole',
        name: 'addTenantRole',
        component: () => import('@/views/mbg/tenantRole/add'),
        meta: {title: '添加租户角色', icon: 'tenantRole-add'},
        hidden: true
      },
      {
        path: 'updateTenantRole',
        name: 'updateTenantRole',
        component: () => import('@/views/mbg/tenantRole/update'),
        meta: {title: '修改租户角色', icon: 'tenantRole-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/mbg',
    component: Layout,
    redirect: '/mbg/tenantEmployeeRole',
    name: 'mbg',
    meta: {title: '员工角色', icon: 'tenantEmployeeRole'},
    children: [{
      path: 'tenantEmployeeRole',
      name: 'tenantEmployeeRole',
      component: () => import('@/views/mbg/tenantEmployeeRole/index'),
      meta: {title: '员工角色列表', icon: 'tenantEmployeeRole-list'}
    },
      {
        path: 'addTenantEmployeeRole',
        name: 'addTenantEmployeeRole',
        component: () => import('@/views/mbg/tenantEmployeeRole/add'),
        meta: {title: '添加员工角色', icon: 'tenantEmployeeRole-add'},
        hidden: true
      },
      {
        path: 'updateTenantEmployeeRole',
        name: 'updateTenantEmployeeRole',
        component: () => import('@/views/mbg/tenantEmployeeRole/update'),
        meta: {title: '修改员工角色', icon: 'tenantEmployeeRole-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/mbg',
    component: Layout,
    redirect: '/mbg/tenantRoleSystem',
    name: 'mbg',
    meta: {title: '角色模块', icon: 'tenantRoleSystem'},
    children: [{
      path: 'tenantRoleSystem',
      name: 'tenantRoleSystem',
      component: () => import('@/views/mbg/tenantRoleSystem/index'),
      meta: {title: '角色模块列表', icon: 'tenantRoleSystem-list'}
    },
      {
        path: 'addTenantRoleSystem',
        name: 'addTenantRoleSystem',
        component: () => import('@/views/mbg/tenantRoleSystem/add'),
        meta: {title: '添加角色模块', icon: 'tenantRoleSystem-add'},
        hidden: true
      },
      {
        path: 'updateTenantRoleSystem',
        name: 'updateTenantRoleSystem',
        component: () => import('@/views/mbg/tenantRoleSystem/update'),
        meta: {title: '修改角色模块', icon: 'tenantRoleSystem-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/mbg',
    component: Layout,
    redirect: '/mbg/tenantRoleMenu',
    name: 'mbg',
    meta: {title: '角色菜单', icon: 'tenantRoleMenu'},
    children: [{
      path: 'tenantRoleMenu',
      name: 'tenantRoleMenu',
      component: () => import('@/views/mbg/tenantRoleMenu/index'),
      meta: {title: '角色菜单列表', icon: 'tenantRoleMenu-list'}
    },
      {
        path: 'addTenantRoleMenu',
        name: 'addTenantRoleMenu',
        component: () => import('@/views/mbg/tenantRoleMenu/add'),
        meta: {title: '添加角色菜单', icon: 'tenantRoleMenu-add'},
        hidden: true
      },
      {
        path: 'updateTenantRoleMenu',
        name: 'updateTenantRoleMenu',
        component: () => import('@/views/mbg/tenantRoleMenu/update'),
        meta: {title: '修改角色菜单', icon: 'tenantRoleMenu-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/cust',
    component: Layout,
    redirect: '/cust/custDev',
    name: 'cust',
    meta: {title: '用户表具', icon: 'custDev'},
    children: [{
      path: 'custDev',
      name: 'custDev',
      component: () => import('@/views/cust/custDev/index'),
      meta: {title: '用户表具列表', icon: 'custDev-list'}
    },
      {
        path: 'addCustDev',
        name: 'addCustDev',
        component: () => import('@/views/cust/custDev/add'),
        meta: {title: '添加用户表具', icon: 'custDev-add'},
        hidden: true
      },
      {
        path: 'updateCustDev',
        name: 'updateCustDev',
        component: () => import('@/views/cust/custDev/update'),
        meta: {title: '修改用户表具', icon: 'custDev-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/cust',
    component: Layout,
    redirect: '/cust/custInfo',
    name: 'cust',
    meta: {title: '用户信息', icon: 'custInfo'},
    children: [{
      path: 'custInfo',
      name: 'custInfo',
      component: () => import('@/views/cust/custInfo/index'),
      meta: {title: '用户信息列表', icon: 'custInfo-list'}
    },
      {
        path: 'addCustInfo',
        name: 'addCustInfo',
        component: () => import('@/views/cust/custInfo/add'),
        meta: {title: '添加用户信息', icon: 'custInfo-add'},
        hidden: true
      },
      {
        path: 'updateCustInfo',
        name: 'updateCustInfo',
        component: () => import('@/views/cust/custInfo/update'),
        meta: {title: '修改用户信息', icon: 'custInfo-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/cust',
    component: Layout,
    redirect: '/cust/custContact',
    name: 'cust',
    meta: {title: '用户联系人', icon: 'custContact'},
    children: [{
      path: 'custContact',
      name: 'custContact',
      component: () => import('@/views/cust/custContact/index'),
      meta: {title: '用户联系人列表', icon: 'custContact-list'}
    },
      {
        path: 'addCustContact',
        name: 'addCustContact',
        component: () => import('@/views/cust/custContact/add'),
        meta: {title: '添加用户联系人', icon: 'custContact-add'},
        hidden: true
      },
      {
        path: 'updateCustContact',
        name: 'updateCustContact',
        component: () => import('@/views/cust/custContact/update'),
        meta: {title: '修改用户联系人', icon: 'custContact-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/cust',
    component: Layout,
    redirect: '/cust/readBooklet',
    name: 'cust',
    meta: {title: '表册信息', icon: 'readBooklet'},
    children: [{
      path: 'readBooklet',
      name: 'readBooklet',
      component: () => import('@/views/cust/readBooklet/index'),
      meta: {title: '表册信息列表', icon: 'readBooklet-list'}
    },
      {
        path: 'addReadBooklet',
        name: 'addReadBooklet',
        component: () => import('@/views/cust/readBooklet/add'),
        meta: {title: '添加表册信息', icon: 'readBooklet-add'},
        hidden: true
      },
      {
        path: 'updateReadBooklet',
        name: 'updateReadBooklet',
        component: () => import('@/views/cust/readBooklet/update'),
        meta: {title: '修改表册信息', icon: 'readBooklet-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/cust',
    component: Layout,
    redirect: '/cust/custInfoChange',
    name: 'cust',
    meta: {title: '用户变更', icon: 'custInfoChange'},
    children: [{
      path: 'custInfoChange',
      name: 'custInfoChange',
      component: () => import('@/views/cust/custInfoChange/index'),
      meta: {title: '用户变更列表', icon: 'custInfoChange-list'}
    },
      {
        path: 'addCustInfoChange',
        name: 'addCustInfoChange',
        component: () => import('@/views/cust/custInfoChange/add'),
        meta: {title: '添加用户变更', icon: 'custInfoChange-add'},
        hidden: true
      },
      {
        path: 'updateCustInfoChange',
        name: 'updateCustInfoChange',
        component: () => import('@/views/cust/custInfoChange/update'),
        meta: {title: '修改用户变更', icon: 'custInfoChange-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/cust',
    component: Layout,
    redirect: '/cust/devReadCurr',
    name: 'cust',
    meta: {title: '抄表信息', icon: 'devReadCurr'},
    children: [{
      path: 'devReadCurr',
      name: 'devReadCurr',
      component: () => import('@/views/cust/devReadCurr/index'),
      meta: {title: '抄表信息列表', icon: 'devReadCurr-list'}
    },
      {
        path: 'addDevReadCurr',
        name: 'addDevReadCurr',
        component: () => import('@/views/cust/devReadCurr/add'),
        meta: {title: '添加抄表信息', icon: 'devReadCurr-add'},
        hidden: true
      },
      {
        path: 'updateDevReadCurr',
        name: 'updateDevReadCurr',
        component: () => import('@/views/cust/devReadCurr/update'),
        meta: {title: '修改抄表信息', icon: 'devReadCurr-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/cust',
    component: Layout,
    redirect: '/cust/devReadCurrHis',
    name: 'cust',
    meta: {title: '历史抄表信息', icon: 'devReadCurrHis'},
    children: [{
      path: 'devReadCurrHis',
      name: 'devReadCurrHis',
      component: () => import('@/views/cust/devReadCurrHis/index'),
      meta: {title: '历史抄表信息列表', icon: 'devReadCurrHis-list'}
    },
      {
        path: 'addDevReadCurrHis',
        name: 'addDevReadCurrHis',
        component: () => import('@/views/cust/devReadCurrHis/add'),
        meta: {title: '添加历史抄表信息', icon: 'devReadCurrHis-add'},
        hidden: true
      },
      {
        path: 'updateDevReadCurrHis',
        name: 'updateDevReadCurrHis',
        component: () => import('@/views/cust/devReadCurrHis/update'),
        meta: {title: '修改历史抄表信息', icon: 'devReadCurrHis-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/account',
    component: Layout,
    redirect: '/account/devRecList',
    name: 'account',
    meta: {title: '应收流水', icon: 'devRecList'},
    children: [{
      path: 'devRecList',
      name: 'devRecList',
      component: () => import('@/views/account/devRecList/index'),
      meta: {title: '应收流水列表', icon: 'devRecList-list'}
    },
      {
        path: 'addDevRecList',
        name: 'addDevRecList',
        component: () => import('@/views/account/devRecList/add'),
        meta: {title: '添加应收流水', icon: 'devRecList-add'},
        hidden: true
      },
      {
        path: 'updateDevRecList',
        name: 'updateDevRecList',
        component: () => import('@/views/account/devRecList/update'),
        meta: {title: '修改应收流水', icon: 'devRecList-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/dev',
    component: Layout,
    redirect: '/dev/iotDeviceDesign',
    name: 'dev',
    meta: {title: '设备信息', icon: 'iotDeviceDesign'},
    children: [{
      path: 'iotDeviceDesign',
      name: 'iotDeviceDesign',
      component: () => import('@/views/dev/iotDeviceDesign/index'),
      meta: {title: '设备信息列表', icon: 'iotDeviceDesign-list'}
    },
      {
        path: 'addIotDeviceDesign',
        name: 'addIotDeviceDesign',
        component: () => import('@/views/dev/iotDeviceDesign/add'),
        meta: {title: '添加设备信息', icon: 'iotDeviceDesign-add'},
        hidden: true
      },
      {
        path: 'updateIotDeviceDesign',
        name: 'updateIotDeviceDesign',
        component: () => import('@/views/dev/iotDeviceDesign/update'),
        meta: {title: '修改设备信息', icon: 'iotDeviceDesign-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/wms',
    component: Layout,
    redirect: '/wms/userInfo',
    name: 'wms',
    meta: {title: '用户信息', icon: 'userInfo'},
    children: [{
      path: 'userInfo',
      name: 'userInfo',
      component: () => import('@/views/wms/userInfo/index'),
      meta: {title: '用户信息列表', icon: 'userInfo-list'}
    },
      {
        path: 'addUserInfo',
        name: 'addUserInfo',
        component: () => import('@/views/wms/userInfo/add'),
        meta: {title: '添加用户信息', icon: 'userInfo-add'},
        hidden: true
      },
      {
        path: 'updateUserInfo',
        name: 'updateUserInfo',
        component: () => import('@/views/wms/userInfo/update'),
        meta: {title: '修改用户信息', icon: 'userInfo-add'},
        hidden: true
      },
      
       
        
        {
          path: 'systemInfo',
          name: 'systemInfo',
          component: () => import('@/views/wms/systemInfo/index'),
          meta: {title: '系统信息列表', icon: 'systemInfo-list'}
        },
          {
            path: 'addSystemInfo',
            name: 'addSystemInfo',
            component: () => import('@/views/wms/systemInfo/add'),
            meta: {title: '添加系统信息', icon: 'systemInfo-add'},
            hidden: true
          },
          {
            path: 'updateSystemInfo',
            name: 'updateSystemInfo',
            component: () => import('@/views/wms/systemInfo/update'),
            meta: {title: '修改系统信息', icon: 'systemInfo-add'},
            hidden: true
          },          
          {
            path: 'employee',
            name: 'employee',
            component: () => import('@/views/wms/employee/index'),
            meta: {title: '员工列表', icon: 'employee-list'}
          },
            {
              path: 'addEmployee',
              name: 'addEmployee',
              component: () => import('@/views/wms/employee/add'),
              meta: {title: '添加员工', icon: 'employee-add'},
              hidden: true
            },
            {
              path: 'updateEmployee',
              name: 'updateEmployee',
              component: () => import('@/views/wms/employee/update'),
              meta: {title: '修改员工', icon: 'employee-add'},
              hidden: true
            },
          {
            path: 'dept',
            name: 'dept',
            component: () => import('@/views/wms/dept/index'),
            meta: {title: '部门列表', icon: 'dept-list'}
          },
            {
              path: 'addDept',
              name: 'addDept',
              component: () => import('@/views/wms/dept/add'),
              meta: {title: '添加部门', icon: 'dept-add'},
              hidden: true
            },
            {
              path: 'updateDept',
              name: 'updateDept',
              component: () => import('@/views/wms/dept/update'),
              meta: {title: '修改部门', icon: 'dept-add'},
              hidden: true
            },
          {
            path: 'recordList',
            name: 'recordList',
            component: () => import('@/views/wms/recordList/index'),
            meta: {title: '应收账列表', icon: 'recordList-list'}
          },
            {
              path: 'addRecordList',
              name: 'addRecordList',
              component: () => import('@/views/wms/recordList/add'),
              meta: {title: '添加应收账', icon: 'recordList-add'},
              hidden: true
            },
            {
              path: 'updateRecordList',
              name: 'updateRecordList',
              component: () => import('@/views/wms/recordList/update'),
              meta: {title: '修改应收账', icon: 'recordList-add'},
              hidden: true
            }
  
    ]
  },
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    name: 'pms',
    meta: {title: '商品', icon: 'product'},
    children: [{
      path: 'product',
      name: 'product',
      component: () => import('@/views/pms/product/index'),
      meta: {title: '商品列表', icon: 'product-list'}
    },
      {
        path: 'addProduct',
        name: 'addProduct',
        component: () => import('@/views/pms/product/add'),
        meta: {title: '添加商品', icon: 'product-add'}
      },
      {
        path: 'updateProduct',
        name: 'updateProduct',
        component: () => import('@/views/pms/product/update'),
        meta: {title: '修改商品', icon: 'product-add'},
        hidden: true
      },
      {
        path: 'productRecycle',
        name: 'productRecycle',
        component: () => import('@/views/pms/product/index'),
        meta: {title: '商品回收站', icon: 'product-recycle'},
        hidden: true
      },
      {
        path: 'productComment',
        name: 'productComment',
        component: () => import('@/views/pms/product/index'),
        meta: {title: '商品评价', icon: 'product-comment'},
        hidden: true
      },
      {
        path: 'productCate',
        name: 'productCate',
        component: () => import('@/views/pms/productCate/index'),
        meta: {title: '商品分类', icon: 'product-cate'}
      },
      {
        path: 'addProductCate',
        name: 'addProductCate',
        component: () => import('@/views/pms/productCate/add'),
        meta: {title: '添加商品分类'},
        hidden: true
      },
      {
        path: 'updateProductCate',
        name: 'updateProductCate',
        component: () => import('@/views/pms/productCate/update'),
        meta: {title: '修改商品分类'},
        hidden: true
      },
      {
        path: 'productAttr',
        name: 'productAttr',
        component: () => import('@/views/pms/productAttr/index'),
        meta: {title: '商品类型', icon: 'product-attr'}
      },
      {
        path: 'productAttrList',
        name: 'productAttrList',
        component: () => import('@/views/pms/productAttr/productAttrList'),
        meta: {title: '商品属性列表'},
        hidden: true
      },
      {
        path: 'addProductAttr',
        name: 'addProductAttr',
        component: () => import('@/views/pms/productAttr/addProductAttr'),
        meta: {title: '添加商品属性'},
        hidden: true
      },
      {
        path: 'updateProductAttr',
        name: 'updateProductAttr',
        component: () => import('@/views/pms/productAttr/updateProductAttr'),
        meta: {title: '修改商品属性'},
        hidden: true
      },
      {
        path: 'brand',
        name: 'brand',
        component: () => import('@/views/pms/brand/index'),
        meta: {title: '品牌管理', icon: 'product-brand'}
      },
      {
        path: 'addBrand',
        name: 'addBrand',
        component: () => import('@/views/pms/brand/add'),
        meta: {title: '添加品牌'},
        hidden: true
      },
      {
        path: 'updateBrand',
        name: 'updateBrand',
        component: () => import('@/views/pms/brand/update'),
        meta: {title: '编辑品牌'},
        hidden: true
      }
    ]
  },
  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    name: 'oms',
    meta: {title: '订单', icon: 'order'},
    children: [
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/oms/order/index'),
        meta: {title: '订单列表', icon: 'product-list'}
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        component: () => import('@/views/oms/order/orderDetail'),
        meta: {title: '订单详情'},
        hidden:true
      },
      {
        path: 'deliverOrderList',
        name: 'deliverOrderList',
        component: () => import('@/views/oms/order/deliverOrderList'),
        meta: {title: '发货列表'},
        hidden:true
      },
      {
        path: 'orderSetting',
        name: 'orderSetting',
        component: () => import('@/views/oms/order/setting'),
        meta: {title: '订单设置', icon: 'order-setting'}
      },
      {
        path: 'returnApply',
        name: 'returnApply',
        component: () => import('@/views/oms/apply/index'),
        meta: {title: '退货申请处理', icon: 'order-return'}
      },
      {
        path: 'returnReason',
        name: 'returnReason',
        component: () => import('@/views/oms/apply/reason'),
        meta: {title: '退货原因设置', icon: 'order-return-reason'}
      },
      {
        path: 'returnApplyDetail',
        name: 'returnApplyDetail',
        component: () => import('@/views/oms/apply/applyDetail'),
        meta: {title: '退货原因详情'},
        hidden:true
      }
    ]
  },
  {
    path:'/sms',
    component: Layout,
    redirect: '/sms/coupon',
    name: 'sms',
    meta: {title: '营销', icon: 'sms'},
    children: [
      {
        path: 'flash',
        name: 'flash',
        component: () => import('@/views/sms/flash/index'),
        meta: {title: '秒杀活动列表', icon: 'sms-flash'}
      },
      {
        path: 'flashSession',
        name: 'flashSession',
        component: () => import('@/views/sms/flash/sessionList'),
        meta: {title: '秒杀时间段列表'},
        hidden:true
      },
      {
        path: 'selectSession',
        name: 'selectSession',
        component: () => import('@/views/sms/flash/selectSessionList'),
        meta: {title: '秒杀时间段选择'},
        hidden:true
      },
      {
        path: 'flashProductRelation',
        name: 'flashProductRelation',
        component: () => import('@/views/sms/flash/productRelationList'),
        meta: {title: '秒杀商品列表'},
        hidden:true
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('@/views/sms/coupon/index'),
        meta: {title: '优惠券列表', icon: 'sms-coupon'}
      },
      {
        path: 'addCoupon',
        name: 'addCoupon',
        component: () => import('@/views/sms/coupon/add'),
        meta: {title: '添加优惠券'},
        hidden:true
      },
      {
        path: 'updateCoupon',
        name: 'updateCoupon',
        component: () => import('@/views/sms/coupon/update'),
        meta: {title: '修改优惠券'},
        hidden:true
      },
      {
        path: 'couponHistory',
        name: 'couponHistory',
        component: () => import('@/views/sms/coupon/history'),
        meta: {title: '优惠券领取详情'},
        hidden:true
      },
      {
        path: 'brand',
        name: 'homeBrand',
        component: () => import('@/views/sms/brand/index'),
        meta: {title: '品牌推荐', icon: 'product-brand'}
      },
      {
        path: 'new',
        name: 'homeNew',
        component: () => import('@/views/sms/new/index'),
        meta: {title: '新品推荐', icon: 'sms-new'}
      },
      {
        path: 'hot',
        name: 'homeHot',
        component: () => import('@/views/sms/hot/index'),
        meta: {title: '人气推荐', icon: 'sms-hot'}
      },
      {
        path: 'subject',
        name: 'homeSubject',
        component: () => import('@/views/sms/subject/index'),
        meta: {title: '专题推荐', icon: 'sms-subject'}
      },
      {
        path: 'advertise',
        name: 'homeAdvertise',
        component: () => import('@/views/sms/advertise/index'),
        meta: {title: '广告列表', icon: 'sms-ad'}
      },
      {
        path: 'addAdvertise',
        name: 'addHomeAdvertise',
        component: () => import('@/views/sms/advertise/add'),
        meta: {title: '添加广告'},
        hidden:true
      },
      {
        path: 'updateAdvertise',
        name: 'updateHomeAdvertise',
        component: () => import('@/views/sms/advertise/update'),
        meta: {title: '编辑广告'},
        hidden:true
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

