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
      type: 'Xeikon 3300',
      sn: '',
      customer: '',
      ugks: [],
      pre_devices: [],
      post_devices: []
    }
  },
  namespaced: true,
  firestorePath: 'engines',
  firestoreRefType: 'collection',
  moduleName: 'engines',
  statePropName: 'data'
}

export default engines
