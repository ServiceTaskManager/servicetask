<template>
  <q-item class="q-pa-xs" :to="{ name: 'groupsView', params: { id: group.id } }">
    <q-item-section avatar>
      <q-avatar :color="meta.color" :icon="meta.icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-bold">
        {{ group.name }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'GroupItem',
  props: {
    group: {
      type: Object,
      default: () => {
        return this.$groups.default
      }
    }
  },
  data () {
    return {
      meta: this.$groups.meta
    }
  }
}
</script>
