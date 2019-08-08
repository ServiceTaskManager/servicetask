import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/messaging'
import * as firebaseui from 'firebaseui'

import firebaseConfig from './firebase.config.json'

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()

export default ({ Vue, router, store }) => {
  let userMatchRequiredRoles = (requireRoles) => {
    let matchedRoles = []
    let userRoles = store.state.user.roles ? store.state.user.roles : []
    console.log('Check if user ' + store.state.user.displayName + ' (' + store.state.user.roles + ') has any of roles ' + requireRoles)
    userRoles.forEach((role) => {
      if (requireRoles.includes(role)) {
        console.log(role + ' role matched')
        matchedRoles.push(role)
      }
    })
    console.log('Matched roles : ' + matchedRoles)
    return matchedRoles.length > 0
  }

  // Watch for Auth state and redirect to /login if user is not logged in
  firebaseApp.auth().onAuthStateChanged((user) => {
    if (!user) {
      console.log('User logged out')
      store.state.user = null // Clear user store
      if (router.path !== '/login' && router.currentRoute.meta.requireAuth) {
        router.push('/login')
      }
    } else {
      console.log('User logged in : ' + firebaseAuth.currentUser.displayName)
      store.dispatch('users/fetchById', firebaseAuth.currentUser.uid).then((userDatas) => {
        console.log('User is registered.')

        // Load stores based on user roles
        store.state.user = userDatas
        store.commit('initFirestore', userDatas.roles)
        store.state.firestore.readableStores.forEach(firestore => {
          store.dispatch(firestore + '/openDBChannel').catch((error) => {
            console.log(error)
          })
        })

        // Check if user has enough rights to access ressources
        if (router.currentRoute.meta.requireRoles && !userMatchRequiredRoles(router.currentRoute.meta.requireRoles)) {
          console.log('Sorry, but you shouldn\'t be there...')
          router.push('403')
        }

        router.beforeEach((to, from, next) => {
          console.log('Check access rights to page ' + to.name)
          if (to.meta.requireRoles) {
            if (userMatchRequiredRoles(to.meta.requireRoles)) {
              console.log('Access allowed')
              next()
            } else {
              console.log('Access denied')
              next('403')
            }
          } else { // Role required, no access allowed
            console.log('Route doesn\'t require any role')
            next()
          }
        })
      }).catch((error) => {
        console.log('User data cannot be fethed. ' + error)
        router.push('403')
      })
    }
  })

  // Manage messaging if supported by browser
  if (firebase.messaging.isSupported()) {
    const firebaseMessaging = firebaseApp.messaging()

    // Configure Firebase messaging to use Push Notifications easily
    firebaseMessaging.usePublicVapidKey(firebaseConfig.messagingApiKey) // Register messaging API key

    firebaseMessaging.onTokenRefresh(() => {
      firebaseMessaging.getToken().then(async token => {
        store.state.user.tokens = [token]
        store.dispatch('users/patch', store.state.user)
      })
    })

    // Request Notification Permission
    firebaseMessaging.requestPermission().then(function () {
      console.log('Notification permission granted.')
    }).catch(function (err) {
      console.log('Unable to get permission to notify.', err)
    })

    firebaseMessaging.onMessage(payload => {
      console.log('Message received.', payload)
    })
  }

  Vue.prototype.$firebase = firebase
  Vue.prototype.$firebaseApp = firebaseApp
  Vue.prototype.$auth = firebaseAuth
  Vue.prototype.$firebaseui = firebaseui
  Vue.prototype.$db = firebase.firestore()
}
