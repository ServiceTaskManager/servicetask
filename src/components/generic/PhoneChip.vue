<template>
  <q-chip v-bind="$attrs" v-on="$listeners">
    <q-avatar :color="$models.user.meta.color" :icon="$models.user.meta.icon" />
    <q-btn :href="'tel:' + phone"
      type="a"
      stretch
      no-caps
      flat rounded
      class="q-pa-none">
      <q-badge v-if="person"
        :label="person"
        color="white"
        class="q-mr-sm text-black" />
      {{ phone }}
    </q-btn>
  </q-chip>
</template>

<script>
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
    return {}
  }
}
</script>
