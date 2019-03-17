export default {
  state: {
    models: {
      customers: {
        name: 'Customer',
        icon: 'group',
        color: 'pink',
        default: {
          name: 'Unknown customer'
        }
      },
      calls: {
        name: 'Call',
        icon: 'phone_forwarded',
        color: 'orange',
        default: {
          customer: '',
          title: 'Describe issue',
          person: 'Person name',
          phone: '06',
          teamviewer_id: '',
          teamviewer_pwd: '',
          machine_down: true
        }
      },
      engines: {
        name: 'Engine',
        icon: 'update',
        color: 'purple'
      },
      tasks: {
        name: 'Task',
        icon: 'done',
        color: 'red'
      }
    }
  }
}
