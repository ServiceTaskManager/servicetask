<template>

  <div class="full-width row q-pa-sm-md justify-around">
    <q-card class="col-sm col-12">
      <q-card-section header>
        <span class="text-h5">{{ user.name }}</span>
        <span class="text-subtitle1"><br />{{ $customers.data[user.customer].name }}</span>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <user-address :address="user.address" class="text-subtitle2" />
        <q-chip icon="email" class="full-width" dense>
          <q-btn type="a" :href="'mailto:' + user.email" :label="user.email" flat dense class="q-pa-none" no-caps />
        </q-chip>
        <q-chip icon="phone" class="full-width" dense>
          <q-btn type="a" :href="'tel:' + user.phone" :label="user.phone" flat dense class="q-pa-none" />
        </q-chip>
      </q-card-section>
    </q-card>
    <q-card class="col-sm col-12 q-ml-sm-md q-mt-sm-none q-mt-sm">
      <q-card-section header>
        <span class="text-h6">{{$t('users.tasks.title')}}</span>
      </q-card-section>
      <q-card-section class="q-pa-sm">
        <st-list model="task"
         :filters="[['user', '==', user.id]]"
         :fields="$models.task.fields.filter(f => f.key !== 'user')"
         no-select />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'UserPage',
  computed: {
    user () {
      return this.$users.data[this.$route.params.id]
    }
  },
  mounted () {
    if (this.$route.params.id) this.$store.dispatch(this.$route.meta.store + '/selectOneOnly', this.$route.params.id)
  },
  components: {
    UserAddress: () => import('../components/generic/Address'),
    StList: () => import('../components/generic/StList')
  }
}
</script>
