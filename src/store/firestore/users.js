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
    fields: [{
      key: 'name',
      component: 'TextField',
      attrs: {
        iconName: 'person',
        iconColor: 'green',
        label: 'Full name',
        rules: [val => !!val || 'Name is required']
      },
      search: 'contains'
    }, {
      key: 'customer',
      component: 'CustomerField',
      attrs: {
        rules: [val => !!val || 'Customer is required']
      }
    }, {
      key: 'phone',
      component: 'TextField',
      attrs: {
        iconName: 'phone',
        iconColor: 'grey',
        label: 'Phone number'
      },
      search: 'contains'
    }, {
      key: 'email',
      component: 'TextField',
      attrs: {
        iconName: 'alternate_email',
        iconColor: 'grey',
        label: 'Email address',
        type: 'email'
      },
      search: 'contains'
    }, {
      key: 'address',
      component: 'AddressField'
    }, {
      key: 'color',
      component: 'ColorPicker'
    }, {
      key: 'roles',
      component: 'SelectField',
      attrs: {
        options: ['user', 'admin'],
        multiple: true
      },
      search: 'includes'
    }]
  },
  namespaced: true,
  firestorePath: 'users',
  firestoreRefType: 'collection',
  moduleName: 'users',
  statePropName: 'data'
}

export default users
