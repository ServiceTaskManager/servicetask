<template>
  <q-card>
    <q-card-section class="q-pa-sm row">
      <q-input
        v-model="user.display_name"
        label="Full name"
        class="full-width">
        <template v-slot:prepend>
          <q-icon name="person" color="orange" />
        </template>
      </q-input>
    </q-card-section>

    <q-separator />

    <q-card-actions align="around">
      <q-btn round flat color="white" class="bg-negative" icon="undo" :to="{ name: 'users' }" />
      <q-btn round flat color="white" class="bg-positive" icon="done" @click='setUser' />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'UsersEdit',
  data () {
    return {
      id: '',
      create: true,
      user: {}
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    getUser () {
      this.id = this.$route.params.id
      this.create = this.id === 'create'
      this.user = this.create ? this.$store.state.users.user : this.$store.state.users.data[this.id]
    },
    setUser () {
      this.$store.dispatch('users/patch', this.user).then(r => {
        this.$q.notify({
          message: 'User set',
          color: 'positive',
          icon: 'info'
        })
        this.$router.push({ name: 'users' })
        this.$store.state.users.user = {}
        this.$store.state.user.data = this.user
      })
    }
  }
}
</script>
