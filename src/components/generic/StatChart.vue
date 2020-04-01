<script>
import { Bar } from 'vue-chartjs'
import moment from 'moment'
import { colors } from 'quasar'

export default {
  name: 'CallChart',
  extends: Bar,
  computed: {
    callData () {
      // Reduce calls to count per day
      let calls = this.$store.getters['calls/filter']().reduce((acc, c) => {
        const date = moment(c.created_at).format('YYYY-MM-DD')
        let row = acc.filter(a => a.x === date)[0] || { x: date, y: 0 }
        let rest = acc.filter(a => a.x !== date) || []
        row.y++
        return rest.concat(row)
      }, [])
      return calls
    },
    taskData () {
      let tasks = this.$store.getters['tasks/filter']().reduce((acc, t) => {
        if (t.time_shifts) {
          t.time_shifts.forEach(s => {
            const date = moment(s.start).format('YYYY-MM-DD')
            let row = acc.filter(a => a.x === date)[0] || { x: date, y: 0 }
            let rest = acc.filter(a => a.x !== date) || []
            row.y += moment(s.end).diff(s.start, 'h')
            acc = rest.concat(row)
          })
        }
        return acc
      }, [])
      return tasks
    }
  },
  mounted () {
    const options = {
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'day'
          },
          distribution: 'linear'
        }],
        yAxes: [{
          id: 'A',
          type: 'linear',
          position: 'left',
          ticks: {
            beginAtZero: true
          }
        }, {
          id: 'B',
          type: 'linear',
          position: 'right',
          ticks: {
            beginAtZero: true
          }
        }]
      },
      responsive: true,
      maintainAspectRatio: false
    }
    const data = {
      datasets: [{
        label: this.$t('components.statchart.callnumber.label'),
        yAxisID: 'A',
        backgroundColor: colors.getBrand('orange'),
        data: this.callData
      }, {
        label: this.$t('components.statchart.workhours.label'),
        yAxisID: 'B',
        backgroundColor: colors.getBrand('light-blue'),
        data: this.taskData
      }]
    }
    this.renderChart(data, options)
  }
}
</script>

<style>
</style>
