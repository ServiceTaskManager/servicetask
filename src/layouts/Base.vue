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
      notificationToken: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    models () {
      let models = {}
      this.$store.state.config.models.forEach((model) => {
        models[model] = this.$store.state[model]
      })
      return models
    }
  },
  mounted () {
    // Request permissions for notifications (browser)
    if (this.$messaging) {
      console.log('Loading messaging functions')
      this.$messaging.requestPermission().then(function () {
        console.log('Notification permission granted.')
      }).catch(function (err) {
        console.log('Unable to get permission to notify.', err)
      })

      this.getToken()

      // Watch for token, update notificationTokens store
      this.$messaging.onTokenRefresh(() => {
        this.getToken()
      })

      // Catch notifications and disply it
      this.$messaging.onMessage((payload) => {
        this.$q.notify(JSON.stringify(payload))
        console.log('Message received. ' + payload)
      })
    }
  },
  methods: {
    logout () {
      this.$auth.signOut()
    },
    getToken () {
      this.$messaging.getToken().then((token) => {
        console.log('Retrieve token ' + token)
        if (this.notificationToken !== token) {
          this.notificationToken = token
          // this.$store.dispatch('notifications/set', { token })
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err)
      })
    }
  }
}
</script>

<style>
</style>
