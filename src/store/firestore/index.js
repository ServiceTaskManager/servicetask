import PostFirestoreLoading from './PostFirestoreLoading'

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
      display_name: '?',
      color: 'grey'
    },
    user: {}
  },
  vue: true,
  readRoles: ['user'],
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
      customer: '',
      engine: '',
      title: '',
      description: '',
      done: false,
      done_at: '',
      schedule_at: '',
      subTasks: []
    },
    presets: {
      createWO: {
        title: 'Create WO'
      }
    }
  },
  getters: {
    done: state => Object.values(state.data).filter(t => t.done),
    todo: state => Object.values(state.data).filter(t => !t.done),
    stats: (state, getters) => {
      return {
        done: getters.done.length,
        todo: getters.todo.length
      }
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
      status: 'unassigned', // unassigned, assigned, closed
      person: '', // string
      phone: '', // string
      teamviewer: {
        id: '',
        pwd: ''
      },
      assign_to: '', // user id
      closed_at: '' // date
    },
    presets: {},
    call: {}
  },
  getters: {
    byStatus: state => status => {
      let calls = Object.values(state.data)
      let callsFiltered = calls.filter(call => status.includes(call.status))
      return callsFiltered
    },
    stats: state => {
      let calls = Object.values(state.data)
      let stats = {
        unassigned: 0,
        assigned: 0,
        closed: 0,
        error: 0,
        total: 0
      }

      calls.forEach(call => {
        if (call.status === 'unassigned') stats.unassigned++
        else if (call.status === 'assigned' && call.assign_to !== undefined) stats.assigned++
        else if (call.status === 'closed' && call.assign_to !== undefined) stats.closed++
        else stats.error++
        stats.total++
      })

      return stats
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
    updateFirestoreOpenList (state, opt) {
      if (opt.open) state.openStores.push(opt.firestore)
      else state.openStores = state.openStores.filter(store => opt.firestore !== store)

      state.loading = state.openStores.length / state.readableStores.length
      if (state.loading === 1) PostFirestoreLoading()
    }
  }
}

export default firestore
