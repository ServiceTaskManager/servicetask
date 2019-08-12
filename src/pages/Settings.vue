<template>
  <q-list>
    <q-item-label header>User information</q-item-label>

    <q-item>
      <q-input
        v-model="user.display_name"
        label="Full name"
        class="full-width">
        <template v-slot:prepend>
          <q-icon name="person" color="orange" />
        </template>
      </q-input>
    </q-item>

    <q-item-label header>Notifications</q-item-label>

    <q-item>
      <q-item-section>
        <q-item-label>Enable sound</q-item-label>
        <q-item-label caption>Get notification with sounds. Service Task needs to be running to play sound.</q-item-label>
      </q-item-section>
      <q-item-section side top>
        <q-toggle color="primary" v-model="settings.notification.sound" />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label>Enable notifications</q-item-label>
        <q-item-label caption>Get push notifications</q-item-label>
      </q-item-section>
      <q-item-section side top>
        <q-toggle color="primary" v-model="settings.notification.enable" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'Settings',
  data () {
    return {
      user: {},
      settings: {
        notification: {
          enable: true,
          sound: true,
          topics: []
        }
      }
    }
  },
  mounted () {
    this.user = this.$store.state.user.data
  },
  methods: {
    submit () {
      this.$store.dispatch('users/patch', this.user).then(r => {
        this.$q.notify({
          message: 'User set',
          color: 'positive',
          icon: 'info'
        })
      })
    }
  }
}
</script>
