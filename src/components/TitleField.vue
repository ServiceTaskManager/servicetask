<template>
  <q-input
    v-bind="$attrs"
    v-on="$listeners"
    :label="label"
    class="full-width"
    @input="$emit('input')">
    <template v-slot:prepend>
      <q-icon name="title" color="black" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'TitleField',
  props: {
    label: {
      type: String,
      default: 'Task'
    }
  },
  data () {
    return {
      meta: {
        icon: 'description',
        color: 'grey'
      }
    }
  }
}
</script>
