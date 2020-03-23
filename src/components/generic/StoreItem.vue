<template>
  <div>
    <q-separator />
    <q-item :to="noLink ? null : { name: store.slice(0, -1), params: { id: data.id } }"
      class="q-pa-xs"
      :class="data.selected ? 'bg-grey-4' : ''">
      <q-item-section avatar>
        <slot name="item-left">
          <q-checkbox :value="data.selected" @input="toggleSelected()" />
        </slot>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-bold">
          {{ data[titleProp] }}
        </q-item-label>
        <q-item-label caption lines="1">
          <slot></slot>
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <slot name="item-right"></slot>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    store: {
      type: String,
      default: ''
    },
    noSelect: {
      type: Boolean,
      default: false
    },
    noLink: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    titleProp () {
      return this['$' + this.store].titleProp
    }
  },
  methods: {
    toggleSelected () {
      this.$store.dispatch(this.store + '/toggleSelected', this.data.id)
    }
  }
}
</script>
