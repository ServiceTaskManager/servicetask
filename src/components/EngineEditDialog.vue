<template>
  <q-dialog v-bind="$attrs" v-on="$listeners" :value="value" maximized>
    <q-card>
      <q-card-section class="bg-black text-white text-h6">
        <q-btn @click="cancel" icon="close" class="text-white" /><slot>Create a engine</slot>
      </q-card-section>
      <q-separator />
      <q-card-section class="row q-pa-sm">
        <engine-form @submit="submit" @cancel="cancel" :fields="fields" :engine="engine" :engine-id="engineId" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import EngineForm from './EngineForm'

export default {
  name: 'EngineEditDialog',
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
    engine: {
      type: Object,
      default: () => {
        return undefined
      }
    },
    engineId: {
      type: String,
      default: ''
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
    EngineForm
  }
}
</script>
