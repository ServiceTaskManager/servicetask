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
      this.$store.dispatch('user/loginUser', { login: this.login, router: this.$router })
    }
  }
}
</script>
