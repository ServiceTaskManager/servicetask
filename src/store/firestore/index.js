const users = {
  state: {
    data: {},
    name: 'Users',
    icon: 'person',
    color: 'green',
    default: {
      roles: [],
      available: false
    }
  },
  namespaced: true,
  firestorePath: 'users',
  firestoreRefType: 'collection',
  moduleName: 'users',
  statePropName: 'data'
}

const tasks = {
  state: {
    data: {},
    name: 'Tasks',
    icon: 'done',
    color: 'light-blue'
  },
  namespaced: true,
  firestorePath: 'tasks',
  firestoreRefType: 'collection',
  moduleName: 'tasks',
  statePropName: 'data'
}

const calls = {
  state: {
    data: {},
    name: 'Calls',
    icon: 'phone_forwarded',
    color: 'orange',
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
  namespaced: true,
  firestorePath: 'calls',
  firestoreRefType: 'collection',
  moduleName: 'calls',
  statePropName: 'data'
}

const customers = {
  state: {
    data: {},
    name: 'Customers',
    icon: 'group',
    color: 'pink',
    default: {
      name: 'Unknown customer'
    }
  },
  namespaced: true,
  firestorePath: 'customers',
  firestoreRefType: 'collection',
  moduleName: 'customers',
  statePropName: 'data'
}

const engines = {
  state: {
    data: {},
    name: 'Engines',
    icon: 'print',
    color: 'teal',
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

const notifications = {
  state: {
    data: {}
  },
  namespaced: true,
  firestorePath: 'notifications',
  firestoreRefType: 'collection',
  moduleName: 'notifications',
  statePropName: 'data'
}

export default { users, tasks, calls, customers, engines, notifications }
