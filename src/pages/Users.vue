<template>
  <div class="container">
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        :active-color="$users.meta.color"
        :indicator-color="$users.meta.color"
        align="justify"
        narrow-indicator>
        <q-tab name="users" icon="person" label="Users" />
        <q-tab name="groups" icon="people" label="Groups" />
      </q-tabs>
      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="users">
          <user-list />
        </q-tab-panel>
        <q-tab-panel name="groups">
          <group-list />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="black" :to="{ name: 'usersCreate', params: { id: 'create' } }" />
    </q-page-sticky>
  </div>
</template>

<script>
import UserList from '../components/UserList'
import GroupList from '../components/GroupList'

export default {
  name: 'Users',
  data () {
    return {
      tab: 'users'
    }
  },
  components: {
    UserList,
    GroupList
  }
}
</script>
