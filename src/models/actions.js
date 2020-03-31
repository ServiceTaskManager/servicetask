import { i18n } from '../boot/i18n'

export default (model, app) => {
  i18n.locale = app.i18n.vm.locale

  return [{
    label: i18n.t('models.actions.delete.label'),
    icon: 'delete',
    color: 'negative',
    action: 'deleteItem'
  }, {
    props: {
      flat: true,
      round: true,
      icon: 'done',
      textColor: 'white'
    },
    action: 'selectAll',
    toolbar: true,
    customFilter: (component) => {
      let keep = false
      const selected = component.$store.getters[model.name + 's/filter']([['selected', '==', true]])
      if (selected.length === 0) {
        if (!component.$route.params.id) keep = true
      }
      return keep
    }
  }, {
    props: {
      round: true,
      icon: 'done',
      color: 'white',
      textColor: 'black'
    },
    action: 'unselectAll',
    toolbar: true,
    customFilter: (component) => {
      let keep = false
      const selected = component.$store.getters[model.name + 's/filter']([['selected', '==', true]])
      if (selected.length > 0) {
        if (!component.$route.params.id) keep = true
      }
      return keep
    }
  }, {
    props: {
      round: true,
      icon: 'edit',
      color: 'white',
      flat: true
    },
    action: 'edit',
    toolbar: true,
    customFilter: (component) => {
      const selected = component.$store.getters[model.name + 's/filter']([['selected', '==', true]])
      return selected.length === 1
    }
  }]
}
