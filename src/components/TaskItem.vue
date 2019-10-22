<template>
  <div>
    <q-separator />
    <q-expansion-item @show="caption = false" @hide="caption = true" header-class="q-pa-sm">
      <template v-slot:header>
        <q-item-section>
          <q-item-label overline v-if="task.schedule_from">
            <span class="q-pr-sm">
              <user-avatar :user-id="task.user" size="20px" v-if="task.user" />
              <user-avatar :user="{ color: 'grey', name: '?' }" size="20px" v-else />
            </span>
            <span>{{ task.schedule_from.toISOString() | moment('from') }}</span>
          </q-item-label>
          <q-item-label class="text-bold">{{ task.title }}</q-item-label>
          <q-item-label caption lines="1" v-if="caption">
            <customer-chip :customer-id="task.customer" dense v-if="task.customer && !hideCustomer" />
            <engine-chip :engine-id="task.engine" dense v-if="task.engine && !hideEngine" />
          </q-item-label>
        </q-item-section>
      </template>
      <q-card>
        <q-card-section class="q-pa-sm">
          <p class="text-grey" v-if="task.description">
            {{ task.description }}
          </p>
          <user-chip :user-id="task.user" v-if="task.user" class="full-width" />
          <customer-chip :customer-id="task.customer" v-if="task.customer && !hideCustomer" class="full-width" />
          <engine-chip :engine-id="task.engine" v-if="task.engine && !hideEngine" SN class="full-width" />
        </q-card-section>
        <q-card-actions align="around" class="q-pa-sm">
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
import UserAvatar from './UserAvatar'
import EngineChip from './EngineChip'
import CustomerChip from './CustomerChip'
import TaskEditDialog from './TaskEditDialog'

export default {
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
      default: () => {
        return {}
      }
    },
    hideCustomer: {
      type: Boolean,
      default: false
    },
    hideEngine: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      taskEditDialog: false,
      caption: true
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
    UserAvatar,
    EngineChip,
    CustomerChip,
    TaskEditDialog
  }
}
</script>
