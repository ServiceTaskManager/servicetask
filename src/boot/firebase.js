import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/messaging'

import { Notify } from 'quasar'

import firebaseConfig from '../../firebase.config.json'

import models from '../models'

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()
const firebaseFirestore = firebase.firestore()

firebaseFirestore.enablePersistence().catch(error => { throw error })

export default ({ Vue, router, store, app }) => {
  // Watch for Auth state and redirect to /login if user is not logged in
  firebaseAuth.onAuthStateChanged((user) => {
    if (!user) {
      // On user logout
      // Go to login page
      router.push({ name: 'login' })
      // Close on vuex-easy-firestore DBChannel and clear store's data
      store.dispatch('firestoreClose', { clearModule: true })
    } else {
      // On user login
      // Retrieve user datas (firestore rules able only to fetch user with same id)
      store.dispatch('users/fetchById', firebaseAuth.currentUser.uid).then(userData => {
        // Load firestores with OpenDBChannel (based on user role)
        store.dispatch('firestoreOpen', userData).then(r => {
          app.store.commit('user/set', app.store.state.users.data[userData.id]) // Set user store

          // Set model definition with locale according to user
          Vue.prototype.$models = models(userData.lang || 'en-US')

          // Set watcher for i18n locale change and update models definition with correct locale
          const i18n = app.i18n.vm
          i18n.$watch('locale', (val) => {
            Vue.prototype.$models = models(val)
          })
        })

        // Setup notifications
        if (firebase.messaging.isSupported()) {
          store.state.settings.notifications.supported = true

          const firebaseMessaging = firebaseApp.messaging()
          firebaseMessaging.usePublicVapidKey(firebaseConfig.messagingApiKey)

          firebaseMessaging.requestPermission().then(function () {
            firebaseMessaging.getToken().then(async token => {
              store.state.settings.notifications.token = token
              store.state.settings.notifications.permission = true
            })
          }).catch(error => {
            store.state.settings.notifications.permission = false
            throw error
          })

          firebaseMessaging.onMessage(payload => {
            let notificationAudio = new Audio('statics/sounds/notification.mp3')
            notificationAudio.play()
            Notify.create({
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
      })
    }
  })

  // Create $ shortcuts for states
  for (let s in store.state) {
    Vue.prototype['$' + s] = store.state[s]
  }

  Vue.prototype.$auth = firebaseAuth
}
