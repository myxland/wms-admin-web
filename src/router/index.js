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
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

