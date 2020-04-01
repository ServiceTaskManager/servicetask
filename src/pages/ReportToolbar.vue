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
  </div>
</template>

<script>
export default {
  name: 'data.ReportToolbar',
  props: {
    value: {
      type: Object,
      default: undefined,
      required: true
    }
  }
}
</script>
