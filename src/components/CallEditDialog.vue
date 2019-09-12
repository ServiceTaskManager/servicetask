<template>
  <q-dialog v-bind="$attrs" v-on="$listeners" :value="value" maximized>
    <q-card>
      <q-card-section class="bg-black text-white text-h6">
        <q-btn @click="cancel" icon="close" class="text-white" /><slot>Create a call</slot>
      </q-card-section>
      <q-separator />
      <q-card-section class="row items-center q-pa-sm">
        <call-form @submit="submit" @cancel="cancel" :fields="fields" :call="call" :call-id="callId" :preset="preset" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import CallForm from './CallForm'

export default {
  name: 'CallEditDialog',
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
    call: {
      type: Object,
      default: () => {
        return undefined
      }
    },
    callId: {
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
    CallForm
  }
}
</script>
