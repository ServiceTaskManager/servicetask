const filter = (data, filters) => {
  let dataFiltered = data.filter(d => {
    let keep = Boolean
    filters = (filters || [])
    filters.forEach(f => {
      let property = f[0]
      let operator = f[1]
      let filterValue = f[2]
      let dataValue = d[property]
      let result = Boolean
      if (filterValue !== '' && filterValue !== undefined) {
        if (dataValue !== undefined) {
          if (operator === 'contains') result = dataValue.toLowerCase().indexOf(filterValue.toLowerCase()) > -1
          else if (operator === 'includes') result = dataValue.filter(d => filterValue.includes(d)).length > 0
          else if (operator === '==') result = filterValue === 'all' ? true : dataValue === filterValue
        } else {
          result = false
        }
      } else {
        result = true
      }
      keep = keep && result
    })
    return keep
  })
  return dataFiltered
}

const stat = (data, filters) => {
  return filter(data, filters).length
}

export { filter, stat }
