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
        title: 'Customers',
        menu: true
      }
    }, {
      path: 'customer/:id',
      name: 'customer',
      component: () => import('../pages/StPage'),
      meta: {
        title: 'Customer'
      }
    }],
    fields: [{
      key: 'name',
      component: 'TextField',
      attrs: {
        iconName: 'group',
        iconColor: 'pink',
        label: 'Company name',
        rules: [val => !!val || 'Company name is required']
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
        label: 'Company email address'
      },
      search: 'contains'
    },
    {
      key: 'phone',
      component: 'TextField',
      attrs: {
        type: 'phone',
        iconName: 'phone',
        iconColor: 'grey',
        label: 'Company phone number'
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
