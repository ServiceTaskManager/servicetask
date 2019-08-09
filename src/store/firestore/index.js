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
      displayName: 'No name'
    }
  },
  vue: 'Users.vue',
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
  vue: 'Tasks.vue',
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
      icon: 'phone_forwarded',
      color: 'orange'
    },
    default: {
      customer: '',
      title: 'Random issue',
      person: 'Random person',
      phone: '06',
      teamviewer_id: '',
      teamviewer_pwd: '',
      machine_down: true
    }
  },
  vue: 'Calls.vue',
  readRoles: ['user'],
  writeRoles: ['user'],
  namespaced: true,
  firestorePath: 'calls',
  firestoreRefType: 'collection',
  moduleName: 'calls',
  statePropName: 'data'
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
  vue: 'Customers.vue',
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
  vue: 'Engines.vue',
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
    data: {}
  },
  vue: false,
  readRoles: ['user'],
  writeRoles: ['admin'],
  namespaced: true,
  firestorePath: 'tokens',
  firestoreRefType: 'collection',
  moduleName: 'tokens',
  statePropName: 'data'
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
