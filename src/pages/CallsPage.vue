<template>
  <div>
    <div class="full-width row q-pa-sm-md justify-around">
      <q-card class="col-sm col-12">
        <q-toolbar class="text-white bg-grey-3">
          <q-toolbar-title>
            <span
              class="text-h6 overflow-hidden"
              :class="'text-' + $models.call.meta.color">
              {{$t('calls.open.title')}}
            </span>
          </q-toolbar-title>
          <q-btn class="float-right" flat round :color="$models.call.meta.color" icon="add"
              @click="callDialog(undefined)" />
        </q-toolbar>
        <q-card-section class="q-pa-none">
          <st-list model="call"
            :filters="[['open', '==', true], ['technician', 'undefined', ]]"
            no-filters>
            <template #first>
              <q-item class="q-pa-none">
                <q-item-label header class="text-orange">{{$t('calls.openunassign.title')}}</q-item-label>
              </q-item>
            </template>
            <template #item-right="{ data }">
              <div class="row">
                <q-btn :href="'tel:' + data.phone"
                  type="a"
                  round flat dense unelevated
                  color="orange"
                  icon="phone"
                  class="self-end"
                  @click="prevent" />
              </div>
            </template>
          </st-list>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pa-none">
          <st-list model="call"
            :filters="[['open', '==', true], ['technician', '==', $user.data.id]]"
            no-filters>
            <template #first>
              <q-item class="q-pa-none">
                <q-item-label header class="text-orange">{{$t('calls.openassigntome.title')}}</q-item-label>
              </q-item>
            </template>
            <template #item-right="{ data }">
              <div class="row">
                <q-btn :href="'tel:' + data.phone"
                  type="a"
                  round flat dense unelevated
                  color="orange"
                  icon="phone"
                  class="self-end"
                  @click="prevent" />
              </div>
            </template>
          </st-list>
        </q-card-section>
      </q-card>
      <q-card class="col-sm col-12 q-ml-sm-md q-mt-sm-none q-mt-sm">
      <q-toolbar class="text-white bg-grey-3">
        <q-toolbar-title>
          <span class="text-h6 overflow-hidden"
          :class="'text-' + $models.call.meta.color">
            {{$t('calls.close.title')}}
          </span>
        </q-toolbar-title>
      </q-toolbar>
        <q-card-section class="q-pa-none">
          <st-list model="call" :filters="[['open', '==', false]]" />
        </q-card-section>
      </q-card>
    </div>
    <div class="full-width row q-pa-sm-md justify-around">

    </div>
  </div>
</template>

<script>
import EditDialog from '../components/generic/EditDialog'

export default {
  name: 'CallPage',
  components: {
    StList: () => import ('../components/generic/StList')
  },
  methods: {
    callDialog (call = {}) {
      this.$q.dialog({
        component: EditDialog,
        parent: this,
        title: 'Create a call',
        model: 'call',
        data: call
      })
    },
    prevent (e) {
      e.stopPropagation()
      console.log('item')
    }
  }
}
</script>
