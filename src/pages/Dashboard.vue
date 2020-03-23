<template>
  <div class="row q-col-gutter-md q-pa-md">
    <div class="col-12">
      <q-card class="full-width">
        <q-item>
          <q-item-section>
            <store-list store="calls" :filters="callsFilters" hideFilters hideNoResult no-select>
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
                      <q-btn @click="callCreateDialog = true"
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
            </store-list>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
    <div class="col-12">
      <q-card class="full-width">
        <q-item>
          <q-item-section>
            <store-list store="tasks" :filters="tasksFilters" hideFilters hideNoResult no-select>
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
                      <q-btn @click="taskCreateDialog = true"
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
            </store-list>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
    <edit-dialog v-model="callCreateDialog" store="calls" />
    <edit-dialog v-model="taskCreateDialog" store="tasks" />
  </div>
</template>

<script>
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
      callCreateDialog: false,
      taskCreateDialog: false
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
    StoreList: () => import('../components/generic/StoreList'),
    EditDialog: () => import('../components/generic/EditDialog')
  }
}
</script>
