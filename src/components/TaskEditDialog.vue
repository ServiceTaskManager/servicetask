<template>
  <q-dialog v-bind="$attrs" v-on="$listeners" :value="value" maximized>
    <q-card>
      <q-card-section class="bg-black text-white text-h6">
        <q-btn @click="cancel" icon="close" class="text-white" /><slot>Create a task</slot>
      </q-card-section>
      <q-separator />
      <q-card-section class="row q-pa-sm">
        <task-form @submit="submit" @cancel="cancel" :fields="fields" :task="task" :preset="preset" />
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
  methods: {
    submit () {
      this.$emit('input')
      this.$emit('submit')
    },
    cancel () {
      this.$emit('input')
    }
  },
  components: {
    TaskForm
  }
}
</script>
