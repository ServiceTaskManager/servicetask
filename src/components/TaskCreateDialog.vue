<template>
  <q-dialog v-bind="$attrs" v-on="$listeners" :value="value" persistent>
    <q-card>
      <q-card-section class="bg-black text-white text-h6">
        <slot>Create a task</slot>
      </q-card-section>
      <q-separator />
      <q-card-section class="row items-center q-pa-sm">
        <task-form @submit="close" :fields="fields" :overwrite="overwrite" :preset="preset" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import TaskForm from './TaskForm'

export default {
  name: 'TaskCreateDialog',
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
    overwrite: {
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
    close () {
      this.$emit('input')
    }
  },
  components: {
    TaskForm
  }
}
</script>
