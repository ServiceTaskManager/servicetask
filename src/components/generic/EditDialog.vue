<template>
  <q-dialog v-bind="$attrs" v-on="$listeners" :value="value" :maximized="$q.platform.is.mobile" persistent>
    <q-card>
      <q-toolbar :class="'bg-' + meta.color" class="text-white">
        <q-btn flat round dense icon="close" v-close-popup />
        <q-toolbar-title>
          <slot>Create</slot>
        </q-toolbar-title>
        <q-btn flat rounded dense icon="done" @click="set" v-close-popup />
      </q-toolbar>
      <q-card-section class="row q-pa-sm">
        <store-form v-model="formData" :fields="fields" :store="store" />
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
        return {}
      }
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
      console.log(this.formData)
      this.$store.dispatch(this.store + '/set', this.formData)
    }
  },
  watch: {
    data (val) {
      if (val === undefined) this.formData = {}
      else this.formData = val
    }
  },
  components: {
    StoreForm: () => import('./StoreForm')
  }
}
</script>
