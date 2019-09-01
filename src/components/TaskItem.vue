<template>
  <q-expansion-item class="q-pa-xs">
    <template v-slot:header>
      <q-item-section avatar>
        <user-avatar :userId="task.created_by" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-bold">{{ task.title }}</q-item-label>
        <q-item-label caption lines="1">
          <customer-chip :customer="customer" dense v-if="customer" />
          <engine-chip :engine="engine" dense v-if="engine" />
        </q-item-label>
      </q-item-section>
    </template>
    <q-card>
      <q-card-section>
        <p class="text-grey">
          {{ task.description }}
        </p>
        <customer-chip :customer="customer" v-if="customer" class="full-width" />
        <engine-chip :engine="engine" v-if="engine" SN class="full-width" />
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
          :to="{ name: 'tasksEdit', params: { id: task.id } }" />
        <q-btn flat round
          icon="delete"
          color="negative"
          @click="deleteTask" />
      </q-card-actions>
      <q-separator />
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
  computed: {
    customer () {
      return this.$store.state.customers.data[this.task.customer]
    },
    engine () {
      return this.$store.state.engines.data[this.task.engine]
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
