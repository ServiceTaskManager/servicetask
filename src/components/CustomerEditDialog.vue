<template>
  <q-dialog v-bind="$attrs" v-on="$listeners" :value="value" maximized>
    <q-card>
      <q-card-section class="bg-black text-white text-h6">
        <q-btn @click="cancel" icon="close" class="text-white" /><slot>Create a customer</slot>
      </q-card-section>
      <q-separator />
      <q-card-section class="row q-pa-sm">
        <customer-form @submit="submit" @cancel="cancel" :fields="fields" :customer="customer" :customer-id="customerId" />
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
    customer: {
      type: Object,
      default: () => {
        return undefined
      }
    },
    customerId: {
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
    CustomerForm
  }
}
</script>
