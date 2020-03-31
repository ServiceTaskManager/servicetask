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
      component: () => import('../pages/TasksPage'),
      meta: {
        title: i18n.t('tasks.routes.list.title'),
        menu: true
      }
    }, {
      path: 'task/:id',
      name: 'task',
      component: () => import('../pages/StPage'),
      meta: {
        title: i18n.t('tasks.routes.single.title'),
        propertyTitle: 'title'
      }
    }],
    fields: [{
      key: 'user',
      component: 'UserField',
      attrs: {
        label: i18n.t('tasks.fields.user.label')
      },
      search: '=='
    }, {
      key: 'customer',
      component: 'CustomerField',
      attrs: {
        label: i18n.t('tasks.fields.customer.label')
      },
      search: '=='
    }, {
      key: 'machine',
      component: 'MachineField',
      attrs: {
        label: i18n.t('tasks.fields.machine.label')
      },
      forward: ['customer'],
      search: '=='
    }, {
      key: 'type',
      component: 'SelectField',
      attrs: {
        iconName: 'title',
        iconColor: 'light-blue',
        label: i18n.t('tasks.fields.type.label'),
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
        label: i18n.t('tasks.fields.title.label'),
        rules: [val => !!val || i18n.t('tasks.fields.title.validation.empty')]
      },
      search: 'contains'
    }, {
      key: 'description',
      component: 'TextField',
      attrs: {
        iconName: 'title',
        iconColor: 'grey',
        label: i18n.t('tasks.fields.description.label')
      },
      search: 'contains'
    }, {
      key: 'time_shifts',
      component: 'ShiftsField',
      attrs: {}
    }],
    actions: [{
      label: i18n.t('tasks.actions.assign.label'),
      icon: 'person_add',
      color: 'grey',
      action: 'userPrompt'
    }, {
      label: i18n.t('tasks.actions.unassign.label'),
      icon: 'person_add_disabled',
      color: 'grey',
      patch: { user: '' }
    }, {
      label: i18n.t('tasks.actions.done.label'),
      icon: 'done',
      color: 'light-blue',
      patch: { done: true, done_at: new Date() }
    }, {
      label: i18n.t('tasks.actions.todo.label'),
      icon: 'cancel',
      color: 'negative',
      patch: { done: false }
    }]
  }
}
