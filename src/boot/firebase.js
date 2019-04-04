import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/messaging'
import * as firebaseui from 'firebaseui'

import config from './firebase.config.json'

const firebaseApp = firebase.initializeApp(config)
const firebaseAuth = firebaseApp.auth()

export default ({ Vue, router, store }) => {
  // Watch for Auth state and redirect to /login if user is not logged in
  firebaseApp.auth().onAuthStateChanged((user) => {
    if (user) {
      store.state.user = user

      store.state.config.models.forEach((key) => {
        store.dispatch(key + '/openDBChannel')
          .then(() => {
            console.log('Successfully openDBChannel ' + key)
          }).catch((err) => {
            console.log('Failed to openDBChannel ' + key + ' with error: ' + err)
          })
      })

      let newUser = {
        id: user.uid,
        displayName: user.displayName
      }
      store.dispatch('users/patch', newUser)
    } else {
      store.state.user = null
      if (router.path !== '/login') {
        router.push('/login')
      }
    }
  })

  // Manage messaging is supported by browser
  if (firebase.messaging.isSupported()) {
    const firebaseMessaging = firebaseApp.messaging()

    Vue.prototype.$messaging = firebaseMessaging
    // Configure Firebase messaging to use Push Notifications easily
    firebaseMessaging.usePublicVapidKey(config.messagingApiKey) // Register messaging API key
    navigator.serviceWorker.register('statics/firebase-messaging-sw.js')
      .then((registration) => {
        firebaseMessaging.useServiceWorker(registration)
      }).catch(err => {
        console.log(err)
      })
  }

  Vue.prototype.$firebase = firebase
  Vue.prototype.$firebaseApp = firebaseApp
  Vue.prototype.$auth = firebaseAuth
  Vue.prototype.$firebaseui = firebaseui
  Vue.prototype.$db = firebase.firestore()
}
