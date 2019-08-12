<template>
  <q-item-section avatar top>
    <q-knob
      show-value
      class="text-white q-ma-md"
      v-model="value"
      size="90px"
      :thickness="0.2"
      color="primary"
      center-color="grey-8"
      track-color="transparent"
    >
      <q-icon name="volume_up" />
    </q-knob>
  </q-item-section>

  <q-item-section top>
    <q-item-label lines="1">
      <span class="text-h5">{{ call.title }}</span>
    </q-item-label>
    <q-item-label>
      <span class="text-grey-9">
        <q-icon name="print" color="teal" /> {{ $store.state.engines.data[call.engine].type }}
        <q-badge color="teal">SN/{{ $store.state.engines.data[call.engine].sn }}</q-badge>
      </span>
    </q-item-label>
    <q-item-label>
      <q-icon name="people" color="pink" /> <span class="text-grey-8"> {{ $store.state.customers.data[call.customer].name }}</span>
      <q-icon name="person" color="green" /> <span class="text-grey-8"> {{ call.person }}</span>
    </q-item-label>
    <q-item-label caption lines="1">
      Called {{ dateDiff(call.created_at) }} hours ago
    </q-item-label>
    <q-item-label
      lines="1"
      class="text-grey-8 q-gutter-xs row justify-end">
      <q-btn flat dense round icon="phone" color="positive" type="a" :href="'tel:' + call.phone" />
      <q-btn flat dense round icon="edit" :to="{ name: 'callsEdit', params: { id: call.id } }" />
      <q-btn flat dense round icon="remove_circle" color="negative" @click="deleteCall(call.id)" />
    </q-item-label>
  </q-item-section>
</q-item>
</template>

<script>
export default {
  name: 'ItemCall',
  props: ['call'],
  data () {
    return {}
  },
  computed: {
    timeAgo () {
      
    }
  }
}
</script>
