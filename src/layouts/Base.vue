<template>
  <q-layout view="hHr LpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
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
          <q-item clickable to="/tasks">
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
        <STAddCustomer></STAddCustomer>
      </q-scroll-area>

      <q-img class="absolute-top" src="https://cdn.quasar-framework.org/img/material.png" style="height: 170px;">
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

    <q-drawer v-model="right" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-orange-8 text-white">
      <q-toolbar>
        <q-input dense standout v-model="text" label="Customer" class="full-width">
          <template v-slot:prepend>
            <q-fab color="orange" icon="phone_forwarded" direction="up">
              <q-fab-action color="purple" icon="update" label="Upgrade" />
              <q-fab-action color="green" icon="done" label="Task" />
            </q-fab>
          </template>

          <template v-slot:append>
            <q-btn round dense flat icon="forward" @click.native="submit" />
          </template>
        </q-input>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import STAddCustomer from '../components/STAddCustomer.vue'

export default {
  name: 'Base',
  data () {
    return {
      left: true,
      right: false,
      search: '',
      text: ''
    }
  },
  computed: {
    user () {
      return this.$auth.currentUser
    },
    taskCount () {
      return Object.keys(this.$store.state.task.data).length
    }
  },
  mounted () {
    this.$store.dispatch('task/openDBChannel')
  },
  methods: {
    logout () {
      this.$store.dispatch('user/logout', this)
    },
    submit () {
      this.$store.dispatch('task/set', { customer: this.text })
      this.text = ''
    }
  },
  components: {
    STAddCustomer
  }
}
</script>

<style>
</style>
