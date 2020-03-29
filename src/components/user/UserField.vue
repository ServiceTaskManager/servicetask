<template>
  <q-select use-input clearable
    v-bind="$attrs"
    v-on="$attrs"
    :value="value"
    @input="onInput"
    :color="$models.user.meta.color"
    class="full-width"
    :options="usersFiltered"
    :display-value="displayValue"
    option-label="name"
    option-value="id"
    @filter="filter">

    <template v-slot:prepend>
      <q-icon :name="$models.user.meta.icon" :color="$models.user.meta.color" />
    </template>

    <template v-slot:append v-if="value === '' && !noSelf">
      <q-btn flat round icon="person_add" :color="$models.user.meta.color" @click="$emit('input', $user.data.id)" />
    </template>

    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { QSelect } from 'quasar'

export default {
  name: 'UserField',
  props: {
    value: {
      type: String,
      default: ''
    },
    customer: {
      type: String,
      default: undefined
    },
    noSelf: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      usersFiltered: this.$store.getters['users/filter']([['customer', '==', this.customer]])
    }
  },
  computed: {
    displayValue () {
      return this.value === '' ? '' : this.$users.data[this.value].name
    }
  },
  methods: {
    filter (val, done) {
      this.usersFiltered = this.$store.getters['users/filter']([
        ['name', 'contains', val],
        ['customer', '==', this.customer]
      ])
      done()
    },
    onInput (val) {
      const id = val ? val.id : ''
      this.$emit('input', id)
    }
  },
  components: {
    QSelect
  }
}
</script>
