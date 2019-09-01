import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ({ store, ssrContext }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    let user = JSON.parse(localStorage.getItem('user'))
    let login = user ? user.login : false
    if (login) {
      if (to.name === 'login') {
        next('dashboard')
      }

      if (to.meta.requireAuth) {
        if (to.meta.requireRoles) {
          let roleMatch = to.meta.requireRoles.filter(role => user.data.roles.includes(role)).length > 0
          if (roleMatch) {
            next()
          } else {
            next({ name: '403' })
          }
        } else {
          next()
        }
      } else {
        next()
      }
    } else {
      if (to.meta.requireAuth) {
        next({ name: '403' })
      } else {
        next()
      }
    }
  })

  return Router
}
