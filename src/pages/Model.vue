<template>
  <div>
    <component :is="modelKey" />
  </div>
</template>

<script>
import Calls from '../components/Calls'
import Users from '../components/Users'
import Customers from '../components/Customers'
import Engines from '../components/Engines'
import Tasks from '../components/Tasks'

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
    Engines,
    Tasks
  }
}
</script>
