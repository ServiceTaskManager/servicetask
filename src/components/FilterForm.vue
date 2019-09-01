<template>
  <q-expansion-item
    v-bind="$attrs"
    v-on="$attrs"
    class="bg-grey-4 rounded-borders q-mb-sm">
    <template v-slot:header>
      <q-item-section avatar>
        <q-icon name="filter_list" />
      </q-item-section>
      <q-item-section>
        <div>
          <q-badge v-for="filter in activeFilters"
            :key="'badge-' + filter.property"
            :label="filter.name + ' ' + filter.filter + ' ' + filter.value"
            dense
            class="q-mr-sm" />
        </div>
        <span v-if="activeFilters.length === 0">Add filters</span>
      </q-item-section>
    </template>
    <q-list>
      <q-item v-for="filter in filters"
        :key="filter.property">
        <text-field v-if="textFields.includes(filter.property)"
          v-model="filter.value"
          :label="filter.name" />
        <component v-if="customFields.includes(filter.property)"
          :is="componentName(filter.property)"
          v-model="filter.value"
          :label="filter.name" />
        <boolean-field v-if="booleanFields.includes(filter.property)"
          v-model="filter.value"
          :label="'Is ' + filter.property" />
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
      type: Array,
      default: () => {
        return []
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
      return this.filters.filter(f => f.value !== '')
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
