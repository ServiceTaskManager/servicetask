<template>
  <div class="full-width row q-pa-sm-md justify-around">
    <q-card class="col-sm col-12">
      <q-toolbar :class="'bg-' + $models.user.meta.color" class="text-white q-mb-sm">
        <q-toolbar-title>
          <span class="text-h5 q-px-sm overflow-hidden">{{ user.name }}</span>
        </q-toolbar-title>
      </q-toolbar>
      <q-card-section class="q-pa-none">
        <div class="row q-gutter-x-sm q-px-sm">
          <q-btn :to="{ name: 'customer', params: { id: user.customer }}"
            rounded dense outline no-caps
            :color="$models.customer.meta.color"
            align="left"
            class="col">
            <div class="ellipsis">
              <q-icon :name="$models.customer.meta.icon"
                :color="$models.customer.meta.color" />
                {{ $customers.data[user.customer].name }}
            </div>
          </q-btn>
        </div>
        <div class="row q-gutter-x-sm q-px-sm q-pt-sm q-mb-sm">
          <q-btn v-if="user.phone"
            :href="'tel:' + user.phone"
            type="a"
            rounded dense outline no-caps
            :color="$models.call.meta.color"
            align="left"
            class="col">
            <div class="ellipsis">
              <q-icon :name="$models.call.meta.icon"
                :color="$models.call.meta.color" />
                {{ user.phone }}
            </div>
          </q-btn>
          <q-btn v-if="user.email"
            :href="'mailto:' + user.email"
            type="a"
            rounded dense outline no-caps
            color="blue"
            align="left"
            class="col">
            <div class="ellipsis">
              <q-icon name="mail"
                color="grey" />
                {{ user.email }}
            </div>
          </q-btn>
        </div>
      </q-card-section>
      <q-card-section>
        <user-address :address="user.address" class="text-subtitle2" />
      </q-card-section>
    </q-card>
    <q-card class="col-sm col-12 q-ml-sm-md q-mt-sm-none q-mt-sm">
      <q-toolbar :class="'bg-' + $models.task.meta.color + '-2'"
        class="text-white">
        <q-toolbar-title>
          <span class="text-h6 overflow-hidden" :class="'text-' + $models.task.meta.color">{{$t('users.tasks.title')}}</span>
        </q-toolbar-title>
      </q-toolbar>
      <q-card-section class="q-pa-none">
        <st-list model="task"
         :filters="[['user', '==', user.id]]"
         :fields="$models.task.fields.filter(f => f.key !== 'user')"
         no-select no-right/>
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
