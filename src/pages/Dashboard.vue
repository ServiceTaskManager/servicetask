<template>
  <div class="row q-col-gutter-md q-pa-md">
    <div class="col-12">
      <q-card class="full-width">
        <q-item>
          <q-item-section>
            <call-list :filters="callsFilters" hideFilters hideNoResult no-select>
              <template v-slot:header>
                <q-item>
                  <q-item-section avatar>
                    <q-icon :name="$calls.meta.icon" :color="$calls.meta.color" />
                  </q-item-section>
                  <q-item-section class="text-bold">
                    <span v-if="callStat < 1">
                      So far, so good.
                    </span>
                    <span v-else>
                      Keep going
                    </span>
                  </q-item-section>
                  <q-item-section side>
                    <div class="row">
                      <q-btn @click="callDialog = true"
                        flat round dense
                        icon="add"
                        :color="$calls.meta.color" />
                      <q-btn :to="{ name: 'calls' }"
                        flat round dense
                        icon="list"
                        :color="$calls.meta.color" />
                    </div>
                  </q-item-section>
                </q-item>
              </template>
            </call-list>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
    <div class="col-12">
      <q-card class="full-width">
        <q-item>
          <q-item-section>
            <task-list :filters="tasksFilters" hideFilters hideNoResult no-select>
              <template v-slot:header>
                <q-item>
                  <q-item-section avatar>
                    <q-icon :name="$tasks.meta.icon" :color="$tasks.meta.color" />
                  </q-item-section>
                  <q-item-section class="text-bold">
                    <span v-if="taskStat < 1">
                      So far, so good.
                    </span>
                    <span v-else>
                      Keep going
                    </span>
                  </q-item-section>
                  <q-item-section side>
                    <div class="row">
                      <q-btn @click="taskDialog = true"
                        flat round dense
                        icon="add"
                        :color="$tasks.meta.color" />
                      <q-btn :to="{ name: 'tasks' }"
                        flat round dense
                        icon="list"
                        :color="$tasks.meta.color" />
                    </div>
                  </q-item-section>
                </q-item>
              </template>
            </task-list>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
    <call-edit-dialog v-model="callDialog" />
    <task-edit-dialog v-model="taskDialog" />
  </div>
</template>

<script>
import CallList from '../components/CallList'
import TaskList from '../components/TaskList'
import TaskEditDialog from '../components/TaskEditDialog'
import CallEditDialog from '../components/CallEditDialog'

export default {
  name: 'Dashboard',
  data () {
    return {
      tasksFilters: [
        ['done', '==', false],
        ['user', '==', this.$user.data.id]],
      callsFilters: [
        ['status', '==', 'open']
      ],
      callDialog: false,
      taskDialog: false
    }
  },
  computed: {
    callStat () {
      return this.$store.getters['calls/stat'](this.callsFilters)
    },
    taskStat () {
      return this.$store.getters['tasks/stat'](this.tasksFilters)
    }
  },
  components: {
    CallList,
    TaskList,
    TaskEditDialog,
    CallEditDialog
  }
}
</script>
