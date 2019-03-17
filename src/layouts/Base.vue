<template>
  <q-layout view="hHr lpR fFr">

    <q-drawer
      v-model="right"
      side="right"
      behavior="mobile"
      elevated>
      <div class="q-pa-sm bg-grey-10 full-height">

        <div class="absolute-bottom bg-grey-9">
          <q-list class="text-white">
            <q-item class="bg-grey-5">
              <q-item-section avatar>
                <q-avatar>
                  <img :src="user.photoURL">
                </q-avatar>
              </q-item-section>
              <q-item-section class="text-black">
                {{ user.displayName }}
              </q-item-section>
              <q-item-section avatar>
                <q-btn round size="sm" color="negative" icon="logout" @click="logout" />
              </q-item-section>
            </q-item>

            <q-item
              v-for="(m, key) in models"
              :key="key"
              :to="key">
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
