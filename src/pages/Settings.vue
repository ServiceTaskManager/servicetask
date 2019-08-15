<template>
  <q-list>
    <q-item-label header>User information</q-item-label>

    <q-item>
      <q-input
        v-model="user.display_name"
        label="Full name"
        class="full-width">
        <template v-slot:prepend>
          <q-avatar :style="'background-color:' + user.color">
            <q-icon name="person" color="white"  />
          </q-avatar>
        </template>
      </q-input>
    </q-item>

    <q-item>
      <q-input
        :color="user.color"
        v-model="user.color"
        class="full-width"
        label="Avatar color"
        @focus="colorPicker = !colorPicker">
        <template v-slot:prepend>
          <q-avatar :style="'background-color:' + user.color">
            <q-icon name="colorize" color="white"  />
          </q-avatar>
        </template>
        <q-dialog v-model="colorPicker">
          <q-color
            v-model="user.color"
            no-header
            no-footer />
        </q-dialog>
      </q-input>
    </q-item>

    <q-item-label header>Notifications</q-item-label>

    <q-item>
      <q-item-section>
        <q-item-label>Enable sound</q-item-label>
        <q-item-label caption>Get notification with sounds. Service Task needs to be running to play sound.</q-item-label>
      </q-item-section>
      <q-item-section side top>
        <q-toggle color="primary" v-model="settings.notifications.sound" />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label>Enable notifications</q-item-label>
        <q-item-label caption>Get push notifications</q-item-label>
      </q-item-section>
      <q-item-section side top>
        <q-toggle color="primary"
          :value="settings.notifications.topics.includes('main')"
          @input="$store.dispatch('settings/toggleNotificationTopic', 'main')" />
      </q-item-section>
    </q-item>

    <q-item class="absolute-bottom bg-white">
      <q-item-section class="text-right">
        <div>
          <q-btn rounded flat
            color="grey"
            label="Dashboard"
            icon="undo"
            :to="{ name: 'dashboard' }" />
          <q-btn rounded
            color="positive"
            type="submit"
            icon="done"
            @click="setUser"
            label="Apply" />
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'Settings',
  data () {
    return {
      user: {
        display_name: 'John Doe'
      },
      settings: {
        notifications: {
          sound: true,
          topics: []
        }
      },
      colorPicker: false
    }
  },
  mounted () {
    this.user = this.$store.state.user.data
    this.settings = this.$store.state.settings
  },
  methods: {
    setUser () {
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
