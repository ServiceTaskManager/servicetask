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
        title: i18n.t('users.routes.list.title'),
        menu: true
      }
    }, {
      path: 'user/:id',
      name: 'user',
      component: () => import('../pages/UserPage'),
      meta: {
        title: i18n.t('users.routes.single.title')
      }
    }],
    fields: [{
      key: 'name',
      component: 'TextField',
      attrs: {
        iconName: 'person',
        iconColor: 'green',
        label: i18n.t('users.fields.name.label'),
        rules: [val => !!val || i18n.t('users.fields.name.validation.empty')]
      },
      search: 'contains'
    }, {
      key: 'customer',
      component: 'CustomerField',
      attrs: {
        label: i18n.t('users.fields.customer.label'),
        rules: [val => !!val || i18n.t('users.fields.customer.validation.empty')]
      }
    }, {
      key: 'phone',
      component: 'TextField',
      attrs: {
        iconName: 'phone',
        iconColor: 'grey',
        label: i18n.t('users.fields.phone.label'),
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
        label: i18n.t('users.fields.email.label'),
        type: 'email'
      },
      search: 'contains'
    }, {
      key: 'address',
      component: 'AddressField'
    }, {
      key: 'color',
      component: 'ColorPicker',
      attrs: {
        label: i18n.t('users.fields.color.label')
      }
    }, {
      key: 'roles',
      component: 'SelectField',
      attrs: {
        label: i18n.t('users.fields.roles.label'),
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
        label: i18n.t('users.fields.lang.label'),
        emitValue: true,
        mapOptions: true,
        options: [
          { value: 'en-US', label: 'English' },
          { value: 'fr', label: 'Français' },
          { value: 'de', label: 'Deutsch' },
          { value: 'ru', label: 'русски' }
        ]
      },
      search: 'includes'
    }]
  }
}
