const engines = {
  state: {
    data: {},
    meta: {
      title: 'Engines',
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

export { engines, engineTypes, engineUgks }
