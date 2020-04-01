<template>
  <div class="row full-width">
    <q-item-section>
      <q-item-label header class="q-pa-none">
        {{ data.name }}
      </q-item-label>
      <q-item-label caption>
        {{ customer.name }}
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn round dense flat icon="phone" color="grey"
        type="a"
        :href="'tel:' + customer.phone"
        @click="prevent($event)" />
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
