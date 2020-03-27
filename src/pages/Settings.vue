<template>
  <q-list>
    <q-item-label header>{{$t('settings.user.title')}}</q-item-label>

    <q-item>
      <q-input
        v-model="user.name"
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

    <q-item>
      <q-item-section avatar>
        <q-icon color="black" name="language" />
      </q-item-section>
      <q-item-section>
        <q-select v-model="lang"
          :options="langOptions"
          map-options
          emit-value />
      </q-item-section>
    </q-item>

    <q-item-label header>{{$t('settings.notifications.title')}}</q-item-label>

    <q-item>
      <q-item-section>
        <q-item-label>{{$t('settings.sound.enable')}}</q-item-label>
        <q-item-label caption>{{$t('settings.sound.caption')}}</q-item-label>
      </q-item-section>
      <q-item-section side top>
        <q-toggle color="primary" v-model="settings.notifications.sound" />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label>{{$t('settings.notifications.enable')}}</q-item-label>
        <q-item-label caption>{{$t('settings.notifications.caption')}}</q-item-label>
        <q-item-label v-if="!$store.state.settings.notifications.supported"
          caption
          class="text-negative">
          {{$t('settings.notifications.noBrowserSupport')}}
        </q-item-label>
      </q-item-section>
      <q-item-section side top>
        <q-toggle color="primary"
          :disable="!$store.state.settings.notifications.supported"
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
      colorPicker: false,
      lang: this.$i18n.locale,
      langOptions: [
        { value: 'en-us', label: 'English (US)' },
        { value: 'fr', label: 'Français' },
        { value: 'de', label: 'German' }
      ]
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
  },
  watch: {
    lang: function (val) {
      this.$i18n.locale = val
    }
  }
}
</script>
