import { Dialog } from 'quasar'
import UserPrompt from '../../components/UserPrompt'

const tasks = {
  state: {
    data: {},
    meta: {
      title: 'Tasks',
      icon: 'done',
      color: 'light-blue'
    },
    default: {
      user: '',
      customer: '',
      engine: '',
      title: '',
      description: '',
      done: false,
      done_at: '',
      schedule_from: '',
      schedule_to: '',
      subTasks: []
    }
  },
  getters: {
    getActions: state => taskId => {
      let task = (state.data[taskId] || {})
      let actions = [
        {
          label: 'Assign',
          icon: 'person_add',
          color: 'grey',
          action: 'userPrompt'
        }
      ]
      if (task.user !== '') {
        actions.push({
          label: 'Unassign',
          icon: 'person_add_disabled',
          color: 'grey',
          patch: { user: '' }
        })
      }
      if (task.done !== true) {
        actions.push({
          label: 'Done',
          icon: 'done',
          color: state.meta.color,
          patch: { done: true, done_at: new Date() }
        })
      }
      if (task.status !== false) {
        actions.push({
          label: 'To do',
          icon: 'cancel',
          color: 'negative',
          patch: { done: false }
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
  firestorePath: 'tasks',
  firestoreRefType: 'collection',
  moduleName: 'tasks',
  statePropName: 'data',
  serverChange: {
    convertTimestamps: {
      created_at: '%convertTimestamp%',
      updated_at: '%convertTimestamp%',
      schedule_from: '%convertTimestamp%',
      schedule_to: '%convertTimestamp%',
      done_at: '%convertTimestamp%'
    }
  }
}

export default tasks
