<template>
  <q-list>
    <filter-form v-model="customFilters" v-if="!hideFilters" />

    <store-item
      v-for="data in listData"
      :key="data.id"
      :store="store"
      :data="data"
      :no-select="noSelect"
      :no-link="noLink">
      <slot name="item" :data="data"></slot>
      <template #item-left>
        <slot name="item-left" :data="data"></slot>
      </template>
      <template #item-right>
        <slot name="item-right" :data="data"></slot>
      </template>
    </store-item>
  </q-list>
</template>

<script>
export default {
  name: 'StoreList',
  props: {
    filters: {
      type: Array,
      default: () => {
        return []
      }
    },
    store: {
      type: String,
      default: ''
    },
    hideFilters: {
      type: Boolean,
      default: false
    },
    noSelect: {
      type: Boolean,
      default: false
    },
    noLink: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => {
        return undefined
      }
    }
  },
  data () {
    return {
      customFilters: []
    }
  },
  computed: {
    listData () {
      return this.data !== undefined ? this.data : this.$store.getters[this.store + '/filter'](this.filters.concat(this.customFilters))
    }
  },
  components: {
    StoreItem: () => import('./StoreItem'),
    FilterForm: () => import('../generic/FilterForm')
  }
}
</script>
