import store from '../'
const PostFirestoreLoading = () => {
  store.dispatch('settings/setTopics')
  store.state.firestore.ready = true // Mandatory to trigger page render
}

export default PostFirestoreLoading
