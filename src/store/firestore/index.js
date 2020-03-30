import * as utils from './utils'
import users from './users'
import tasks from './tasks'
import calls from './calls'
import customers from './customers'
import machines from './machines'
import reports from './reports'
import notifications from './notifications'

import { Dialog } from 'quasar'
import EditDialog from '../../components/generic/EditDialog'

const stores = [users,
  tasks,
  calls,
  customers,
  machines,
  notifications,
  reports
]

// Add common configuration for all stores
stores.forEach(s => {
  // Add configuration
  s.serverChange = { ...s.serverChange,
    addedHook: (updateStore, doc, id, store) => {
      doc.selected = false
      updateStore(doc)
    }
  }
  s.serverChange.convertTimestamps = { ...s.serverChange.convertTimestamps,
    created_at: '%convertTimestamp%',
    updated_at: '%convertTimestamp%',
    closed_at: '%convertTimestamp%'
  }

  s.sync = { ...s.sync,
    guard: ['selected', 'updated_at', 'updated_by']
  }

  s.state.meta = s.state.routes ? s.state.routes[0].meta : {}

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
    return state.data ? Object.values(state.data).filter(s => s.selected) : []
  }
  const selectedIds = state => {
    let selectedDocs = selected(state).filter(s => s.selected)
    return selectedDocs.map(s => s.id)
  }
  const fields = state => {
    return state.fields
  }
  const meta = state => {
    return state.meta
  }
  const defaultValue = state => {
    return state.default
  }
  const actions = state => {
    return state.actions
  }
  const toolbarActions = state => {
    return (state.actions || []).filter(a => a.toolbar)
  }
  s.getters = { ...s.getters, filter, stat, selected, selectedIds, fields, meta, defaultValue, actions, toolbarActions }

  // Add actions
  const toggleSelected = ({ state, dispatch, rootState }, id) => {
    let data = state.data[id]
    data.selected = !data.selected
    dispatch('patch', data)
  }

  const selectAll = ({ state, dispatch }) => {
    const ids = Object.values(state.data).map(s => s.id)
    dispatch('patchBatch', { doc: { selected: true }, ids: ids })
  }

  const unselectAll = ({ state, dispatch }) => {
    const ids = selectedIds(state)
    dispatch('patchBatch', { doc: { selected: false }, ids: ids })
  }

  const selectOneOnly = ({ dispatch }, id) => {
    dispatch('unselectAll')
    dispatch('toggleSelected', id)
  }

  const deleteDoc = ({ state, dispatch }) => {
    const ids = selectedIds(state)
    Dialog.create({
      title: 'Are you sure',
      message: `Would you like to delete ${ids.length} items?`,
      cancel: true,
      persistent: true
    }).onOk(() => {
      dispatch('deleteBatch', parent.get('selectedIds'))
    })
  }

  const edit = ({ state }, parent) => {
    Dialog.create({
      component: EditDialog,
      parent: parent,
      model: parent.model,
      data: selected(state)[0]
    })
  }

  s.actions = { ...s.actions, toggleSelected, selectAll, unselectAll, selectOneOnly, deleteDoc, edit }
})

const firestore = {
  stores: stores,
  state: {
    loading: 0 // % of firestore loaded. 1 = all loaded
  },
  actions: {
    // Open all firestores
    async firestoreOpen ({ state, dispatch }, user) {
      const where = []
      if (!user.roles.includes('admin')) where.push(['customer', '==', user.customer])
      let loadedStore = 0
      stores.forEach(async (s, key, array) => {
        await dispatch(s.moduleName + '/openDBChannel', // Add clauses for right management
          { clauses: { where: where } })
          .then(({ streaming }) => {
            loadedStore++
            state.loading = loadedStore / array.length // Update loading state
            console.log(state.loading)
          })
      })
    },
    firestoreClose ({ state, dispatch }) {
      stores.forEach((s, key, array) => {
        dispatch(s.moduleName + '/closeDBChannel', { clearModule: true })
      })
    },
    unselectAll ({ state, dispatch }) {
      stores.forEach(s => dispatch(s.moduleName + '/unselectAll'))
    }
  }
}

export default firestore
