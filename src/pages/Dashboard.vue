<template>
  <div class="row q-col-gutter-md">
    <div class="col-12 col-sm-6">
      <q-card>
        <q-card-section top class="q-pa-xs">
          <div class="row items-center">
            <div class="col-4">
              <q-circular-progress
                show-value
                class="q-ma-xs q-pa-none"
                :value="callKnob"
                size="80px"
                :thickness="0.2"
                color="green"
                center-color="white"
                track-color="orange">
                {{  callsStats.assigned }} / {{ callsStats.assigned + callsStats.unassigned }}
              </q-circular-progress>
            </div>
            <div class="col-8">
              <div v-if="callsStats.unassigned === 0">
                <span class="text-h5">Congrats,</span><br>
                <span caption>all the calls are assigned.</span>
              </div>
              <div v-else-if="callsStats.unassigned === 1">
                <span class="text-h5">1 customer</span><br>
                <span caption>is waiting for a call back.</span>
              </div>
              <div v-else>
                <span class="text-h5">{{ callsStats.unassigned }} calls</span><br>
                <span caption>remains without any call back.</span>
              </div>
            </div>
          </div>
          <div class="row justify-end">
            <q-btn :to="{ name: 'callsCreate', params: { id: 'create' } }"
              flat
              icon="add"
              color="primary"
              class="col" />
            <q-btn :to="{ name: 'calls' }"
              flat
              icon="list"
              color="grey-8"
              class="col" />
          </div>
        </q-card-section>

        <q-card-section class="q-pa-sm">
          <q-list>
            <call-item
              v-for="call in $store.getters['calls/byStatus'](['unassigned'])"
              :key="call.id"
              :call="call"
              light />
          </q-list>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12 col-sm-6">
      <q-card>
        <q-card-section top class="q-pa-md text-center">
          <div>
            <div v-if="tasksStats.todo === 0">
              <span class="text-h5">Congrats,</span><br>
              <span caption>you're done with everything. Take a rest.</span>
            </div>
            <div v-else>
              <span class="text-h5">Keep going,</span><br>
              <span caption>you can do it.</span>
            </div>
          </div>
          <div class="row justify-end">
            <q-btn :to="{ name: 'tasksCreate', params: { id: '' } }"
              flat
              icon="add"
              color="primary"
              class="col" />
            <q-btn :to="{ name: 'tasks' }"
              flat
              icon="list"
              color="grey-8"
              class="col" />
          </div>
        </q-card-section>

        <q-card-section class="q-pa-sm">
          <q-list>
            <task-item
              v-for="task in $store.getters['tasks/todo']"
              :key="task.id"
              :task="task"
              light />
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import CallItem from '../components/CallItem'
import TaskItem from '../components/TaskItem'

export default {
  name: 'Dashboard',
  data () {
    return {
      tasks: []
    }
  },
  computed: {
    callsStats () {
      return this.$store.getters['calls/stats']
    },
    tasksStats () {
      return this.$store.getters['tasks/stats']
    },
    callKnob () {
      return this.callsStats.assigned / (this.callsStats.assigned + this.callsStats.unassigned) * 100
    }
  },
  components: {
    CallItem,
    TaskItem
  }
}
</script>
