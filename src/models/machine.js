import { i18n } from '../boot/i18n'

export default (locale) => {
  i18n.locale = locale

  return {
    name: 'machine',
    titleProp: 'type',
    meta: {
      icon: 'print',
      color: 'teal'
    },
    components: {
      item: () => import('../components/machine/MachineItem')
    },
    routes: [{
      path: 'machines',
      name: 'machines',
      component: () => import('../pages/StListPage'),
      meta: {
        title: i18n.t('machines.routes.list.title'),
        menu: true
      }
    }, {
      path: 'machine/:id',
      name: 'machine',
      component: () => import('../pages/MachinePage'),
      meta: {
        title: i18n.t('machines.routes.single.title')
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
        label: i18n.t('machines.fields.type.label'),
        options: [
          'Durst Tau 330',
          'Durst Tau 330 E',
          'Durst Tau 330 RSC',
          'Durst Tau 330 RSC E',
          'Durst Tau 330 RSCi'
        ],
        rules: [val => !!val || i18n.t('machines.fields.type.validation.empty')]
      },
      search: '=='
    }, {
      key: 'customer',
      component: 'CustomerField',
      attrs: {
        label: i18n.t('machines.fields.customer.label'),
        rules: [val => !!val || i18n.t('machines.fields.customer.validation.empty')]
      },
      search: '=='
    }, {
      key: 'sn',
      component: 'TextField',
      attrs: {
        iconName: 'exposure_zero',
        iconColor: 'grey',
        label: i18n.t('machines.fields.sn.label')
      },
      search: 'contains'
    }, {
      key: 'install_date',
      component: 'DatetimeField',
      attrs: {
        iconName: 'insert_invitation',
        iconColor: 'grey',
        label: i18n.t('machines.fields.installdate.label')
      }
    }]
  }
}
