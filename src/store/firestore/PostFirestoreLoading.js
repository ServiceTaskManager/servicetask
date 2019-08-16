import store from '../'
const PostFirestoreLoading = () => {
  console.log('Running post firestore loading functions')
  store.dispatch('settings/setTopics')
  store.state.firestore.ready = true // Mandatory to trigger page render
}

export default PostFirestoreLoading
