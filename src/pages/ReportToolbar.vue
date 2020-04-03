<template>
  <div class="row">
    <q-btn color="white"
      dense round flat
      icon="save"
      class="col"
      @click="value.save()" />
    <q-btn :color="$reports.meta.color"
      dense round flat
      icon="print"
      class="col"
      @click="value.prepareForPrint()" />
    <q-btn color="white"
      dense round flat
      icon="edit"
      class="col"
      @click="value.editDialog = true" />
  </div>
</template>

<script>
export default {
  name: 'ReportToolbar',
  props: {
    value: {
      type: Object,
      default: undefined,
      required: true
    }
  }
}
</script>
