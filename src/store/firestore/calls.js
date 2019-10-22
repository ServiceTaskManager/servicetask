const calls = {
  state: {
    data: {},
    meta: {
      title: 'Calls',
      icon: 'phone_callback',
      color: 'orange'
    },
    default: {
      title: '', // string
      customer: '', // customer id
      engine: '', // engine id
      status: 'unassigned', // unassigned, assigned, closed
      person: '', // string
      phone: '', // string
      teamviewer: {
        id: '',
        pwd: ''
      },
      assign_to: '', // user id
      closed_at: '' // date
    },
    presets: {}
  },
  getters: {
    stats: state => {
      let calls = Object.values(state.data)
      let reducer = (stats, call) => {
        stats[call.status]++
        return stats
      }
      let stats = calls.reduce(reducer, {
        assigned: 0,
        unassigned: 0,
        closed: 0
      })
      return stats
    }
  },
  namespaced: true,
  firestorePath: 'calls',
  firestoreRefType: 'collection',
  moduleName: 'calls',
  statePropName: 'data',
  serverChange: {
    convertTimestamps: {
      created_at: '%convertTimestamp%',
      updated_at: '%convertTimestamp%'
    }
  }
}

export default calls
