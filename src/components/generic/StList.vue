<template>
  <q-list>
    <filter-form v-model="customFilters" :model="model" v-if="!noFilters" />

    <st-item
      v-for="data in listData"
      :key="data.id"
      :model="model"
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
    </st-item>

    <slot name="no-result" v-if="listData.length === 0">
      <q-separator />
        <q-item class="q-pa-xs">
            <q-item-section>
              <span class="text-h6 text-center">No results</span>
              <span class="text-caption text-center" v-if="customFilters.length > 0">Check the filters</span>
            </q-item-section>
        </q-item>
    </slot>

    <slot name="end" />
  </q-list>
</template>

<script>
export default {
  name: 'StList',
  props: {
    filters: {
      type: Array,
      default: () => {
        return []
      }
    },
    model: {
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
      return this.data !== undefined ? this.data : this.$store.getters[this.model + 's/filter'](this.filters.concat(this.customFilters))
    }
  },
  components: {
    StItem: () => import('./StItem'),
    FilterForm: () => import('../generic/FilterForm')
  }
}
</script>
