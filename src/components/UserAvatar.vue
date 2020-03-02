<template>
  <q-avatar
    v-bind="$attrs"
    :style="'background-color: ' + userData.color"
    :color="userData.color"
    class="text-white text-bold">
    {{ userData.name | initial }}
  </q-avatar>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          color: 'grey',
          name: '?'
        }
      }
    },
    userId: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {}
  },
  computed: {
    userData () {
      return this.userId ? this.$users.data[this.userId] : this.user
    }
  },
  filters: {
    initial: (value) => value.split(' ').map(n => n[0]).join('')
  }
}
</script>
