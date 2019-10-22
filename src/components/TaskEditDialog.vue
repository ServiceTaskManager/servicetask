<template>
  <q-dialog v-bind="$attrs" v-on="$listeners" :value="value" maximized>
    <q-card>
      <q-toolbar :class="'bg-' + $tasks.meta.color" class="text-white">
        <q-btn flat round dense icon="close" v-close-popup />
        <q-toolbar-title><slot>Create a task</slot></q-toolbar-title>
        <q-btn flat rounded dense @click="$emit('submit')" icon="done" v-close-popup />
      </q-toolbar>
      <q-separator />
      <q-card-section class="row q-pa-sm">
        <task-form :fields="fields" :task="task" :preset="preset" no-submit />
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
    preset: {
      type: String,
      default: ''
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
    return {}
  },
  components: {
    TaskForm
  }
}
</script>
