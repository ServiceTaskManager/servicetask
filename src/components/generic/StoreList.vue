<template>
  <q-list>
    <filter-form v-model="customFilters" :store="store" v-if="!noFilters" />

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

    <slot name="no-result" v-if="listData.length === 0">
      <q-separator />
        <q-item class="q-pa-xs">
            <q-item-section>
              <span class="text-h6 text-center">No results</span>
              <span class="text-caption text-center" v-if="customFilters.length > 0">Check the filters</span>
            </q-item-section>
        </q-item>
    </slot>
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
    noFilters: {
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
