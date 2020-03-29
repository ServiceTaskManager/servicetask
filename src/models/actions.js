export default (model) => {
  return [{
    label: 'Delete',
    icon: 'remove',
    color: 'danger',
    action: 'deleteDoc'
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
