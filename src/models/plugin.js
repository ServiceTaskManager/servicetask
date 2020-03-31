import modelsDef from './index'
import actions from './actions'

function models (app) {
  let _models = {
    routes: [],
    menu: []
  }

  for (let m in modelsDef) {
    // Execute models
    let model = modelsDef[m](app.i18n.vm.locale)
    if (!model.actions) model.actions = []
    model.actions = model.actions.concat(actions(model, app))
    _models[m] = model

    // Add routes and menus
    if (model.routes) {
      model.routes.forEach(r => {
        r.meta = Object.assign(r.meta, model.meta)
        r.meta.store = model.name + 's'
        r.meta.model = model.name
        _models.routes.push(r)
        if (r.meta.menu) _models.menu.push(r) // Add to menu if needed
      })
    }
  }

  return _models
}

const plugin = {
  install (Vue, app) {
    Vue.mixin({
      computed: {
        $models () {
          return models(app)
        }
      }
    })
  }
}

export { plugin, models }
