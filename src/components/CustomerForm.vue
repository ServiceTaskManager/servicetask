<template>
  <q-list>
    <q-item v-if="'name' in fields">
      <name-field v-model="customer.name" v-bind="fields.name" />
    </q-item>
    <q-item v-if="'addr1' in fields">
      <name-field v-model="customer.addr1" v-bind="fields.addr1" />
    </q-item>
    <q-item v-if="'addr2' in fields">
      <name-field v-model="customer.addr2" v-bind="fields.addr2" />
    </q-item>
    <q-item v-if="'postal_code' in fields" class="row">
      <div class="col-3">
        <name-field v-model="customer.postal_code" v-bind="fields.postal_code" />
      </div>
      <div class="col-9">
        <name-field v-model="customer.city" v-bind="fields.city" />
      </div>
    </q-item>
    <q-item v-if="'phone' in fields">
      <phone-field v-model="customer.phone" v-bind="fields.phone" />
    </q-item>
    <q-item v-if="'name' in fields">
      <name-field v-model="customer.email" v-bind="fields.email" />
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
  name: 'CustomerForm',
  props: {
    customerId: {
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
          name: {},
          addr1: {},
          addr2: {},
          postal_code: {},
          city: {},
          country: {},
          phone: {},
          email: {}
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
      customer: {}
    }
  },
  mounted () {
    this.customer = Object.assign({},
      this.$store.state.customers.default,
      this.$store.state.customers.presets[this.preset],
      this.overwrite,
      this.$store.state.customers.data[this.customerId])
  },
  methods: {
    set () {
      this.$store.dispatch('customers/set', this.customer)
      this.$emit('submit')
    }
  },
  components: {
    NameField: () => import('./NameField'),
    PhoneField: () => import('./PhoneField')
  }
}
</script>
