<template>
  <q-chip v-bind="$attrs" v-on="$listeners"
    clickable
    class="q-ma-none"
    style="overflow: hidden;"
    @click="taskPreview = true">
    <user-avatar :user="user" />
    {{ event.task.title }}
    <q-menu
      anchor="top right"
      selft="top left"
      context-menu
      class="q-pa-sm"
      @hide="patchTask()">
      <q-card style="width: 400px" class="q-pa-sm">
        <store-form v-model="event.task" :fields="editShiftFields" />
      </q-card>
    </q-menu>
    <q-dialog v-model="taskPreview">
      <task :task-id="event.task.id" />
    </q-dialog>
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
      taskPreview: false,
      editShiftFields: [{
        key: 'time_shifts',
        component: 'ShiftsField'
      }]
    }
  },
  computed: {
    user () {
      return this.$users.data[this.event.task.user]
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
    Task: () => import('../../pages/Task'),
    StoreForm: () => import('./StoreForm')
  }
}
</script>
