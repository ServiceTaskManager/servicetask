<template>
  <q-dialog v-bind="$attrs" v-on="$listeners" :value="value" :maximized="$q.platform.is.mobile">
    <q-card>
      <q-toolbar :class="'bg-' + $customers.meta.color" class="text-white">
        <q-btn flat round dense icon="close" v-close-popup />
        <q-toolbar-title>
          <slot>Create a customer</slot>
        </q-toolbar-title>
        <q-btn flat rounded dense icon="done" @click="set" v-close-popup />
      </q-toolbar>
      <q-card-section class="row q-pa-sm">
        <customer-form v-model="customer" :fields="fields" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import CustomerForm from './CustomerForm'

export default {
  name: 'CustomerEditDialog',
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
    data: {
      type: Object,
      default: () => {
        return undefined
      }
    }
  },
  data () {
    return {
      customerData: {}
    }
  },
  computed: {
    customer: {
      get () {
        return Object.assign({},
          this.$customers.default,
          this.data,
          this.customerData)
      },
      set (customer) {
        this.customerData = customer
      }
    }
  },
  methods: {
    set () {
      this.$store.dispatch('customers/set', this.customer)
    }
  },
  components: {
    CustomerForm
  }
}
</script>
