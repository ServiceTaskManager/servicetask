<template>
  <q-dialog
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
    :maximized="$q.platform.is.mobile"
    persistent
    ref="dialog"
    @hide="onDialogHide">
    <q-card>
      <q-toolbar :class="'bg-' + meta.color" class="text-white">
        <q-btn flat round dense icon="close" @click="hide" />
        <q-toolbar-title>
          <slot>{{ title }}</slot>
        </q-toolbar-title>
        <q-btn flat rounded dense icon="done" @click="set" />
      </q-toolbar>
      <q-card-section class="row q-pa-sm">
        <store-form
          v-model="formData"
          :fields="fields"
          :store="store"
          @submit="hide"
          :no-reset="data !== undefined"
          ref="StoreFormComponent"
          no-buttons />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'EditDialog',
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
    store: {
      type: String,
      default: undefined
    },
    data: {
      type: Object,
      default: () => {
        return undefined
      }
    },
    title: {
      type: String,
      default: 'Create / edit'
    }
  },
  data () {
    return {
      formData: this.data
    }
  },
  computed: {
    meta () {
      return this['$' + this.store].routes[0].meta
    }
  },
  methods: {
    set () {
      this.$refs.StoreFormComponent.validate().then(result => {
        if (result) {
          this.$refs.StoreFormComponent.save()
          this.$emit('ok')
          this.hide()
        }
      })
    },

    // Following methods are required for QDialog plugin
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$emit('hide')
    },
    onDialogHide () {
      this.$emit('hide')
    }
  },
  components: {
    StoreForm: () => import('./StoreForm')
  }
}
</script>
