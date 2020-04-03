<template>
  <div class="bg-white">
    <q-dialog v-model="editDialog">
      <q-card>
        <q-toolbar :class="'bg-' + $models.report.meta.color" class="text-white">
          <q-btn flat round dense icon="close" @click="editDialog = false" />
          <q-toolbar-title>
            {{$t('reports.edit.title')}}
          </q-toolbar-title>
          <q-btn flat rounded dense icon="done" @click="save" />
        </q-toolbar>
        <q-card-section>
          <customer-field v-model="report.customer" />

          <user-field v-model="report.contact_person"
            :customer="report.customer"
            label="Contact"
            no-self />

          <machine-field v-model="report.machine"
            :customer="report.customer" />

          <st-list model="task"
            :filters="[
              ['customer', '==', report.customer],
              ['technician', '==', this.$user.id],
              ['machine', '==', report.machine]
            ]" no-filters
            no-link>
            <template #item-right="{ data }">
              <q-btn round flat dense
                icon="edit"
                color="grey"
                @click.prevent="editTask(data)" />
            </template>
            <template #end>
              <q-item clickable @click="editTask(newTask.data, newTask.fields)" class="items-center justify-center q-pa-xs">
                <q-icon name="add" /> {{$t('reports.addtask')}}
              </q-item>
            </template>
          </st-list>
        </q-card-section>
      </q-card>
    </q-dialog>
    <report v-model="report" ref="report" class="q-pa-md" />
  </div>
</template>

<style>
.splitter {
  height: auto !important;
}
</style>

<script>
import EditDialog from '../components/generic/EditDialog'

export default {
  name: 'ReportPage',
  data () {
    return {
      editDialog: false,
      report: {
        note: '',
        tasks: this.selectedTasksIds,
        technician: this.$user.data.id
      }
    }
  },
  mounted () {
    this.$emit('mountToolbar', {
      component: () => import('./ReportToolbar'),
      data: this
    })
    if (this.$route.params.id !== 'new') {
      let report = this.$reports.data[this.$route.params.id]
      this.report = report
      this.report.tasks.forEach(t => {
        this.$store.dispatch('tasks/toggleSelected', t.id)
      })
    }
  },
  computed: {
    selectedTasksIds () {
      return this.$store.getters['tasks/filter']([['selected', '==', true]])
    },
    newTask () {
      return {
        data: {
          customer: this.report.customer,
          technician: this.$user.data.id,
          machine: this.report.machine
        },
        fields: this.$models.task.fields.filter(f => {
          return !['customer', 'user', 'machine'].includes(f.key)
        })
      }
    }
  },
  methods: {
    async save () {
      this.report.date = new Date()
      const id = await this.$store.dispatch('reports/set', this.report).then(() => {
        this.$q.notify({
          message: 'Saved',
          color: 'positive'
        })
      })
      if (this.$route.params.id === 'new') this.$router.push({ name: 'report', params: { id: id } })
    },
    editTask (task, fields) {
      this.$q.dialog({
        component: EditDialog,
        parent: this,
        model: 'task',
        data: task,
        fields: fields
      })
    },
    print () {
      window.print()
      this.drawer = true
      this.$refs.report.splitter = 30
      this.$emit('donePrinting')
    },
    prepareForPrint () {
      this.$emit('printing')
      this.drawer = false
      this.$refs.report.splitter = 0
      setTimeout(() => { this.print() }, 500)
    }
  },
  watch: {
    selectedTasksIds: function (val) {
      this.report.tasks = val
    }
  },
  components: {
    Report: () => import('../components/report/Report'),
    StList: () => import('../components/generic/StList'),
    CustomerField: () => import('../components/customer/CustomerField'),
    UserField: () => import('../components/user/UserField'),
    MachineField: () => import('../components/machine/MachineField')
  }
}
</script>
