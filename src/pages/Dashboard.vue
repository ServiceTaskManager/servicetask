<template>
  <div>

    <div class="container" v-if="model == undefined">
      <div
        class="row q-col-gutter-sm">
        <div
          v-for="(m, key) in models"
          :key="key"
          class="col-4">
          <q-btn
            :to="'/model/'+key"
            :icon="m.icon"
            :color="m.color"
            :label="m.name"
            class="full-width"
            push />
        </div>
      </div>
    </div>

    <div class="container" v-else>
      <div
        class="row q-col-gutter-sm">
        <div
          v-for="(element, key) in content"
          :key="key"
          class="col-12 col-sm-4">
          <s-customer
            v-if="modelKey == 'customers'"
            :data="element" />
          <s-call
            v-else-if="modelKey == 'calls'"
            :data="element" />
          <s-task
            v-else-if="modelKey == 'tasks'"
            :data="element" />
        </div>
      </div>
      <q-separator color="white" class="q-mt-sm" />
      <p style="height: 50px; margin-right: 70px;" class="text-white text-weight-bolder">
        Didn't find what you're looking for? <br /> Check the filter!
      </p>
    </div>

    <q-btn
      fab
      v-if="model != undefined"
      :color="model.color"
      icon="add"
      class="fixed-bottom-right"
      style="margin-right: 10px; margin-bottom: 10px"
      @click="addContent()" />
  </div>
</template>

<script>
import SCustomer from '../components/SCustomer'
import SCall from '../components/SCall'
import STask from '../components/STask'

export default {
  name: 'Dashboard',
  data () {
    return {}
  },
  computed: {
    modelKey () {
      return this.$route.params.model
    },
    models () {
      return this.$store.state.model.models
    },
    model () {
      return this.models[this.modelKey]
    },
    content () {
      return this.$store.state[this.modelKey].data
    }
  },
  methods: {
    addContent () {
      this.$store.dispatch(this.modelKey + '/set', this.model.default)
    }
  },
  components: {
    SCustomer,
    SCall,
    STask
  }
}
</script>
