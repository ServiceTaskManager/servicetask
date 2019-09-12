const filter = (data, filters) => {
  let dataFiltered = data.filter(d => {
    let keep = Boolean
    for (let property in filters) {
      let operator = filters[property][0]
      let filterValue = filters[property][1]
      let dataValue = d[property]
      let result = Boolean
      if (filterValue !== '') {
        if (dataValue !== undefined) {
          if (operator === 'contains') result = dataValue.toLowerCase().indexOf(filterValue.toLowerCase()) > -1
          else if (operator === 'includes') result = dataValue.includes(filterValue)
          else if (operator === '==') result = dataValue === filterValue
        } else {
          result = false
        }
      } else {
        result = true
      }
      keep = keep && result
    }
    return keep
  })
  return dataFiltered
}

export default filter
