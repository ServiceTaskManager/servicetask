<template>
  <q-card :key="data.id">
    <q-card-section>
      <div class="text-h6">{{ data.title }}</div>
      <q-chip dense>
        <q-avatar icon="people" color="red" text-color="white" />
        {{ data.customer.name }}
      </q-chip>
    </q-card-section>

    <q-card-section>
      Test
    </q-card-section>

    <q-separator dark />

    <q-card-actions>
      <q-btn rounded dense color="primary" @click="openURL(data.phone)" icon="phone">{{ data.phone }}</q-btn>
      <q-btn rounded dense color="secondary" icon="forward">WO</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { QCard, QBtn, QAvatar, QChip } from 'quasar'

export default {
  name: 'SCustomer',
  props: ['data'],
  data () {
    return {}
  },
  components: {
    QCard,
    QBtn,
    QChip,
    QAvatar
  }
}
</script>
