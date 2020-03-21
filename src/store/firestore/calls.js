import { Dialog } from 'quasar'
import UserPrompt from '../../components/user/UserPrompt'

const calls = {
  state: {
    data: {},
    meta: {
      title: 'Calls',
      icon: 'phone_callback',
      color: 'orange',
      titleProperty: 'title'
    },
    default: {
      title: '', // string
      customer: '', // customer id
      engine: '', // engine id
      status: 'open', // unassigned, assigned, closed
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
      attributes: {
        iconName: 'phone_callback',
        iconColor: 'orange',
        label: 'Call reason'
      }
    }, {
      key: 'customer',
      component: 'CustomerField'
    }, {
      key: 'engine',
      component: 'EngineField'
    }, {
      key: 'person',
      component: 'UserField',
      attributes: {
        label: 'Person calling'
      }
    }, {
      key: 'teamviewer',
      component: 'TeamviewerField'
    }, {
      key: 'phone',
      component: 'TextField',
      attributes: {
        iconName: 'phone',
        iconColor: 'grey',
        label: 'Phone number'
      }
    }, {
      key: 'assign_to',
      component: 'UserField',
      attributes: {
        label: 'Assign to'
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
      patch: { user: '' }
    }, {
      label: 'Close',
      icon: 'cancel',
      color: 'grey',
      patch: { status: 'close', closed_at: new Date() }
    }, {
      label: 'Open',
      icon: 'arrow_back',
      color: 'grey',
      patch: { status: 'open' }
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
