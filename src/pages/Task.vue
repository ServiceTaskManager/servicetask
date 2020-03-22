<template>
  <div>
    <q-card>
      <q-item>
        <q-item-section avatar>
          <user-avatar :user-id="task.user" v-if="task.user" />
          <user-avatar v-else />
        </q-item-section>
         <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
          <q-item-label caption :class="'text-' + $tasks.meta.color" v-if="task.schedule_start">
            To do {{ task.schedule_start.toISOString() | moment('from') }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-card-section>
        <div v-if="task.description">
          {{ task.description }}
        </div>
        <customer-chip :customer-id="task.customer" class="full-width" />
        <engine-chip :engine-id="task.engine" SN class="full-width" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'Task',
  props: {
    taskId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      editDialog: false,
      confirmTask: false,
      createWOTask: false,
      createTask: false,
      closeTask: false,
      taskEdit: false
    }
  },
  computed: {
    id () {
      return this.$route.params.id ? this.$route.params.id : this.taskId
    },
    task () {
      return this.$tasks.data[this.id]
    }
  },
  components: {
    CustomerChip: () => import('../components/customer/CustomerChip'),
    UserAvatar: () => import('../components/user/UserAvatar'),
    EngineChip: () => import('../components/engine/EngineChip')
  }
}
</script>
