<template class="fit">
  <div class="row justify-center">
    <q-card class="bg-grey-3">
      <q-card-section class="bg-grey-10 text-white">
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="/statics/app-logo-128x128.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-h6">Service Task</q-item-label>
            <q-item-label caption class="text-white">Tools for customer service</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-md">
        <q-icon name="warning" class="text-red" style="font-size: 4rem;" /> Ressources access forbidden
      </q-card-section>
      <q-separator />
      <q-card-section class="row">
        <q-btn v-if="!$store.state.user.login" to="/" icon="people" label="Login" color="primary" class="q-ma-sm" />
        <q-btn @click="$router.go(-1)" icon="undo" label="Go back" color="negative" class="q-ma-sm" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
