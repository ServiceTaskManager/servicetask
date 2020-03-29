import { Dialog } from 'quasar'
import UserPrompt from '../../components/user/UserPrompt'

const tasks = {
  state: {
    data: {}
  },
  actions: {
    userPrompt ({ dispatch }, data) {
      const ids = data.$store.getters['tasks/selectedIds']
      Dialog.create({
        component: UserPrompt,
        parent: data,
        text: 'Assign to'
      }).onOk(userInput => {
        dispatch('patchBatch', { doc: { user: userInput }, ids: ids })
      })
    }
  },
  namespaced: true,
  firestorePath: 'tasks',
  firestoreRefType: 'collection',
  moduleName: 'tasks',
  statePropName: 'data'
}

export default tasks
