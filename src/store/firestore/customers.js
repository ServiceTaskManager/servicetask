import { Dialog } from 'quasar'
import UserPrompt from '../../components/user/UserPrompt'

const customers = {
  state: {
    data: {},
    titleProp: 'name',
    routes: [{
      path: 'customers',
      name: 'customers',
      component: () => import('../../pages/StoreListPage'),
      meta: {
        title: 'Customers',
        icon: 'people',
        color: 'pink',
        menu: true
      }
    }, {
      path: 'customer/:id',
      name: 'customer',
      component: () => import('../../pages/StorePage'),
      meta: {
        title: 'Customer',
        icon: 'people',
        color: 'pink',
        propertyTitle: 'title'
      }
    }],
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
      attrs: {
        iconName: 'group',
        iconColor: 'pink',
        label: 'Company name',
        rules: [val => !!val || 'Company name is required']
      },
      search: 'contains'
    },
    {
      key: 'email',
      component: 'TextField',
      attrs: {
        type: 'email',
        iconName: 'alternate_email',
        iconColor: 'grey',
        label: 'Company email address'
      },
      search: 'contains'
    },
    {
      key: 'phone',
      component: 'TextField',
      attrs: {
        type: 'phone',
        iconName: 'phone',
        iconColor: 'grey',
        label: 'Company phone number'
      },
      search: 'contains'
    },
    {
      key: 'address',
      component: 'AddressField',
      attrs: {}
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
