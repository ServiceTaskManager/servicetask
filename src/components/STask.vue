<template>
  <q-card :key="data.id">
    <q-card-section>
      <div class="text-h6">{{ data.title }}</div>
      <div class="text-subtitle2">{{ data.customer.name }}</div>
    </q-card-section>

    <q-card-section>
      Test
    </q-card-section>

    <q-separator dark />

    <q-card-actions>
      <q-btn round color="positive" icon="done" />
      <q-btn flat>See machines</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { QCard, QBtn } from 'quasar'

export default {
  name: 'SCustomer',
  props: ['data'],
  data () {
    return {}
  },
  components: {
    QCard,
    QBtn
  }
}
</script>
