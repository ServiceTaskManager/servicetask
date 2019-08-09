import Vue from 'vue'
import Vuex from 'vuex'
import createEasyFirestore from 'vuex-easy-firestore'

import firestore from './firestore'

Vue.use(Vuex)

const user = {
  state: {
    data: {},
    login: false
  },
  mutations: {
    userLoggedIn (state, userData) {
      console.log('User logged in')
      state.data = userData
      state.login = true
      localStorage.setItem('user', JSON.stringify(state))
    },
    userLoggedOut (state) {
      state.data = {}
      state.login = false
      localStorage.setItem('user', JSON.stringify(state))
    }
  }
}

// Create Easy Firestore object with models to sync
const easyFirestore = createEasyFirestore(firestore.stores, { logging: true })

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const store = new Vuex.Store({
  modules: {
    user,
    firestore
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
