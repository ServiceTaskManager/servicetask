import { Dialog } from 'quasar'
import UserPrompt from '../../components/user/UserPrompt'

const calls = {
  state: {
    data: {}
  },
  actions: {
    assignTechnicianPrompt ({ dispatch }, data) {
      Dialog.create({
        component: UserPrompt,
        parent: data.parent,
        text: 'Assign to'
      }).onOk(userInput => {
        dispatch('patchBatch', { doc: { technician: userInput }, ids: data.ids })
      })
    }
  },
  namespaced: true,
  firestorePath: 'calls',
  firestoreRefType: 'collection',
  moduleName: 'calls',
  statePropName: 'data'
}

export default calls
