<template>
  <q-chip v-bind="$attrs" v-on="$listeners" clickable @click="$router.push({ name: 'user', params: { id: user.id }})">
    <user-avatar :user="user" />
    <slot />
    {{ userData.name }}
  </q-chip>
</template>

<script>
export default {
  name: 'UserChip',
  props: {
    user: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
    UserAvatar: () => import('./UserAvatar')
  }
}
</script>
