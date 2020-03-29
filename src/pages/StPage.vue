<template>
  <div>
    <pre>
      {{ doc }}
    </pre>
  </div>
</template>

<script>
export default {
  name: 'StPage',
  props: {
    data: {
      type: Object,
      default: undefined
    }
  },
  computed: {
    doc () {
      return this.$route.meta.store ? this['$' + this.$route.meta.store].data[this.$route.params.id] : this.data
    }
  },
  mounted () {
    this.$store.dispatch(this.$route.meta.store + '/selectOneOnly', this.$route.params.id)
  }
}
</script>
