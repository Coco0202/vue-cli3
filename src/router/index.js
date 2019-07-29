import Vue from 'vue'
import Router from 'vue-router'
import { BasicLayout, BlankLayout } from '@/layouts'
Vue.use(Router)

// 需要权限的路由
export const asyncRoutes = [{
  path: '/',
  component: BasicLayout,
  redirect: {
    name: 'console'
  },
  children: [{
    path: '/console',
    name: 'console',
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '控制台',
      hidden: false,
      token: true,
      version: ['ATD', 'NTA'],
      roles: ['systemAdmin', 'admin']
    }
  }, {
    path: '/system',
    name: 'system',
    component: () => import('@/views/system/index'),
    meta: {
      title: '系统配置',
      hidden: false,
      token: true,
      version: ['ATD', 'NTA'],
      roles: ['systemAdmin', 'admin']
    }
  }, {
    path: '/log',
    name: 'log',
    component: () => import('@/views/log/index'),
    meta: {
      title: '日志管理',
      hidden: false,
      token: true,
      version: ['ATD', 'NTA'],
      roles: ['systemAdmin']
    }
  }]
}]

// 导出不需要权限的路由
export const constantRoutes = [{
  path: '/user',
  component: BlankLayout,
  redirect: '/user/login',
  children: [{
    path: 'login',
    name: 'login',
    component: () => import('@/views/user/Login.vue'),
    meta: {
      hidden: true,
      token: false
    }
  }]
}]
// 默认路由是没加权限的路由
const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
