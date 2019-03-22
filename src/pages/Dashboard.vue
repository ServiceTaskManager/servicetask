<template>
  <div class="container">
    <div
      class="row q-col-gutter-sm">
      <div
        v-for="(m, key) in models"
        :key="key"
        class="col-4">
        <q-btn
          :to="key"
          :icon="m.icon"
          :color="m.color"
          :label="m.name"
          class="full-width"
          push />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  computed: {
    models () {
      return this.$store.state.model.models
    }
  }
}
</script>
