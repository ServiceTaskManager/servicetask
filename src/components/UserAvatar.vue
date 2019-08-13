<template>
  <q-avatar
  :size="size"
  elevated
  :style="'background-color: ' + display.color"
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
    return {}
  },
  computed: {
    display () {
      let display = {
        initial: 'XX',
        color: 'red'
      }
      let name = this.displayName ? this.displayName : this.$store.state.user.data.display_name
      display.initial = name.split(' ').map(n => n[0]).join('')
      display.color = this.color ? this.color : this.$store.state.user.data.color ? this.$store.state.user.data.color : 'red'
      return display
    }
  }
}
</script>
