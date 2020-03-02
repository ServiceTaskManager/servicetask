import PostFirestoreLoading from './PostFirestoreLoading'
import * as utils from './utils'
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
  let filter = state => filters => {
    let data = Object.values(state.data)
    return utils.filter(data, filters)
  }
  let stat = state => filters => {
    let data = Object.values(state.data)
    return utils.stat(data, filters)
  }
  let selected = state => {
    return Object.values(state.data).filter(s => s.selected)
  }
  let selectedIds = state => {
    let selected = Object.values(state.data).filter(s => s.selected)
    return selected.map(s => s.id)
  }
  s.getters = { ...s.getters, filter, stat, selected, selectedIds }

  let toggleSelected = (state, id) => {
    state.data[id] = { ...state.data[id], selected: !state.data[id].selected }
  }
  s.mutations = { ...s.mutations, toggleSelected }
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
