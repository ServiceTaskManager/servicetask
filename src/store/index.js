import Vue from 'vue'
import Vuex from 'vuex'
import createEasyFirestore from 'vuex-easy-firestore'

// import example from './module-example'
import user from './user'
import firestore from './firestore'

Vue.use(Vuex)

const easyFirestore = createEasyFirestore([firestore.task, firestore.customer], { logging: true })

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const store = new Vuex.Store({
  modules: {
    user
  },
  plugins: [
    easyFirestore
  ]
})

if (process.env.DEV && module.hot) {
  module.hot.accept(['./user'], () => {
    const newUser = require('./user').default
    store.hotUpdate({ modules: { user: newUser } })
  })
}

export default store
