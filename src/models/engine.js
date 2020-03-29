import { i18n } from '../boot/i18n'

export default (locale) => {
  i18n.locale = locale

  return {
    name: 'engine',
    titleProp: 'type',
    meta: {
      icon: 'print',
      color: 'teal'
    },
    routes: [{
      path: 'engines',
      name: 'engines',
      component: () => import('../pages/StListPage'),
      meta: {
        title: i18n.t('engines.routes.list.title'),
        menu: true
      }
    }, {
      path: 'engine/:id',
      name: 'engine',
      component: () => import('../pages/StPage'),
      meta: {
        title: i18n.t('engines.routes.single.title')
      }
    }],
    default: {
      type: '',
      sn: '',
      customer: ''
    },
    fields: [{
      key: 'type',
      component: 'SelectField',
      attrs: {
        iconName: 'print',
        iconColor: 'teal',
        label: i18n.t('engines.fields.type.label'),
        options: ['Durst Tau 330', 'Durst Tau 330E'],
        rules: [val => !!val || i18n.t('engines.fields.type.validation.empty')]
      }
    }, {
      key: 'customer',
      component: 'CustomerField',
      attrs: {
        label: i18n.t('engines.fields.customer.label'),
        rules: [val => !!val || i18n.t('engines.fields.customer.validation.empty')]
      }
    }, {
      key: 'sn',
      component: 'TextField',
      attrs: {
        iconColor: 'grey',
        label: i18n.t('engines.fields.sn.label')
      }
    }]
  }
}
