export default {
  state: {
    data: {
      '123': {
        customer: 'Customer2'
      }
    }
  },
  namespaced: true,
  firestorePath: 'tasks',
  firestoreRefType: 'collection', // or 'doc'
  moduleName: 'task',
  statePropName: 'data'
}
