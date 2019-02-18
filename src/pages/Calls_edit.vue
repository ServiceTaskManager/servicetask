<template>
  <q-page padding class="justify-center">
     <q-input v-model="call.customer" type="text" placeholder="Customer" stack-label label="Customer" :before="[{icon:'group'}]" outlined />
     <q-input v-model="call.description" type="text" placeholder="Call description" stack-label label="Problem description" :before="[{icon:'description'}]" outlined />
     <q-input v-model="call.phone_number" type="tel" placeholder="Phone number"  stack-label label="Phone number" :before="[{icon:'phone'}]" outlined />
     <q-input v-model="call.teamviewer_id" type="number" placeholder="Teamviewer ID"  stack-label label="Teamviewer ID" :before="[{icon:'screen_share'}]" outlined />
     <q-btn color="red" icon-right="send" label="Create call" @click="addCall()" />
  </q-page>
</template>

<script>

export default {
  name: 'Call_edit',
  mounted () {
    if (this.$route.params.callId !== undefined) {
      this.$axios.get('http://192.168.1.35:3000/api/Calls/' + this.$route.params.callId)
        .then((response) => {
          this.call = response.data
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Loading failed',
            icon: 'report_problem'
          })
        })
      console.log(this.call)
    }
  },
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
    addCall () {
      let createdAt = new Date()
      this.$db.collection('calls')
        .add({
          assignTo: null,
          customer: 'Test',
          title: 'Issue',
          status: 'open',
          createdAt: createdAt
        })
        .then(() => {
          this.$router.push('/calls')
        })
    }
  }
}
</script>

<style>
</style>
