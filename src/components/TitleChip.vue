<template>
  <q-chip v-bind="$attrs" v-on="$listeners" class="full-width text-bold" style="overflow: hidden;">
    <q-avatar color="grey" icon="title" />
    {{ title }}
    <q-btn flat round
      size="sm"
      icon="more_horiz"
      class="bg-grey-4 float-right absolute-right"
      @click="displayMore = true" />
    <q-dialog v-model="displayMore">
      <q-card>
        <q-card-section>
          {{ title }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-chip>
</template>

<script>
export default {
  name: 'TitleChip',
  props: {
    title: {
      type: String,
      default: 'Title'
    }
  },
  data () {
    return {
      displayMore: false
    }
  }
}
</script>
