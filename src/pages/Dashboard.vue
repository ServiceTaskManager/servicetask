<template>
  <div class="container">
    <div class="row q-col-gutter-sm">
      <div
        v-for="(m, key) in $store.state.firestore.metas"
        :key="key"
        class="col-sm-4 col-6">
        <q-card
          :class="'bg-'+m.color+'-6'"
          @click="$router.push(key)"
          clickable>
          <q-card-section
            class="q-pa-sm text-white"
            :class="'bg-'+m.color+'-9'" >
            <div class="text-h6 text-center">
              {{ m.name }}
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="text-center q-pa-none" style="height: 150px">
            <q-icon color="white" :name="m.icon" class="absolute-center" style="font-size: 100px" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>
