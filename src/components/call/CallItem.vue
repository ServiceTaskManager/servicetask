<template>
  <div class="row full-width">
    <q-item-section>
      <q-item-label header class="q-pa-none row items-center justify-between overflow-hidden">
        <span class="text-weight-bold">{{ data.title }}</span>
      </q-item-label>
      <q-item-label caption class="row q-mt-none" line="1">
        <q-chip v-if="customer"
          color="white"
          class="q-my-none col overflow-hidden"
          dense>
          <q-avatar
            :icon="$models.customer.meta.icon"
            :text-color="$models.customer.meta.color" />
          {{ customer.name }}
        </q-chip>
        <q-chip v-if="user"
          color="white"
          class="q-my-none col overflow-hidden"
          dense>
          <q-avatar
            :icon="$models.user.meta.icon"
            :text-color="$models.user.meta.color" />
          {{ user.name }}
        </q-chip>
      </q-item-label>
    </q-item-section>
  </div>
</template>

<script>
export default {
  name: 'CallItem',
  props: {
    data: {
      type: Object,
      default: undefined
    }
  },
  computed: {
    customer () {
      return this.$customers.data[this.data.customer]
    },
    user () {
      return this.$users.data[this.data.technician]
    }
  },
  methods: {
    prevent (e) {
      e.stopPropagation()
      console.log('item')
    }
  }
}
</script>
