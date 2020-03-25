import { Dialog } from 'quasar'
import UserPrompt from '../../components/user/UserPrompt'

const tasks = {
  state: {
    data: {},
    titleProp: 'title',
    routes: [{
      path: 'tasks',
      name: 'tasks',
      component: () => import('../../pages/StoreListPage'),
      meta: {
        title: 'Tasks',
        icon: 'done',
        color: 'light-blue',
        menu: true
      }
    }, {
      path: 'task/:id',
      name: 'task',
      component: () => import('../../pages/StorePage'),
      meta: {
        title: 'Task',
        icon: 'done',
        color: 'light-blue',
        propertyTitle: 'title'
      }
    }],
    default: {
      technician: '',
      customer: '',
      engine: '',
      type: '',
      title: '',
      description: '',
      done: false,
      time_shifts: [],
      subTasks: []
    },
    fields: [{
      key: 'technician',
      component: 'UserField'
    }, {
      key: 'customer',
      component: 'CustomerField'
    }, {
      key: 'engine',
      component: 'EngineField',
      forward: ['customer']
    }, {
      key: 'type',
      component: 'SelectField',
      attrs: {
        iconName: 'title',
        iconColor: 'light-blue',
        label: 'Type',
        options: [
          '🚗 Drive',
          '✈️ Fly',
          '🚅 Take the rain',
          '🚅✈️🚗 Travel',
          '🏫 Stay at hotel',
          '🔧 Fix',
          '📞 Call',
          '💻 Remote assistance'
        ]
      }
    }, {
      key: 'title',
      component: 'TextField',
      attrs: {
        iconName: 'title',
        iconColor: 'light-blue',
        label: 'Task',
        rules: [val => !!val || 'Task title is required']
      }
    }, {
      key: 'description',
      component: 'TextField',
      attrs: {
        iconName: 'title',
        iconColor: 'grey',
        label: 'Task details'
      }
    }, {
      key: 'time_shifts',
      component: 'ShiftsField'
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
        dispatch('patchBatch', { doc: { technician: userInput }, ids: data.ids })
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
