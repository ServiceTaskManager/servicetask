<template>
  <div class="row justify-center q-pt-xl">
    <q-card class="bg-white col-12 col-sm-4">
      <q-card-section class="row">
        <div class="col-3">
          <img src="statics/icons/icon-512x512.png" class="full-width" />
        </div>
        <div class="col-9 text-h5">
          <div class="row full-height">
            <div class="self-center q-pl-md">Service Task</div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-md q-gutter-md">
        <q-form @submit="login" class="col q-gutter-y-sm">
          <q-input standout label="Email" v-model="email" type="email">
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
          <q-input standout label="Password" v-model="password" type="password">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
          <q-btn standout label="Login" icon-right="send" type="submit" color="grey-10" class="full-width" />
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    sendEmailVerification (user) {
      user.sendEmailVerification().then(emailVerification => {
        this.$q.notify({
          message: 'Verification email has been sent.',
          color: 'positive',
          icon: 'done'
        })
      }).catch(error => {
        this.$q.notify({
          message: 'Failed to send email verification',
          color: 'negative',
          icon: 'cancel'
        })
        throw error
      })
    },
    login () {
      this.$auth.signInWithEmailAndPassword(this.email, this.password).then(signedInUser => {
        this.$router.push({ name: 'dashboard' })
      }).catch(error => {
        this.$q.notify({
          message: 'Failed to login',
          color: 'negative',
          icon: 'cancel'
        })
        throw error
      })
    }
  }
}
</script>
