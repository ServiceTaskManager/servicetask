<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated
      :class="headerClass"
      v-if="!$route.meta.noHeader">
      <q-toolbar>
        <q-avatar v-if="$route.name === 'dashboard' || $route.name === 'login'">
          <img src="statics/app-logo-128x128.png" />
        </q-avatar>
        <q-btn flat round @click="$router.go(-1)" icon="chevron_left" class="text-white" v-else />

        <q-toolbar-title>{{ title }}</q-toolbar-title>

        <q-btn dense flat round icon="edit" @click="$root.$emit('editDialog', true)" v-if="$route.meta.editButton" />
        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="right"
      side="right"
      behavior="mobile"
      elevated
      v-if="!$route.meta.noDrawer">
      <q-img v-if="user.login"
        class="absolute-top bg-white"
        src="statics/icons/icon-512x512.png"
        style="height: 110px;">
        <div class="absolute-full flex flex-center">
          <user-avatar :user-id="user.data.id" size="80px" />
        </div>
      </q-img>

      <div class="q-pa-xs bg-grey-9 full-height">
        <q-scroll-area style="height: calc(100% - 110px); margin-top: 110px;">
          <div>
            <q-list class="text-white">
              <q-item :to="{ name: 'settings' }"
                class="bg-black rounded-borders">
                <q-item-section avatar>
                  <q-icon color="white" name="settings" />
                </q-item-section>
                <q-item-section class="text-bold">
                  {{ user.data.name }}
                </q-item-section>
                <q-item-section side>
                  <q-separator vertical class="q-mr-sm" color="black" />
                  <q-btn flat round
                    size="sm"
                    color="negative"
                    icon="logout"
                    @click.prevent="logout" />
                </q-item-section>
              </q-item>
              <q-item :to="{ name: 'users' }">
                <q-item-section avatar>
                  <q-icon :color="$users.meta.color" :name="$users.meta.icon" />
                </q-item-section>
                <q-item-section>
                  Users
                </q-item-section>
              </q-item>
              <q-item :to="{ name: 'tasks' }">
                <q-item-section avatar>
                  <q-icon :color="$tasks.meta.color" :name="$tasks.meta.icon" />
                </q-item-section>
                <q-item-section>
                  Tasks
                </q-item-section>
                <q-item-section side>
                  <q-separator vertical class="q-mr-sm" :color="$tasks.meta.color" />
                  <q-btn flat round
                    size="sm"
                    :color="$tasks.meta.color"
                    icon="add"
                    @click.prevent="taskCreate = true" />
                  <task-edit-dialog v-model="taskCreate" />
                </q-item-section>
              </q-item>
              <q-item :to="{ name: 'calls' }">
                <q-item-section avatar>
                  <q-icon :color="$calls.meta.color" :name="$calls.meta.icon" />
                </q-item-section>
                <q-item-section>
                  Calls
                </q-item-section>
                <q-item-section side>
                  <q-separator vertical class="q-mr-sm" :color="$calls.meta.color" />
                  <q-btn flat round
                    size="sm"
                    :color="$calls.meta.color"
                    icon="add"
                    @click.prevent="callCreate = true" />
                  <call-edit-dialog v-model="callCreate" />
                </q-item-section>
              </q-item>
              <q-item :to="{ name: 'customers' }">
                <q-item-section avatar>
                  <q-icon :color="$customers.meta.color" :name="$customers.meta.icon" />
                </q-item-section>
                <q-item-section>
                  Customers
                </q-item-section>
                <q-item-section side>
                  <q-separator vertical class="q-mr-sm" :color="$customers.meta.color" />
                  <q-btn flat round
                    size="sm"
                    :color="$customers.meta.color"
                    icon="add"
                    @click.prevent="customerCreate = true" />
                  <customer-edit-dialog v-model="customerCreate" />
                </q-item-section>
              </q-item>
              <q-item :to="{ name: 'maps' }">
                <q-item-section avatar>
                  <q-icon color="white" name="map" />
                </q-item-section>
                <q-item-section>
                  Maps
                </q-item-section>
              </q-item>

              <q-item :to="{ name: 'dashboard' }">
                <q-item-section avatar>
                  <q-icon color="grey" name="dashboard" />
                </q-item-section>
                <q-item-section>
                  Dashboard
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-scroll-area>
      </div>
    </q-drawer>

    <q-page-container>
      <q-page padding class="bg-grey-3">
        <router-view v-if="$store.state.firestore.ready || $route.name === 'login'" />
        <div v-else class="row justify-center text-center">
          <div class="col-8 col-offset-2" style="margin-top: 100px;">
            <q-linear-progress rounded
              style="height: 50px; "
              color="warning"
              :value="$store.state.firestore.loading" />
            <span>Loading {{ $store.state.firestore.loadingStore }}...</span>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import UserAvatar from '../components/UserAvatar'
import TaskEditDialog from '../components/TaskEditDialog'
import CallEditDialog from '../components/CallEditDialog'
import CustomerEditDialog from '../components/CustomerEditDialog'

export default {
  name: 'Base',
  data () {
    return {
      right: false,
      taskCreate: false,
      callCreate: false,
      customerCreate: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    headerClass () {
      return 'bg-' + (this.$route.meta.color || 'black') + ' text-white'
    },
    title () {
      return this.$route.meta.customTitle ? this.$ui.header.title : this.$route.meta.title
    }
  },
  methods: {
    logout () {
      this.$auth.signOut()
    }
  },
  components: {
    UserAvatar,
    TaskEditDialog,
    CallEditDialog,
    CustomerEditDialog
  }
}
</script>

<style>
</style>
