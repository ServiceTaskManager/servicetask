<template>
  <q-list>
    <q-item v-if="'customer' in fields">
      <customer-field v-model="task.customer" @input="task.engine = ''" v-bind="fields['customer']" />
    </q-item>
    <q-item v-if="'engine' in fields">
      <engine-field v-model="task.engine" v-bind="fields['engine']" :customer-id="task.customer" />
    </q-item>
    <q-item v-if="'title' in fields">
      <title-field v-model="task.title" v-bind="fields['title']" />
    </q-item>
    <q-item v-if="'description' in fields">
      <description-field v-model="task.description" v-bind="fields['description']" />
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
          customer: {},
          engine: {},
          title: {},
          description: {}
        }
      }
    },
    overwrite: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      task: {}
    }
  },
  mounted () {
    this.task = Object.assign({},
      this.$store.state.tasks.default,
      this.$store.state.tasks.presets[this.preset],
      this.overwrite,
      this.$store.state.tasks.data[this.taskId])
  },
  methods: {
    set () {
      console.log(this.task)
      this.$store.dispatch('tasks/set', this.task)
      this.$emit('submit')
    }
  },
  components: {
    CustomerField: () => import('./CustomerField'),
    EngineField: () => import('./EngineField'),
    TitleField: () => import('./TitleField'),
    DescriptionField: () => import('./DescriptionField')
  }
}
</script>
