<template>
  <q-layout view="hHr LpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="filter_list" @click="left = !left" />
        <q-input dark dense standout v-model="search" class="full-width" input-class="text-right">
          <template v-slot:append>
            <q-icon v-if="search === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
          </template>
        </q-input>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="left"
      side="left">

      <q-scroll-area style="height: calc(100% - 170px); margin-top: 170px; border-right: 1px solid #ddd">
        <q-list>
          <q-item-label header>Manage</q-item-label>
          <q-item clickable to="/">
            <q-item-section avatar>
               <q-icon name="assignment" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                Tasks <q-badge color="negative">{{ taskCount }}</q-badge>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/customers">
            <q-item-section avatar>
               <q-icon name="group" />
            </q-item-section>
            <q-item-section>Accounts</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="https://cdn.quasar-framework.org/img/material.png" style="height: 170px;">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar-framework.org/img/boy-avatar.png">
          </q-avatar>
          <div class="text-weight-bold">{{ user.email }}</div>
          <div>
            <q-btn round color="negative" icon="logout" size="sm" @click="logout" />&nbsp;
            <q-btn round color="grey" icon="settings" size="sm" />
          </div>
        </div>
      </q-img>
    </q-drawer>

    <q-drawer v-model="right" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <q-page padding>
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
      left: true,
      right: false,
      search: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    taskCount () {
      return Object.keys(this.$store.state.tasks.data).length
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
