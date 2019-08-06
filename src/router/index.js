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
      show: true,
      token: true,
      icon: 'md-compass',
      version: ['ATD', 'NTA'],
      roles: ['systemAdmin', 'admin']
    }
  }, {
    path: '/system',
    name: 'system',
    component: () => import('@/views/system/index'),
    meta: {
      title: '系统配置',
      show: true,
      token: true,
      icon: 'ios-navigate',
      version: ['ATD', 'NTA'],
      roles: ['systemAdmin', 'admin']
    }
  }, {
    path: '/account',
    component: () => import('@/views/account/index'),
    meta: {
      title: '账号管理',
      show: true,
      token: true,
      icon: 'ios-navigate',
      version: ['ATD', 'NTA'],
      roles: ['systemAdmin', 'admin']
    },
    children: [{
      path: 'user1',
      name: 'user1',
      component: () => import('@/views/account/user1/index'),
      meta: {
        title: '用户管理1',
        show: true,
        token: true,
        version: ['ATD', 'NTA'],
        roles: ['systemAdmin', 'admin']
      }
    }, {
      path: 'user2',
      name: 'user2',
      component: () => import('@/views/account/user2/index'),
      meta: {
        title: '用户管理2',
        show: true,
        token: true,
        version: ['ATD', 'NTA'],
        roles: ['systemAdmin', 'admin']
      }
    }]
  }, {
    path: '/log',
    redirect: '/log/log1',
    component: () => import('@/views/log/index'),
    meta: {
      title: '系统日志',
      show: true,
      token: true,
      icon: 'md-compass',
      version: ['ATD', 'NTA'],
      roles: ['systemAdmin']
    },
    children: [{
      path: 'log1',
      name: 'log1',
      component: () => import('@/views/log/log1/index'),
      meta: {
        title: '系统日志1',
        show: true,
        token: true,
        version: ['ATD', 'NTA'],
        roles: ['systemAdmin']
      }
    }, {
      path: 'log2',
      name: 'log2',
      component: () => import('@/views/log/log2/index'),
      meta: {
        title: '系统日志2',
        show: true,
        token: true,
        version: ['ATD', 'NTA'],
        roles: ['systemAdmin']
      }
    }]
  }, {
    path: '/table',
    redirect: '/table/basicTable',
    component: () => import('@/views/table/index'),
    meta: {
      title: '表格',
      show: true,
      token: true,
      icon: 'md-compass',
      version: ['ATD', 'NTA'],
      roles: ['systemAdmin']
    },
    children: [{
      path: 'basicTable',
      name: 'basicTable',
      component: () => import('@/views/table/basicTable/BasicTable.vue'),
      meta: {
        title: '基础表格',
        show: true,
        token: true,
        version: ['ATD', 'NTA'],
        roles: ['systemAdmin']
      }
    }]
  }]
}]

// 导出不需要权限的路由
export const constantRoutes = [{
  path: '/user',
  component: BlankLayout,
  redirect: '/user/login',
  meta: {
    show: false,
    token: false
  },
  children: [{
    path: 'login',
    name: 'login',
    component: () => import('@/views/user/Login.vue'),
    meta: {
      show: false,
      token: false
    }
  }]
}]
// 默认路由是没加权限的路由
const createRouter = () => new Router({
  // mode: 'history',
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
