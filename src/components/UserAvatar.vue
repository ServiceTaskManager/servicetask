<template>
  <q-avatar
  :size="size"
  elevated
  :color="display.color"
  class="text-white">
  {{ display.initial }}
</q-avatar>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: ['size', 'displayName', 'initial', 'color'],
  data () {
    return {
      display: {
        initial: 'XX',
        color: 'red'
      }
    }
  },
  mounted () {
    let name = this.displayName ? this.displayName : this.$store.state.user.data.display_name
    this.display.initial = name.split(' ').map(n => n[0]).join('')
    this.display.color = this.color ? this.color : this.$store.state.user.data.color ? this.$store.state.user.data.color : 'red'
  }
}
</script>
