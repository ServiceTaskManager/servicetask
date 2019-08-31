<template>
  <q-expansion-item class="q-pa-xs">
    <template v-slot:header>
      <q-item-section avatar>
        <user-avatar :userId="task.created_by" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-bold">{{ task.title }}</q-item-label>
        <q-item-label caption>{{ task.description }}</q-item-label>
      </q-item-section>
    </template>
    <q-card>
      <q-card-section>
        <q-card-section>
          <customer-chip :customer-id="task.customer" />
          <engine-chip :engine-id="task.engine" />
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-btn v-if="!task.done"
            round
            icon="done"
            color="green"
            @click="done" />
          <q-btn v-if="task.done"
            round
            icon="undo"
            color="red"
            @click="todo" />
          <q-btn v-if="task.status === 'assigned'"
            round
            icon="close"
            color="negative" />
          <q-btn
            round flat
            icon="edit"
            color="grey"
            :to="{ name: 'tasksEdit', params: { id: task.id } }" />
          <q-btn
            round flat
            icon="delete"
            color="negative"
            @click="deleteTask" />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
import UserAvatar from './UserAvatar'
import EngineChip from './EngineChip'
import CustomerChip from './CustomerChip'

export default {
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
      default: () => {
        return this.$store.state.tasks.default
      }
    }
  },
  data () {
    return {
      meta: this.$store.state.tasks.meta
    }
  },
  methods: {
    deleteTask () {
      this.$store.dispatch('tasks/delete', this.task.id)
    },
    done () {
      this.task.done = true
      this.$store.dispatch('tasks/patch', this.task)
    },
    todo () {
      this.task.done = false
      this.$store.dispatch('tasks/patch', this.task)
    }
  },
  components: {
    UserAvatar,
    EngineChip,
    CustomerChip
  }
}
</script>
