import { i18n } from '../boot/i18n'

export default (locale) => {
  i18n.locale = locale

  return {
    name: 'customer',
    titleProp: 'name',
    meta: {
      icon: 'people',
      color: 'pink'
    },
    routes: [{
      path: 'customers',
      name: 'customers',
      component: () => import('../pages/StListPage'),
      meta: {
        title: i18n.t('customers.routes.list.title'),
        menu: true
      }
    }, {
      path: 'customer/:id',
      name: 'customer',
      component: () => import('../pages/StPage'),
      meta: {
        title: i18n.t('customers.routes.single.title')
      }
    }],
    fields: [{
      key: 'name',
      component: 'TextField',
      attrs: {
        iconName: 'group',
        iconColor: 'pink',
        label: 'Company name',
        rules: [val => !!val || i18n.t('customers.fields.name.validation.empty')]
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
        label: i18n.t('customers.fields.email.label')
      },
      search: 'contains'
    },
    {
      key: 'phone',
      component: 'TextField',
      attrs: {
        type: 'tel',
        iconName: 'phone',
        iconColor: 'grey',
        label: i18n.t('customers.fields.phone.label'),
        mask: '+## # ## ## ## ## NNNNNNN'
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
  }
}
