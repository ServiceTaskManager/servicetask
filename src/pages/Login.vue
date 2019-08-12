<template>
  <div class="row justify-center" >
    <q-card class="bg-grey-3">
      <q-card-section class="bg-grey-10 text-white">
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="/statics/app-logo-128x128.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-h6">Service Task</q-item-label>
            <q-item-label caption class="text-white">Tools for customer service</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-md q-gutter-md">
        <q-input standout prefix="Email : " v-model="email" type="email">
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
        <q-input standout prefix="Password : " v-model="password" type="password">
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>
        <q-btn standout label="Login" icon-right="send" type="submit" color="grey-10" @click="login" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
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
        console.log(error)
        this.$q.notify({
          message: 'Failed to send email verification',
          color: 'negative',
          icon: 'cancel'
        })
      })
    },
    login () {
      this.$auth.signInWithEmailAndPassword(this.email, this.password).then(signedInUser => {
        if (signedInUser.user.emailVerified) {
          this.$q.notify({
            message: 'Welcome on board',
            color: 'positive',
            icon: 'done'
          })
        } else {
          this.sendEmailVerification(signedInUser.user)
        }
      }).catch(error => {
        if (error.code === 'auth/user-not-found') {
          this.$auth.createUserWithEmailAndPassword(this.email, this.password).then(userCreate => {
            this.sendEmailVerification(userCreate.user)
            this.$store.dispatch('users/set', {
              id: userCreate.user.uid,
              roles: ['user']
            })
          }).catch(error => {
            console.log(error)
            this.$q.notify({
              message: 'Failed to create a new user',
              color: 'negative',
              icon: 'cancel'
            })
          })
        } else {
          console.log(error)
          this.$q.notify({
            message: 'Failed to login',
            color: 'negative',
            icon: 'cancel'
          })
        }
      })
    }
  }
}
</script>
