import { Dialog } from 'quasar'
import UserPrompt from '../../components/UserPrompt'

const calls = {
  state: {
    data: {},
    meta: {
      title: 'Calls',
      icon: 'phone_callback',
      color: 'orange'
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
    }
  },
  getters: {
    getActions: state => callId => {
      let call = (state.data[callId] || {})
      let actions = [
        {
          label: 'Assign',
          icon: 'person_add',
          color: 'grey',
          action: 'userPrompt'
        }
      ]
      if (call.user !== '') {
        actions.push({
          label: 'Unassign',
          icon: 'person_add_disabled',
          color: 'grey',
          patch: { user: '' }
        })
      }
      if (call.status !== 'close') {
        actions.push({
          label: 'Close',
          icon: 'cancel',
          color: 'grey',
          patch: { status: 'close', closed_at: new Date() }
        })
      }
      if (call.status !== 'open') {
        actions.push({
          label: 'Open',
          icon: 'arrow_back',
          color: 'grey',
          patch: { status: 'open' }
        })
      }
      return actions
    }
  },
  actions: {
    userPrompt ({ dispatch }, data) {
      Dialog.create({
        component: UserPrompt,
        parent: data.parent,
        text: 'Assign to'
      }).onOk(userInput => {
        dispatch('patchBatch', { doc: { user: userInput }, ids: data.ids })
      })
    }
  },
  namespaced: true,
  firestorePath: 'calls',
  firestoreRefType: 'collection',
  moduleName: 'calls',
  statePropName: 'data',
  serverChange: {
    convertTimestamps: {
      created_at: '%convertTimestamp%',
      updated_at: '%convertTimestamp%',
      closed_at: '%convertTimestamp%'
    }
  }
}

export default calls
