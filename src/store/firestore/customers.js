const customers = {
  state: {
    data: {},
    meta: {
      title: 'Customers',
      icon: 'group',
      color: 'pink'
    },
    default: {
      name: '',
      address: {
        addr1: '',
        addr2: '',
        postal_code: '',
        city: '',
        country: ''
      },
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
