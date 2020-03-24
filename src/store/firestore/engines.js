const engines = {
  state: {
    data: {},
    titleProp: 'type',
    routes: [{
      path: 'engines',
      name: 'engines',
      component: () => import('../../pages/StoreListPage'),
      meta: {
        title: 'Engines',
        icon: 'print',
        color: 'teal',
        menu: true
      }
    }, {
      path: 'engine/:id',
      name: 'engine',
      component: () => import('../../pages/StorePage'),
      meta: {
        title: 'Engine',
        icon: 'print',
        color: 'teal'
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
        options: ['Durst Tau 330', 'Durst Tau 330E']
      }
    }, {
      key: 'customer',
      component: 'CustomerField'
    }, {
      key: 'SN',
      component: 'TextField',
      attrs: {
        iconColor: 'grey',
        label: 'Serial number'
      }
    }]
  },
  namespaced: true,
  firestorePath: 'engines',
  firestoreRefType: 'collection',
  moduleName: 'engines',
  statePropName: 'data'
}

export default engines
