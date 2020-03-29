<template>
  <q-list>
    <q-item-label header>{{$t('settings.user.title')}}</q-item-label>

    <st-form
      model="user"
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
      user: this.$user.data,
      settings: this.$settings,
      colorPicker: false
    }
  },
  computed: {
    userFormFields () {
      let fields = this.$models.user.fields
      const fieldsToDelete = ['roles', 'address', 'customer']
      return fields.filter(f => !fieldsToDelete.includes(f.key))
    }
  },
  watch: {
    user: {
      handler (val) {
        this.$i18n.locale = this.user.lang
      },
      deep: true
    }
  },
  components: {
    StForm: () => import('../components/generic/StForm')
  }
}
</script>
