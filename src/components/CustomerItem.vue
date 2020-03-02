<template>
  <div>
    <q-separator />
    <q-item :to="{ name: 'customer', params: { id: customer.id } }"
      class="q-pa-xs"
      :class="customer.selected ? 'bg-grey-4' : ''">
      <q-item-section avatar @click.prevent="toggleSelect">
        <q-avatar v-if="customer.selected" icon="done" :color="$customers.meta.color" />
        <user-avatar v-else-if="customer.technician" :user-id="customer.technician" />
        <user-avatar v-else />
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-bold">
          {{ customer.name }}
        </q-item-label>
        <q-item-label caption lines="1">
          <address-chip dense :address="customer.address"
            :show="['city', 'country']" />
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import AddressChip from './AddressChip'
import UserAvatar from './UserAvatar'

export default {
  name: 'CustomerItem',
  props: {
    customer: {
      type: Object,
      default: () => {
        return {}
      }
    },
    noSelect: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  methods: {
    toggleSelect () {
      if (!this.noSelect) this.$store.commit('customers/toggleSelected', this.customer.id)
    }
  },
  components: {
    AddressChip,
    UserAvatar
  }
}
</script>
