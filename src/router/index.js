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
        path: 'modulePrice',
        name: 'modulePrice',
        component: () => import('@/views/saas/modulePrice/index'),
        meta: {title: '模块价格列表', icon: 'modulePrice-list'}
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
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

