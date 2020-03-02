<template>
  <div>
    <q-list>
      <filter-form v-model="customFilters" v-if="!hideFilters" />

      <group-item
        v-for="group in groupsFiltered"
        :key="group.id"
        :group="group" />

      <q-item v-if="groupsFiltered.length === 0">
        <q-item-section class="text-center">
          <q-item-label class="text-h5">There's no group to display.</q-item-label>
          <q-item-label caption>Check the filters</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import GroupItem from './GroupItem'
import FilterForm from './FilterForm'

export default {
  name: 'GroupList',
  props: {
    filters: {
      type: Array,
      default: () => {
        return []
      }
    },
    hideFilters: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      customFilters: [{
        name: 'Name',
        property: 'name',
        filter: 'contains',
        value: ''
      }, {
        name: 'Groupe',
        property: 'group',
        filter: 'includes',
        value: ''
      }]
    }
  },
  computed: {
    groupsFiltered () {
      return this.$store.getters['groups/filter'](this.filters.concat(this.customFilters))
    }
  },
  components: {
    GroupItem,
    FilterForm
  }
}
</script>
