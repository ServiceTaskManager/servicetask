<template>
  <q-layout container view="hHh Lpr lff" style="height: calc(100vh - 50px)">
    <q-drawer v-model="drawer" side="left" bordered>
      <div class="full-width q-gutter-sm q-pa-sm row" style="height: 50px;">
        <q-btn color="black"
          label="Save"
          icon="save"
          class="col"
          @click="save()" />
        <q-btn :color="$reports.meta.color"
          label="Print"
          icon="print"
          class="col" />
      </div>

      <q-scroll-area class="full-width q-pa-sm" style="height: calc(100vh - 100px)">
        <customer-field v-model="report.customer" />

        <user-field v-model="report.contact_person"
          :customer="report.customer"
          label="Contact"
          no-self />

        <st-list store="tasks"
          :filters="[
            ['customer', '==', report.customer],
            ['technician', '==', this.$user.id]
          ]"
          no-link />
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page class="q-pa-md">

        <!-- Header -->
        <q-card>
          <q-card-section class="row justify-between">
            <span class="text-h3 col">Report</span>
            <div class="col text-right">
              <span class="text-weight-bold">Technician: {{ report.technician }}</span><br />
              <span class="text-caption">{{ report.date | moment('D MMM Y') }}</span>
            </div>
          </q-card-section>
          <q-separator />

          <div v-if="report.customer !== ''">
            <q-card-section class="row justify-between">
              <div class="col">
                <span class="text-h6 col">{{ customerData.name }}</span><br />
                <span v-if="customerData.address.addr1 !== ''">{{ customerData.address.addr1 }}<br /></span>
                <span v-if="customerData.address.addr2 !== ''">{{ customerData.address.addr2 }}<br /></span>
                <span v-if="customerData.address.postal_code !== ''">{{ customerData.address.postal_code }} </span>
                <span v-if="customerData.address.city !== ''">{{ customerData.address.city }}<br /></span>
                <span v-if="customerData.address.country !== ''">{{ customerData.address.country }}</span>
              </div>
              <div class="col text-right">
                <span class="text-weight-bold">Contact : {{ contactPersonData.name }}</span><br />
                <span class="text-caption">{{ report.date | moment('D MMM Y') }}</span>
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
                  <q-markdown :src="`${report.note}`" />
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
                    <q-input v-model="report.note"
                      v-if="splitter > 30"
                      borderless square
                      autogrow=""
                      label="Type your report here (markdown)"
                      type="textarea" />
                  </div>
                </div>
              </template>
            </q-splitter>
          </q-card-section>
        </q-card>

        <!-- Tasks summary -->
        <q-table
          title="Tasks"
          :data="tasksTableData"
          :columns="taskTableColumns"
          row-key="title"
          :rows-per-page-options="[0]"
          :pagination.sync="tasksTablePagination"
          class="q-mt-md">

          <template #top>
            <div class="row full-width">
              <div class="col">
                <span class="text-h6">Tasks done</span>
              </div>
              <div class="col text-right">
                <span class="text-weight-bold">{{ tasksTotalTime }} hours</span>
              </div>
            </div>
          </template>
        </q-table>

        <!-- Signatures -->
        <div class="row q-gutter-x-md q-mt-md">
          <q-card class="bg-transparent col" bordered flat>
            <q-card-section class="q-pa-sm">
              <span class="text-weight-bold">{{ $user.name }}</span><br />
              <span class="text-caption">{{ Date(report.signatures.technician.date.seconds * 1000) | moment('D MMM Y HH:mm') }}</span>
            </q-card-section>
            <q-card-section class="bg-white q-pa-xs">
              <q-btn @click="getSignature('technician')" flat class="full-width q-pa-none">
                <q-img
                  :src="report.signatures.technician.signature"
                  style="width: 300px; height: 100px;"
                  contain />
              </q-btn>
            </q-card-section>
          </q-card>

          <q-card class="bg-transparent col" bordered flat>
            <q-card-section class="q-pa-sm">
              <span class="text-weight-bold">{{ contactPersonData.name }}</span><br />
              <span class="text-caption">{{ Date(report.signatures.customer.date.seconds * 1000) | moment('D MMM Y HH:mm') }}</span>
            </q-card-section>
            <q-card-section class="bg-white q-pa-xs">
              <q-btn @click="getSignature('customer')" flat class="full-width q-pa-none">
                <q-img
                  :src="report.signatures.customer.signature"
                  style="width: 300px; height: 100px;"
                  contain />
              </q-btn>
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style>
.splitter {
  height: auto !important;
}
</style>

<script>
import SignatureDialog from '../components/generic/SignatureDialog'
import moment from 'moment'

export default {
  name: 'Report',
  data () {
    return {
      drawer: false,
      splitter: 300,
      report: {
        customer: '',
        calls: [],
        tasks: [],
        tasksTotalTime: 0,
        note: '',
        date: '',
        technician: '',
        contact_person: '',
        signatures: {
          technician: {
            date: '',
            signature: ''
          },
          customer: {
            date: '',
            signature: ''
          }
        }
      },
      taskTableColumns: [
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
      tasksTablePagination: { rowsPerPage: 0, sortBy: 'start', descending: false }
    }
  },
  mounted () {
    if (this.$route.params.id !== 'new') this.report = this.$reports.data[this.$route.params.id]
    this.report.date = new Date()
    this.report.technician = this.$user.name
  },
  computed: {
    tasksSelected: function () {
      return this.$store.getters['tasks/filter']([['selected', '==', true]])
    },
    tasksTableData: function () {
      let data = []
      this.tasksSelected.forEach(t => {
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
    tasksTotalTime: function () {
      const times = this.tasksTableData.map(t => moment(t.shift.end).diff(t.shift.start, 'hours'))
      return times.length > 0 ? times.reduce((sum, val) => sum + val) : 0
    },
    customerData: function () {
      return this.report.customer !== '' ? this.$customers.data[this.report.customer] : {}
    },
    contactPersonData: function () {
      return this.report.contact_person !== '' ? this.$users.data[this.report.contact_person] : {}
    }
  },
  methods: {
    getSignature (person) {
      this.$q.dialog({
        component: SignatureDialog,
        parent: this,
        noName: true
      }).onOk(signature => {
        this.report.signatures[person] = signature
      })
    },
    async save () {
      const id = await this.$store.dispatch('reports/set', this.report)
      if (this.$route.params.id === 'new') this.$router.push({ name: 'report', params: { id: id } })
    }
  },
  components: {
    StList: () => import('../components/generic/StList'),
    CustomerField: () => import('../components/customer/CustomerField'),
    UserField: () => import('../components/user/UserField')
  }
}
</script>
