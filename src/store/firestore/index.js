import PostFirestoreLoading from './PostFirestoreLoading'
import * as utils from './utils'
import users from './users'
import tasks from './tasks'
import calls from './calls'
import customers from './customers'
import engines from './engines'
import { notifications, tokens } from './notifications'

import { Dialog } from 'quasar'

const stores = [users,
  tasks,
  calls,
  customers,
  engines,
  notifications,
  tokens
]

// Add common configuration for all stores
stores.forEach(s => {
  // Add configuration
  s.serverChange = { ...s.serverChange,
    convertTimestamps: {
      created_at: '%convertTimestamp%',
      updated_at: '%convertTimestamp%',
      closed_at: '%convertTimestamp%'
    },
    addedHook: (updateStore, doc, id, store) => {
      doc.selected = false
      updateStore(doc)
    }
  }

  s.sync = { ...s.sync,
    guard: ['selected', 'updated_at', 'updated_by']
  }

  // Add toolbar actions
  if (s.state.actions) {
    s.state.actions.push({
      label: 'Delete',
      icon: 'remove',
      color: 'danger',
      action: 'deleteItem'
    })
  }

  // Add getters
  const filter = state => filters => {
    let data = Object.values(state.data)
    return utils.filter(data, filters)
  }
  const stat = state => filters => {
    let data = Object.values(state.data)
    return utils.stat(data, filters)
  }
  const selected = state => {
    return Object.values(state.data).filter(s => s.selected)
  }
  const selectedIds = state => {
    let selected = Object.values(state.data).filter(s => s.selected)
    return selected.map(s => s.id)
  }
  s.getters = { ...s.getters, filter, stat, selected, selectedIds }

  // Add actions
  const toggleSelected = ({ state, dispatch }, id) => {
    let data = state.data[id]
    data.selected = !data.selected
    dispatch('patch', data)
  }

  const unselectAll = ({ state, dispatch }) => {
    const ids = Object.values(state.data).filter(s => s.selected).map(s => s.id)
    dispatch('patchBatch', { doc: { selected: false }, ids: ids })
  }

  const selectOneOnly = ({ dispatch }, id) => {
    dispatch('unselectAll')
    dispatch('toggleSelected', id)
  }

  const deleteItem = ({ dispatch }, data) => {
    Dialog.create({
      title: 'Are you sure',
      message: `Would you like to delete ${data.ids.length} items?`,
      cancel: true,
      persistent: true
    }).onOk(() => {
      dispatch('deleteBatch', data.ids)
    })
  }

  s.actions = { ...s.actions, toggleSelected, unselectAll, selectOneOnly, deleteItem }
})

const firestore = {
  stores: stores,
  state: {
    storesToOpen: ['users', 'tasks', 'calls', 'customers', 'engines', 'tokens'],
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
