<template>
  <q-card flat bordered class="my-card">
    <q-card-section>
      <div class="text-h6">Login</div>
    </q-card-section>

    <q-card-section>
      <q-input v-model="login.username" placeholder="Username" type="text" />
    </q-card-section>

    <q-card-section>
      <q-input v-model="login.password" placeholder="Password" type="password" />
    </q-card-section>

    <q-card-section>
      <q-btn @click="loginUser" color="positive" icon-right="send" label="Login" />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data () {
    return {
      login: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    loginUser () {
      this.$axios.post('http://192.168.1.35:3000/api/Users/login', this.login)
        .then((response) => {
          this.$q.notify({
            color: 'positive',
            message: response.data.id
          })
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            message: 'Failed to login'
          })
        })
    }
  }
}
</script>
