import PostFirestoreLoading from './PostFirestoreLoading'
import filter from './utils'
import users from './users'
import groups from './groups'
import tasks from './tasks'
import calls from './calls'
import customers from './customers'
import { engines, engineTypes, engineUgks } from './engines'
import { notifications, tokens } from './notifications'

const stores = [users,
  groups,
  tasks,
  calls,
  customers,
  engines,
  engineTypes,
  engineUgks,
  notifications,
  tokens
]

stores.forEach(s => {
  let getters = {
    filter: state => filters => {
      let data = Object.values(state.data)
      return filter(data, filters)
    }
  }
  s.getters = Object.assign({}, s.getters, getters)
})

const firestore = {
  stores: stores,
  state: {
    storesToOpen: ['users', 'groups', 'tasks', 'calls', 'customers', 'engines', 'tokens'],
    storesOpened: [],
    ready: false,
    loading: 0
  },
  mutations: {
    updateFirestoreOpenList (state, opt) {
      if (opt.open) state.storesOpened.push(opt.firestore)
      else state.storesOpened = state.storesOpened.filter(store => opt.firestore !== store)

      state.loading = state.storesOpened.length / state.storesToOpen.length
      if (state.loading === 1) PostFirestoreLoading()
    }
  }
}

export default firestore
