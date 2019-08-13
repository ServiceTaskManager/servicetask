import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/messaging'

import firebaseConfig from './firebase.config.json'

import { Notify } from 'quasar'

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()
const firebaseMessaging = firebaseApp.messaging()
const firebaseFirestore = firebase.firestore()

firebaseMessaging.usePublicVapidKey(firebaseConfig.messagingApiKey)

export default ({ Vue, router, store }) => {
  // Watch for Auth state and redirect to /login if user is not logged in
  firebaseApp.auth().onAuthStateChanged((user) => {
    if (!user) {
      console.log('User logged out')
      store.commit('user/logout')
      router.push({ name: 'login' })
    } else {
      console.log('User logged in : ' + firebaseAuth.currentUser.uid)
      store.dispatch('users/fetchById', firebaseAuth.currentUser.uid).then(userData => {
        // Set user store based on new logged in user
        store.commit('user/login', userData)

        // Refresh page to Dashboard
        router.push({ name: 'dashboard' })

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

        firebaseMessaging.getToken().then(async token => {
          store.state.settings.notifications.token = token
        })
        firebaseMessaging.requestPermission().then(function () {
          console.log('Notification permission granted.')
        }).catch(function (err) {
          console.log('Unable to get permission to notify.', err)
        })

        firebaseMessaging.onMessage(payload => {
          let notificationAudio = new Audio('statics/sounds/notification.mp3')
          notificationAudio.play()
          Notify.create({
            message: payload.notification.body,
            icon: 'notification_important',
            color: 'accent',
            actions: [{
              label: 'open',
              handler: () => {
                router.push({ name: 'calls' })
              }
            }]
          })
        })
      }, error => {
        console.log('User data cannot be fethed. ' + error)
        router.push({ name: '403' })
      })
    }
  })

  Vue.prototype.$firebase = firebase
  Vue.prototype.$firebaseApp = firebaseApp
  Vue.prototype.$auth = firebaseAuth
  Vue.prototype.$db = firebaseFirestore
}
