import PostFirestoreLoading from './PostFirestoreLoading'
import filter from './utils'

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
    }
  },
  getters: {
    filter: state => filters => {
      let users = Object.values(state.data)
      return filter(users, filters)
    }
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

const groups = {
  state: {
    data: {},
    meta: {
      name: 'Groups',
      icon: 'people',
      color: 'green'
    },
    default: {
      name: ''
    }
  },
  getters: {
    filter: state => filters => {
      let users = Object.values(state.data)
      return filter(users, filters)
    }
  },
  readRoles: ['user'],
  writeRoles: ['admin'],
  namespaced: true,
  firestorePath: 'groups',
  firestoreRefType: 'collection',
  moduleName: 'groups',
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
      schedule_from: undefined,
      schedule_to: undefined,
      subTasks: []
    },
    presets: {
      createWO: {
        title: 'Create WO'
      }
    }
  },
  getters: {
    filter: state => filters => {
      let tasks = Object.values(state.data)
      return filter(tasks, filters)
    },
    stats: state => {
      let tasks = Object.values(state.data)
      let reducer = (stats, task) => {
        if (task.done) stats.done++
        else stats.todo++
        return stats
      }
      let stats = tasks.reduce(reducer, {
        done: 0,
        todo: 0
      })
      return stats
    }
  },
  vue: true,
  readRoles: ['user'],
  writeRoles: ['user'],
  namespaced: true,
  firestorePath: 'tasks',
  firestoreRefType: 'collection',
  moduleName: 'tasks',
  statePropName: 'data',
  serverChange: {
    convertTimestamps: {
      created_at: '%convertTimestamp%',
      updated_at: '%convertTimestamp%',
      schedule_from: '%convertTimestamp%',
      schedule_to: '%convertTimestamp%'
    }
  }
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
    presets: {}
  },
  getters: {
    filter: state => filters => {
      let calls = Object.values(state.data)
      return filter(calls, filters)
    },
    stats: state => {
      let calls = Object.values(state.data)
      let reducer = (stats, call) => {
        stats[call.status]++
        return stats
      }
      let stats = calls.reduce(reducer, {
        assigned: 0,
        unassigned: 0,
        closed: 0
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
      name: '',
      addr1: '',
      addr2: '',
      postal_code: '',
      city: '',
      country: '',
      phone: '',
      email: ''
    },
    presets: {}
  },
  getters: {
    filter: state => filters => {
      let customers = Object.values(state.data)
      return filter(customers, filters)
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
  getters: {
    filter: state => filters => {
      let engines = Object.values(state.data)
      return filter(engines, filters)
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
    groups,
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
