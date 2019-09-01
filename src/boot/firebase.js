import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/messaging'

import { Notify } from 'quasar'

import firebaseConfig from './firebase.config.json'

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()
const firebaseFirestore = firebase.firestore()

firebaseFirestore.enablePersistence().catch(err => {
  if (err.code === 'failed-precondition') console.log('Firestore: persistence error: failed-precondition')
  else if (err.code === 'unimplemented') console.log('Firestore: persistence error: unimplemented')
  else console.log('Firestore: persistence error: ' + err)
})

export default ({ Vue, router, store }) => {
  // Watch for Auth state and redirect to /login if user is not logged in
  firebaseApp.auth().onAuthStateChanged((user) => {
    if (!user) {
      store.state.firestore.openStores.forEach(firestore => {
        store.dispatch(firestore + '/closeDBChannel', { clearModule: true })
        store.commit('updateFirestoreOpenList', { firestore: firestore, open: false })
      })
      store.commit('user/logout')
      router.push({ name: 'login' })
    } else {
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
              store.commit('updateFirestoreOpenList', { firestore: firestore, open: true })
            }, error => {
              console.log(error)
            })
          }
        })

        if (firebase.messaging.isSupported()) {
          store.state.settings.notifications.supported = true

          const firebaseMessaging = firebaseApp.messaging()
          firebaseMessaging.usePublicVapidKey(firebaseConfig.messagingApiKey)

          firebaseMessaging.requestPermission().then(function () {
            firebaseMessaging.getToken().then(async token => {
              store.state.settings.notifications.token = token
              store.state.settings.notifications.permission = true
            })
          }).catch(err => {
            console.log(err)
            store.state.settings.notifications.permission = false
          })

          firebaseMessaging.onMessage(payload => {
            console.log(payload)
            let notificationAudio = new Audio('statics/sounds/notification.mp3')
            notificationAudio.play()
            Notify({
              message: payload.notification.title,
              icon: 'notification_important',
              color: 'accent',
              actions: [{
                label: 'open',
                handler: () => {
                  this.$router.push({ name: 'dashboard' })
                }
              }]
            })
          })
        } else {
          store.state.settings.notifications.supported = false

          Notify.create({
            message: 'Notifications are not supported by your browser.',
            icon: 'error',
            color: 'negative'
          })
        }
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
