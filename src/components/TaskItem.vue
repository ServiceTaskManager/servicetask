<template>
  <div>
    <q-separator />
    <q-item :class="light ? 'q-pa-xs' : null">
      <q-item-section avatar top class="q-gutter-sm">
        <user-avatar :user-id="task.created_by" />
        <q-btn v-if="task.done"
          round
          icon="chevron_left"
          color="grey"
          @click="todo" />
      </q-item-section>

      <q-item-section top>
        <title-chip :dense="light" :title="task.title" />
        <description-chip :dense="light" :description="task.description" />
        <engine-chip :dense="light" :engine-id="task.engine" />
        <customer-chip :dense="light" :customer-id="task.customer" />
      </q-item-section>

      <q-item-section side top class="q-gutter-sm">
        <q-btn v-if="!task.done"
          round
          icon="done"
          color="green"
          @click="done" />
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
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import UserAvatar from './UserAvatar'
import TitleChip from './TitleChip'
import DescriptionChip from './DescriptionChip'
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
    },
    light: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
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
    TitleChip,
    DescriptionChip,
    EngineChip,
    CustomerChip
  }
}
</script>
