export default {
  state: {
    models: {
      users: {
        name: 'Users',
        icon: 'person',
        color: 'green',
        sync: true,
        default: {
          roles: [],
          available: false
        }
      },
      customers: {
        name: 'Customers',
        icon: 'group',
        color: 'pink',
        sync: true,
        default: {
          name: 'Unknown customer'
        }
      },
      calls: {
        name: 'Calls',
        icon: 'phone_forwarded',
        color: 'orange',
        sync: true,
        default: {
          customer: '',
          title: 'Random issue',
          person: 'Random person',
          phone: '06',
          teamviewer_id: '',
          teamviewer_pwd: '',
          machine_down: true
        }
      },
      engines: {
        name: 'Engines',
        icon: 'update',
        color: 'purple'
      },
      tasks: {
        name: 'Tasks',
        icon: 'done',
        color: 'red'
      }
    }
  }
}
