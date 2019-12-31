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

