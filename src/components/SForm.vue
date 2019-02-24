<template>
  <q-toolbar :class="'bg-'+form.color" class="row">
    <q-fab :color="form.color" :icon="form.icon" direction="up">
      <q-fab-action
        v-for="(f, key) in forms"
        :key="key"
        :color="f.color"
        :icon="f.icon"
        @click='changeForm(key)' />
    </q-fab>

    <div class="full-width" style="padding-left: 5px; padding-right: 5px;">
      <s-select v-if="field.type == 'select'" :settings="field" :form="form" />
      <s-input v-else-if="field.type == 'input'" :settings="field" :form="form" />
      <p v-else>No field type defined</p>
    </div>

    <q-btn round dense flat icon="forward" @click.native="next" />
  </q-toolbar>
</template>

<script>
import { QToolbar } from 'quasar'
import SSelect from './SSelect.vue'
import SInput from './SInput.vue'

export default {
  name: 'SForm',
  props: ['forms', 'defaultFormKey'],
  data () {
    return {
      form: {},
      field: {},
      data: {},
      activeField: 0,
      currentformKey: ''
    }
  },
  computed: {
    nextBtn () {
      let prop = {}
      prop.icon = (this.activeField < this.form.field.length) ? 'forward' : 'send'
      return prop
    }
  },
  mounted () {
    this.activeForm = (this.defaultFormKey !== undefined) ? this.defaultFormKey : Object.keys(this.forms)[0]
    this.setForm()
  },
  methods: {
    changeForm (key) {
      this.activeForm = key
      this.setForm()
    },
    setForm () {
      this.form = this.forms[this.activeForm]
      this.activeField = 0
      this.data = {}
      this.setField()
    },
    setField () {
      this.field = this.form.fields[this.activeField]
      this.field.value = null
    },
    next () {
      this.data[this.field.key] = this.field.value
      if (this.activeField + 1 < this.form.fields.length) {
        ++this.activeField
        this.setField()
      } else {
        this.submit()
        this.setForm()
      }
    },
    submit () {
      this.$store.dispatch(this.form.store + '/set', this.data)
    }
  },
  components: {
    QToolbar,
    SSelect,
    SInput
  }
}
</script>
