import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import user from './user'
import notifications from './notifications'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const store = new Vuex.Store({
  modules: {
    user,
    notifications
    // example
  }
})

if (process.env.DEV && module.hot) {
  module.hot.accept(['./user'], () => {
    const newUser = require('./user').default
    store.hotUpdate({ modules: { user: newUser } })
  })
}

export default store
