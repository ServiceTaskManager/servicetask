const tasks = {
  state: {
    data: {}
  },
  namespaced: true,
  firestorePath: 'tasks',
  firestoreRefType: 'collection',
  moduleName: 'tasks',
  statePropName: 'data',
  serverChange: {
    addedHook: function (updateStore, doc, id, store) {
      getReference(doc.customer).then(d => {
        doc.customer = d
        updateStore(doc)
      })
    },
    modifiedHook: function (updateStore, doc, id, store) {
      getReference(doc.customer).then(d => {
        doc.customer = d
        updateStore(doc)
      })
    }
  }
}

const calls = {
  state: {
    data: {}
  },
  namespaced: true,
  firestorePath: 'calls',
  firestoreRefType: 'collection',
  moduleName: 'calls',
  statePropName: 'data',
  serverChange: {
    addedHook: function (updateStore, doc, id, store) {
      getReference(doc.customer).then(d => {
        doc.customer = d
        updateStore(doc)
      })
    },
    modifiedHook: function (updateStore, doc, id, store) {
      getReference(doc.customer).then(d => {
        doc.customer = d
        updateStore(doc)
      })
    }
  }
}

const customers = {
  state: {
    data: {}
  },
  namespaced: true,
  firestorePath: 'customers',
  firestoreRefType: 'collection',
  moduleName: 'customers',
  statePropName: 'data'
}

let getReference = async function (doc) {
  return doc ? doc.get().then(d => { return d.exists ? d.data() : null }) : null
}

export default { tasks, calls, customers }
