<template>
  <engine-line :engine="engine" :show="$route.params.id" />
</template>

<script>
import EngineLine from '../components/EngineLine'

export default {
  name: 'EngineView',
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
      let preDevices = this.$store.getters['engines/filter']([{
        property: 'pre_devices',
        filter: 'includes',
        value: engine.id
      }])
      let postDevices = this.$store.getters['engines/filter']([{
        property: 'post_devices',
        filter: 'includes',
        value: engine.id
      }])
      console.log(preDevices, postDevices)
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
