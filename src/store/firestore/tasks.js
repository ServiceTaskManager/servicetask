import { Dialog } from 'quasar'
import UserPrompt from '../../components/user/UserPrompt'

const tasks = {
  state: {
    data: {},
    meta: {
      title: 'Tasks',
      icon: 'done',
      color: 'light-blue',
      titleProperty: 'title'
    },
    default: {
      user: '',
      customer: '',
      engine: '',
      title: '',
      description: '',
      done: false,
      time_shifts: [],
      subTasks: []
    },
    fields: [{
      key: 'user',
      component: 'UserField'
    }, {
      key: 'customer',
      component: 'CustomerField'
    }, {
      key: 'engine',
      component: 'EngineField'
    }, {
      key: 'title',
      component: 'TextField',
      attributes: {
        iconName: 'title',
        iconColor: 'light-blue',
        label: 'Task'
      }
    }, {
      key: 'description',
      component: 'TextField',
      attributes: {
        iconName: 'title',
        iconColor: 'grey',
        label: 'Task details'
      }
    }, {
      key: 'time_shifts',
      component: 'TimeShiftField'
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
      label: 'Done',
      icon: 'done',
      color: 'light-blue',
      patch: { done: true, done_at: new Date() }
    }, {
      label: 'To do',
      icon: 'cancel',
      color: 'negative',
      patch: { done: false }
    }]
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
  statePropName: 'data'
}

export default tasks
