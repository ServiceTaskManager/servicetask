import { Dialog } from 'quasar'
import UserPrompt from '../../components/user/UserPrompt'

import { i18n } from '../../boot/i18n'

console.log(i18n)

i18n.locale = window.localStorage.getItem('lang')

const calls = {
  state: {
    data: {},
    titleProp: 'title',
    routes: [{
      path: 'calls',
      name: 'calls',
      component: () => import('../../pages/StoreListPage'),
      meta: {
        title: i18n.t('calls.route.list.title'),
        icon: 'phone_callback',
        color: 'orange',
        menu: true
      }
    }, {
      path: 'call/:id',
      name: 'call',
      component: () => import('../../pages/StorePage'),
      meta: {
        title: i18n.t('calls.route.single.title'),
        icon: 'phone_callback',
        color: 'orange'
      }
    }],
    fields: [{
      key: 'title',
      component: 'TextField',
      attrs: {
        iconName: 'phone_callback',
        iconColor: 'orange',
        label: i18n.t('calls.fields.title.label'),
        rules: [val => !!val || i18n.t('calls.fields.title.validation.empty')]
      }
    }, {
      key: 'customer',
      component: 'CustomerField',
      attrs: {
        rules: [val => !!val || i18n.t('calls.fields.customer.validation.required')]
      }
    }, {
      key: 'engine',
      component: 'EngineField'
    }, {
      key: 'person',
      component: 'UserField',
      attrs: {
        label: i18n.t('calls.fields.person.label')
      }
    }, {
      key: 'teamviewer',
      component: 'TeamviewerField'
    }, {
      key: 'phone',
      component: 'TextField',
      attrs: {
        iconName: 'phone',
        iconColor: 'grey',
        label: i18n.t('calls.fields.phone.label'),
        mask: '+## # ## ## ## ## NNNNNNN',
        type: 'tel'
      }
    }, {
      key: 'technician',
      component: 'UserField',
      attrs: {
        label: i18n.t('calls.fields.technician.label')
      }
    }, {
      key: 'open',
      component: 'BooleanField',
      attrs: {
        iconColor: 'orange',
        label: i18n.t('calls.fields.open.label'),
        rules: [val => !!val || 'Status is required']
      }
    }],
    actions: [{
      label: 'Assign',
      icon: 'person_add',
      color: 'grey',
      action: 'assignTechnicianPrompt'
    }, {
      label: 'Unassign',
      icon: 'person_add_disabled',
      color: 'grey',
      patch: { technician: '' }
    }, {
      label: 'Close',
      icon: 'cancel',
      color: 'grey',
      patch: { open: false }
    }, {
      label: 'Open',
      icon: 'arrow_back',
      color: 'grey',
      patch: { open: true }
    }]
  },
  actions: {
    assignTechnicianPrompt ({ dispatch }, data) {
      Dialog.create({
        component: UserPrompt,
        parent: data.parent,
        text: 'Assign to'
      }).onOk(userInput => {
        dispatch('patchBatch', { doc: { technician: userInput }, ids: data.ids })
      })
    }
  },
  namespaced: true,
  firestorePath: 'calls',
  firestoreRefType: 'collection',
  moduleName: 'calls',
  statePropName: 'data'
}

export default calls
