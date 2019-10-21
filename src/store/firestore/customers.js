const customers = {
  state: {
    data: {},
    meta: {
      name: 'Customers',
      icon: 'group',
      color: 'pink'
    },
    default: {
      name: '',
      addr1: '',
      addr2: '',
      postal_code: '',
      city: '',
      country: '',
      phone: '',
      email: ''
    }
  },
  vue: true,
  readRoles: ['user'],
  writeRoles: ['admin'],
  namespaced: true,
  firestorePath: 'customers',
  firestoreRefType: 'collection',
  moduleName: 'customers',
  statePropName: 'data'
}

export default customers
