const users = {
  state: {
    data: {},
    titleProp: 'name',
    routes: [{
      path: 'users',
      name: 'users',
      component: () => import('../../pages/StoreListPage'),
      meta: {
        title: 'Users',
        icon: 'person',
        color: 'green',
        menu: true
      }
    }, {
      path: 'user/:id',
      name: 'user',
      component: () => import('../../pages/StorePage'),
      meta: {
        title: 'User',
        icon: 'person',
        color: 'green',
        propertyTitle: 'title'
      }
    }],
    default: {
      roles: [],
      customers: '',
      name: '',
      color: '',
      email: '',
      phone: '',
      address: {}
    },
    fields: [{
      key: 'name',
      component: 'TextField',
      attributes: {
        iconName: 'person',
        iconColor: 'green',
        label: 'Full name'
      }
    }, {
      key: 'phone',
      component: 'TextField',
      attributes: {
        iconName: 'phone',
        iconColor: 'grey',
        label: 'Phone number'
      }
    }, {
      key: 'email',
      component: 'TextField',
      attributes: {
        iconName: 'alternate_email',
        iconColor: 'grey',
        label: 'Email address',
        type: 'email'
      }
    }, {
      key: 'address',
      component: 'AddressField'
    }, {
      key: 'color',
      component: 'ColorPicker'
    }, {
      key: 'roles',
      component: 'SelectField',
      attributes: {
        options: ['user', 'admin'],
        multiple: true
      }
    }]
  },
  namespaced: true,
  firestorePath: 'users',
  firestoreRefType: 'collection',
  moduleName: 'users',
  statePropName: 'data'
}

export default users
