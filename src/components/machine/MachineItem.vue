<template>
  <div class="row full-width">
    <q-item-section>
      <q-item-label header class="q-pa-none row items-center justify-between">
        <div><span class="text-weight-bold">{{ data.title }}</span> {{ data.type }}</div>
      </q-item-label>
      <q-item-label caption class="q-mt-none" line="1">
        <q-chip v-if="customer"
          color="white"
          class="q-my-none overflow-hidden"
          dense>
          <q-avatar
            :icon="$models.customer.meta.icon"
            :text-color="$models.customer.meta.color" />
          {{ customer.name }}
        </q-chip>
      </q-item-label>
    </q-item-section>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'MachineItem',
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
    totalTime () {
      let time = 0
      if (this.data.time_shifts) {
        time = this.data.time_shifts.reduce((acc, s) => {
          const add = moment(s.end).diff(s.start, 'hours', true)
          return acc + add
        }, 0)
      }
      return Math.round(time * 10) / 10
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
