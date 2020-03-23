<template>
  <q-chip v-bind="$attrs" v-on="$listeners"
    clickable
    class="q-ma-none"
    style="overflow: hidden;">
    <user-avatar :user="user" />

    {{ event.task.title }}

    <q-tooltip content-class="rotate-90" anchor="top right" self="top left">
      {{ customer.name }}
    </q-tooltip>

    <q-menu
      anchor="top right"
      selft="top left"
      class="q-pa-sm"
      @hide="patchTask()">
      <q-card style="width: 400px" class="q-pa-sm">
        <store-form v-model="event.task" store="tasks" />
      </q-card>
    </q-menu>
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
      return this.$users.data[this.event.task.user]
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
  components: {
    UserAvatar: () => import('../user/UserAvatar'),
    StoreForm: () => import('./StoreForm')
  }
}
</script>
