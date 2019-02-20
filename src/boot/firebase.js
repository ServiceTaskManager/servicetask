import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from './firebase.config.json'

export const firebaseApp = firebase.initializeApp(config)
export const firebaseAuth = firebaseApp.auth()

export default ({ Vue }) => {
  Vue.prototype.$firebase = firebaseApp
  Vue.prototype.$auth = firebaseAuth
  // Vue.prototype.$db = firebaseApp.firestore()
}
