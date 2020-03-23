<template>
  <div>
    <q-separator />
    <q-item :to="noLink ? null : { name: 'customer', params: { id: customer.id } }"
      class="q-pa-xs"
      :class="customer.selected ? 'bg-grey-4' : ''">
      <q-item-section avatar>
        <q-btn flat round @click.prevent="noSelect ? null : toggleSelected()">
          <slot name="item-left">
            <q-avatar v-if="customer.selected" icon="done" :color="$customers.meta.color" />
            <user-avatar v-else-if="customer.technician" :user-id="customer.technician" />
            <user-avatar v-else />
          </slot>
        </q-btn>
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
      <q-item-section side>
        <slot name="item-right"></slot>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
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
    },
    noLink: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleSelected () {
      this.$store.dispatch('customers/toggleSelected', this.customer.id)
    }
  },
  components: {
    AddressChip: () => import('../generic/AddressChip'),
    UserAvatar: () => import('../user/UserAvatar')
  }
}
</script>
