<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <user-field v-model="user" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat :color="$users.meta.color" label="OK" @click="onOKClick" />
        <q-btn flat label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      user: ''
    }
  },
  mounted () {
    this.user = this.value
    console.log(this.$parent)
  },
  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      this.$emit('hide')
    },
    onOKClick () {
      this.$emit('ok', this.user)
      this.hide()
    },

    onCancelClick () {
      this.hide()
    }
  },
  components: {
    UserField: () => import('./UserField')
  }
}
</script>
