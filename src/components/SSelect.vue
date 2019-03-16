<template>
  <q-select
    dense
    standout
    use-input
    use-chips
    v-model="value"
    v-on:input="computeValue($event)"
    :label="settings.label"
    :options="options"
    :option-label="optionLabel"
    option-value="id"
    :multiple="settings.multiple"
    @new-value="create"
    @filter="filter"
    >

    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>

    <template v-slot:selected-item="scope">
      <q-chip
        removable
        dense
        @remove="scope.removeAtIndex(scope.index)"
        :tabindex="scope.tabindex"
        color="white"
        text-color="secondary"
        class="q-ma-none">
        {{ scope.opt[optionLabel] }}
      </q-chip>
    </template>
  </q-select>
</template>

<script>
import { QSelect, QItem, QChip } from 'quasar'

export default {
  name: 'SSelect',
  props: ['settings', 'form'],
  data () {
    return {
      value: this.settings.value,
      options: [],
      optionLabel: ''
    }
  },
  mounted () {
    this.options = (this.settings.store !== undefined) ? this.getOptions() : this.settings.options
    this.optionLabel = (this.settings.optionLabel !== undefined) ? this.settings.optionLabel : 0
  },
  methods: {
    getOptions () {
      let options = Object.values(this.$store.state[this.settings.store].data)
      return options
    },
    filter (val, done) {
      console.log('Filtering with ' + val)
      done(() => {
        if (val !== '') {
          let needle = val.toLowerCase()
          this.options = this.getOptions().filter((v) => {
            return (v.name !== undefined) ? (v.name.toLowerCase().indexOf(needle) > -1) : false
          })
        } else {
          this.options = this.getOptions()
        }
      })
    },
    create (val, done) {
      if (val.length > 0 && this.settings.create) {
        done(val)
      }
    },
    computeValue (value) {
      this.settings.value = this.$db.collection(this.settings.store).doc(value.id)
    }
  },
  components: {
    QSelect,
    QItem,
    QChip
  }
}
</script>
