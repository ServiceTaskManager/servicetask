import { i18n } from '../boot/i18n'

export default (locale) => {
  i18n.locale = locale

  return {
    name: 'user',
    titleProp: 'name',
    meta: {
      icon: 'person',
      color: 'green'
    },
    routes: [{
      path: 'users',
      name: 'users',
      component: () => import('../pages/StListPage'),
      meta: {
        title: 'Users',
        menu: true
      }
    }, {
      path: 'user/:id',
      name: 'user',
      component: () => import('../pages/StPage'),
      meta: {
        title: 'User'
      }
    }],
    fields: [{
      key: 'name',
      component: 'TextField',
      attrs: {
        iconName: 'person',
        iconColor: 'green',
        label: 'Full name',
        rules: [val => !!val || 'Name is required']
      },
      search: 'contains'
    }, {
      key: 'customer',
      component: 'CustomerField',
      attrs: {
        rules: [val => !!val || 'Customer is required']
      }
    }, {
      key: 'phone',
      component: 'TextField',
      attrs: {
        iconName: 'phone',
        iconColor: 'grey',
        label: 'Phone number',
        mask: '+## # ## ## ## ## NNNNNNN',
        type: 'tel'
      },
      search: 'contains'
    }, {
      key: 'email',
      component: 'TextField',
      attrs: {
        iconName: 'alternate_email',
        iconColor: 'grey',
        label: 'Email address',
        type: 'email'
      },
      search: 'contains'
    }, {
      key: 'address',
      component: 'AddressField'
    }, {
      key: 'color',
      component: 'ColorPicker'
    }, {
      key: 'roles',
      component: 'SelectField',
      attrs: {
        options: ['user', 'admin'],
        multiple: true
      },
      search: 'includes'
    }, {
      key: 'lang',
      component: 'SelectField',
      attrs: {
        iconName: 'language',
        iconColor: 'grey',
        label: 'Language',
        emitValue: true,
        mapOptions: true,
        options: [
          { value: 'en-US', label: 'English' },
          { value: 'fr', label: 'Français' },
          { value: 'de', label: 'Deutsch' }
        ]
      },
      search: 'includes'
    }]
  }
}
