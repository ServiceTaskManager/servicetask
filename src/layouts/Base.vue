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

        <!-- Toolbar button -->
        <q-btn v-if="store"
          flat round
          icon="add" color="white"
          @click="createDialog = true" />

        <q-btn v-if="data"
          flat round
          icon="edit" color="white"
          @click="editDialog = true" />

        <q-btn v-if="selectedIds.length > 0"
          flat round
          icon="more_vert" color="white"
          @click="bottomSheet" />

        <q-btn v-if="selectedIds.length > 0 && !$route.params.id"
          flat round
          icon="cancel" color="white"
          @click="unselectAll" />

        <!-- Edit dialog from creation & edition -->
        <edit-dialog v-if="this.$route.meta.store"
          v-model="createDialog"
          :store="$route.meta.store" />

        <edit-dialog v-if="data"
          v-model="editDialog"
          :store="$route.meta.store"
          :data="data">
          Edit
        </edit-dialog>
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
                    @click.prevent="taskCreateDialog = true" />
                  <edit-dialog v-model="taskCreateDialog" store="tasks">New task</edit-dialog>
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
                    @click.prevent="callCreateDialog = true" />
                  <edit-dialog v-model="callCreateDialog" store="calls">New call</edit-dialog>
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
                    @click.prevent="customerCreateDialog = true" />
                  <edit-dialog v-model="customerCreateDialog" store="customers">Add a customer</edit-dialog>
                </q-item-section>
              </q-item>
              <q-item :to="{ name: 'calendar' }">
                <q-item-section avatar>
                  <q-icon color="white" name="event" />
                </q-item-section>
                <q-item-section>
                  Calendar
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
export default {
  name: 'Base',
  data () {
    return {
      drawer: !this.$q.platform.is.mobile,
      customerCreateDialog: false,
      taskCreateDialog: false,
      callCreateDialog: false,
      createDialog: false,
      editDialog: false,
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
    storeName () {
      return this.$route.meta.store
    },
    store () {
      return this.$route.meta.store ? this['$' + this.$route.meta.store] : false
    },
    meta () {
      return this.store ? this.store.meta : this.$route.meta
    },
    headerClass () {
      return 'bg-' + (this.meta.color || 'black') + ' text-white'
    },
    data () {
      return this.$route.params.id ? this.store.data[this.$route.params.id] : false
    },
    title () {
      return this.data ? this.data[this.meta.titleProperty] : this.meta.title
    },
    selectedIds () {
      let selectedIds = []
      if (this.$route.meta.store) {
        const selected = this.$store.getters[this.$route.meta.store + '/filter']([['selected', '==', true]])
        selectedIds = selected.map(o => o.id)
      }
      return selectedIds
    }
  },
  methods: {
    logout () {
      this.$auth.signOut()
    },
    bottomSheet () {
      this.$q.bottomSheet({
        message: 'Actions',
        actions: this.store.actions
      }).onOk(action => {
        if (action.patch) {
          let payload = {
            doc: action.patch,
            ids: this.selectedIds
          }
          this.$store.dispatch(this.storeName + '/patchBatch', payload)
        } else if (action.action) {
          let payload = {
            parent: this,
            ids: this.selectedIds
          }
          this.$store.dispatch(this.storeName + '/' + action.action, payload)
        }
      })
    },
    unselectAll () {
      this.$store.dispatch(this.storeName + '/unselectAll')
    }
  },
  components: {
    EditDialog: () => import('../components/generic/EditDialog')
  }
}
</script>

<style>
</style>
