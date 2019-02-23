<template>
  <div class="row justify-center items-center window-height bg-red-4" id="firebaseui">
    <!--
    <q-card bordered class="col-md-3">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="user.email" placeholder="Username" type="text" />
      </q-card-section>

      <q-card-section>
        <q-input v-model="user.password" placeholder="Password" type="password" />
      </q-card-section>

      <q-card-section class="float-right">
        <q-btn @click.native="login" color="positive" icon-right="send" label="Login" />
      </q-card-section>
    </q-card> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$store.dispatch('user/login', this)
    }
  },
  mounted () {
    var uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        this.$firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        this.$firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    }
    var ui = new this.$firebaseui.auth.AuthUI(this.$auth)
    ui.start('#firebaseui', uiConfig)
  }
}
</script>
