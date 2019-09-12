<template>
  <q-chip v-bind="$attrs" v-on="$listeners" clickable @click="$router.push({ name: 'usersView', params: { id: userData.id }})">
    <user-avatar :user="userData" />
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
      default: undefined
    }
  },
  data () {
    return {}
  },
  computed: {
    userData () {
      if (this.user) return this.user
      else return this.userId ? this.$users.data[this.userId] : this.$store.state.users.default
    }
  },
  components: {
    UserAvatar
  }
}
</script>
