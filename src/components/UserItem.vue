<template>
  <q-item class="q-pa-xs" :to="{ name: 'user', params: { id: user.id } }">
    <q-item-section avatar>
      <user-avatar :user="user" />
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-bold">
        {{ user.name }}
      </q-item-label>
      <q-item-label caption lines="1">
        <address-chip dense :address="{
          addr1: user.addr1,
          addr2: user.addr2,
          postal_code: user.postal_code,
          city: user.city,
          country: user.country}"
          :show="['city', 'country']" />
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import AddressChip from './AddressChip'
import UserAvatar from './UserAvatar'

export default {
  name: 'UserItem',
  props: {
    user: {
      type: Object,
      default: () => {
        return this.$users.default
      }
    }
  },
  data () {
    return {}
  },
  components: {
    AddressChip,
    UserAvatar
  }
}
</script>
