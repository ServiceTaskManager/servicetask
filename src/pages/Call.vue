<template>
  <div>
    <q-card>
      <q-item>
        <q-item-section avatar>
          <user-avatar :user-id="call.user" v-if="call.user" />
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
import CustomerChip from '../components/CustomerChip'
import UserAvatar from '../components/UserAvatar'
import EngineChip from '../components/EngineChip'
import PhoneChip from '../components/PhoneChip'
import TeamviewerChip from '../components/TeamviewerChip'

export default {
  name: 'Call',
  data () {
    return {
      editDialog: false,
      confirmCall: false,
      createWOTask: false,
      createTask: false,
      closeCall: false,
      callEdit: false
    }
  },
  mounted () {
    this.$ui.header.title = this.call.title
  },
  computed: {
    call () {
      return this.$calls.data[this.$route.params.id]
    }
  },
  components: {
    CustomerChip,
    UserAvatar,
    EngineChip,
    PhoneChip,
    TeamviewerChip
  }
}
</script>
