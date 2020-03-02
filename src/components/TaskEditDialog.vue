<template>
  <q-dialog v-bind="$attrs" v-on="$listeners" :value="value" :maximized="$q.platform.is.mobile">
    <q-card>
      <q-toolbar :class="'bg-' + $tasks.meta.color" class="text-white">
        <q-btn flat round dense icon="close" v-close-popup />
        <q-toolbar-title>
          <slot>Create a task</slot>
        </q-toolbar-title>
        <q-btn flat rounded dense icon="done" @click="set" v-close-popup />
      </q-toolbar>
      <q-card-section class="row q-pa-sm">
        <task-form v-model="taskData" :fields="fields" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import TaskForm from './TaskForm'

export default {
  name: 'TaskEditDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    fields: {
      type: Object,
      default: () => {
        return undefined
      }
    },
    task: {
      type: Object,
      default: () => {
        return undefined
      }
    }
  },
  data () {
    return {
      data: {}
    }
  },
  computed: {
    taskData: {
      get () {
        return Object.assign({},
          this.$tasks.default,
          this.task,
          this.data)
      },
      set (task) {
        this.data = task
      }
    }
  },
  methods: {
    set () {
      this.$store.dispatch('tasks/set', this.taskData)
      this.data = {}
    }
  },
  components: {
    TaskForm
  }
}
</script>
