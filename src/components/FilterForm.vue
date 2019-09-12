<template>
  <q-expansion-item
    v-bind="$attrs"
    v-on="$attrs"
    class="bg-grey-4">
    <template v-slot:header>
      <q-item-section avatar>
        <q-icon name="filter_list" />
      </q-item-section>
      <q-item-section>
        <div>
          <q-badge v-for="(filter, key) in activeFilters"
            :key="'badge-' + key"
            :label="filter[2] + ' ' + filter[0] + ' ' + filter[1]"
            dense
            class="q-mr-sm" />
        </div>
        <span v-if="activeFilters.length === 0">Add filters</span>
      </q-item-section>
    </template>
    <q-list>
      <q-item v-for="(filter, key) in filters"
        :key="key">
        <text-field v-if="textFields.includes(key)"
          v-model="filter[1]"
          :label="filter[2]" />
        <component v-if="customFields.includes(key)"
          :is="componentName(key)"
          v-model="filter[1]"
          :label="filter[2]" />
        <boolean-field v-if="booleanFields.includes(key)"
          v-model="filter[1]"
          :label="'Is ' + key" />
      </q-item>
    </q-list>
  </q-expansion-item>
</template>

<script>
import { QSelect } from 'quasar'
export default {
  name: 'FilterForm',
  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      filters: this.value,
      textFields: ['title', 'name', 'sn', 'addr1', 'addr2', 'postal_code', 'city', 'country'],
      customFields: ['customer', 'engine', 'user'],
      booleanFields: ['main', 'pre_device', 'post_device', 'done']
    }
  },
  computed: {
    activeFilters () {
      let activeFilters = {}
      for (let f in this.filters) {
        let filter = this.filters[f]
        if (filter[1] !== '') activeFilters[f] = filter
      }
      return activeFilters
    }
  },
  methods: {
    componentName (property) {
      return property.charAt(0).toUpperCase() + property.slice(1) + 'Field'
    }
  },
  watch: {
    'filters': () => {
      this.$emit('input', this.filters)
    }
  },
  components: {
    TextField: () => import('./TitleField'),
    CustomerField: () => import('./CustomerField'),
    BooleanField: () => import('./BooleanField'),
    QSelect
  }
}
</script>
