<template>
  <div v-if="data" class="q-pa-sm">
    <span class="text-h5">{{ data.name }}</span>
    <span class="text-subtitle1"><br />{{ $customers.data[data.customer].name }}</span>
    <user-address :address="data.address" class="text-subtitle2" />
    <q-chip icon="email" class="full-width" dense>
      <q-btn type="a" :href="'email:' + data.email" :label="data.email" flat dense class="q-pa-none" no-caps />
    </q-chip>
    <q-chip icon="phone" class="full-width" dense>
      <q-btn type="a" :href="'tel:' + data.phone" :label="data.phone" flat dense class="q-pa-none" />
    </q-chip>
  </div>
</template>

<script>
export default {
  name: 'UserPage',
  computed: {
    data () {
      return this.$route.meta.store ? this['$' + this.$route.meta.store].data[this.$route.params.id] : this.data
    }
  },
  mounted () {
    if (this.$route.params.id) this.$store.dispatch(this.$route.meta.store + '/selectOneOnly', this.$route.params.id)
  },
  components: {
    UserAddress: () => import('../components/generic/Address')
  }
}
</script>
