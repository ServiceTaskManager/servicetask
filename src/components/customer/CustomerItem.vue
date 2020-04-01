<template>
  <div class="row full-width">
    <q-item-section>
      <q-item-label header class="q-pa-none">
        {{ data.name }}
      </q-item-label>
      <q-item-label caption>
        <span :class="calls.filter(c => c.open).length > 0 ? 'text-orange' : ''">
          {{ calls.filter(c => c.open).length + '/' + calls.length }} calls
        </span> •
        <span :class="tasks.filter(c => !c.done).length > 0 ? 'text-light-blue' : ''">
          {{ tasks.filter(c => !c.done).length + '/' + tasks.length }} tasks
        </span>
      </q-item-label>
    </q-item-section>
  </div>
</template>
<script>
export default {
  name: 'CustomerItem',
  props: {
    data: {
      type: Object,
      default: undefined,
      required: true
    }
  },
  computed: {
    calls () {
      return this.$store.getters['calls/filter']([['customer', '==', this.data.id]])
    },
    tasks () {
      return this.$store.getters['tasks/filter']([['customer', '==', this.data.id]])
    }
  }
}
</script>
