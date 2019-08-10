import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/messaging'

import firebaseConfig from './firebase.config.json'

import { Notify } from 'quasar'

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
        let addUserToken = () => {
          firebaseMessaging.getToken().then(async token => {
            let topic = {
              id: 'calls',
              tokens: 'calls' in store.state.tokens ? store.state.tokens.calls.tokens : [token]
            }
            if (!topic.tokens.includes(token)) { // Le token n'existe pas
              topic.tokens.push(token)
            }
            store.dispatch('tokens/set', topic)
          })
        }

        addUserToken()

        firebaseMessaging.onTokenRefresh(() => {
          addUserToken()
        })
        firebaseMessaging.requestPermission().then(function () {
          console.log('Notification permission granted.')
        }).catch(function (err) {
          console.log('Unable to get permission to notify.', err)
        })

        firebaseMessaging.onMessage(payload => {
          console.log('Message received.', payload)
          Notify.create({
            message: payload.notification.body,
            icon: 'notification_important',
            color: 'accent',
            actions: [{
              label: 'open',
              handler: () => {
                router.push('calls')
              }
            }]
          })
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
