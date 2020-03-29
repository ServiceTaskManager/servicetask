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
        title: 'Engines',
        menu: true
      }
    }, {
      path: 'engine/:id',
      name: 'engine',
      component: () => import('../pages/StPage'),
      meta: {
        title: 'Engine'
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
        label: 'Engine type',
        options: ['Durst Tau 330', 'Durst Tau 330E'],
        rules: [val => !!val || 'Engine type is required']
      }
    }, {
      key: 'customer',
      component: 'CustomerField',
      attrs: {
        rules: [val => !!val || 'Customer is required']
      }
    }, {
      key: 'SN',
      component: 'TextField',
      attrs: {
        iconColor: 'grey',
        label: 'Serial number'
      }
    }]
  }
}
