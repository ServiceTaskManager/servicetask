<template>
  <div>
    <q-separator />
    <q-item
      :to="{ name: 'call', params: { id: call.id } }"
      class="q-pa-xs"
      :class="call.selected ? 'bg-grey-4' : ''">
      <q-item-section avatar @click.prevent="noSelect ? null : toggleSelected()">
        <q-avatar v-if="call.selected" icon="done" :color="$calls.meta.color" />
        <user-avatar v-else-if="call.assign_to" :user-id="call.assign_to" />
        <user-avatar v-else />
      </q-item-section>
      <q-item-section top>
        <q-item-label overline :class="'text-' + $calls.meta.color" v-if="call.status === 'open'">
          Open {{ call.created_at.toISOString() | moment('from') }}
        </q-item-label>
        <q-item-label overline v-if="call.status === 'close' && call.closed_at">
          Closed {{ call.closed_at.toISOString() | moment('from') }}
        </q-item-label>
        <q-item-label class="text-bold">{{ call.title }}</q-item-label>
        <q-item-label caption lines="1" class="row q-col-gutter-sm" style="margin-top: -10px">
          <div class="col-6" v-if="call.customer && !hideCustomer">
            <customer-chip :customer-id="call.customer" dense class="full-width" />
          </div>
          <div class="col-6" v-if="call.engine && !hideEngine">
            <engine-chip :engine-id="call.engine" dense class="full-width" />
          </div>
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: 'CallItem',
  props: {
    call: {
      type: Object,
      default: () => {
        return {}
      }
    },
    hideCustomer: {
      type: Boolean,
      default: false
    },
    hideEngine: {
      type: Boolean,
      default: false
    },
    noSelect: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleSelected () {
      this.$store.dispatch('calls/toggleSelected', this.call.id)
    }
  },
  components: {
    UserAvatar: () => import('../user/UserAvatar'),
    EngineChip: () => import('../engine/EngineChip'),
    CustomerChip: () => import('../customer/CustomerChip')
  }
}
</script>
