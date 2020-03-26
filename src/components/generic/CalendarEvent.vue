<template>
  <q-chip v-bind="$attrs" v-on="$listeners"
    clickable
    color="light-blue-1"
    class="q-ma-none"
    style="overflow: hidden;">
    <user-avatar :user="user" />

    {{ event.task.type | firstLetter }} {{ event.task.title }}

    <q-tooltip anchor="top middle" self="top middle"
      class=""
      content-class="bg-pink text-white text-weight-bold rotate-90"
      content-style="font-size: 11px;"
      :offset="[0, -80]">
      {{ customer.name }}
    </q-tooltip>
  </q-chip>
</template>

<script>
export default {
  name: 'CalendarEvent',
  props: {
    event: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      editShiftFields: [{
        key: 'time_shifts',
        component: 'ShiftsField'
      }]
    }
  },
  computed: {
    user () {
      return this.$users.data[this.event.task.technician]
    },
    customer () {
      return this.$customers.data[this.event.task.customer]
    }
  },
  methods: {
    style () {
      return {
        'background-color': this.user.color
      }
    },
    patchTask () {
      this.$store.dispatch('tasks/patch', this.event.task)
    }
  },
  filters: {
    firstLetter: function (val) {
      return typeof val === 'string' ? val.split(' ')[0] : ''
    }
  },
  components: {
    UserAvatar: () => import('../user/UserAvatar')
  }
}
</script>
