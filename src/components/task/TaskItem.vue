<template>
  <div>
    <q-separator />
    <q-item :to="{ name: 'task', params: { id: task.id } }"
      class="q-pa-xs"
      :class="task.selected ? 'bg-grey-4' : ''">
      <q-item-section avatar @click.prevent="noSelect ? null : toggleSelected()">
        <q-avatar v-if="task.selected" icon="done" :color="$tasks.meta.color" />
        <user-avatar v-else-if="task.user" :user-id="task.user" />
        <user-avatar v-else />
      </q-item-section>
      <q-item-section top>
        <q-item-label overline v-if="task.schedule_from">
          <span v-if="!task.done"
            :class="task.schedule_from < new Date() ? 'text-negative' : 'text-grey'">
            To do {{ task.schedule_from.toISOString() | moment('from') }}
          </span>
          <span v-else
            class="text-positive">
            Done {{ task.done_at.toISOString() | moment('from') }}
          </span>
        </q-item-label>
        <q-item-label class="text-bold">{{ task.title }}</q-item-label>
        <q-item-label caption lines="1" class="row q-col-gutter-sm" style="margin-top: -10px">
          <div class="col-6" v-if="task.customer && !hideCustomer">
            <customer-chip :customer-id="task.customer" dense class="full-width" />
          </div>
          <div class="col-6" v-if="task.engine && !hideEngine">
            <engine-chip :engine-id="task.engine" dense class="full-width" />
          </div>
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: 'TaskItem',
  props: {
    task: {
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
      const id = this.task.id
      this.$store.dispatch('tasks/patch', { id, selected: !this.task.selected })
    }
  },
  components: {
    UserAvatar: () => import('../user/UserAvatar'),
    EngineChip: () => import('../engine/EngineChip'),
    CustomerChip: () => import('../customer/CustomerChip')
  }
}
</script>
