<template>
  <div class="row full-width">
    <q-item-section>
      <q-item-label header class="q-pa-none">
        {{ customer.name }}
      </q-item-label>
      <q-item-label caption>
        {{ technician.name }} • {{ data.date | moment('YYYY-MM-DD HH:mm') }}
      </q-item-label>
    </q-item-section>
  </div>
</template>
<script>
export default {
  name: 'UserItem',
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
    technician () {
      return this.$users.data[this.data.technician]
    }
  }
}
</script>
