<template>
  <div>
    <div class="full-width row q-pa-sm-md justify-around">
      <q-card class="col-sm col-12">
        <q-card-section header>
          <span class="text-h5">{{ customer.name }}</span>
        </q-card-section>
        <q-separator />
        <q-card-section class="row q-pa-none" ref="mapParent">
          <div class="col q-pa-sm">
            <customer-address :address="customer.address" class="text-subtitle2" />
            <q-chip icon="email" class="full-width" dense>
              <q-btn type="a" :href="'mailto:' + customer.email" :label="customer.email" flat dense class="q-pa-none" no-caps />
            </q-chip>
            <q-chip icon="phone" class="full-width" dense>
              <q-btn type="a" :href="'tel:' + customer.phone" :label="customer.phone" flat dense class="q-pa-none" />
            </q-chip>
          </div>
          <div class="col" v-if="customer.address.lat_lng" style="">
            <maps ref="map" @mounted="$refs.map.zoomToCustomer(customer.id)" />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-py-none bg-green-1">
          <st-list model="user" :filters="[['customer', '==', customer.id]]" no-select no-filters>
            <template #first>
              <q-item class="q-pa-none">
                <q-item-label header>
                  Contacts
                </q-item-label>
              </q-item>
            </template>
            <template #no-result>{{$t('customers.users.noresult')}}</template>
          </st-list>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-py-none bg-teal-1">
          <st-list model="machine" :filters="[['customer', '==', customer.id]]" no-select no-filters>
            <template #first>
              <q-item class="q-pa-none">
                <q-item-label header>
                  Machines
                </q-item-label>
              </q-item>
            </template>
            <template #no-result>{{$t('customers.engines.noresult')}}</template>
          </st-list>
        </q-card-section>
      </q-card>
      <q-card class="col-sm col-12 q-ml-sm-md q-mt-sm-none q-mt-sm">
        <q-card-section header>
          <span class="text-h6">{{$t('customers.tasks.title')}}</span>
        </q-card-section>
        <q-card-section class="q-pa-sm">
          <st-list model="task" :filters="[['customer', '==', customer.id]]" no-select />
        </q-card-section>
      </q-card>
    </div>
    <div class="full-width row q-px-sm-md q-mt-sm-none q-mt-sm justify-around">
      <q-card class="col-sm col-12">
        <q-card-section header>
          <span class="text-h6">{{$t('customers.calls.title')}}</span>
        </q-card-section>
        <q-card-section class="q-pa-sm">
          <st-list model="call" :filters="[['customer', '==', customer.id]]" no-select />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerPage',
  computed: {
    customer () {
      return this.$customers.data[this.$route.params.id]
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.$store.dispatch(this.$route.meta.store + '/selectOneOnly', this.$route.params.id)
    }
  },
  components: {
    CustomerAddress: () => import('../components/generic/Address'),
    StList: () => import('../components/generic/StList'),
    Maps: () => import('../components/generic/Map')
  }
}
</script>
