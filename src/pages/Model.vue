<template>
  <div>
    <component :is="modelKey" />
    <q-separator color="white" class="q-mt-sm" />
    <p style="height: 50px; margin-right: 70px;" class="text-white text-weight-bolder">
      Didn't find what you're looking for? <br /> Check the filter!
    </p>
  </div>
</template>

<script>
import Calls from '../components/Calls'
import Users from '../components/Users'
import Customers from '../components/Customers'
import Engines from '../components/Engines'

export default {
  name: 'Model',
  data () {
    return {}
  },
  computed: {
    modelKey () {
      return this.$route.params.model
    }
  },
  components: {
    Calls,
    Users,
    Customers,
    Engines
  }
}
</script>
