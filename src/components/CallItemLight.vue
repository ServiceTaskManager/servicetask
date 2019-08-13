<template>
  <div>
    <q-item class="q-pa-none q-pb-sm">
      <q-item-section avatar top class="q-pa-none">
        <div class="full-width text-center">
          <user-avatar v-if="call.status === 'assigned'"
            size="40px"
            :display-name="userAssigned.display_name"
            :color="userAssigned.color" />
          <user-avatar v-else-if="call.status === 'new'"
            size="40px"
            display-name="?"
            color="grey-13" />
        </div>
        <span v-if="call.status === 'new'"
          caption
          class="text-grey-6 full-width text-center">
          {{ timeAgo.display }}
        </span>
      </q-item-section>
      <q-item-section top>
        <q-item-label lines="1">
          <span class="text-bold">{{ call.title }}</span>
        </q-item-label>
        <q-item-label>
          <span class="text-grey-9">
            <q-icon name="print" color="teal" /> {{ engine.type }}
          </span>
        </q-item-label>
        <q-item-label>
          <q-icon name="people" color="pink" /> <span class="text-grey-8"> {{ customer.name }}</span>
          <q-icon name="person" color="green" /> <span class="text-grey-8"> {{ call.person }}</span>
        </q-item-label>
      </q-item-section>

      <q-item-section avatar middle>
        <q-btn flat round
          type="a"
          icon="phone"
          color="positive"
          @click="assignCall" />
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { date, openURL } from 'quasar'
import UserAvatar from '../components/UserAvatar'

export default {
  name: 'CallItemLight',
  props: ['call'],
  data () {
    return {
      engine: {
        type: '',
        down: false
      },
      customer: {
        name: ''
      },
      userAssigned: {}
    }
  },
  computed: {
    timeAgo () {
      let now = new Date()
      let displayUnit = 'minutes'
      let diffMinutes = date.getDateDiff(now, this.call.created_at, 'minutes')
      if (diffMinutes > 60) displayUnit = 'hours'
      else if (diffMinutes > 60 * 24) displayUnit = 'days'
      return {
        display: date.getDateDiff(now, this.call.created_at, displayUnit) + ' ' + displayUnit.slice(0, 1)
      }
    }
  },
  mounted () {
    this.engine = this.$store.state.engines.data[this.call.engine]
    this.customer = this.$store.state.customers.data[this.call.customer]
    this.userAssigned = this.$store.state.users.data[this.call.assign_to]
  },
  methods: {
    assignCall () {
      console.log('Assign call')
      this.call.status = 'assigned'
      this.call.assign_to = this.$store.state.user.data.id
      this.$store.dispatch('calls/patch', this.call)
      openURL('tel:' + this.call.phone)
    }
  },
  components: {
    UserAvatar
  }
}
</script>
