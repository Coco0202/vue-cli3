import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission (roles, route) {
  const prsVersion = process.env.VUE_APP_VERSION === 'ATD' ? ['ATD'] : ['NTA']
  if (route.meta) {
    // 先通过版本过滤
    if (route.meta.version) {
      if (prsVersion.some(v => route.meta.version.includes(v))) {
        // 然后通过角色过滤
        if (route.meta.roles) {
          return roles.some(role => route.meta.roles.includes(role))
        } else {
          return true
        }
      }
    } else {
      return true
    }
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes (routes, roles) {
  const res = []
  routes.forEach (route => {
    const tmp = { ...route }
    if (hasPermission (roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes (tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
const permission = {
  namespaced: true,
  state: {
    roles: '', // 当前登录用户的角色
    routes: [], // 生成的菜单
    addRoutes: [] // 根据权限生成的路由
  },
  getters: {
    roles: state => state.roles,
    addRoutes: state => state.addRoutes,
    permission_routes: state => state.routes
  },
  mutations: {
    SET_ROLE: (state, roles) => {
      if (typeof roles === 'string') {
        state.roles = roles.split()
      } else {
        state.roles = roles
      }
    },
    SET_ROUTES: (state, routes) => {
      // 根据角色筛选的路由
      state.addRoutes = routes
      // 菜单展示的路由
      state.routes = constantRoutes.concat(routes[0].children)
    }
  },
  actions: {
    generateRoutes({ commit }, roles) {
      if(typeof roles === 'string') {
        roles = roles.split()
      }
      return new Promise(resolve => {
        let accessedRoutes = filterAsyncRoutes (asyncRoutes, roles)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}
export default permission
