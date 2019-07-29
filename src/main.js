import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api' // 导入api接口
import './plugins/iview-vue/index.js' // 按需引入iview组件
import './style/reset.css'
import '../my-theme/index.less'
import './icons/index' // icon
import { Message } from 'iview'

Vue.config.productionTip = false

Vue.prototype.$api = api // 将api挂载到vue的原型上
Vue.prototype.$Message = Message

// 路由跳转通过钩子函数判断权限
router.beforeEach(async (to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    const hasRoles = localStorage.getItem('local_role')
    // 判断角色是否存在
    if (hasRoles) {
      const hasRoutes = store.getters['permission/addRoutes'] && store.getters['permission/addRoutes'].length > 0
      // 未刷新直接路由跳转
      if (hasRoutes) {
        next()
      } else {
        // 刷新，重新生成路由
        const accessRoutes = await store.dispatch('permission/generateRoutes', localStorage.getItem('local_role'))
        router.addRoutes(accessRoutes)
        next({ ...to, replace: true })
      }
    } else {
      // 不存在跳转登录
      next({
        name: 'login'
      })
    }
  }
})

// router.afterEach((to, from, next) => {

// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
