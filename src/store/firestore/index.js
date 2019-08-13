const users = {
  state: {
    data: {},
    meta: {
      name: 'Users',
      icon: 'person',
      color: 'green'
    },
    default: {
      roles: [],
      available: false,
      display_name: 'John Doe'
    },
    user: {}
  },
  vue: true,
  readRoles: ['admin'],
  writeRoles: ['admin'],
  namespaced: true,
  firestorePath: 'users',
  firestoreRefType: 'collection',
  moduleName: 'users',
  statePropName: 'data'
}

const tasks = {
  state: {
    data: {},
    meta: {
      name: 'Tasks',
      icon: 'done',
      color: 'light-blue'
    },
    default: {
      displayName: 'No Name'
    }
  },
  vue: true,
  readRoles: ['user'],
  writeRoles: ['user'],
  namespaced: true,
  firestorePath: 'tasks',
  firestoreRefType: 'collection',
  moduleName: 'tasks',
  statePropName: 'data'
}

const calls = {
  state: {
    data: {},
    meta: {
      name: 'Calls',
      icon: 'phone_callback',
      color: 'orange'
    },
    default: {
      title: '', // string
      customer: '', // customer id
      engine: '', // engine id
      status: 'new', // new, assigned, closed
      person: '', // string
      phone: '', // string
      teamviewer_id: '', // string
      teamviewer_pwd: '' // string
    },
    call: {}
  },
  getters: {
    getNew: state => {
      let calls = Object.values(state.data)
      let callsFiltered = calls.filter(call => call.status === 'new' || call.status === undefined)
      return callsFiltered
    },
    getAssigned: state => {
      let calls = Object.values(state.data)
      let callsFiltered = calls.filter(call => call.status === 'assigned')
      return callsFiltered
    },
    getClosed: state => {
      let calls = Object.values(state.data)
      let callsFiltered = calls.filter(call => call.status === 'closed')
      return callsFiltered
    }
  },
  vue: true,
  readRoles: ['user'],
  writeRoles: ['user'],
  namespaced: true,
  firestorePath: 'calls',
  firestoreRefType: 'collection',
  moduleName: 'calls',
  statePropName: 'data',
  serverChange: {
    convertTimestamps: {
      created_at: '%convertTimestamp%',
      updated_at: '%convertTimestamp%'
    }
  }
}

const customers = {
  state: {
    data: {},
    meta: {
      name: 'Customers',
      icon: 'group',
      color: 'pink'
    },
    default: {
      name: 'Unknown customer'
    }
  },
  vue: true,
  readRoles: ['user'],
  writeRoles: ['admin'],
  namespaced: true,
  firestorePath: 'customers',
  firestoreRefType: 'collection',
  moduleName: 'customers',
  statePropName: 'data'
}

const engines = {
  state: {
    data: {},
    meta: {
      name: 'Engines',
      icon: 'print',
      color: 'teal'
    },
    default: {
      type: 'Xeikon 3300',
      sn: '',
      customer: '',
      ugks: [],
      pre_devices: [],
      post_devices: []
    }
  },
  vue: true,
  readRoles: ['user'],
  writeRoles: ['admin'],
  namespaced: true,
  firestorePath: 'engines',
  firestoreRefType: 'collection',
  moduleName: 'engines',
  statePropName: 'data'
}

const engineTypes = {
  state: {
    data: {}
  },
  vue: false,
  readRoles: ['user'],
  writeRoles: ['admin'],
  namespaced: true,
  firestorePath: 'engineTypes',
  firestoreRefType: 'collection',
  moduleName: 'engineTypes',
  statePropName: 'data'
}

const engineUgks = {
  state: {
    data: {}
  },
  vue: false,
  readRoles: ['user'],
  writeRoles: ['admin'],
  namespaced: true,
  firestorePath: 'engineUgks',
  firestoreRefType: 'collection',
  moduleName: 'engineUgks',
  statePropName: 'data'
}

const notifications = {
  state: {
    data: {}
  },
  sync: {
    where: [
      ['created_at', '>=', new Date()]
    ]
  },
  vue: false,
  readRoles: ['user'],
  writeRoles: ['admin'],
  namespaced: true,
  firestorePath: 'notifications',
  firestoreRefType: 'collection',
  moduleName: 'notifications',
  statePropName: 'data'
}
const tokens = {
  state: {
    main: {
      id: 'main',
      tokens: []
    }
  },
  vue: false,
  readRoles: ['user'],
  writeRoles: ['admin'],
  namespaced: true,
  firestorePath: 'tokens',
  firestoreRefType: 'collection',
  moduleName: 'tokens'
}

const firestore = {
  stores: [users,
    tasks,
    calls,
    customers,
    engines,
    engineTypes,
    engineUgks,
    notifications,
    tokens],
  state: {
    readableStores: [],
    writableStores: [],
    openStores: [],
    metas: {},
    ready: false,
    loading: 0
  },
  mutations: {
    initFirestore (state, userRoles) {
      state.readableStores = []
      state.writableStores = []
      firestore.stores.forEach(store => {
        if (store.readRoles.filter(r => userRoles.includes(r)).length > 0) {
          state.readableStores.push(store.moduleName)
        }
        if (store.writeRoles.filter(r => userRoles.includes(r)).length > 0) {
          state.writableStores.push(store.moduleName)
        }
        if (store.vue) {
          state.metas[store.moduleName] = store.state.meta
        }
      })
    },
    updateFirestoreOpenList (state, storeName) {
      state.openStores.push(storeName)
      state.loading = state.openStores.length / state.readableStores.length
      state.ready = (state.loading === 1)
    }
  }
}

export default firestore
