<template>
  <q-toolbar :class="'bg-'+form.color" class="row">
    <q-fab :color="form.color" :icon="form.icon" direction="up">
      <q-fab-action
        v-for="(f, key) in forms"
        :key="key"
        :color="f.color"
        :icon="f.icon"
        @click='setForm(key)' />
    </q-fab>

    <s-field :field="field" class="full-width" tag="div" style="padding-left: 5px; padding-right: 5px" />

    <q-btn round dense flat icon="forward" @click.native="next" />
  </q-toolbar>
</template>

<script>
import { QToolbar } from 'quasar'
import SField from './SField.vue'

export default {
  name: 'SForm',
  props: ['forms', 'defaultFormKey'],
  data () {
    return {
      form: {},
      field: {},
      value: {},
      activeField: 0
    }
  },
  computed: {
    nextBtn () {
      let prop = {}
      prop.icon = (this.activeField < this.form.field.length) ? 'forward' : 'send'
      return prop
    }
  },
  created () {
    this.$root.$on('pushValue', cb => this.updateValue(cb))
  },
  mounted () {
    let formKey = (this.defaultFormKey !== undefined) ? this.defaultFormKey : Object.keys(this.forms)[0]
    this.setForm(formKey)
  },
  methods: {
    setForm (key) {
      console.log('Set form ' + key)
      this.form = this.forms[key]
      this.activeField = 0
      this.setField()
    },
    setField () {
      this.field = this.form.fields[this.activeField]
      console.log('Set field #' + this.activeField, this.field.label)
    },
    next () {
      console.log('Next ' + this.form.fields.length)
      this.$root.$emit('claimValue')
      if (++this.activeField < this.form.fields.length) {
        ++this.activeField
        this.setField()
      } else {
        this.submit()
      }
    },
    updateValue (value) {
      this.value[this.field.key] = value
      console.log('Value updated : ' + JSON.stringify(this.value))
    },
    submit () {
      this.$store.dispatch(this.form.store + '/set', this.value)
      this.value = {}
      console.log('Submit')
    }
  },
  components: {
    QToolbar,
    SField
  }
}
</script>
