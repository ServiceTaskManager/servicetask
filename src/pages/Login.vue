<template>
  <div class="row justify-center items-center window-height bg-red-4">
    <q-card bordered class="col-md-3">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="login.username" placeholder="Username" type="text" />
      </q-card-section>

      <q-card-section>
        <q-input v-model="login.password" placeholder="Password" type="password" />
      </q-card-section>

      <q-card-section class="float-right">
        <q-btn @click="loginUser" color="positive" icon-right="send" label="Login" />
      </q-card-section>
    </q-card>
  </div>
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
      this.$store.dispatch('user/login', this)
    }
  }
}
</script>
