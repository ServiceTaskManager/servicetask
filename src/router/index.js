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
    console.log('[Router] Check access rights to page ' + to.name)
    let user = JSON.parse(localStorage.getItem('user'))
    let login = user ? user.login : false
    if (login) {
      console.log('[Router] User logged in ' + user.uid)
      if (to.meta.requireAuth) {
        if (to.meta.requireRoles) {
          let roleMatch = to.meta.requireRoles.filter(role => user.data.roles.includes(role)).length > 0
          if (roleMatch) {
            console.log('[Router] Access allowed')
            next()
          } else {
            console.log('[Router] Access denied, require roles ' + to.meta.requireRoles)
            next('403')
          }
        } else {
          console.log('[Router] Access allowed')
          next()
        }
      } else {
        console.log('[Router] Access allowed')
        next()
      }
    } else {
      if (to.meta.requireAuth) {
        console.log('[Router] Access denied, require auth')
        next('403')
      } else {
        console.log('[Router] Access allowed')
        next()
      }
    }
  })

  return Router
}
