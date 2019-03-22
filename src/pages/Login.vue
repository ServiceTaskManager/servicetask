<template>
  <div class="row justify-center items-center window-height bg-black" >
    <q-card class="bg-grey-9">
      <q-card-section class="bg-grey-10 text-white">
        <div class="text-h6">
          Service Task
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div id="firebaseui"></div>
      </q-card-section>
      <q-separator />
      <q-card-section class="bg-grey-10 text-white">
        With love.
      </q-card-section>
    </q-card>
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
