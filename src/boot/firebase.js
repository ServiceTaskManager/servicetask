import firebase from 'firebase'
import config from './firebase.config.json'

export const firebaseApp = firebase.initializeApp(config)
export const firebaseAuth = firebaseApp.auth()

export default ({ Vue }) => {
  Vue.prototype.$firebase = firebaseApp
  Vue.prototype.$auth = firebaseAuth
}
