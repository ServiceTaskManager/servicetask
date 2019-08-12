<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-black text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="statics/app-logo-128x128.png">
          </q-avatar>
          {{ $route.meta.title }}
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="right"
      side="right"
      behavior="mobile"
      elevated>
      <q-img class="absolute-top bg-black" v-if="$store.state.user.login" src="https://cdn.quasar.dev/img/material.png" style="height: 110px">
        <div class="absolute-bottom">
          <div class="text-weight-bold text-right">{{ user.data.display_name }}</div>
        </div>
        <div class="absolute-bottom-left bg-transparent">
          <q-avatar
            size="80px"
            elevated
            color="teal"
            class="text-white">
            {{ initial }}
          </q-avatar>
        </div>
        <div class="absolute-top bg-transparent full-width">
          <q-btn round
            size="sm"
            class="float-right on-right"
            color="grey-5"
            icon="settings"
            :to="{ name: 'settings' }" />
          <q-btn round
            size="sm"
            class="float-right on-right"
            color="negative"
            icon="logout"
            @click="logout" />
        </div>
      </q-img>

      <div class="q-pa-sm bg-grey-9 full-height">
        <q-scroll-area style="height: calc(100% - 110px); margin-top: 110px">
          <div>
            <q-list class="text-white">
              <q-item
                v-for="(m, key) in $store.state.firestore.metas"
                :key="key"
                :to="{ name: key }">
                <q-item-section avatar>
                  <q-icon :color="m.color" :name="m.icon" />
                </q-item-section>
                <q-item-section>
                  {{ m.name }}
                </q-item-section>
              </q-item>

              <q-item to="dashboard">
                <q-item-section avatar>
                  <q-icon color="grey" name="dashboard" />
                </q-item-section>
                <q-item-section>
                  Dashboard
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-scroll-area>
      </div>
    </q-drawer>

    <q-page-container>
      <q-page padding class="bg-grey-3">
        <div v-if="$store.state.firestore.ready" >
          <router-view />
        </div>
        <div v-else class="row justify-center">
          <q-linear-progress stripe rounded style="height: 50px; width: 75%; margin-top: 100px;" color="warning" :value="$store.state.firestore.loading" />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Base',
  data () {
    return {
      right: false,
      notificationToken: ''
    }
  },
  mounted () {
    this.notificationToken = localStorage.getItem('token')
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    notificationEnable () {
      return this.$store.state.tokens.main.tokens.includes(this.notificationToken)
    },
    ...mapGetters([
      'initial'
    ])
  },
  methods: {
    logout () {
      this.$auth.signOut()
    },
    toggleNotification () {
      console.log('toggleNotification')
      let tokens = this.$store.state.tokens.main
      if (this.notificationEnable) {
        console.log('Remove token from list')
        let newTokens = tokens.tokens.filter(t => t !== this.notificationToken)
        tokens.tokens = newTokens
      } else {
        console.log('Add token to list')
        if (!tokens.tokens.includes(this.notificationToken) && this.notificationToken) {
          tokens.tokens.push(this.notificationToken)
        }
      }
      console.log(tokens)
      this.$store.dispatch('tokens/set', tokens)
    }
  }
}
</script>

<style>
</style>
