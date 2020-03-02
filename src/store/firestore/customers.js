import { Dialog } from 'quasar'
import UserPrompt from '../../components/UserPrompt'

const customers = {
  state: {
    data: {},
    meta: {
      title: 'Customers',
      icon: 'group',
      color: 'pink'
    },
    default: {
      name: '',
      address: {
        addr1: '',
        addr2: '',
        postal_code: '',
        city: '',
        country: ''
      },
      phone: '',
      email: ''
    },
    actions: [{
      label: 'Assign a default technician',
      icon: 'person_add',
      color: 'grey',
      action: 'assignTechnician',
      more: true
    }]
  },
  actions: {
    assignTechnician ({ dispatch }, data) {
      Dialog.create({
        component: UserPrompt,
        parent: data.parent,
        text: 'Assign to'
      }).onOk(userInput => {
        dispatch('patchBatch', { doc: { technician: userInput }, ids: data.ids })
      })
    }
  },
  vue: true,
  readRoles: ['user'],
  writeRoles: ['admin'],
  namespaced: true,
  firestorePath: 'customers',
  firestoreRefType: 'collection',
  moduleName: 'customers',
  statePropName: 'data'
}

export default customers
