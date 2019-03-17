<template>
  <q-layout view="hHr lpR fFr">

    <q-drawer
      v-model="right"
      side="right"
      behavior="mobile"
      elevated>
      <div class="q-pa-sm bg-grey-10 full-height">
        <q-btn round color="negative" icon="logout" size="sm" @click="logout" />

        <div class="absolute-bottom">
          <q-list class="text-white">
            <q-item
              v-for="(m, key) in models"
              :key="key"
              :to="'/model/'+key">
              <q-item-section avatar>
                <q-icon :color="m.color" :name="m.icon" />
              </q-item-section>
              <q-item-section>
                {{ m.name }}
              </q-item-section>
            </q-item>

            <q-item to="/">
              <q-item-section avatar>
                <q-icon color="grey" name="dashboard" />
              </q-item-section>
              <q-item-section>
                Dashboard
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <q-page padding class="bg-grey-10">
        <router-view />
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'Base',
  data () {
    return {
      right: false,
      search: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    models () {
      return this.$store.state.model.models
    }
  },
  mounted () {
    this.$store.dispatch('tasks/openDBChannel')
    this.$store.dispatch('calls/openDBChannel')
    this.$store.dispatch('customers/openDBChannel')
  },
  methods: {
    logout () {
      this.$auth.signOut()
    }
  }
}
</script>

<style>
</style>
