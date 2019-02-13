<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Base"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Service Task
          <div slot="subtitle">Light tools for customer service</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Technicians</q-list-header>
        <q-item to="/calls">
          <q-item-side icon="list" />
          <q-item-main label="Calls" sublabel="See customer calls" />
        </q-item>
        <q-item to="/customers">
          <q-item-side icon="group" />
          <q-item-main label="Customers" sublabel="Manage customers & accounts" />
        </q-item>
        <q-item to="/documentation/edit">
          <q-item-side icon="edit" />
          <q-item-main label="Write documentation" sublabel="Knowledge is power" />
        </q-item>
        <q-item to="/todo">
          <q-item-side icon="done" />
          <q-item-main label="Tasks" sublabel="To-Do List" />
        </q-item>
      </q-list>

      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Customers</q-list-header>
        <q-item to="/documentation">
          <q-item-side icon="school" />
          <q-item-main label="What is this?" sublabel="Teach yourself!" />
        </q-item>
        <q-item to="/calls/new">
          <q-item-side icon="phone" />
          <q-item-main label="Ask for help" sublabel="A technician will call you back" />
        </q-item>
      </q-list>

      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Account</q-list-header>
        <q-item to="/account">
          <q-item-side icon="account_box" />
          <q-item-main label="Account" sublabel="Set your account and preferences" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'Base',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
