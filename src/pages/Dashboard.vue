<template>
  <div>

    <div class="container">
      <div
        class="row q-col-gutter-sm">
        <div
          v-for="(element, key) in content"
          :key="key"
          class="col-12 col-sm-6">
          <s-customer
            v-if="model == 'customers'"
            :data="element" />
          <s-call
            v-else-if="model == 'calls'"
            :data="element" />
          <s-task
            v-else-if="model == 'tasks'"
            :data="element" />
        </div>
      </div>
    </div>

    <q-toolbar
      v-if="open"
      :class="'bg-'+form.color"
      class="fixed-bottom row"
      style="padding-right: 60px">

      <div class="full-width" style="padding-left: 5px; padding-right: 5px;">
        <s-select v-if="field.type == 'select'" :settings="field" :form="form" />
        <s-input v-else-if="field.type == 'input'" :settings="field" :form="form" />
        <p v-else>No field type defined</p>
      </div>

      <q-btn round dense flat icon="forward" @click.native="next" />
    </q-toolbar>

    <q-fab
      :color="form.color"
      :icon="form.icon"
      class="fixed-bottom-right"
      style="margin-right: 5px; margin-bottom: 5px"
      direction="up"
      v-model="open">
      <q-fab-action
        v-for="(f, key) in forms"
        :key="key"
        :color="f.color"
        :icon="f.icon"
        @click='changeModel(key)'>
        <q-tooltip
         :content-class="'bg-'+f.color"
         anchor="center right"
         self="center left"
         :offset="[10, 0]">
          {{ f.name }}
        </q-tooltip>
      </q-fab-action>
    </q-fab>
  </div>
</template>

<script>
import { QToolbar } from 'quasar'
import SSelect from '../components/SSelect.vue'
import SInput from '../components/SInput.vue'
import SCustomer from '../components/SCustomer'
import SCall from '../components/SCall'
import STask from '../components/STask'

export default {
  name: 'Dashboard',
  data () {
    return {
      open: false,
      form: {},
      field: {},
      data: {},
      activeField: 0,
      forms: {
        customers: {
          name: 'Customer',
          icon: 'group',
          color: 'pink',
          store: 'customers',
          fields: [
            {
              type: 'input',
              key: 'name',
              label: 'Customer name'
            }
          ]
        },
        calls: {
          name: 'Call',
          icon: 'phone_forwarded',
          color: 'orange',
          store: 'calls',
          fields: [
            {
              type: 'select',
              key: 'customer',
              label: 'Customer',
              store: 'customers',
              optionLabel: 'name'
            },
            {
              type: 'input',
              key: 'title',
              label: 'Title (describe customer issue)'
            },
            {
              type: 'input',
              key: 'phone',
              label: 'Phone number'
            }
          ]
        },
        engines: {
          name: 'Engine',
          icon: 'update',
          color: 'purple',
          store: 'engines',
          fields: [
            {
              type: 'select',
              key: 'engine',
              store: 'engine'
            },
            {
              type: 'input',
              key: 'name',
              label: 'Engine name'
            }
          ]
        },
        tasks: {
          name: 'Task',
          icon: 'done',
          color: 'red',
          store: 'tasks',
          fields: [
            {
              type: 'text',
              key: 'customer',
              label: 'Customer'
            }
          ]
        }
      }
    }
  },
  computed: {
    nextBtn () {
      let prop = {}
      prop.icon = (this.activeField + 1 < this.form.field.length) ? 'forward' : 'send'
      return prop
    },
    model () {
      return this.$route.params.model !== undefined ? this.$route.params.model : 'calls'
    },
    content () {
      return this.$store.state[this.model].data
    }
  },
  mounted () {
    this.setForm()
  },
  methods: {
    changeModel (key) {
      this.$router.push({ path: '/model/' + key })
      this.open = true
      this.setForm()
    },
    setForm () {
      this.form = this.forms[this.model]
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
    SInput,
    SCustomer,
    SCall,
    STask
  }
}
</script>
