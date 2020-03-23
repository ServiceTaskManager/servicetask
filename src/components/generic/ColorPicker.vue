<template>
  <q-input
  :value="color"
  class="full-width"
  :label="label">
  <template v-slot:prepend>
    <q-avatar :style="'background-color:' + color">
      <q-icon name="colorize" color="white"  />
    </q-avatar>
  </template>
  <q-popup-proxy ref="colorPicker">
    <q-card>
      <q-color
        v-model="color"
        no-header
        no-footer />
      <q-card-actions>
        <q-btn label="Pick color" @click="$refs.colorPicker.hide()" />
      </q-card-actions>
    </q-card>
  </q-popup-proxy>
</q-input>
</template>

<script>
export default {
  name: 'ColorPicker',
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Color picker'
    }
  },
  data () {
    return {
      color: this.value
    }
  },
  watch: {
    color: function (val) {
      this.$emit('input', val)
    }
  }
}
</script>
