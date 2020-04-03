<template>
  <div>
    <q-card>
      <q-card-section class="row justify-between">
        <div class="col">
          <div class="text-weight-bold">{{ company.name }}</div>
          <customer-address :address="company.address" />
          <div>Technician: {{ technician.name }}</div>
        </div>
        <div class="col text-center">
          <div class="text-h6">{{$t('reports.title')}}</div>
          <div class="text-weight-bold">{{ machine.type }}</div>
          <div class="text-caption">{{ machine.sn }}</div>
          <div class="text-caption">{{ value.date | moment('D MMM Y') }}</div>
        </div>
        <div class="col text-right">
          <div class="text-weight-bold">{{ customer.name }}</div>
          <customer-address :address="customer.address" />
          <div>{{$t('reports.contact.title')}} : {{ contactPerson.name }}</div>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-none">
        <q-splitter v-model="splitter"
          unit="px"
          reverse
          :limits="[0, 1000]"
          class="row items-stretch"
          before-class="q-pa-none splitter"
          after-class="splitter">
          <template #before>
            <div class="row q-px-md" ref="markdownPreview">
              <q-markdown :src="value.note" class="full-width q-pt-none" />
            </div>
          </template>
          <template #after>
            <div class="row full-height" ref="markdownEdit">
              <q-btn @click="splitter = splitter > 100 ? 30 : 500"
                :icon="splitter > 100 ? 'keyboard_arrow_right' : 'keyboard_arrow_left'"
                stretch dense
                class="col-auto"
                color="grey" text-color="white" />
              <div class="col-grow q-px-md bg-grey-2">
                <q-input v-model="value.note"
                  v-if="splitter > 30"
                  borderless square
                  autogrow=""
                  label="Type your report here (markdown)"
                  type="textarea"
                  @input="$emit('input', { ...value, note: $event })" />
              </div>
            </div>
          </template>
        </q-splitter>
      </q-card-section>
    </q-card>

    <!-- Shift summary -->
    <shift-table :tasks="tasks" class="q-mt-md" />

    <!-- Signatures -->
    <div class="row q-gutter-x-md q-mt-md">
      <q-card class="bg-transparent col" bordered flat>
        <q-card-section class="q-pa-sm">
          <span class="text-weight-bold">{{ technician.name }}</span><br />
          <span class="text-caption">{{ Date(signatures.technician.date.seconds * 1000) | moment('D MMM Y HH:mm') }}</span>
        </q-card-section>
        <q-card-section class="bg-white q-pa-xs">
          <q-btn @click="getSignature('technician')" flat class="full-width q-pa-none">
            <q-img
              :src="signatures.technician.signature"
              style="width: 300px; height: 100px;"
              contain />
          </q-btn>
        </q-card-section>
      </q-card>

      <q-card class="bg-transparent col" bordered flat>
        <q-card-section class="q-pa-sm">
          <span class="text-weight-bold">{{ contactPerson.name }}</span><br />
          <span class="text-caption">{{ Date(signatures.customer.date.seconds * 1000) | moment('D MMM Y HH:mm') }}</span>
        </q-card-section>
        <q-card-section class="bg-white q-pa-xs">
          <q-btn @click="getSignature('customer')" flat class="full-width q-pa-none">
            <q-img
              :src="signatures.customer.signature"
              style="width: 300px; height: 100px;"
              contain />
          </q-btn>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import SignatureDialog from '../generic/SignatureDialog'

export default {
  name: 'Report',
  props: {
    value: {
      type: Object,
      default: undefined,
      required: true
    }
  },
  data () {
    return {
      splitter: 300
    }
  },
  computed: {
    customer () {
      return this.$customers.data[this.value.customer] || {}
    },
    technician () {
      return this.$users.data[this.value.technician] || {}
    },
    machine () {
      return this.$machines.data[this.value.machine] || {}
    },
    company () {
      return this.$customers.data[this.technician.customer] || {}
    },
    contactPerson () {
      return this.$users.data[this.value.contact_person] || {}
    },
    tasks () {
      return this.value.tasks || []
    },
    signatures () {
      return this.value.signatures || {
        technician: {
          date: { seconds: Date.now() / 1000 },
          signature: ''
        },
        customer: {
          date: { seconds: Date.now() / 1000 },
          signature: ''
        }
      }
    }
  },
  methods: {
    getSignature (person) {
      this.$q.dialog({
        component: SignatureDialog,
        parent: this,
        noName: true
      }).onOk(signature => {
        let signatures = this.signatures
        signatures[person] = signature
        signatures.date = moment().format('YYYT-MM-DDTHH-mm')
        this.$emit('input', { ...this.value, signatures: signatures })
      })
    }
  },
  components: {
    CustomerAddress: () => import('../generic/Address'),
    ShiftTable: () => import('../task/ShiftTable')
  }
}
</script>
