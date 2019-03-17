<template>
  <div class="row justify-center items-center window-height bg-grey-10" id="firebaseui"></div>
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
