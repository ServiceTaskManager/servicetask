const reports = {
  state: {
    data: {},
    titleProp: 'date',
    routes: [{
      path: 'reports',
      name: 'reports',
      component: () => import('../../pages/StoreListPage'),
      meta: {
        title: 'Reports',
        icon: 'outlined_flag',
        color: 'lime',
        menu: true,
        createRoute: 'report'
      }
    }, {
      path: 'report/:id',
      name: 'report',
      component: () => import('../../pages/Report'),
      meta: {
        title: 'Report',
        icon: 'outlined_flag',
        color: 'lime'
      }
    }],
    default: {
      customer: '',
      calls: [],
      tasks: [],
      tasksTotalTime: 0,
      note: '',
      date: '',
      technician: '',
      contact_person: '',
      signatures: {
        technician: {},
        customer: {}
      }
    }
  },
  namespaced: true,
  firestorePath: 'reports',
  firestoreRefType: 'collection',
  moduleName: 'reports',
  statePropName: 'data',
  serverChange: {
    convertTimestamps: {
      date: '%convertTimestamp%'
    }
  }
}

export default reports
