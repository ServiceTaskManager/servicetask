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
        <q-select v-model="user.lang"
          :options="langOptions"
          map-options
          emit-value
          @input="$store.dispatch('users/patch', { ...user, lang: $event })" />
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
        <q-item-label v-if="!settings.notifications.supported"
          caption
          class="text-negative">
          {{$t('settings.notifications.noBrowserSupport')}}
        </q-item-label>
      </q-item-section>
      <q-item-section side top>
        <q-toggle color="primary"
          :disable="!settings.notifications.supported"
          :value="settings.notifications.topics.includes('main')"
          @input="$store.dispatch('settings/toggleNotificationTopic', 'main')" />
      </q-item-section>
    </q-item>

    <q-item class="bg-white">
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
            @click="saveUser"
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
      user: this.$user,
      settings: this.$settings,
      colorPicker: false,
      langOptions: [
        { value: 'en-us', label: 'English (US)' },
        { value: 'fr', label: 'Français' },
        { value: 'de', label: 'German' }
      ]
    }
  },
  methods: {
    saveUser () {
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
