<template>
  <div class="row justify-end" v-if="map">
    <div class="on-left">
      <customer-field color="grey" dark standout rounded dense
      v-model="customerSearch"
      @input="value.zoomToCustomer" />
    </div>
    <q-btn icon="navigation"
      flat rounded dense
      @click="moveTo" />
  </div>
  <div v-else>
    <span class="text-caption">Loading...</span>
  </div>
</template>

<script>
export default {
  name: 'MapToolbar',
  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      customerSearch: ''
    }
  },
  computed: {
    map () {
      let map
      if (this.value.$refs) {
        if (this.value.$refs.map) {
          map = this.value.$refs.map
        }
      }
      return map
    }
  },
  methods: {
    moveTo () {
      // s
    }
  },
  components: {
    CustomerField: () => import('../components/customer/CustomerField')
  }
}
</script>
