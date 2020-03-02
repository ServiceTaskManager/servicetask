<template>
  <div>
    <q-list>
      <filter-form v-model="customFilters" v-if="!hideFilters" />

      <user-item
        v-for="user in usersFiltered"
        :key="user.id"
        :user="user" />

      <q-item v-if="usersFiltered.length === 0">
        <q-item-section class="text-center">
          <q-item-label>There's no user to display.</q-item-label>
          <q-item-label caption>Check the filters</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import UserItem from './UserItem'
import FilterForm from './FilterForm'

export default {
  name: 'UserList',
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
      customFilters: [
        ['name', 'contains', '', 'Name'],
        ['groups', 'includes', '', 'Group']
      ]
    }
  },
  computed: {
    usersFiltered () {
      return this.$store.getters['users/filter'](this.filters.concat(this.customFilters))
    }
  },
  components: {
    UserItem,
    FilterForm
  }
}
</script>
