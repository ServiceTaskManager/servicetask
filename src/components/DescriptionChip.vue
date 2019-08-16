<template>
  <q-chip v-bind="$attrs" v-on="$listeners" class="row full-width" style="overflow: hidden;">
    <q-avatar color="grey" icon="description" />
    {{ description }}
    <q-btn flat round
      size="sm"
      icon="more_horiz"
      class="bg-grey-4 float-right absolute-right"
      @click="displayMore = true" />
    <q-dialog v-model="displayMore">
      <q-card>
        <q-card-section>
          {{ description }}
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
  name: 'DescriptionChip',
  props: {
    description: {
      type: String,
      default: 'Description'
    }
  },
  data () {
    return {
      displayMore: false
    }
  }
}
</script>
