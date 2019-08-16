<template>
  <q-list>
    <q-item v-if="'customer' in fields">
      <customer-field v-model="call.customer" @input="call.engine = ''" v-bind="fields.customer" />
    </q-item>
    <q-item v-if="'engine' in fields">
      <engine-field v-model="call.engine" v-bind="fields.engine" :customer-id="call.customer" />
    </q-item>
    <q-item v-if="'title' in fields">
      <title-field v-model="call.title" v-bind="fields.title" />
    </q-item>
    <q-item v-if="'person' in fields">
      <person-field v-model="call.person" v-bind="fields.person" />
    </q-item>
    <q-item v-if="'phone' in fields">
      <phone-field v-model="call.phone" v-bind="fields.phone" />
    </q-item>
    <q-item v-if="'teamviewer' in fields">
      <teamviewer-field v-model="call.teamviewer" v-bind="fields.teamviewer" />
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
  name: 'CallForm',
  props: {
    callId: {
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
          person: {},
          phone: {},
          teamviewer: {}
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
      call: {}
    }
  },
  mounted () {
    this.call = Object.assign({},
      this.$store.state.calls.default,
      this.$store.state.calls.presets[this.preset],
      this.overwrite,
      this.$store.state.calls.data[this.callId])
  },
  methods: {
    set () {
      this.$store.dispatch('calls/set', this.call)
      this.$emit('submit')
    }
  },
  components: {
    CustomerField: () => import('./CustomerField'),
    EngineField: () => import('./EngineField'),
    TitleField: () => import('./TitleField'),
    PersonField: () => import('./PersonField'),
    PhoneField: () => import('./PhoneField'),
    TeamviewerField: () => import('./TeamviewerField')
  }
}
</script>
