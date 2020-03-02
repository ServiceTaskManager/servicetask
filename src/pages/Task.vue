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
          <q-item-label caption :class="'text-' + $tasks.meta.color" v-if="!task.done">
            To do {{ task.schedule_from.toISOString() | moment('from') }}
          </q-item-label>
          <q-item-label caption v-if="task.done && task.done_at">
            Done {{ task.done_at.toISOString() | moment('from') }}
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
import CustomerChip from '../components/CustomerChip'
import UserAvatar from '../components/UserAvatar'
import EngineChip from '../components/EngineChip'

export default {
  name: 'Task',
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
  mounted () {
    this.$ui.header.title = this.task.title
  },
  computed: {
    task () {
      return this.$tasks.data[this.$route.params.id]
    }
  },
  components: {
    CustomerChip,
    UserAvatar,
    EngineChip
  }
}
</script>
