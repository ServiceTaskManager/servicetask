<template>
  <q-chip v-bind="$attrs" v-on="$listeners" clickable @click="$router.push({ name: 'user', params: { id: userData.id }})">
    <user-avatar :user="userData" />
    <slot />
    {{ userData.name }}
  </q-chip>
</template>

<script>
import UserAvatar from './UserAvatar'

export default {
  name: 'UserChip',
  props: {
    userId: {
      type: String,
      default: undefined
    },
    user: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    userData () {
      return this.userId ? this.$users.data[this.userId] : this.$users.default
    }
  },
  components: {
    UserAvatar
  }
}
</script>
