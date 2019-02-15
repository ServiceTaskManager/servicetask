<template>
  <q-page padding class="justify-center">
     <q-input v-model="call.customer" type="text" placeholder="Customer" :before="[{icon:'group'}]" />
     <q-input v-model="call.description" type="text" placeholder="Call description" :before="[{icon:'description'}]" />
     <q-input v-model="call.phone_number" type="number" placeholder="Phone number" :before="[{icon:'phone'}]" />
     <q-input v-model="call.teamviewer_id" type="number" placeholder="Teamviewer ID" :before="[{icon:'screen_share'}]" />
     <q-btn color="red" icon-right="send" label="Create call" @click="putCall()" />
  </q-page>
</template>

<script>

export default {
  name: 'Call_edit',
  data () {
    return {
      call: {
        customer: '',
        description: '',
        phone_number: '',
        teamviewer_id: '',
        open_date: Date().toString(),
        status: 'open'
      }
    }
  },
  methods: {
    putCall () {
      this.$axios.put('http://192.168.1.35:3000/api/Calls', this.call)
        .then((response) => {
          this.$router.push('/calls')
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Failed to add call',
            icon: 'report_problem'
          })
        })
    }
  }
}
</script>

<style>
</style>
