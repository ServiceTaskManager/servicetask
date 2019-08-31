<template>
  <div class="row full-width">
    <q-input
      :value="value.id"
      v-bind="$attrs"
      class="col"
      color="blue-6"
      label="Teamviewer ID"
      type="number"
      @input="$emit('input', { id: $event, pwd: value.pwd })">
      <template v-slot:prepend>
        <q-icon name="screen_share" color="blue-6" />
      </template>
    </q-input>
    <q-input
      :value="value.pwd"
      v-bind="$attrs"
      class="col"
      color="blue-6"
      label="Password"
      @input="$emit('input', { id: value.id, pwd: $event })">
    </q-input>
  </div>
</template>

<script>
export default {
  name: 'TeamviewerField',
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          id: '',
          pwd: ''
        }
      }
    }
  },
  data () {
    return {}
  }
}
</script>
