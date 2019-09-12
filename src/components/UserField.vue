<template>
  <q-select use-input
    v-bind="$attrs"
    v-on="$attrs"
    :value="value"
    @input="$emit('input', $event.id)"
    :color="$users.meta.color"
    class="full-width"
    :options="usersFiltered"
    :display-value="displayValue"
    option-label="name"
    option-value="id"
    @filter="filter"
    :label="label">

    <template v-slot:prepend>
      <q-icon :name="$users.meta.icon" :color="$users.meta.color" />
    </template>

    <template v-slot:append v-if="value !== ''">
      <q-btn flat round icon="close" color="grey" @click="$emit('input', '')" />
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
    label: {
      type: String,
      default: 'User'
    }
  },
  data () {
    return {
      usersFiltered: this.$store.getters['users/filter']()
    }
  },
  computed: {
    displayValue () {
      return this.value === '' ? '' : this.$users.data[this.value].name
    }
  },
  methods: {
    filter (val, done) {
      this.usersFiltered = this.$store.getters['users/filter']({ name: ['contains', val] })
      done()
      /* done(() => {
        if (val !== '') {
          this.usersFiltered = this.usersArray.filter(c => c.name.toLowerCase().indexOf(val.toLowerCase()) > -1)
        } else {
          this.usersFiltered = this.usersArray
        }
      }) */
    }
  },
  components: {
    QSelect
  }
}
</script>
