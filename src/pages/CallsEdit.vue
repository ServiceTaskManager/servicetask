<template>
  <div>
    <call-form @submit="goToCalls" @cancel="goToCalls" :call-id="$route.params.id" />
  </div>
</template>

<script>
import CallForm from '../components/CallForm.vue'

export default {
  name: 'CallEdit',
  data () {
    return {}
  },
  methods: {
    goToCalls () {
      this.$router.push({ name: 'calls' })
    }
  },
  components: {
    CallForm
  }
}
</script>
