import { i18n } from '../boot/i18n'

export default (locale) => {
  i18n.locale = locale

  return {
    name: 'call',
    titleProp: 'title',
    meta: {
      icon: 'phone_callback',
      color: 'orange'
    },
    routes: [{
      path: 'calls',
      name: 'calls',
      component: () => import('../pages/StListPage'),
      meta: {
        title: i18n.t('calls.route.list.title'),
        menu: true
      }
    }, {
      path: 'call/:id',
      name: 'call',
      component: () => import('../pages/StPage'),
      meta: {
        title: i18n.t('calls.route.single.title')
      }
    }],
    fields: [{
      key: 'title',
      component: 'TextField',
      attrs: {
        iconName: 'phone_callback',
        iconColor: 'orange',
        label: i18n.t('calls.fields.title.label'),
        rules: [val => !!val || i18n.t('calls.fields.title.validation.empty')]
      }
    }, {
      key: 'customer',
      component: 'CustomerField',
      attrs: {
        rules: [val => !!val || i18n.t('calls.fields.customer.validation.required')]
      }
    }, {
      key: 'machine',
      component: 'MachineField'
    }, {
      key: 'person',
      component: 'UserField',
      attrs: {
        label: i18n.t('calls.fields.person.label')
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
        label: i18n.t('calls.fields.phone.label'),
        mask: '+## # ## ## ## ## NNNNNNN',
        type: 'tel'
      }
    }, {
      key: 'technician',
      component: 'UserField',
      attrs: {
        label: i18n.t('calls.fields.technician.label')
      }
    }, {
      key: 'open',
      component: 'BooleanField',
      attrs: {
        iconColor: 'orange',
        label: i18n.t('calls.fields.open.label'),
        rules: [val => !!val || 'Status is required']
      }
    }],
    actions: [{
      label: i18n.t('calls.actions.assign.label'),
      icon: 'person_add',
      color: 'positive',
      action: 'assignTechnicianPrompt'
    }, {
      label: i18n.t('calls.actions.unassign.label'),
      icon: 'person_add_disabled',
      color: 'negative',
      patch: { technician: '' }
    }, {
      label: i18n.t('calls.actions.close.label'),
      icon: 'arrow_forward',
      color: 'positive',
      patch: { open: false }
    }, {
      label: i18n.t('calls.actions.open.label'),
      icon: 'arrow_back',
      color: 'negative',
      patch: { open: true }
    }]
  }
}
