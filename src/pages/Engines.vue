<template>
  <div class="container">
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator>
      <q-tab name="engines" icon="print" label="Installed Engines" />
      <q-tab name="engineTypes" icon="print" label="Engine types" />
    </q-tabs>
    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="engines">
        <engine-list />
      </q-tab-panel>
      <q-tab-panel name="engineTypes">
        <p>Coming soon</p>
      </q-tab-panel>
    </q-tab-panels>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="black" :to="{ name: 'enginesCreate' }" />
    </q-page-sticky>
  </div>
</template>

<script>
import EngineList from '../components/EngineList'

export default {
  name: 'Engines',
  data () {
    return {
      tab: 'engines'
    }
  },
  components: {
    EngineList
  }
}
</script>
