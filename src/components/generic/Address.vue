<template>
  <div v-bind="$attrs" v-if="address">
    <span v-if="address.addr1">{{ address.addr1 }}<br /></span>
    <span v-if="address.addr2">{{ address.addr2 }}<br /></span>
    <span v-if="address.postal_code">{{ address.postal_code }} </span><span v-if="address.city">{{ address.city }}<br /></span>
    <span v-if="address.country">{{ address.country }}</span>
  </div>
</template>

<script>
export default {
  name: 'CustomerAddress',
  props: {
    address: {
      type: Object,
      default: undefined
    }
  }
}
</script>
