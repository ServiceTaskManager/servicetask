const reports = {
  state: {
    data: {}
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
