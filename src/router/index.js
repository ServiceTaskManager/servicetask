import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

export default function ({ store, ssrContext }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    // Unselect all store's docs
    store.dispatch('unselectAll')

    // if accessing a store page with an id param, select it.
    if (to.meta.store && to.params.id) store.dispatch(to.meta.store + '/selectOneOnly', to.params.id)

    let user = JSON.parse(localStorage.getItem('user'))
    let login = user ? user.login : false
    if (login) next()
    else {
      if (to.name === 'login') next()
      else next({ name: 'login' })
    }
  })

  return Router
}
