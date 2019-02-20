<template>
  <q-layout view="hHr LpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-input dark dense standout v-model="search" class="full-width" input-class="text-right">
          <template v-slot:append>
            <q-icon v-if="search === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
          </template>
        </q-input>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="left"
      side="left">

      <q-scroll-area style="height: calc(100% - 170px); margin-top: 170px; border-right: 1px solid #ddd">
        <q-list>
          <q-item-label header>Manage</q-item-label>
          <q-item clickable to="/">
            <q-item-section avatar>
               <q-icon name="assignment" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                Tasks <q-badge color="negative">{{ taskCount }}</q-badge>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/customers">
            <q-item-section avatar>
               <q-icon name="group" />
            </q-item-section>
            <q-item-section>Accounts</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="https://cdn.quasar-framework.org/img/material.png" style="height: 170px;">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar-framework.org/img/boy-avatar.png">
          </q-avatar>
          <div class="text-weight-bold">{{ user.email }}</div>
          <div>
            <q-btn round color="negative" icon="logout" size="sm" @click="logout" />&nbsp;
            <q-btn round color="grey" icon="settings" size="sm" />
          </div>
        </div>
      </q-img>
    </q-drawer>

    <q-drawer v-model="right" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="text-white" :class="'bg-'+addForm.task.color">
      <q-toolbar>
        <q-select
          dense
          standout
          use-input
          v-model="addForm.values[addForm.field.key]"
          :label="addForm.field.label"
          :options="addForm.field.optionsFiltered"
          @filter="filterFn"
          class="full-width">
          <template v-slot:before>
            <q-fab :color="addForm.task.color" :icon="addForm.task.icon" direction="up">
              <q-fab-action
                v-for="(task, key) in addForm.tasks"
                :key="key"
                :color="task.color"
                :icon="task.icon"
                @click='setActiveAdd(key)' />
            </q-fab>
          </template>

          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>

          <template v-slot:after>
            <q-btn round dense flat icon="forward" @click.native="submit" />
          </template>
        </q-select>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  name: 'Base',
  data () {
    return {
      left: true,
      right: false,
      search: '',
      addForm: {
        field: {},
        task: {},
        values: {},
        step: 0,
        default: 'customer',
        tasks: {
          customer: {
            name: 'Customer',
            icon: 'group',
            color: 'pink',
            store: 'customer',
            fields: [
              {
                key: 'name',
                label: 'Customer name',
                multiple: false,
                create: true
              }
            ]
          },
          call: {
            name: 'Call',
            icon: 'phone_forwarded',
            color: 'orange',
            store: 'task',
            fields: [
              {
                key: 'customer',
                label: 'Customer',
                store: 'customer',
                options: ['Test', 'Test']
              }
            ]
          },
          upgrade: {
            name: 'Upgrade',
            icon: 'update',
            color: 'purple',
            fields: [
              {
                type: 'text',
                key: 'customer',
                label: 'Customer'
              }
            ]
          },
          action: {
            name: 'Action',
            icon: 'done',
            color: 'red',
            fields: [
              {
                type: 'text',
                key: 'customer',
                label: 'Customer'
              }
            ]
          }
        }
      }
    }
  },
  computed: {
    user () {
      return this.$auth.currentUser
    },
    taskCount () {
      return Object.keys(this.$store.state.task.data).length
    }
  },
  mounted () {
    this.$store.dispatch('task/openDBChannel')
    this.$store.dispatch('customer/openDBChannel')
    this.setActiveAdd(this.addForm.default)
  },
  methods: {
    logout () {
      this.$store.dispatch('user/logout', this)
    },
    submit () {
      this.$store.dispatch(this.addForm.task.store + '/set', this.addForm.values)
    },
    filterFn (val, done) {
      if (this.addForm.field.options !== undefined) {
        if (val !== '') {
          const needle = val.toLowerCase()
          let newOptions = this.addForm.field.options.filter(v => v.toLowerCase().indexOf(needle) > -1)
          this.addForm.field.optionsFiltered = newOptions.sort()
        } else {
          this.addForm.field.optionsFiltered = this.addForm.field.options
        }
        console.log(this.addForm.field.optionsFiltered)
      }

      done()
    },
    setActiveAdd (key) {
      console.log(key)
      this.addForm.task = this.addForm.tasks[key]
      this.addForm.field = this.addForm.task.fields[0]
      this.addForm.values = {}
      this.addForm.step = 0

      if (this.addForm.field.store) {
        this.addForm.field.options = Object.keys(this.$store.state[this.addForm.field.store].data)
      }
      this.addForm.field.optionsFiltered = this.addForm.field.options
    }
  }
}
</script>

<style>
</style>
