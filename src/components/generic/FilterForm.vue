<template>
  <q-expansion-item
    v-bind="$attrs"
    v-on="$attrs"
    class="bg-white">
    <template v-slot:header>
      <q-item-section avatar>
        <q-icon name="filter_list" />
      </q-item-section>
      <q-item-section>
        <slot name="header">
          <q-item-label caption v-if="activeFilters.length > 0">
            {{ activeFilters.length }} active filter(s)
          </q-item-label>
        </slot>
      </q-item-section>
    </template>
    <q-list>
      <q-item v-for="filter in filters.filter(f => !f[4])"
        :key="filter[0]">
        <text-field v-if="textFields.includes(filter[0])"
          v-model="filter[2]"
          :label="filter[3]"
          dense />
        <component v-if="customFields.includes(filter[0])"
          :is="componentName(filter[0])"
          v-model="filter[2]"
          :label="filter[3]"
          dense />
        <boolean-field v-if="booleanFields.includes(filter[0])"
          v-model="filter[2]"
          dense />
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
      customFields: ['customer', 'engine', 'user', 'technician'],
      booleanFields: ['main', 'pre_device', 'post_device', 'done']
    }
  },
  methods: {
    componentName (property) {
      if (property === 'technician') property = 'user'
      return property.charAt(0).toUpperCase() + property.slice(1) + 'Field'
    }
  },
  computed: {
    activeFilters () {
      let filters = this.filters.filter(f => f[2] !== '')
      return filters
    }
  },
  watch: {
    'filters': function () {
      this.$emit('input', this.filters)
    }
  },
  components: {
    TextField: () => import('../generic/TextField'),
    CustomerField: () => import('../customer/CustomerField'),
    UserField: () => import('../user/UserField'),
    BooleanField: () => import('../generic/BooleanField'),
    QSelect
  }
}
</script>
