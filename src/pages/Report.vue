<template>
  <q-layout container view="hHh Lpr lff" style="height: calc(100vh - 50px)">
    <q-drawer v-model="drawer" side="left" bordered>
      <q-scroll-area class="fit">
        <store-list store="tasks" no-link />
      </q-scroll-area>

      <q-btn round
        icon="keyboard_arrow_left" color="black"
        class="absolute"
        style="bottom: 10px; right: -20px;"
        @click="drawer = !drawer" />
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
          <q-card-section class="q-pa-none">
            <q-splitter v-model="splitter"
              unit="px"
              reverse
              :limits="[30, 1000]"
              before-class="q-pa-md">
              <template #before>
                <q-markdown :src="`${report.note}`" />
              </template>
              <template #after>
                <div class="row itemps-stretch">
                  <q-btn @click="splitter = splitter > 100 ? 30 : 500"
                    stretch dense
                    class="col-auto"
                    color="black" text-color="white" icon="edit" />
                  <q-input v-model="report.note"
                    v-if="splitter > 30"
                    square filled
                    label="Type your report here (markdown)"
                    type="textarea"
                    class="col-grow" />
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
          :pagination="{ rowsPerPage: 0 }"
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
        <div class="row q-gutter-md q-mt-md">
          <q-card class="bg-transparent" bordered flat v-for="(signature, key) in report.signatures" :key="key">
            <q-card-section>
              <span class="text-weight-bold">{{ signature.name }}</span><br />
              <span class="text-caption">{{ signature.date | moment('D MMM Y') }}</span>
            </q-card-section>
            <q-card-section class="bg-white q-pa-xs">
              <q-btn @click="deleteSignature(signature)" flat class="full-width q-pa-none">
                <q-img
                  :src="signature.signature"
                  style="width: 300px; height: 100px;"
                  contain />
              </q-btn>
            </q-card-section>
          </q-card>
          <q-card class="bg-white items-center row" bordered flat style="height: 193px;">
            <q-btn flat stack class="full-width full-height" @click="editSignature()" icon="add" label="signature" />
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import SignatureDialog from '../components/generic/SignatureDialog'
import moment from 'moment'

export default {
  name: 'Report',
  data () {
    return {
      drawer: false,
      splitter: 30,
      report: {
        calls: [],
        tasks: [],
        tasksTotalTime: 0,
        note: '*test*',
        date: '',
        technician: '',
        signatures: []
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
          sortable: true
        }, {
          name: 'Total',
          required: true,
          label: 'Time',
          align: 'right',
          field: t => t.shift,
          format: val => `${moment(val.end).diff(val.start, 'hours')} h`,
          sortable: false
        }
      ]
    }
  },
  mounted () {
    this.report.date = new Date()
    this.report.technician = this.$user.data.name
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
      return times.reduce((sum, val) => sum + val)
    }
  },
  methods: {
    editSignature () {
      this.$q.dialog({
        component: SignatureDialog,
        parent: this
      }).onOk(signature => {
        this.report.signatures.push(signature)
      })
    },
    deleteSignature (signature) {
      this.report.signatures = this.report.signatures.filter(s => s !== signature)
    }
  },
  components: {
    StoreList: () => import('../components/generic/StoreList')
  }
}
</script>
