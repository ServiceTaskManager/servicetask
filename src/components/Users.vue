<template>
  <div class="container">
    <div
      class="row q-col-gutter-sm">
      <div
        v-for="(user, key) in users"
        :key="key"
        class="col-12 col-sm-4">
        <card-user :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import CardUser from '../components/CardUser'

export default {
  name: 'Users',
  data () {
    return {}
  },
  computed: {
    users () {
      return this.$store.state.users.data
    }
  },
  components: {
    CardUser
  }
}
</script>
