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
    login (state, userData) {
      state.data = userData
      state.login = true
      localStorage.setItem('user', JSON.stringify(state))
    },
    logout (state) {
      state.data = {}
      state.login = false
      localStorage.setItem('user', JSON.stringify(state))
    }
  },
  namespaced: true
}

const settings = {
  state: {
    notifications: {
      sound: true,
      token: '',
      topics: []
    }
  },
  actions: {
    'toggleNotificationTopic' ({ state, dispatch, rootState }, topic) {
      let topicTokens = rootState.tokens[topic] ? rootState.tokens[topic].tokens : []
      let deviceToken = state.notifications.token
      let deviceTopics = state.notifications.topics
      let remove = deviceTopics.includes(topic) && topicTokens.includes(topic)
      if (remove) {
        state.notifications.topics = deviceTopics.filter(t => t !== topic)
        topicTokens = topicTokens.filter(t => t !== deviceToken)
      } else {
        deviceTopics.push(topic)
        topicTokens.push(deviceToken)
      }
      dispatch('tokens/set', { id: topic, tokens: topicTokens }, { root: true })
    }
  },
  namespaced: true
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
    settings,
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
