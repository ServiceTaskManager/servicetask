<template>
  <q-list class="full-width">
    <q-item v-if="'user' in fields">
      <user-field v-model="taskData.user" v-bind="fields.user" />
    </q-item>
    <q-item v-if="'customer' in fields">
      <customer-field v-model="taskData.customer" @input="taskData.engine = ''" v-bind="fields.customer" />
    </q-item>
    <q-item v-if="'engine' in fields">
      <engine-field v-model="taskData.engine" v-bind="fields.engine" :customer-id="taskData.customer" />
    </q-item>
    <q-item v-if="'title' in fields">
      <title-field v-model="taskData.title" v-bind="fields.title" />
    </q-item>
    <q-item v-if="'description' in fields">
      <description-field v-model="taskData.description" v-bind="fields.description" />
    </q-item>
    <q-item v-if="'schedule_from' in fields">
      <date-time-field v-model="taskData.schedule_from" v-bind="fields.schedule_from" />
    </q-item>
    <q-item v-if="'schedule_to' in fields">
      <date-time-field v-model="taskData.schedule_to" v-bind="fields.schedule_to" />
    </q-item>

    <q-item class="row justify-end">
      <q-btn rounded flat
        color="grey"
        icon="undo"
        @click="$emit('cancel')" />
      <q-btn rounded
        color="positive"
        label="Submit"
        type="submit"
        icon="done"
        @click="set" />
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'TaskForm',
  props: {
    taskId: {
      type: String,
      default: undefined
    },
    preset: {
      type: String,
      default: undefined
    },
    fields: {
      type: Object,
      default: () => {
        return {
          user: {},
          customer: {},
          engine: {},
          title: { label: 'Task' },
          description: {},
          schedule_from: { label: 'Start date' },
          schedule_to: { label: 'End date' }
        }
      }
    },
    task: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      taskData: {},
      test: {}
    }
  },
  mounted () {
    this.taskData = Object.assign({},
      this.$store.state.tasks.default,
      this.$store.state.tasks.presets[this.preset],
      this.task,
      this.$store.state.tasks.data[this.taskId])
  },
  methods: {
    set () {
      this.$store.dispatch('tasks/set', this.taskData)
      this.$emit('submit')
    }
  },
  components: {
    UserField: () => import('./UserField'),
    CustomerField: () => import('./CustomerField'),
    EngineField: () => import('./EngineField'),
    TitleField: () => import('./TitleField'),
    DescriptionField: () => import('./DescriptionField'),
    DateTimeField: () => import('./DateTimeField')
  }
}
</script>
