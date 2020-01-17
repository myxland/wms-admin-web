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
    path: '/saas',
    component: Layout,
    redirect: '/saas/tenantInfo',
    name: 'saas',
    meta: {title: '租户表', icon: 'tenantInfo'},
    children: [{
        path: 'tenantInfo',
        name: 'tenantInfo',
        component: () => import('@/views/saas/tenantInfo/index'),
        meta: {title: '租户表列表', icon: 'tenantInfo-list'}
      },
      {
        path: 'addTenantInfo',
        name: 'addTenantInfo',
        component: () => import('@/views/saas/tenantInfo/add'),
        meta: {title: '添加租户表', icon: 'tenantInfo-add'},
        hidden: true
      },
      {
        path: 'viewTenantInfo',
        name: 'viewTenantInfo',
        component: () => import('@/views/saas/tenantInfo/view'),
        meta: {title: '查看租户表', icon: 'tenantInfo-view'},
        hidden: true
      },
      {
        path: 'updateTenantInfo',
        name: 'updateTenantInfo',
        component: () => import('@/views/saas/tenantInfo/update'),
        meta: {title: '修改租户表', icon: 'tenantInfo-add'},
        hidden: true
      },
      {
        path: 'addTenantConsumptionBillByTenantConsume',
        name: 'addTenantConsumptionBillByTenantConsume',
        component: () => import('@/views/saas/tenantConsumptionBill/addByTenantConsume'),
        meta: {title: '添加租户账单', icon: 'tenantConsumptionBill-add'},
        hidden: true
      }
    ]
  }, 
  {
    path: '/saas',
    component: Layout,
    redirect: '/saas/moduleInfo',
    name: 'saas',
    meta: {title: '模块信息', icon: 'moduleInfo'},
    children: [{
      path: 'moduleInfo',
      name: 'moduleInfo',
      component: () => import('@/views/saas/moduleInfo/index'),
      meta: {title: '模块信息列表', icon: 'moduleInfo-list'}
    },
      {
        path: 'addModuleInfo',
        name: 'addModuleInfo',
        component: () => import('@/views/saas/moduleInfo/add'),
        meta: {title: '添加模块信息', icon: 'moduleInfo-add'},
        hidden: true
      },
      {
        path: 'addModuleInfoWithModulePrice',
        name: 'addModuleInfoWithModulePrice',
        component: () => import('@/views/saas/moduleInfo/addWithModulePrice'),
        meta: {title: '添加模块信息', icon: 'moduleInfo-add'},
        hidden: true
      },
      {
        path: 'viewModuleInfo',
        name: 'viewModuleInfo',
        component: () => import('@/views/saas/moduleInfo/view'),
        meta: {title: '查看模块信息', icon: 'moduleInfo-view'},
        hidden: true
      },
      {
        path: 'updateModuleInfo',
        name: 'updateModuleInfo',
        component: () => import('@/views/saas/moduleInfo/update'),
        meta: {title: '修改模块信息', icon: 'moduleInfo-add'},
        hidden: true
      },
      {
        path: 'updateModuleInfoWithModulePrice',
        name: 'updateModuleInfoWithModulePrice',
        component: () => import('@/views/saas/moduleInfo/updateWithModulePrice'),
        meta: {title: '修改模块信息', icon: 'moduleInfo-add'},
        hidden: true
      },
      {
        path: 'modulePrice',
        name: 'modulePrice',
        component: () => import('@/views/saas/modulePrice/index'),
        meta: {title: '模块价格列表', icon: 'modulePrice-list'},
        hidden: true
      },
      {
        path: 'addModulePrice',
        name: 'addModulePrice',
        component: () => import('@/views/saas/modulePrice/add'),
        meta: {title: '添加模块价格', icon: 'modulePrice-add'},
        hidden: true
      },      
      {
        path: 'viewModulePrice',
        name: 'viewModulePrice',
        component: () => import('@/views/saas/modulePrice/view'),
        meta: {title: '查看模块价格', icon: 'modulePrice-view'},
        hidden: true
      },
      {
        path: 'updateModulePrice',
        name: 'updateModulePrice',
        component: () => import('@/views/saas/modulePrice/update'),
        meta: {title: '修改模块价格', icon: 'modulePrice-add'},
        hidden: true
      }
    ]
  }, 
  {
    path: '/saas',
    component: Layout,
    redirect: '/saas/tenantRole',
    name: 'saas',
    meta: {title: '角色信息', icon: 'tenantRole'},
    children: [{
      path: 'tenantRole',
      name: 'tenantRole',
      component: () => import('@/views/saas/tenantRole/index'),
      meta: {title: '角色信息列表', icon: 'tenantRole-list'}
    },
      {
        path: 'addTenantRole',
        name: 'addTenantRole',
        component: () => import('@/views/saas/tenantRole/add'),
        meta: {title: '添加角色信息', icon: 'tenantRole-add'},
        hidden: true
      },
      {
        path: 'viewTenantRole',
        name: 'viewTenantRole',
        component: () => import('@/views/saas/tenantRole/view'),
        meta: {title: '查看角色信息', icon: 'tenantRole-view'},
        hidden: true
      },
      {
        path: 'updateTenantRole',
        name: 'updateTenantRole',
        component: () => import('@/views/saas/tenantRole/update'),
        meta: {title: '修改角色信息', icon: 'tenantRole-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/saas',
    component: Layout,
    redirect: '/saas/moduleMenu',
    name: 'saas',
    meta: {title: '模块菜单', icon: 'moduleMenu'},
    children: [{
      path: 'moduleMenu',
      name: 'moduleMenu',
      component: () => import('@/views/saas/moduleMenu/indexTree'),
      meta: {title: '模块菜单列表', icon: 'moduleMenu-list'}
    },
      {
        path: 'addModuleMenu',
        name: 'addModuleMenu',
        component: () => import('@/views/saas/moduleMenu/add'),
        meta: {title: '添加模块菜单', icon: 'moduleMenu-add'},
        hidden: true
      },
      {
        path: 'viewModuleMenu',
        name: 'viewModuleMenu',
        component: () => import('@/views/saas/moduleMenu/view'),
        meta: {title: '查看模块菜单', icon: 'moduleMenu-view'},
        hidden: true
      },
      {
        path: 'updateModuleMenu',
        name: 'updateModuleMenu',
        component: () => import('@/views/saas/moduleMenu/update'),
        meta: {title: '修改模块菜单', icon: 'moduleMenu-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/saas',
    component: Layout,
    redirect: '/saas/tenantDepartment',
    name: 'saas',
    meta: {title: '租户部门', icon: 'tenantDepartment'},
    children: [{
      path: 'tenantDepartment',
      name: 'tenantDepartment',
      component: () => import('@/views/saas/tenantDepartment/index'),
      meta: {title: '租户部门列表', icon: 'tenantDepartment-list'}
    },
      {
        path: 'addTenantDepartment',
        name: 'addTenantDepartment',
        component: () => import('@/views/saas/tenantDepartment/add'),
        meta: {title: '添加租户部门', icon: 'tenantDepartment-add'},
        hidden: true
      },
      {
        path: 'viewTenantDepartment',
        name: 'viewTenantDepartment',
        component: () => import('@/views/saas/tenantDepartment/view'),
        meta: {title: '查看租户部门', icon: 'tenantDepartment-view'},
        hidden: true
      },
      {
        path: 'updateTenantDepartment',
        name: 'updateTenantDepartment',
        component: () => import('@/views/saas/tenantDepartment/update'),
        meta: {title: '修改租户部门', icon: 'tenantDepartment-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/saas',
    component: Layout,
    redirect: '/saas/tenantEmployee',
    name: 'saas',
    meta: {title: '租户员工', icon: 'tenantEmployee'},
    children: [{
      path: 'tenantEmployee',
      name: 'tenantEmployee',
      component: () => import('@/views/saas/tenantEmployee/index'),
      meta: {title: '租户员工列表', icon: 'tenantEmployee-list'}
    },
      {
        path: 'addTenantEmployee',
        name: 'addTenantEmployee',
        component: () => import('@/views/saas/tenantEmployee/add'),
        meta: {title: '添加租户员工', icon: 'tenantEmployee-add'},
        hidden: true
      },
      {
        path: 'viewTenantEmployee',
        name: 'viewTenantEmployee',
        component: () => import('@/views/saas/tenantEmployee/view'),
        meta: {title: '查看租户员工', icon: 'tenantEmployee-view'},
        hidden: true
      },
      {
        path: 'updateTenantEmployee',
        name: 'updateTenantEmployee',
        component: () => import('@/views/saas/tenantEmployee/update'),
        meta: {title: '修改租户员工', icon: 'tenantEmployee-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/saas',
    component: Layout,
    redirect: '/saas/tenantWaterArea',
    name: 'saas',
    meta: {title: '供水区域', icon: 'tenantWaterArea'},
    children: [{
      path: 'tenantWaterArea',
      name: 'tenantWaterArea',
      component: () => import('@/views/saas/tenantWaterArea/index'),
      meta: {title: '供水区域列表', icon: 'tenantWaterArea-list'}
    },
      {
        path: 'addTenantWaterArea',
        name: 'addTenantWaterArea',
        component: () => import('@/views/saas/tenantWaterArea/add'),
        meta: {title: '添加供水区域', icon: 'tenantWaterArea-add'},
        hidden: true
      },
      {
        path: 'viewTenantWaterArea',
        name: 'viewTenantWaterArea',
        component: () => import('@/views/saas/tenantWaterArea/view'),
        meta: {title: '查看供水区域', icon: 'tenantWaterArea-view'},
        hidden: true
      },
      {
        path: 'updateTenantWaterArea',
        name: 'updateTenantWaterArea',
        component: () => import('@/views/saas/tenantWaterArea/update'),
        meta: {title: '修改供水区域', icon: 'tenantWaterArea-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/saas',
    component: Layout,
    redirect: '/saas/tenantPriceItem',
    name: 'saas',
    meta: {title: '费用项目', icon: 'tenantPriceItem'},
    children: [{
      path: 'tenantPriceItem',
      name: 'tenantPriceItem',
      component: () => import('@/views/saas/tenantPriceItem/index'),
      meta: {title: '费用项目列表', icon: 'tenantPriceItem-list'}
    },
      {
        path: 'addTenantPriceItem',
        name: 'addTenantPriceItem',
        component: () => import('@/views/saas/tenantPriceItem/add'),
        meta: {title: '添加费用项目', icon: 'tenantPriceItem-add'},
        hidden: true
      },
      {
        path: 'viewTenantPriceItem',
        name: 'viewTenantPriceItem',
        component: () => import('@/views/saas/tenantPriceItem/view'),
        meta: {title: '查看费用项目', icon: 'tenantPriceItem-view'},
        hidden: true
      },
      {
        path: 'updateTenantPriceItem',
        name: 'updateTenantPriceItem',
        component: () => import('@/views/saas/tenantPriceItem/update'),
        meta: {title: '修改费用项目', icon: 'tenantPriceItem-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/saas',
    component: Layout,
    redirect: '/saas/tenantPriceType',
    name: 'saas',
    meta: {title: '水价分类', icon: 'tenantPriceType'},
    children: [{
      path: 'tenantPriceType',
      name: 'tenantPriceType',
      component: () => import('@/views/saas/tenantPriceType/index'),
      meta: {title: '水价分类列表', icon: 'tenantPriceType-list'}
    },
      {
        path: 'addTenantPriceType',
        name: 'addTenantPriceType',
        component: () => import('@/views/saas/tenantPriceType/add'),
        meta: {title: '添加水价分类', icon: 'tenantPriceType-add'},
        hidden: true
      },
      {
        path: 'viewTenantPriceType',
        name: 'viewTenantPriceType',
        component: () => import('@/views/saas/tenantPriceType/view'),
        meta: {title: '查看水价分类', icon: 'tenantPriceType-view'},
        hidden: true
      },
      {
        path: 'updateTenantPriceType',
        name: 'updateTenantPriceType',
        component: () => import('@/views/saas/tenantPriceType/update'),
        meta: {title: '修改水价分类', icon: 'tenantPriceType-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/saas',
    component: Layout,
    redirect: '/saas/tenantWaterType',
    name: 'saas',
    meta: {title: '用水分类', icon: 'tenantWaterType'},
    children: [{
      path: 'tenantWaterType',
      name: 'tenantWaterType',
      component: () => import('@/views/saas/tenantWaterType/index'),
      meta: {title: '用水分类列表', icon: 'tenantWaterType-list'}
    },
      {
        path: 'addTenantWaterType',
        name: 'addTenantWaterType',
        component: () => import('@/views/saas/tenantWaterType/add'),
        meta: {title: '添加用水分类', icon: 'tenantWaterType-add'},
        hidden: true
      },
      {
        path: 'viewTenantWaterType',
        name: 'viewTenantWaterType',
        component: () => import('@/views/saas/tenantWaterType/view'),
        meta: {title: '查看用水分类', icon: 'tenantWaterType-view'},
        hidden: true
      },
      {
        path: 'updateTenantWaterType',
        name: 'updateTenantWaterType',
        component: () => import('@/views/saas/tenantWaterType/update'),
        meta: {title: '修改用水分类', icon: 'tenantWaterType-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/saas',
    component: Layout,
    redirect: '/saas/tenantManufactor',
    name: 'saas',
    meta: {title: '水表厂商', icon: 'tenantManufactor'},
    children: [{
      path: 'tenantManufactor',
      name: 'tenantManufactor',
      component: () => import('@/views/saas/tenantManufactor/index'),
      meta: {title: '水表厂商列表', icon: 'tenantManufactor-list'}
    },
      {
        path: 'addTenantManufactor',
        name: 'addTenantManufactor',
        component: () => import('@/views/saas/tenantManufactor/add'),
        meta: {title: '添加水表厂商', icon: 'tenantManufactor-add'},
        hidden: true
      },
      {
        path: 'viewTenantManufactor',
        name: 'viewTenantManufactor',
        component: () => import('@/views/saas/tenantManufactor/view'),
        meta: {title: '查看水表厂商', icon: 'tenantManufactor-view'},
        hidden: true
      },
      {
        path: 'updateTenantManufactor',
        name: 'updateTenantManufactor',
        component: () => import('@/views/saas/tenantManufactor/update'),
        meta: {title: '修改水表厂商', icon: 'tenantManufactor-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/saas',
    component: Layout,
    redirect: '/saas/tenantCaliber',
    name: 'saas',
    meta: {title: '水表口径', icon: 'tenantCaliber'},
    children: [{
      path: 'tenantCaliber',
      name: 'tenantCaliber',
      component: () => import('@/views/saas/tenantCaliber/index'),
      meta: {title: '水表口径列表', icon: 'tenantCaliber-list'}
    },
      {
        path: 'addTenantCaliber',
        name: 'addTenantCaliber',
        component: () => import('@/views/saas/tenantCaliber/add'),
        meta: {title: '添加水表口径', icon: 'tenantCaliber-add'},
        hidden: true
      },
      {
        path: 'viewTenantCaliber',
        name: 'viewTenantCaliber',
        component: () => import('@/views/saas/tenantCaliber/view'),
        meta: {title: '查看水表口径', icon: 'tenantCaliber-view'},
        hidden: true
      },
      {
        path: 'updateTenantCaliber',
        name: 'updateTenantCaliber',
        component: () => import('@/views/saas/tenantCaliber/update'),
        meta: {title: '修改水表口径', icon: 'tenantCaliber-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/saas',
    component: Layout,
    redirect: '/saas/tenantMeterStatus',
    name: 'saas',
    meta: {title: '水表状况', icon: 'tenantMeterStatus'},
    children: [{
      path: 'tenantMeterStatus',
      name: 'tenantMeterStatus',
      component: () => import('@/views/saas/tenantMeterStatus/index'),
      meta: {title: '水表状况列表', icon: 'tenantMeterStatus-list'}
    },
      {
        path: 'addTenantMeterStatus',
        name: 'addTenantMeterStatus',
        component: () => import('@/views/saas/tenantMeterStatus/add'),
        meta: {title: '添加水表状况', icon: 'tenantMeterStatus-add'},
        hidden: true
      },
      {
        path: 'viewTenantMeterStatus',
        name: 'viewTenantMeterStatus',
        component: () => import('@/views/saas/tenantMeterStatus/view'),
        meta: {title: '查看水表状况', icon: 'tenantMeterStatus-view'},
        hidden: true
      },
      {
        path: 'updateTenantMeterStatus',
        name: 'updateTenantMeterStatus',
        component: () => import('@/views/saas/tenantMeterStatus/update'),
        meta: {title: '修改水表状况', icon: 'tenantMeterStatus-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/saas',
    component: Layout,
    redirect: '/saas/tenantCustomerType',
    name: 'saas',
    meta: {title: '用户分类', icon: 'tenantCustomerType'},
    children: [{
      path: 'tenantCustomerType',
      name: 'tenantCustomerType',
      component: () => import('@/views/saas/tenantCustomerType/index'),
      meta: {title: '用户分类列表', icon: 'tenantCustomerType-list'}
    },
      {
        path: 'addTenantCustomerType',
        name: 'addTenantCustomerType',
        component: () => import('@/views/saas/tenantCustomerType/add'),
        meta: {title: '添加用户分类', icon: 'tenantCustomerType-add'},
        hidden: true
      },
      {
        path: 'viewTenantCustomerType',
        name: 'viewTenantCustomerType',
        component: () => import('@/views/saas/tenantCustomerType/view'),
        meta: {title: '查看用户分类', icon: 'tenantCustomerType-view'},
        hidden: true
      },
      {
        path: 'updateTenantCustomerType',
        name: 'updateTenantCustomerType',
        component: () => import('@/views/saas/tenantCustomerType/update'),
        meta: {title: '修改用户分类', icon: 'tenantCustomerType-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/saas',
    component: Layout,
    redirect: '/saas/tenantCustomerMeterInstall',
    name: 'saas',
    meta: {title: '用户水表立户', icon: 'tenantCustomerMeterInstall'},
    children: [{
      path: 'tenantCustomerMeterInstall',
      name: 'tenantCustomerMeterInstall',
      component: () => import('@/views/saas/tenantCustomerMeterInstall/index'),
      meta: {title: '用户水表立户列表', icon: 'tenantCustomerMeterInstall-list'}
    },
      {
        path: 'addTenantCustomerMeterInstall',
        name: 'addTenantCustomerMeterInstall',
        component: () => import('@/views/saas/tenantCustomerMeterInstall/add'),
        meta: {title: '添加用户水表立户', icon: 'tenantCustomerMeterInstall-add'},
        hidden: true
      },
      {
        path: 'viewTenantCustomerMeterInstall',
        name: 'viewTenantCustomerMeterInstall',
        component: () => import('@/views/saas/tenantCustomerMeterInstall/view'),
        meta: {title: '查看用户水表立户', icon: 'tenantCustomerMeterInstall-view'},
        hidden: true
      },
      {
        path: 'updateTenantCustomerMeterInstall',
        name: 'updateTenantCustomerMeterInstall',
        component: () => import('@/views/saas/tenantCustomerMeterInstall/update'),
        meta: {title: '修改用户水表立户', icon: 'tenantCustomerMeterInstall-add'},
        hidden: true
      }
    ]
  },
  {
    path: '/saas',
    component: Layout,
    redirect: '/saas/tenantBooklet',
    name: 'saas',
    meta: {title: '租户表册', icon: 'tenantBooklet'},
    children: [{
      path: 'tenantBooklet',
      name: 'tenantBooklet',
      component: () => import('@/views/saas/tenantBooklet/index'),
      meta: {title: '租户表册列表', icon: 'tenantBooklet-list'}
    },
      {
        path: 'addTenantBooklet',
        name: 'addTenantBooklet',
        component: () => import('@/views/saas/tenantBooklet/add'),
        meta: {title: '添加租户表册', icon: 'tenantBooklet-add'},
        hidden: true
      },
      {
        path: 'viewTenantBooklet',
        name: 'viewTenantBooklet',
        component: () => import('@/views/saas/tenantBooklet/view'),
        meta: {title: '查看租户表册', icon: 'tenantBooklet-view'},
        hidden: true
      },
      {
        path: 'updateTenantBooklet',
        name: 'updateTenantBooklet',
        component: () => import('@/views/saas/tenantBooklet/update'),
        meta: {title: '修改租户表册', icon: 'tenantBooklet-add'},
        hidden: true
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

