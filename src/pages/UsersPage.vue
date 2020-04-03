<template>
  <div class="full-width row q-pa-sm-md justify-around">
    <q-card class="col-sm col-12">
      <q-toolbar class="text-white bg-grey-3">
        <q-toolbar-title>
          <span
            class="text-h6 overflow-hidden"
            :class="'text-' + $models.user.meta.color">
            {{$t('users.admins.title')}}
          </span>
        </q-toolbar-title>
      </q-toolbar>
      <q-card-section class="q-pa-none">
        <st-list model="user" :filters="[['roles', 'includes', ['admin']]]" no-right />
      </q-card-section>
    </q-card>
    <q-card class="col-sm col-12 q-ml-sm-md q-mt-sm-none q-mt-sm">
      <q-toolbar class="text-white bg-grey-3">
        <q-toolbar-title>
          <span
            class="text-h6 overflow-hidden"
            :class="'text-' + $models.user.meta.color">
            {{$t('users.users.title')}}
          </span>
        </q-toolbar-title>
      </q-toolbar>
      <q-card-section class="q-pa-none">
        <st-list model="user" :filters="[['roles', 'includes', ['user']]]" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'UserPage',
  components: {
    StList: () => import ('../components/generic/StList')
  }
}
</script>
