<template>
  <q-list class="full-width">
    <q-item v-if="'customer' in fields">
      <customer-field v-model="engineData.customer" @input="engine.engine = ''" v-bind="fields.customer" />
    </q-item>
    <q-item v-if="'name' in fields">
      <name-field v-model="engineData.name" v-bind="fields.name" />
    </q-item>
    <q-item v-if="'sn' in fields">
      <name-field v-model="engineData.sn" v-bind="fields.sn" />
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
  name: 'EngineForm',
  props: {
    engineId: {
      type: String,
      default: undefined
    },
    fields: {
      type: Object,
      default: () => {
        return {
          customer: {},
          name: { label: 'Engine name' },
          sn: { label: 'Serial number' }
        }
      }
    },
    engine: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      engineData: {}
    }
  },
  mounted () {
    this.engineData = Object.assign({},
      this.$engines.default,
      this.engine,
      this.$engines.data[this.engineId])
  },
  methods: {
    set () {
      this.$store.dispatch('engines/set', this.engineData)
      this.$emit('submit')
    }
  },
  components: {
    CustomerField: () => import('./CustomerField'),
    NameField: () => import('./NameField')
  }
}
</script>
