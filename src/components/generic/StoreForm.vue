<template>
  <q-form class="full-width">
    <component v-for="field in formFields"
      :key="field.key"
      :is="field.component"
      v-model="formData[field.key]"
      v-bind="mergeAttributes(field.attrs, field.props)" />
  </q-form>
</template>

<script>
export default {
  name: 'StoreForm',
  props: {
    value: {
      type: Object,
      default: () => {
        return undefined
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
      default: undefined
    }
  },
  data () {
    return {
      formData: undefined,
      formFields: undefined
    }
  },
  mounted () {
    this.value === undefined ? this.formData = Object.assign({}, this['$' + this.store].default) : this.formData = this.value
    this.fields === undefined ? this.formFields = this['$' + this.store].fields : this.formFields = this.fields
  },
  methods: {
    mergeAttributes (attrs = {}, props = []) {
      props.forEach(p => {
        attrs[p] = this.formData[p]
      })
      return attrs
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
    SelectField: () => import('./SelectField')
  }
}
</script>
