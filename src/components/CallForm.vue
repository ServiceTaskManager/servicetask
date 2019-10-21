<template>
  <q-list class="full-width">
    <q-item v-if="'customer' in fields">
      <customer-field v-model="callData.customer" @input="callData.engine = ''" v-bind="fields.customer" />
    </q-item>
    <q-item v-if="'engine' in fields">
      <engine-field v-model="callData.engine" v-bind="fields.engine" :customer-id="callData.customer" />
    </q-item>
    <q-item v-if="'title' in fields">
      <title-field v-model="callData.title" label="Problem description" v-bind="fields.title" />
    </q-item>
    <q-item v-if="'person' in fields">
      <person-field v-model="callData.person" v-bind="fields.person" />
    </q-item>
    <q-item v-if="'phone' in fields">
      <phone-field v-model="callData.phone" v-bind="fields.phone" />
    </q-item>
    <q-item v-if="'teamviewer' in fields">
      <teamviewer-field v-model="callData.teamviewer" v-bind="fields.teamviewer" />
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
        @click="patch" />
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
    call: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      callData: {}
    }
  },
  mounted () {
    this.callData = Object.assign({},
      this.$calls.default,
      this.$calls.presets[this.preset],
      this.call,
      this.$calls.data[this.callId])
  },
  methods: {
    patch () {
      this.$store.dispatch('calls/patch', this.callData)
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
