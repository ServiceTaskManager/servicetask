<template>
  <engine-line :engine="engine" :show="$route.params.id" />
</template>

<script>
import EngineLine from '../components/EngineLine'

export default {
  name: 'Engine',
  data () {
    return {
      engine: {}
    }
  },
  mounted () {
    let engine = this.$store.state.engines.data[this.$route.params.id]
    if (engine.main) {
      this.engine = engine
    } else {
      let preDevices = this.$store.getters['engines/filter']([['pre_devices', 'includes', engine.id]])
      let postDevices = this.$store.getters['engines/filter']([['post_devices', 'includes', engine.id]])
      if (preDevices.length === 1) this.engine = preDevices[0]
      else if (postDevices.length === 1) this.engine = postDevices[0]
      else this.engine = engine
    }
  },
  components: {
    EngineLine
  }
}
</script>
