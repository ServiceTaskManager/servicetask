<template>
  <div>
    <user-avatar :user="$user.data" dense />
  </div>
</template>

<script>
import UserAvatar from './UserAvatar'

export default {
  name: 'DashboardToolbar',
  data () {
    return {}
  },
  components: {
    UserAvatar
  }
}
</script>
