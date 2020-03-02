const groups = {
  state: {
    data: {},
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
