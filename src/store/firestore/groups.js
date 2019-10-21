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
  readRoles: ['user'],
  writeRoles: ['admin'],
  namespaced: true,
  firestorePath: 'groups',
  firestoreRefType: 'collection',
  moduleName: 'groups',
  statePropName: 'data'
}

export default groups
