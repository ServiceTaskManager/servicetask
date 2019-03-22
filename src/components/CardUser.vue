<template>
  <q-card :key="user.id">
    <q-card-section
      class="q-pa-sm text-white"
      :class="user.available ? 'bg-green-9' : 'bg-red-9'">
      <div class="text-h6 ellipsis">
        {{ user.displayName }}
        <q-popup-edit v-model="user.displayName" v-if="edit">
          <q-input v-model="user.displayName" label="Name" dense autofocus />
        </q-popup-edit>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-pa-sm row bg-grey-7">
      <q-input
        v-model="user.phone"
        color="green"
        label="Phone number"
        :readonly="!edit"
        class="full-width"
        dense>
        <template v-slot:prepend>
          <q-icon name="phone" color="green" />
        </template>
      </q-input>
      <q-select
        multiple
        ellipsis
        v-model="user.roles"
        :options='roles'
        color="black"
        label="Roles"
        :readonly="!edit"
        option-label="name"
        option-value="role"
        emit-value
        map-options
        :displayValue="user.roles.length > 1 ? user.roles.length + ' roles' : user.roles.name"
        class="full-width"
        dense>
        <template v-slot:prepend>
          <q-icon name="lock" color="yellow" />
        </template>
      </q-select>
    </q-card-section>

    <q-separator />

    <q-card-actions align="around" class="bg-grey-9" v-if="!edit">
      <q-toggle
        color="positive"
        icon="phone"
        v-model="user.available"
        @input="updateUser" />
      <q-btn round flat color="positive" type="a" :href="'tel:'+user.phone" icon="phone" />
      <q-btn round flat color="white" icon="edit" @click="edit = true" />
    </q-card-actions>
    <q-card-actions align="around" class="bg-white" v-else>
      <q-btn round flat color="negative" icon="cancel" @click="edit = false" />
      <q-btn round flat color="positive" icon="done" @click="updateUser" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'CardUser',
  props: ['user'],
  data () {
    return {
      edit: false,
      roles: [
        {
          role: 'tss',
          name: 'Technical Support Specialist'
        },
        {
          role: 'se',
          name: 'Service Engineer'
        },
        {
          role: 'admin',
          name: 'Administrator'
        }
      ]
    }
  },
  methods: {
    updateUser () {
      console.log('Update user ' + this.user.id)
      this.$store.dispatch('users/patch', this.user)
      this.edit = false
    }
  }
}
</script>
