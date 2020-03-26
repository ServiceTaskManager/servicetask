<template>
  <q-form autofocus
    class="full-width"
    @submit="!noSubmit ? onSubmit() : null"
    @reset="onReset"
    greedy
    ref="StoreFormRef">

    <component v-for="field in formFields"
      :key="field.key"
      :is="field.component"
      :value="value[field.key]"
      @input="$emit('input', { ...value, [field.key]: $event })"
      v-bind="mergeAttrs(field.attrs, field.forward)"
      hide-bottom-space />

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
    value: {
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
    },
    noValidation: {
      type: Boolean,
      default: false
    },
    noSubmit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
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
      if (this.noValidation) delete attrs.rules
      forward.forEach(p => {
        attrs[p] = this.value[p]
      })
      return attrs
    },
    onSubmit () {
      this.save()
      this.$emit('submit')
    },
    onReset () {
      this.emit('input', {})
    },
    validate () {
      return this.$refs.StoreFormRef.validate()
    },
    save () {
      this.$store.dispatch(this.store + '/set', this.value)
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
