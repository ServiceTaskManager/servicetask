<template>
  <q-page padding class="flex">
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        round
        color="primary"
        @click="method"
        icon="add"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  name: 'Calls'
}
</script>

<style>
</style>
