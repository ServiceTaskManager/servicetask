import { i18n } from '../boot/i18n'

export default (locale) => {
  i18n.locale = locale

  return {
    name: 'task',
    titleProp: 'title',
    meta: {
      icon: 'done',
      color: 'light-blue'
    },
    routes: [{
      path: 'tasks',
      name: 'tasks',
      component: () => import('../pages/StListPage'),
      meta: {
        title: 'Tasks',
        menu: true
      }
    }, {
      path: 'task/:id',
      name: 'task',
      component: () => import('../pages/StPage'),
      meta: {
        title: 'Task',
        propertyTitle: 'title'
      }
    }],
    fields: [{
      key: 'user',
      component: 'UserField',
      attrs: {
        label: 'Technician'
      },
      search: '=='
    }, {
      key: 'customer',
      component: 'CustomerField',
      search: '=='
    }, {
      key: 'engine',
      component: 'EngineField',
      forward: ['customer'],
      search: '=='
    }, {
      key: 'type',
      component: 'SelectField',
      attrs: {
        iconName: 'title',
        iconColor: 'light-blue',
        label: 'Type',
        clearable: true,
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
      },
      search: 'contains'
    }, {
      key: 'title',
      component: 'TextField',
      attrs: {
        iconName: 'title',
        iconColor: 'light-blue',
        label: 'Task',
        rules: [val => !!val || 'Task title is required']
      },
      search: 'contains'
    }, {
      key: 'description',
      component: 'TextField',
      attrs: {
        iconName: 'title',
        iconColor: 'grey',
        label: 'Task details'
      },
      search: 'contains'
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
  }
}
