import { Dialog } from 'quasar'
import UserPrompt from '../../components/user/UserPrompt'

const calls = {
  state: {
    data: {},
    titleProp: 'title',
    routes: [{
      path: 'calls',
      name: 'calls',
      component: () => import('../../pages/StoreListPage'),
      meta: {
        title: 'Calls',
        icon: 'phone_callback',
        color: 'orange',
        menu: true
      }
    }, {
      path: 'call/:id',
      name: 'call',
      component: () => import('../../pages/StorePage'),
      meta: {
        title: 'Call',
        icon: 'phone_callback',
        color: 'orange'
      }
    }],
    default: {
      title: '', // string
      customer: '', // customer id
      engine: '', // engine id
      open: '', // unassigned, assigned, closed
      person: '', // string
      phone: '', // string
      teamviewer: {
        id: '',
        pwd: ''
      },
      assign_to: '', // user id
      closed_at: '' // date
    },
    fields: [{
      key: 'title',
      component: 'TextField',
      attrs: {
        iconName: 'phone_callback',
        iconColor: 'orange',
        label: 'Call reason',
        rules: [val => !!val || 'Call reason is required']
      }
    }, {
      key: 'customer',
      component: 'CustomerField',
      attrs: {
        rules: [val => !!val || 'Customer is required']
      }
    }, {
      key: 'engine',
      component: 'EngineField'
    }, {
      key: 'person',
      component: 'UserField',
      attrs: {
        label: 'Person calling'
      }
    }, {
      key: 'teamviewer',
      component: 'TeamviewerField'
    }, {
      key: 'phone',
      component: 'TextField',
      attrs: {
        iconName: 'phone',
        iconColor: 'grey',
        label: 'Phone number'
      }
    }, {
      key: 'assign_to',
      component: 'UserField',
      attrs: {
        label: 'Assign to'
      }
    }, {
      key: 'open',
      component: 'BooleanField',
      attrs: {
        iconColor: 'orange',
        label: 'Call status',
        rules: [val => !!val || 'Status is required']
      }
    }],
    actions: [{
      label: 'Assign',
      icon: 'person_add',
      color: 'grey',
      action: 'userPrompt'
    }, {
      label: 'Unassign',
      icon: 'person_add_disabled',
      color: 'grey',
      patch: { technician: '' }
    }, {
      label: 'Close',
      icon: 'cancel',
      color: 'grey',
      patch: { open: false }
    }, {
      label: 'Open',
      icon: 'arrow_back',
      color: 'grey',
      patch: { open: true }
    }]
  },
  actions: {
    userPrompt ({ dispatch }, data) {
      Dialog.create({
        component: UserPrompt,
        parent: data.parent,
        text: 'Assign to'
      }).onOk(userInput => {
        dispatch('patchBatch', { doc: { assign_to: userInput }, ids: data.ids })
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
