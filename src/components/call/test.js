let calls = this.$store.getters['calls/filter']().reduce((acc, c) => {
  const date = moment(c.created_at).format('YYYY/MM/DD')
  let row = acc.filter(a => a.x === date)[0] || { x: date, y: 0 }
  let rest = acc.filter(a => a.x !== date) || []
  row.y++
  acc = rest.concat(row)
  if (acc.