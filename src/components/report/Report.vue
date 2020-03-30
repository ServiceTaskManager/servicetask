<template>
  <div>
    <q-card>
      <q-card-section class="row justify-between">
        <div class="col">
          <span class="text-h5">{{ company.name }}</span>
          <customer-address :address="company.address" />
        </div>
        <div class="col text-right">
          <span class="text-weight-bold">Technician: {{ technician.name }}</span><br />
          <span class="text-caption">{{ value.date | moment('D MMM Y') }}</span>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-sm">
        <div class="col text-center">
          <span class="text-h5">{{$t('reports.title')}}</span>
        </div>
      </q-card-section>
      <q-separator />
      <div v-if="value.customer !== ''">
        <q-card-section class="row justify-between">
          <div class="col">
            <span class="text-h5">{{ customer.name }}</span>
            <customer-address :address="customer.address" />
          </div>
          <div class="col text-right">
            <span class="text-weight-bold">{{$t('reports.contact.title')}} : {{ contactPerson.name }}</span><br />
            <span class="text-caption">{{ value.date | moment('D MMM Y') }}</span>
          </div>
        </q-card-section>
        <q-separator />
      </div>

      <q-card-section class="q-pa-none">
        <q-splitter v-model="splitter"
          unit="px"
          reverse
          :limits="[30, 1000]"
          class="row items-stretch"
          before-class="q-pa-md splitter"
          after-class="splitter">
          <template #before>
            <div class="row" ref="markdownPreview">
              <q-markdown :src="`${value.note}`" />
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

    <!-- Tasks summary -->
    <q-table
      title="Tasks"
      :data="tableData"
      :columns="tableColumns"
      row-key="title"
      :rows-per-page-options="[0]"
      :pagination.sync="tablePagination"
      class="q-mt-md">

      <template #top>
        <div class="row full-width">
          <div class="col">
            <span class="text-h6">Tasks done</span>
          </div>
          <div class="col text-right">
            <span class="text-weight-bold">{{ totalTime }} hours</span>
          </div>
        </div>
      </template>
    </q-table>

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
      splitter: 300,
      tableColumns: [
        {
          name: 'title',
          required: true,
          label: 'Single tasks done',
          align: 'left',
          field: t => t.task.title,
          sortable: false
        }, {
          name: 'start',
          required: true,
          label: 'Start',
          align: 'left',
          field: t => t.shift.start,
          format: val => `${moment(val).format('DD/MM/YYYY HH:mm')}`,
          sortable: true
        }, {
          name: 'end',
          required: true,
          label: 'End',
          align: 'left',
          field: t => t.shift.end,
          format: val => `${moment(val).format('DD/MM/YYYY HH:mm')}`,
          sortable: false
        }, {
          name: 'Total',
          required: true,
          label: 'Time',
          align: 'right',
          field: t => t.shift,
          format: val => `${moment(val.end).diff(val.start, 'hours')} h`,
          sortable: false
        }
      ],
      tablePagination: { rowsPerPage: 0, sortBy: 'start', descending: false }
    }
  },
  computed: {
    customer () {
      return this.$customers.data[this.value.customer] || {}
    },
    technician () {
      return this.$users.data[this.value.technician] || {}
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
    },
    tableData () {
      let data = []
      this.tasks.forEach(t => {
        t.time_shifts.forEach(s => {
          let dataToAdd = {
            shift: s,
            task: t
          }
          data.push(dataToAdd)
        })
      })
      return data
    },
    totalTime () {
      const times = this.tableData.map(t => moment(t.shift.end).diff(t.shift.start, 'hours'))
      return times.length > 0 ? times.reduce((sum, val) => sum + val) : 0
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
        this.$emit('input', { ...this.value, signatures: signatures })
      })
    }
  },
  components: {
    CustomerAddress: () => import('../generic/Address')
  }
}
</script>
