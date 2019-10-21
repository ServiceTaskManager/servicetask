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
const tokens = {
  state: {
    main: {
      id: 'main',
      tokens: []
    }
  },
  namespaced: true,
  firestorePath: 'tokens',
  firestoreRefType: 'collection',
  moduleName: 'tokens'
}

export { notifications, tokens }
