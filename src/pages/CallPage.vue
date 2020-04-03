<template>

  <div class="full-width row q-pa-sm-md justify-around">
    <q-card class="col-sm col-12">
      <q-toolbar :class="'bg-' + $models.call.meta.color" class="text-white q-mb-sm">
        <q-toolbar-title>
          <span class="text-h5 q-px-sm overflow-hidden">{{ call.title }}</span>
        </q-toolbar-title>
      </q-toolbar>
      <q-card-section class="q-pa-none">
        <div class="row q-gutter-x-sm q-px-sm">
          <q-btn v-if="call.customer"
            :to="{ name: 'customer', params: { id: call.customer }}"
            rounded dense outline no-caps
            :color="$models.customer.meta.color"
            align="left"
            class="col">
            <div class="ellipsis">
              <q-icon :name="$models.customer.meta.icon"
                :color="$models.customer.meta.color" />
                {{ $customers.data[call.customer].name }}
            </div>
          </q-btn>
          <q-btn v-if="call.person"
            :to="{ name: 'user', params: { id: call.person }}"
            rounded dense outline no-caps
            :color="$models.user.meta.color"
            align="left"
            class="col">
            <div class="ellipsis">
              <q-icon :name="$models.user.meta.icon"
                :color="$models.user.meta.color" />
                {{ $users.data[call.person].name }}
            </div>
          </q-btn>
        </div>
        <div class="row q-gutter-x-sm q-px-sm q-pt-sm q-mb-sm">
          <q-btn v-if="call.phone"
            :href="'tel:' + call.phone"
            type="a"
            rounded dense outline no-caps
            :color="$models.call.meta.color"
            align="left"
            class="col">
            <div class="ellipsis">
              <q-icon :name="$models.call.meta.icon"
                :color="$models.call.meta.color" />
                {{ call.phone }}
            </div>
          </q-btn>
          <q-btn v-if="call.teamviewer"
            :href="'teamviewer10://control?device=' + call.teamviewer.id + '/authorization/password/mode/control'"
            type="a"
            rounded dense outline no-caps
            color="blue"
            align="left"
            class="col">
            <div class="ellipsis">
              <q-icon name="screen_share"
                color="blue" />
                {{ call.teamviewer.id }} / {{ call.teamviewer.pwd }}
            </div>
          </q-btn>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-sm">
        <div class="row justify-between">
          <span class="col text-weight-bold">{{$t('calls.description')}}</span>
          <q-btn @click="editDescription"
            flat dense round
            icon="edit" color="grey"
            class="float-right" />
        </div>
        <q-markdown :src="call.description" />
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-sm">
        <div class="row justify-between">
          <span class="col text-weight-bold">{{$t('calls.history')}}</span>
        </div>
        <st-list model="task"
          :filters="[['call', '==', call.id]]"
          :fields="$models.call.fields.filter(f => f !== 'customer')"
          no-select no-right />
      </q-card-section>
    </q-card>

    <q-card v-if="!$q.platform.is.mobile"
      class="col-sm col-12 q-ml-sm-md q-mt-sm-none q-mt-sm">
      <q-toolbar class="text-white bg-grey-3">
        <q-toolbar-title>
          <span class="text-h6 overflow-hidden" :class="'text-' + $models.call.meta.color">{{$t('calls.chat')}}</span>
        </q-toolbar-title>
        <q-btn @click="createCustomerTask"
          :label="$t('call.createtask')"
          outline dense no-caps
          :icon="$models.task.meta.icon"
          :color="$models.task.meta.color" />
      </q-toolbar>
      <q-card-section class="bg-grey-1 rounded-borders q-pa-none" >
        <discussion :topic="call.id" style="height: calc(100vh - 140px)" ref="discussion" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import EditDialog from '../components/generic/EditDialog'

export default {
  name: 'CallPage',
  computed: {
    call () {
      return this.$calls.data[this.$route.params.id]
    }
  },
  methods: {
    createCustomerTask () {
      const fields = ['time_shifts', 'title', 'description', 'user']
      this.$q.dialog({
        component: EditDialog,
        title: this.$t('calls.create.task.title'),
        parent: this,
        model: 'task',
        data: { customer: this.call.customer, call: this.call.id },
        fields: this.$models.task.fields.filter(f => fields.includes(f.key))
      }).onOk((val) => {
        this.$store.dispatch('messages/set', {
          message: val.title + ' ' + val.description,
          topic: this.call.id
        })
      })
    },
    editDescription () {
      this.$q.dialog({
        component: EditDialog,
        title: this.$t('calls.edit.description.title'),
        parent: this,
        maximized: true,
        model: 'call',
        data: this.call,
        fields: this.$models.call.fields.filter(f => f.key === 'description')
      })
    }
  },
  mounted () {
    this.$emit('mountToolbar', {
      component: () => import('./CallToolbar'),
      data: this
    })
    if (this.$route.params.id) this.$store.dispatch(this.$route.meta.store + '/selectOneOnly', this.$route.params.id)
  },
  components: {
    Discussion: () => import('../components/generic/Discussion'),
    StList: () => import('../components/generic/StList')
  }
}
</script>
