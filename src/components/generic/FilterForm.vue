<template>
  <q-expansion-item
    v-bind="$attrs"
    v-on="$attrs"
    class="bg-white q-pa-sm" v-if="fields.length > 0">
    <template v-slot:header>
      <q-item-section avatar>
        <q-icon name="filter_list" />
      </q-item-section>
      <q-item-section>
        <slot name="header">
          <st-form
            :model="model"
            :fields="fields.slice(0, 1)"
            v-model="storeFormData"
            @input="updateFilters()"
            no-buttons no-submit no-validation />
        </slot>
      </q-item-section>
      <q-item-section v-if="value.length > 0" side>
        <q-btn flat round icon="clear" color="grey" @click.prevent="storeFormData = {}" />
      </q-item-section>
    </template>
    <q-list>
      <st-form
        :model="model"
        :fields="fields.slice(1)"
        v-model="storeFormData"
        @input="updateFilters()"
        no-buttons no-submit no-validation />
    </q-list>
  </q-expansion-item>
</template>

<script>
export default {
  name: 'FilterForm',
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    model: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      storeFormData: {}
    }
  },
  computed: {
    fields () {
      return (this.get('fields') || []).filter(f => f.search)
    }
  },
  methods: {
    get (getter) {
      return this.$store.getters[this.store + '/' + getter]
    },
    updateFilters () {
      let filters = []
      this.fields.forEach(f => {
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
