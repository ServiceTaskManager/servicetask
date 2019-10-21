<template>
  <q-list>
    <q-item v-if="addButton">
      <q-btn @click="callCreate = true"
        rounded
        label="Add a call"
        :icon="$calls.meta.icon"
        :color="$calls.meta.color"
        class="full-width" />
        <call-edit-dialog v-model="callCreate" :call="callFormData" />
    </q-item>

    <filter-form v-model="customFilters" v-if="!hideFilters" />

    <call-item
      v-for="call in callsFiltered"
      :key="call.id"
      :call="call" />

    <q-item v-if="callsFiltered.length === 0">
      <q-item-section class="text-center">
        <q-item-label class="text-h5">There's no call to display.</q-item-label>
        <q-item-label caption v-if="Object.values(customFilters).filter(f => f[1] !== '').length > 0">Check the filters</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import CallItem from './CallItem'
import FilterForm from './FilterForm'
import CallEditDialog from './CallEditDialog'

export default {
  name: 'CallList',
  props: {
    filters: {
      type: Object,
      default: () => {
        return {}
      }
    },
    hideFilters: {
      type: Boolean,
      default: false
    },
    addButton: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      callCreate: false,
      customFilters: {
        title: ['contains', '', 'Title'],
        customer: ['includes', '', 'Customer'] }
    }
  },
  computed: {
    callsFiltered () {
      return this.$store.getters['calls/filter'](Object.assign({}, this.customFilters, this.filters))
    },
    callFormData () {
      return {
        customer: this.filters.customer[1][0],
        engine: this.filters.engine[1][0]
      }
    }
  },
  components: {
    CallItem,
    FilterForm,
    CallEditDialog
  }
}
</script>
