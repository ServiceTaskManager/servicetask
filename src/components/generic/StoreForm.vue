<template>
  <q-form autofocus
    class="full-width"
    @submit="onSubmit"
    @reset="onReset"
    greedy
    ref="StoreFormRef">

    <component v-for="(field, order) in formFields"
      :key="field.key"
      :is="field.component"
      v-model="formData[field.key]"
      v-bind="mergeAttrs(field.attrs, field.props)"
      hide-bottom-space
      :tabindex="order + 1000" />

    <div v-if="!noButtons" class="full-width q-pt-sm q-gutter-sm row justify-end">
      <slot name="buttons">
        <q-btn v-if="!noReset"
          label="Reset"
          type="reset"
          :color="storeMeta.color"
          flat
          class="q-ml-sm" />
        <q-btn
          label="Submit"
          type="submit"
          :color="storeMeta.color" />
      </slot>
    </div>
  </q-form>
</template>

<script>
export default {
  name: 'StoreForm',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    fields: {
      type: Array,
      default: () => {
        return undefined
      }
    },
    store: {
      type: String,
      required: true
    },
    noButtons: {
      type: Boolean,
      default: false
    },
    noReset: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      cacheData: undefined
    }
  },
  computed: {
    formData: {
      get () {
        return this.cacheData || this.data
      },
      set (newData) {
        this.cacheData = newData
      }
    },
    formFields () {
      return this.fields || this.storeFields
    },
    storeFields () {
      return this.$store.getters[this.store + '/fields']
    },
    storeMeta () {
      return this.$store.getters[this.store + '/meta']
    }
  },
  methods: {
    mergeAttrs (attrs = {}, forward = []) {
      forward.forEach(p => {
        attrs[p] = this.formData[p]
      })
      return attrs
    },
    onSubmit () {
      this.save()
      this.$emit('submit')
    },
    onReset () {
      this.formData = {}
    },
    validate () {
      return this.$refs.StoreFormRef.validate()
    },
    save () {
      this.$store.dispatch(this.store + '/set', this.formData)
    }
  },
  components: {
    UserField: () => import('../user/UserField'),
    CustomerField: () => import('../customer/CustomerField'),
    EngineField: () => import('../engine/EngineField'),
    TextField: () => import('./TextField'),
    AddressField: () => import('./AddressField'),
    ShiftsField: () => import('./ShiftsField'),
    TeamviewerField: () => import('./TeamviewerField'),
    ColorPicker: () => import('./ColorPicker'),
    SelectField: () => import('./SelectField'),
    BooleanField: () => import('./BooleanField')
  }
}
</script>
