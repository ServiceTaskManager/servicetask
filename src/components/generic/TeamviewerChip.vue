<template>
  <q-btn flat class="full-width q-pa-none" no-caps no-wrap
  type="a"
  target="_blank"
  :href="'https://start.teamviewer.com/device/' + teamviewer.id + '/authorization/password/mode/control'">
    <q-chip v-bind="$attrs" v-on="$listeners" class="full-width">
      <q-avatar icon="screen_share" color="blue-6" />
      <slot />
      {{ teamviewer.id }} / {{ teamviewer.pwd }}
    </q-chip>
  </q-btn>
</template>

<script>
export default {
  name: 'UserChip',
  props: {
    teamviewer: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {}
  }
}
</script>
