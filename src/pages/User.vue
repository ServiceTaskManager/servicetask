<template>
  <div class="row">
    <span class="text-h5">{{ user.name }}</span>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      user: this.$users.default
    }
  },
  mounted () {
    this.user = this.$users.data[this.$route.params.id]
    this.$ui.header.title = this.user.name
  }
}
</script>
