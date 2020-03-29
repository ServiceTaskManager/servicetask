import call from './call'
import customer from './customer'
import engine from './engine'
import report from './report'
import task from './task'
import user from './user'

import actions from './actions'

export default (locale) => {
  const models = [ call, customer, engine, report, task, user ]
  let _models = {}
  let menu = []
  let routes = []
  models.forEach(m => {
    let _m = m(locale) // Execute models with locale
    if (!_m.actions) _m.actions = []
    _m.actions = _m.actions.concat(actions(_m)) // Aggregate models actions with common actions
    _models[_m.name] = _m

    if (_m.routes) { // Fetch routes
      _m.routes.forEach(r => {
        const route = {
          route: r,
          model: _m
        }
        routes.push(route)
        if (r.meta.menu) menu.push(route) // Add to menu if needed
      })
    }
  })
  _models.menu = menu
  _models.routes = routes
  return _models
}
