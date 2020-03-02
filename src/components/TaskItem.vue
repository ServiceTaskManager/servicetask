<template>
  <div>
    <q-separator />
    <q-item :to="{ name: 'task', params: { id: task.id } }"
      class="q-pa-xs"
      :class="selected ? 'bg-grey-4' : ''">
      <q-item-section avatar @click.prevent="noSelect ? null : selected = !selected">
        <q-avatar v-if="selected" icon="done" :color="$tasks.meta.color" />
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
import UserAvatar from './UserAvatar'
import EngineChip from './EngineChip'
import CustomerChip from './CustomerChip'

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
  data () {
    return {}
  },
  computed: {
    selected: {
      get () {
        return this.$ui.selected.includes(this.task.id)
      },
      set (val) {
        if (val) this.$ui.selected.push(this.task.id)
        else this.$ui.selected = this.$ui.selected.filter(t => t !== this.task.id)
      }
    }
  },
  components: {
    UserAvatar,
    EngineChip,
    CustomerChip
  }
}
</script>
