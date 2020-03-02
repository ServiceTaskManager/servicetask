<template>
  <q-dialog v-bind="$attrs" v-on="$listeners" :value="value" :maximized="$q.platform.is.mobile">
    <q-card>
      <q-toolbar :class="'bg-' + $calls.meta.color" class="text-white">
        <q-btn flat round dense icon="close" v-close-popup />
        <q-toolbar-title>
          <slot>Create a call</slot>
        </q-toolbar-title>
        <q-btn flat rounded dense icon="done" @click="set" v-close-popup />
      </q-toolbar>
      <q-card-section class="row items-center q-pa-sm">
        <call-form v-model="callData" :fields="fields" />
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
    }
  },
  data () {
    return {
      data: {}
    }
  },
  computed: {
    callData: {
      get () {
        return Object.assign({},
          this.$calls.default,
          this.call,
          this.data)
      },
      set (call) {
        this.data = call
      }
    }
  },
  methods: {
    set () {
      this.$store.dispatch('calls/set', this.callData)
      this.callData = {}
    }
  },
  components: {
    CallForm
  }
}
</script>
