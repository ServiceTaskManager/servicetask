const filter = (data, filters) => {
  let dataFiltered = data.filter(d => {
    let keep = Boolean
    filters.forEach(f => {
      let value = d[f.property]
      let result = Boolean
      if (f.value !== '') {
        if (f.filter === 'contains') result = value.toLowerCase().indexOf(f.value.toLowerCase()) > -1
        else if (f.filter === 'includes') result = value.includes(f.value)
        else if (f.filter === 'boolean') result = value === f.value
      } else {
        return true
      }
      keep = keep && result
    })
    return keep
  })
  return dataFiltered
}

export default filter
