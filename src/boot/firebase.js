import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/messaging'

import firebaseConfig from './firebase.config.json'

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()
const firebaseMessaging = firebaseApp.messaging()
firebaseMessaging.usePublicVapidKey(firebaseConfig.messagingApiKey)

export default ({ Vue, router, store }) => {
  // Watch for Auth state and redirect to /login if user is not logged in
  firebaseApp.auth().onAuthStateChanged((user) => {
    if (!user) {
      console.log('User logged out')
      store.commit('userLoggedOut')
      if (router.currentRoute.meta.requireAuth) {
        router.push('/')
      }
    } else {
      console.log('User logged in : ' + firebaseAuth.currentUser.uid)
      store.dispatch('users/fetchById', firebaseAuth.currentUser.uid).then(userData => {
        console.log('User is registered.')

        // Set user store based on new logged in user
        store.commit('userLoggedIn', userData)

        // Refresh page to Dashboard
        router.push('dashboard')

        // Load stores based on user roles
        store.commit('initFirestore', userData.roles)
        store.state.firestore.readableStores.forEach(firestore => {
          if (!store.state.firestore.openStores.includes(firestore)) {
            store.dispatch(firestore + '/openDBChannel').then(response => {
              store.commit('updateFirestoreOpenList', firestore, true)
            }, error => {
              console.log(error)
            })
          }
        })

        // Manage messaging
        firebaseMessaging.onTokenRefresh(() => {
          firebaseMessaging.getToken().then(async token => {
            store.state.user.data.tokens = [token]
            store.dispatch('users/patch', store.state.user)
          })
        })
        firebaseMessaging.requestPermission().then(function () {
          console.log('Notification permission granted.')
        }).catch(function (err) {
          console.log('Unable to get permission to notify.', err)
        })

        firebaseMessaging.onMessage(payload => {
          console.log('Message received.', payload)
        })
      }, error => {
        console.log('User data cannot be fethed. ' + error)
        router.push('403')
      })
    }
  })

  Vue.prototype.$firebase = firebase
  Vue.prototype.$firebaseApp = firebaseApp
  Vue.prototype.$auth = firebaseAuth
  Vue.prototype.$db = firebase.firestore()
}
