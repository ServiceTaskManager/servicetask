<template>
  <q-form class="full-width">
    <user-field v-if="'user' in fields"
      v-model="callData.user"
      v-bind="fields.user" />
    <customer-field v-if="'customer' in fields"
      v-model="callData.customer"
      @input="callData.engine = ''"
      v-bind="fields.customer" />
    <engine-field v-if="'engine' in fields"
      v-model="callData.engine"
      v-bind="fields.engine"
      :customer-id="callData.customer" />
    <title-field v-if="'title' in fields"
      v-model="callData.title"
      label="Problem description"
      v-bind="fields.title" />
    <person-field v-if="'person' in fields"
      v-model="callData.person"
      v-bind="fields.person" />
    <phone-field v-if="'phone' in fields"
      v-model="callData.phone"
      v-bind="fields.phone" />
    <teamviewer-field v-if="'teamviewer' in fields"
      v-model="callData.teamviewer"
      v-bind="fields.teamviewer" />
  </q-form>
</template>

<script>
export default {
  name: 'CallForm',
  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    },
    fields: {
      type: Object,
      default: () => {
        return {
          user: { label: 'Assign to' },
          customer: {},
          engine: {},
          person: {},
          phone: {},
          teamviewer: {},
          title: { label: 'Problem' }
        }
      }
    }
  },
  data () {
    return {
      callData: {}
    }
  },
  mounted () {
    this.callData = Object.assign({},
      this.$calls.default,
      this.value)
  },
  watch: {
    callData: function (val) {
      this.$emit('input', val)
    }
  },
  components: {
    UserField: () => import('./UserField'),
    CustomerField: () => import('./CustomerField'),
    EngineField: () => import('./EngineField'),
    TitleField: () => import('./TitleField'),
    PersonField: () => import('./PersonField'),
    PhoneField: () => import('./PhoneField'),
    TeamviewerField: () => import('./TeamviewerField')
  }
}
</script>
