import Vue from 'vue'
import Vuex from 'vuex'
import createEasyFirestore from 'vuex-easy-firestore'

import user from './user'
import firestore from './firestore'

Vue.use(Vuex)

const config = {
  state: {
    models: [
      'users',
      'tasks',
      'calls',
      'customers',
      'engines'
    ]
  }
}

// Create Easy Firestore object with models to sync
const easyFirestore = createEasyFirestore([
  firestore.users,
  firestore.tasks,
  firestore.calls,
  firestore.customers,
  firestore.engines,
  firestore.notifications], { logging: true })

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const store = new Vuex.Store({
  modules: {
    user,
    config
  },
  plugins: [
    easyFirestore
  ]
})

/*
if (process.env.DEV && module.hot) {
  module.hot.accept(['./user'], () => {
    const newUser = require('./user').default
    store.hotUpdate({ modules: { user: newUser } })
  })
}
*/

export default store
