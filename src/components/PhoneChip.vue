<template>
  <q-chip v-bind="$attrs" v-on="$listeners"
    @click="call">
    <q-avatar :color="meta.color" :icon="meta.icon" />
    {{ phone }}
    <q-badge v-if="person"
      :label="person"
      color="white"
      class="q-ml-sm text-black" />
  </q-chip>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'PhoneChip',
  props: {
    phone: {
      type: String,
      default: undefined
    },
    person: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      meta: this.$store.state.users.meta
    }
  },
  methods: {
    call () {
      openURL('tel:' + this.phone)
    }
  }
}
</script>
