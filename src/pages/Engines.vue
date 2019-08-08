<template>
  <div class="container">
    <div
      class="row q-col-gutter-sm">
      <div
        v-for="(engine, key) in engines"
        :key="key"
        class="col-12 col-sm-4">
        <card-engine :engine="engine" />
      </div>
    </div>

    <q-btn
      fab
      :color="model.color"
      icon="add"
      class="fixed-bottom-right"
      style="margin-right: 10px; margin-bottom: 10px"
      @click="createEngine" />
  </div>
</template>

<script>
import CardEngine from '../components/CardEngine'

export default {
  name: 'Engines',
  data () {
    return {
      engines: {}
    }
  },
  mounted () {
    this.engines = this.$store.state.engines.data
  },
  computed: {
    model () {
      return this.$store.state.engines
    }
  },
  methods: {
    createEngine () {
      this.$store.dispatch('engines/set', { create: true, ugks: [] })
    }
  },
  components: {
    CardEngine
  }
}
</script>
