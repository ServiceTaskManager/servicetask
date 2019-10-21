const tasks = {
  state: {
    data: {},
    meta: {
      name: 'Tasks',
      icon: 'done',
      color: 'light-blue'
    },
    default: {
      customer: '',
      engine: '',
      title: '',
      description: '',
      done: false,
      done_at: '',
      schedule_from: undefined,
      schedule_to: undefined,
      subTasks: []
    },
    presets: {
      createWO: {
        title: 'Create WO'
      }
    }
  },
  getters: {
    stats: state => {
      let tasks = Object.values(state.data)
      let reducer = (stats, task) => {
        if (task.done) stats.done++
        else stats.todo++
        return stats
      }
      let stats = tasks.reduce(reducer, {
        done: 0,
        todo: 0
      })
      return stats
    }
  },
  namespaced: true,
  firestorePath: 'tasks',
  firestoreRefType: 'collection',
  moduleName: 'tasks',
  statePropName: 'data',
  serverChange: {
    convertTimestamps: {
      created_at: '%convertTimestamp%',
      updated_at: '%convertTimestamp%',
      schedule_from: '%convertTimestamp%',
      schedule_to: '%convertTimestamp%'
    }
  }
}

export default tasks
