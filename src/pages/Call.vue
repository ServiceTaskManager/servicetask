<template>
  <div>
    <q-card>
      <q-item>
        <q-item-section avatar>
          <user-avatar :user-id="call.assign_to" v-if="call.assign_to" />
          <user-avatar v-else />
        </q-item-section>
         <q-item-section>
          <q-item-label>{{ call.title }}</q-item-label>
          <q-item-label caption :class="'text-' + $calls.meta.color" v-if="call.status === 'open'">
            Call open {{ call.created_at.toISOString() | moment('from') }}
          </q-item-label>
          <q-item-label caption v-if="call.status === 'close' && call.closed_at">
            Call closed {{ call.closed_at.toISOString() | moment('from') }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-card-section>
        <customer-chip :customer-id="call.customer" class="full-width" />
        <engine-chip :engine-id="call.engine" SN class="full-width" />
        <phone-chip :phone="call.phone" :person="call.person" class="full-width" />
        <teamviewer-chip v-if="call.teamviewer.id" :teamviewer="call.teamviewer" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'Call',
  mounted () {
    this.$store.dispatch('calls/selectOneOnly', this.call.id)
  },
  computed: {
    call () {
      return this.$calls.data[this.$route.params.id]
    }
  },
  components: {
    CustomerChip: () => import('../components/customer/CustomerChip'),
    UserAvatar: () => import('../components/user/UserAvatar'),
    EngineChip: () => import('../components/engine/EngineChip'),
    PhoneChip: () => import('../components/generic/PhoneChip'),
    TeamviewerChip: () => import('../components/generic/TeamviewerChip')
  }
}
</script>
