<template>
  <div>
    <q-separator />
    <q-item :to="noLink ? null : { name: model, params: { id: data.id } }"
      class="q-pa-xs"
      :class="data.selected ? 'bg-grey-4' : ''">
      <slot name="item-left" v-if="!noSelect">
        <q-item-section avatar top>
          <q-checkbox :value="data.selected" @input="toggleSelected()" />
        </q-item-section>
      </slot>
      <!-- Default content -->
      <q-item-section v-if="!itemComponent" >
        <q-item-label class="text-bold">
          {{ data[titleProp] }}
        </q-item-label>
        <q-item-label caption lines="1">
          <slot></slot>
        </q-item-label>
      </q-item-section>

      <!-- Custom content -->
      <q-item-section v-else>
        <component :is="itemComponent" :data="data" />
      </q-item-section>

      <q-item-section side top v-if="!noRight">
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
    model: {
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
    },
    noRight: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    titleProp () {
      return this.$models[this.model].titleProp
    },
    itemComponent () {
      return this.$models[this.model].components ? this.$models[this.model].components.item : undefined
    }
  },
  methods: {
    router () {
      console.log(true)
    },
    toggleSelected () {
      this.$store.dispatch(this.model + 's/toggleSelected', this.data.id)
    }
  }
}
</script>
