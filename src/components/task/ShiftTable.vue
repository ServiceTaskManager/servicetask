<template>
  <q-table
    title="Tasks"
    :data="tableData"
    :columns="tableColumns"
    row-key="title"
    :rows-per-page-options="[0]"
    :pagination.sync="tablePagination">

    <template #top>
      <div class="row full-width">
        <div class="col">
          <span class="text-h6">{{$t('tasks.shifttable.title')}}</span>
        </div>
        <div class="col text-right">
          <span class="text-weight-bold">{{ totalTime }} {{$tc('tasks.shifttable.hours', totalTime)}}</span>
        </div>
      </div>
    </template>
  </q-table>
</template>

<script>
import moment from 'moment'

export default {
  name: 'ShiftTable',
  props: {
    tasks: {
      type: Array,
      default: undefined,
      required: true
    }
  },
  data () {
    return {
      tableColumns: [
        {
          name: 'title',
          required: true,
          label: this.$t('tasks.shifttable.column.title'),
          align: 'left',
          field: t => t.task.title,
          sortable: false
        }, {
          name: 'start',
          required: true,
          label: this.$t('tasks.shifttable.column.start'),
          align: 'left',
          field: t => t.shift.start,
          format: val => `${moment(val).format('DD/MM/YYYY HH:mm')}`,
          sortable: true
        }, {
          name: 'end',
          required: true,
          label: this.$t('tasks.shifttable.column.end'),
          align: 'left',
          field: t => t.shift.end,
          format: val => `${moment(val).format('DD/MM/YYYY HH:mm')}`,
          sortable: false
        }, {
          name: 'Total',
          required: true,
          label: this.$t('tasks.shifttable.column.time'),
          align: 'right',
          field: t => t.shift,
          format: val => `${Math.round(moment(val.end).diff(val.start, 'hours', true) * 10) / 10} h`,
          sortable: false
        }
      ],
      tablePagination: { rowsPerPage: 0, sortBy: 'start', descending: false }
    }
  },
  computed: {
    tableData () {
      let data = []
      this.tasks.forEach(t => {
        if (t.time_shifts) {
          t.time_shifts.forEach(s => {
            let dataToAdd = {
              shift: s,
              task: t
            }
            data.push(dataToAdd)
          })
        }
      })
      return data
    },
    totalTime () {
      if (this.tasks) {
        const shifts = this.tasks.reduce((total, t) => {
          if (t.time_shifts) {
            return total + t.time_shifts.reduce((acc, s) => {
              const add = moment(s.end).diff(s.start, 'hours', true)
              return acc + add
            }, 0)
          } else return total
        }, 0)
        return Math.round(shifts * 10) / 10
      } else return 0
    }
  }
}
</script>
