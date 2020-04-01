import * as models from '../models/plugin'

export default ({ Vue, app, router }) => {
  Vue.use(models.plugin, app) // Use models plugin (load models as computed properties)

  // Create the route based on models
  let routesToAdd = {
    path: '/',
    component: () => import('layouts/Base'),
    children: []
  }
  const modelsRoutes = models.models(app).routes
  modelsRoutes.forEach(r => {
    routesToAdd.children.push(r)
  })
  router.addRoutes([routesToAdd])
}
