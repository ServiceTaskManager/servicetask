<template>
  <div>
    <pre>
      {{ data }}
    </pre>
  </div>
</template>

<script>
export default {
  name: 'StPage',
  computed: {
    data () {
      return this['$' + this.$route.meta.store].data[this.$route.params.id]
    }
  },
  mounted () {
    this.$store.dispatch(this.$route.meta.store + '/selectOneOnly', this.$route.params.id)
  }
}
</script>
