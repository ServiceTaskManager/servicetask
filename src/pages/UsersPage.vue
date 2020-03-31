<template>
  <div class="full-width row q-pa-sm-md justify-around">
    <q-card class="col-sm col-12">
      <q-card-section>
        <span class="text-h6">{{$t('users.admins.title')}}</span>
      </q-card-section>
      <q-card-section>
        <st-list model="user" :filters="[['roles', 'includes', ['admin']]]" />
      </q-card-section>
    </q-card>
    <q-card class="col-sm col-12 q-ml-sm-md q-mt-sm-none q-mt-sm">
      <q-card-section>
        <span class="text-h6">{{$t('users.users.title')}}</span>
      </q-card-section>
      <q-card-section>
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
