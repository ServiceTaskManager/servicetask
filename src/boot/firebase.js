import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import * as firebaseui from 'firebaseui'

import config from './firebase.config.json'

export const firebaseApp = firebase.initializeApp(config)
export const firebaseAuth = firebaseApp.auth()

export default ({ Vue, router, store }) => {
  firebaseApp.auth().onAuthStateChanged(function (user) {
    if (user) {
      store.state.user = firebaseAuth.currentUser
      router.push('/')
    } else {
      store.state.user = null
      if (router.path !== '/login') {
        router.push('/login')
      }
    }
  })

  Vue.prototype.$firebase = firebase
  Vue.prototype.$firebaseApp = firebaseApp
  Vue.prototype.$auth = firebaseAuth
  Vue.prototype.$firebaseui = firebaseui
  Vue.prototype.$db = firebase.firestore()
}
