<template>
  <div>
    <q-separator />
    <q-expansion-item>
      <template v-slot:header>
        <q-item-section>
          <q-item-label overline v-if="task.schedule_from">{{ task.schedule_from.toISOString() | moment('from') }}</q-item-label>
          <q-item-label class="text-bold">{{ task.title }}</q-item-label>
          <q-item-label caption lines="1">
            <user-chip :user-id="task.user" dense v-if="task.user" />
            <customer-chip :customer-id="task.customer" dense v-if="task.customer" />
          </q-item-label>
        </q-item-section>
      </template>
      <q-card>
        <q-card-section>
          <p class="text-grey">
            {{ task.description }}
          </p>
          <user-chip :user-id="task.user" v-if="task.user" class="full-width" />
          <customer-chip :customer-id="task.customer" v-if="task.customer" class="full-width" />
          <engine-chip :engine-id="task.engine" v-if="task.engine" SN class="full-width" />
        </q-card-section>
        <q-card-actions align="around">
          <q-btn v-if="!task.done"
            flat round
            icon="done"
            color="green"
            @click="done" />
          <q-btn v-if="task.done"
            float round
            icon="undo"
            color="red"
            @click="todo" />
          <q-btn flat round
            icon="edit"
            color="grey"
            @click="taskEditDialog = true" />
          <q-btn flat round
            icon="delete"
            color="negative"
            @click="deleteTask" />
        </q-card-actions>
        <q-separator />
      </q-card>
      <task-edit-dialog v-model="taskEditDialog" :task="task">Edit task</task-edit-dialog>
    </q-expansion-item>
  </div>
</template>

<script>
import UserChip from './UserChip'
import EngineChip from './EngineChip'
import CustomerChip from './CustomerChip'
import TaskEditDialog from './TaskEditDialog'

export default {
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
      default: () => {
        return this.$tasks.default
      }
    }
  },
  data () {
    return {
      taskEditDialog: false
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
    UserChip,
    EngineChip,
    CustomerChip,
    TaskEditDialog
  }
}
</script>
