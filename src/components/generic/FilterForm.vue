<template>
  <q-expansion-item v-if="formFields.length > 0"
    v-bind="$attrs"
    v-on="$attrs"
    class="bg-white q-pa-none"
    header-class="q-px-sm q-py-none">
    <template v-slot:header>
      <q-item-section avatar>
        <q-icon name="filter_list" />
      </q-item-section>
      <q-item-section>
        <slot name="header">
          <st-form
            :model="model"
            :fields="formFields.slice(0, 1)"
            v-model="storeFormData"
            @input="updateFilters()"
            no-buttons no-submit no-validation dense />
        </slot>
      </q-item-section>
      <q-item-section v-if="value.length > 0" side>
        <q-btn flat round icon="clear" color="grey" @click.prevent="storeFormData = {}" />
      </q-item-section>
    </template>
    <q-list class="q-pa-sm">
      <st-form
        :model="model"
        :fields="formFields.slice(1)"
        v-model="storeFormData"
        @input="updateFilters()"
        no-buttons no-submit no-validation dense />
    </q-list>
  </q-expansion-item>
</template>

<script>
export default {
  name: 'FilterForm',
  props: {
    value: {
      type: Array,
      default: undefined
    },
    model: {
      type: String,
      default: undefined,
      required: true
    },
    fields: {
      type: Array,
      default: undefined
    }
  },
  data () {
    return {
      storeFormData: {}
    }
  },
  computed: {
    formFields () {
      let fields = []
      if (this.fields) fields = this.fields
      else fields = this.$models[this.model].fields
      return fields ? fields.filter(f => f.search) : []
    }
  },
  methods: {
    updateFilters () {
      let filters = []
      this.formFields.forEach(f => {
        if (this.storeFormData[f.key] !== '') {
          filters.push([
            f.key,
            f.search,
            this.storeFormData[f.key]
          ])
        }
      })
      this.$emit('input', filters)
    }
  },
  watch: {
    model: function (val) {
      this.$emit('input', [])
    }
  },
  components: {
    StForm: () => import('./StForm')
  }
}
</script>
