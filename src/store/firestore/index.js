const task = {
  state: {
    data: {}
  },
  namespaced: true,
  firestorePath: 'tasks',
  firestoreRefType: 'collection',
  moduleName: 'task',
  statePropName: 'data',
  serverChange: {
    addedHook: function (updateStore, doc, id, store) {
      if (doc.customer) {
        doc.customer.get().then((d) => {
          doc.customer = d.data()
        })
      }
      updateStore(doc)
    }
  }
}

const customer = {
  state: {
    data: {}
  },
  namespaced: true,
  firestorePath: 'customers',
  firestoreRefType: 'collection',
  moduleName: 'customer',
  statePropName: 'data'
}

export default { task, customer }
