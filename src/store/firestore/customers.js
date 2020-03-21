import { Dialog } from 'quasar'
import UserPrompt from '../../components/user/UserPrompt'

const customers = {
  state: {
    data: {},
    meta: {
      title: 'Customers',
      icon: 'group',
      color: 'pink',
      titleProperty: 'name'
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
    fields: [{
      key: 'name',
      component: 'TextField',
      attributes: {
        iconName: 'group',
        iconColor: 'pink',
        label: 'Company name'
      }
    },
    {
      key: 'email',
      component: 'TextField',
      attributes: {
        type: 'email',
        iconName: 'alternate_email',
        iconColor: 'grey',
        label: 'Company email address'
      }
    },
    {
      key: 'phone',
      component: 'TextField',
      attributes: {
        type: 'phone',
        iconName: 'phone',
        iconColor: 'grey',
        label: 'Company phone number'
      }
    },
    {
      key: 'address',
      component: 'AddressField',
      attributes: {}
    }],
    actions: [{
      label: 'Assign',
      icon: 'person_add',
      color: 'grey',
      action: 'assignTechnician'
    }, {
      label: 'Unassign',
      icon: 'person_add_disabled',
      color: 'grey',
      patch: { technician: '' }
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
