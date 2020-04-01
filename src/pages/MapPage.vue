<template>
  <maps ref="map" class="full-width" style="height: calc(100vh - 50px)" />
</template>

<script>
export default {
  name: 'MapsPage',
  data () {
    return {
      drawer: false,
      customerToDisplay: undefined
    }
  },
  mounted () {
    this.$emit('mountToolbar', {
      component: () => import ('./MapToolbar'),
      data: this
    })
  },
  methods: {
    zoomToCustomer (customerId) {
      this.$refs.map.zoomToCustomer(customerId)
    }
  },
  components: {
    Maps: () => import('../components/generic/Map')
  }
}
</script>
