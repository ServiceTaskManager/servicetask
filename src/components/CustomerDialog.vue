<template>
  <q-dialog ref="dialog" @hide="onDialogHide" v-bind="$attrs" v-on="$listeners" :maximized="$q.platform.is.mobile">
    <q-card class="q-dialog-plugin">
      <q-toolbar :class="'bg-' + $customers.meta.color" class="text-white">
        <q-btn flat round dense icon="close" @click="onCancelClick" />
        <q-toolbar-title>
          <slot>Create a customer</slot>
        </q-toolbar-title>
        <q-btn flat rounded dense icon="done" @click="onOKClick" />
      </q-toolbar>
      <q-card-section>
        <customer-form v-model="customer" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import CustomerForm from './CustomerForm'

export default {
  name: 'CustomerDialog',
  props: {
    value: {
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
    this.customer = this.value
  },
  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      this.$emit('hide')
    },
    onOKClick () {
      this.$emit('ok', this.customer)
      this.hide()
    },

    onCancelClick () {
      this.hide()
    }
  },
  components: {
    CustomerForm
  }
}
</script>
