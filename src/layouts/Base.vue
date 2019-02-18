<template>
  <q-layout view="lHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          {{ $route.meta.title }}
        </q-toolbar-title>
        <q-input dark dense standout v-model="search" input-class="text-right">
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

      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list>
          <q-item-label header>Technicians</q-item-label>
          <q-item clickable to="/calls">
            <q-item-section avatar>
               <q-icon name="list" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                Calls <q-badge color="negative">X</q-badge>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/customers">
            <q-item-section avatar>
               <q-icon name="group" />
            </q-item-section>
            <q-item-section>Accounts</q-item-section>
          </q-item>
          <q-item clickable to="/documentation/edit">
            <q-item-section avatar>
               <q-icon name="edit" />
            </q-item-section>
            <q-item-section>Edit documentation</q-item-section>
          </q-item>
          <q-item clickable to="/todo">
            <q-item-section avatar>
               <q-icon name="done" />
            </q-item-section>
            <q-item-section>To do list</q-item-section>
          </q-item>
          <q-item-label header>Customers</q-item-label>
          <q-item clickable to="documentation">
            <q-item-section avatar>
               <q-icon name="school" />
            </q-item-section>
            <q-item-section>Documentation</q-item-section>
          </q-item>
          <q-item clickable to="/calls/create">
            <q-item-section avatar>
               <q-icon name="phone" />
            </q-item-section>
            <q-item-section>Contact support</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="https://cdn.quasar-framework.org/img/material.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar-framework.org/img/boy-avatar.png">
          </q-avatar>
          <div class="text-weight-bold">Razvan Stoenescu / {{ user.email }}</div>
          <div>
            <q-btn round color="negative" icon="logout" size="sm" @click="logout" />&nbsp;
            <q-btn round color="grey" icon="settings" size="sm" />
          </div>
        </div>
      </q-img>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Base',
  data () {
    return {
      left: true,
      callCount: 0,
      search: ''
    }
  },
  computed: {
    user: {
      get () {
        return this.$auth.currentUser
      }
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('user/logout', this)
    }
  }
}
</script>

<style>
</style>
