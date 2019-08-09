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
            <q-item
              v-if="$store.state.user.login"
              class="bg-grey-5">
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
              v-for="(m, key) in $store.state.firestore.metas"
              :key="key"
              :to="key">
              <q-item-section avatar>
                <q-icon :color="m.color" :name="m.icon" />
              </q-item-section>
              <q-item-section>
                {{ m.name }}
              </q-item-section>
            </q-item>

            <q-item to="dashboard">
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

    <q-page-container
      v-if="$store.state.firestore.ready || !$route.meta.requireAuth">
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>

    <q-page-container
      v-else>
      <q-page padding>
        <div class="row justify-center items-center window-height" >
          <q-card class="bg-grey-9">
            <q-card-section class="bg-grey-10 text-white">
              <div class="text-h6">
                Service Task
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-linear-progress stripe style="height: 30px" color="warning" :value="$store.state.firestore.loading" />
            </q-card-section>
            <q-separator />
            <q-card-section class="bg-grey-10 text-white">
              With love.
            </q-card-section>
          </q-card>
        </div>
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
      notificationToken: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
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
