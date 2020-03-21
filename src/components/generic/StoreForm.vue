<template>
  <q-form class="full-width">
    <component v-for="field in formFields"
      :key="field.key"
      :is="field.component"
      v-model="formData[field.key]"
      v-bind="field.attributes" />
  </q-form>
</template>

<script>
export default {
  name: 'GenericForm',
  props: {
    value: {
      type: Object,
      default: () => {
        return undefined
      }
    },
    fields: {
      type: Object,
      default: () => undefined
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
  watch: {
    formData: function (val) {
      this.$emit('input', val)
    }
  },
  components: {
    UserField: () => import('../user/UserField'),
    CustomerField: () => import('../customer/CustomerField'),
    EngineField: () => import('../engine/EngineField'),
    TextField: () => import('./TextField'),
    AddressField: () => import('./AddressField'),
    TimeShiftField: () => import('./TimeShiftField'),
    TeamviewerField: () => import('./TeamviewerField')
  }
}
</script>
