<template>
  <q-form class="full-width">
    <user-field v-if="'user' in fields"
      v-model="taskData.user"
      v-bind="fields.user" />
    <customer-field v-if="'customer' in fields"
      v-model="taskData.customer"
      @input="taskData.engine = ''"
      v-bind="fields.customer" />
    <engine-field v-if="'engine' in fields"
      v-model="taskData.engine"
      v-bind="fields.engine"
      :customer-id="taskData.customer" />
    <title-field v-if="'title' in fields"
      v-model="taskData.title"
      v-bind="fields.title" />
    <description-field v-if="'description' in fields"
      v-model="taskData.description"
      v-bind="fields.description" />
    <date-time-field v-if="'schedule_from' in fields"
      v-model="taskData.schedule_from"
      v-bind="fields.schedule_from" />
    <date-time-field v-if="'schedule_to' in fields"
      v-model="taskData.schedule_to"
      v-bind="fields.schedule_to" />
  </q-form>
</template>

<script>
export default {
  name: 'TaskForm',
  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
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
    }
  },
  data () {
    return {
      taskData: {}
    }
  },
  mounted () {
    this.taskData = Object.assign({},
      this.$tasks.default,
      this.value)
  },
  watch: {
    taskData: function (val) {
      this.$emit('input', val)
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
