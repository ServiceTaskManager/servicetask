<template>
  <q-list>
    <q-item-label header>{{$t('settings.user.title')}}</q-item-label>

    <store-form
      store="users"
      :fields="userFormFields"
      v-model="user"
      class="q-pa-sm" />

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
  computed: {
    userFormFields () {
      let fields = this.$users.fields
      const fieldsToDelete = ['roles', 'address', 'customer']
      return fields.filter(f => !fieldsToDelete.includes(f.key))
    }
  },
  methods: {
    saveUser () {
      window.localStorage.setItem('lang', this.user.lang)
      this.$store.dispatch('users/patch', this.user).then(r => {
        this.$q.notify({
          message: 'User set',
          color: 'positive',
          icon: 'info'
        })
      })
    }
  },
  components: {
    StoreForm: () => import('../components/generic/StoreForm')
  }
}
</script>
