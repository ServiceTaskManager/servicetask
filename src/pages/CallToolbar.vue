<template>
  <div class="row">
    <q-btn :href="'tel:' + value.phone"
      color="white"
      dense round flat
      icon="phone"
      class="col"
      type="a" />
    <q-btn v-if="$q.platform.is.mobile"
      dense round flat
      icon="chat"
      class="col"
      @click="discussionDialog = true" />
    <q-dialog v-model="discussionDialog" maximized>
      <q-card>
        <q-toolbar :class="'bg-' + $models.call.meta.color" class="text-white">
          <q-btn flat round dense icon="close" @click="discussionDialog = false" />
          <q-toolbar-title>
            Discussion
          </q-toolbar-title>
        </q-toolbar>
        <q-card-section class="q-pa-none">
          <discussion :topic="value.call.id" style="height: calc(100vh - 110px)" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'CallToolbar',
  props: {
    value: {
      type: Object,
      default: undefined,
      required: true
    }
  },
  data () {
    return {
      discussionDialog: false
    }
  },
  components: {
    Discussion: () => import('../components/generic/Discussion')
  }
}
</script>
