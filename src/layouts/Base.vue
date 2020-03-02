<template>
  <q-layout view="hHr lpR fFf">
    <q-header elevated
      :class="headerClass"
      v-if="!$route.meta.noHeader && $store.state.firestore.ready">
      <q-toolbar>
        <q-avatar v-if="$route.name === 'dashboard' || $route.name === 'login'">
          <img src="statics/app-logo-128x128.png" />
        </q-avatar>
        <q-btn flat round @click="$router.go(-1)" icon="chevron_left" class="text-white" v-else />

        <q-toolbar-title>{{ title }}</q-toolbar-title>

        <router-view name="toolbar" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      side="right"
      :behavior="$q.platform.is.mobile ? 'mobile' : 'desktop'"
      elevated
      v-if="!$route.meta.noDrawer && $store.state.firestore.ready">
      <div class="q-pa-none bg-grey-9 full-height">
        <q-scroll-area class="full-height">
          <div>
            <q-list class="text-white">
              <q-item :to="{ name: 'settings' }"
                :class="'bg-' + ($route.meta.color || 'black')"
                style="height: 50px;">
                <q-item-section avatar>
                  <q-icon color="white" name="settings" />
                </q-item-section>
                <q-item-section class="text-bold">
                  {{ user.data.name }}
                </q-item-section>
                <q-item-section side>
                  <q-btn round
                    size="sm"
                    color="white"
                    :class="'text-' + ($route.meta.color || 'black')"
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
                <q-separator vertical class="q-mr-sm" :color="$tasks.meta.color" />
                <q-item-section side>
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
                <q-separator vertical class="q-mr-sm" :color="$calls.meta.color" />
                <q-item-section side>
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
                <q-separator vertical class="q-mr-sm" :color="$customers.meta.color" />
                <q-item-section side>
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
      <q-page class="bg-grey-3" style="height: calc(100vh - 50px)">
        <q-scroll-area class="full-height" :thumb-style="thumbStyle">
          <router-view v-if="$store.state.firestore.ready || $route.name === 'login'" />
          <div v-else class="row justify-center text-center">
            <div class="col-8 col-offset-2" style="margin-top: 100px;">
              <q-circular-progress
                show-value
                font-size="10px"
                class="q-ma-md"
                :value="$firestore.loading"
                size="100px"
                :thickness="0.25"
                color="primary"
                track-color="grey-3">
                <q-avatar size="75px">
                  <img src="statics/icons/icon-512x512.png" class="full-width" />
                </q-avatar>
              </q-circular-progress>
            </div>
          </div>
        </q-scroll-area>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import TaskEditDialog from '../components/TaskEditDialog'
import CallEditDialog from '../components/CallEditDialog'
import CustomerEditDialog from '../components/CustomerEditDialog'

export default {
  name: 'Base',
  data () {
    return {
      drawer: !this.$q.platform.is.mobile,
      taskCreate: false,
      callCreate: false,
      customerCreate: false,
      thumbStyle: {
        backgroundColor: 'black',
        opacity: 1,
        right: '2px',
        borderRadius: '2.5px',
        width: '5px'
      }
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
    TaskEditDialog,
    CallEditDialog,
    CustomerEditDialog
  }
}
</script>

<style>
</style>
