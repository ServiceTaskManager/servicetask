<template>
  <q-page padding class="row justify-center">

    <q-list no-border striped>
      <q-item v-for="call in calls" :key="call.id">
        <q-item-side icon="warning" color="warning" />
        <q-item-main>
          <q-item-tile label>{{ call.customer }}</q-item-tile>
          <q-item-tile sublabel>{{ call.description }}</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-btn icon="phone" color="green" @click="openURL('tel:+33787189352')" flat></q-btn>
          <q-btn icon="screen_share" color="green" @click="openURL('teamviewer8://remotecontrol?connectcc=1410418290')" flat></q-btn>
        </q-item-side>
      </q-item>
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        round
        color="primary"
        icon="add"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'Calls',
  data () {
    return {
      calls: [
        {
          id: 1,
          customer: 'Customer 1',
          description: 'Complex problem',
          phone: '+33212122123',
          teamviewer_id: '46730293',
          teamviewer_password: 'sdfq67'
        },
        {
          id: 2,
          customer: 'Customer 2',
          description: 'Random problem',
          phone: '+42490382475',
          teamviewer_id: '46730293',
          teamviewer_password: 'sdfq67'
        }
      ]
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
