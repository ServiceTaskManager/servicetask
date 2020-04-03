<template>
  <div>
    <div class="full-width row q-pa-sm-md justify-around">
      <q-card class="col-sm col-12">
        <q-toolbar :class="'bg-' + $models.machine.meta.color" class="text-white">
          <q-toolbar-title>
            <span class="text-h5 q-px-sm overflow-hidden">{{ machine.type }}</span>
          </q-toolbar-title>
        </q-toolbar>
        <q-card-section class="q-pa-none q-pa-sm row">
          <q-btn :to="{ name: 'customer', params: { id: machine.customer }}"
            rounded dense outline no-caps
            :color="$models.customer.meta.color"
            align="left"
            class="col">
            <div class="ellipsis">
              <q-icon :name="$models.customer.meta.icon"
                :color="$models.customer.meta.color" />
                {{ $customers.data[machine.customer].name }}
            </div>
          </q-btn>
        </q-card-section>
        <q-card-section>
          <div v-if="machine.sn">{{$t('machines.sn')}} : {{ machine.sn }}</div>
          <div v-if="machine.sn">{{$t('machines.installdate')}} : {{ machine.install_date | moment('D MMMM YYYY') }}</div>
        </q-card-section>
      </q-card>
      <q-card class="col-sm col-12 q-ml-sm-md q-mt-sm-none q-mt-sm">
        <q-toolbar :class="'bg-' + $models.machine.meta.color + '-2'">
          <q-toolbar-title>
            <span
              class="text-h6 q-px-sm overflow-hidden"
              :class="'text-' + $models.machine.meta.color">
              {{$t('machines.analytics')}}
            </span>
          </q-toolbar-title>
        </q-toolbar>
        <q-card-section>
          <st-list model="user" :filters="[['machine', '==', machine.id]]" no-select no-filters>
            <template #no-result>{{$t('underconstruct')}}</template>
          </st-list>
        </q-card-section>
      </q-card>
    </div>
    <div class="full-width row q-px-sm-md q-mt-sm-none q-mt-sm justify-around">
      <q-card class="col-sm col-12">
        <q-toolbar :class="'bg-' + $models.call.meta.color + '-2'">
          <q-toolbar-title>
            <span
              class="text-h6 q-px-sm overflow-hidden"
              :class="'text-' + $models.call.meta.color">
              {{$t('machines.calls.title')}}
            </span>
          </q-toolbar-title>
        </q-toolbar>
        <q-card-section class="q-pa-none">
          <st-list model="call" :filters="[['machine', '==', machine.id]]" no-select />
        </q-card-section>
      </q-card>
      <q-card class="col-sm col-12 q-ml-sm-md q-mt-sm-none q-mt-sm">
        <q-toolbar :class="'bg-' + $models.task.meta.color + '-2'">
          <q-toolbar-title>
            <span
              class="text-h6 q-px-sm overflow-hidden"
              :class="'text-' + $models.task.meta.color">
              {{$t('machines.tasks.title')}}
            </span>
          </q-toolbar-title>
        </q-toolbar>
        <q-card-section class="q-pa-none">
          <st-list model="task" :filters="[['machine', '==', machine.id]]" no-select />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MachinePage',
  computed: {
    machine () {
      return this.$machines.data[this.$route.params.id]
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.$store.dispatch(this.$route.meta.store + '/selectOneOnly', this.$route.params.id)
    }
  },
  components: {
    StList: () => import('../components/generic/StList')
  }
}
</script>
