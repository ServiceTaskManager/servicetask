<template>
  <q-avatar
    v-bind="$attrs"
    :style="'background-color: ' + user.color"
    :color="user.color"
    class="text-white text-bold shadow-2">
    {{ user.display_name | initial }}
</q-avatar>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: {
    userId: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      meta: this.$store.state.users.meta
    }
  },
  computed: {
    user () {
      return this.userId ? this.$store.state.users.data[this.userId] : this.$store.state.users.default
    }
  },
  filters: {
    initial: (value) => value.split(' ').map(n => n[0]).join('')
  }
}
</script>
