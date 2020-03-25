<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <vue-signature-pad ref="signaturePad" style="height: 300px;" />
      <q-card-actions align="right">
        <q-input label="Person name" v-model="signatureData.name" v-if="!noName" />
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import VueSignaturePad from 'vue-signature-pad'

export default {
  props: {
    noName: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      signatureData: {
        signature: '',
        name: '',
        date: new Date()
      }
    }
  },
  methods: {
    show () { // Required
      this.$refs.dialog.show()
    },
    hide () { //  Required
      this.$refs.dialog.hide()
    },
    onDialogHide () { // Required
      this.$emit('hide')
    },
    onOKClick () { // Required
      this.signatureData.signature = this.$refs.signaturePad.saveSignature().data
      this.$emit('ok', this.signatureData)
      this.hide()
    },
    onCancelClick () {
      this.hide()
    }
  },
  components: {
    VueSignaturePad
  }
}
</script>
