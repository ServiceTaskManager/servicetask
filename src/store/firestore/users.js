const users = {
  state: {
    data: {},
    meta: {
      title: 'Users',
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
  namespaced: true,
  firestorePath: 'users',
  firestoreRefType: 'collection',
  moduleName: 'users',
  statePropName: 'data'
}

export default users
