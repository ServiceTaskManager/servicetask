<template>
  <div>
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
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data () {
    return {
      tab: 'users'
    }
  },
  components: {
    UserList: () => import('../components/user/UserList')
  }
}
</script>
