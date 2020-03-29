import models from '../models'

const routes = [
  {
    path: '/error',
    component: () => import('layouts/Base'),
    children: [
      {
        path: '/403',
        name: '403',
        component: () => import('pages/Error403'),
        meta: {
          title: 'Error 403'
        }
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/Base'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('pages/Dashboard'),
        meta: {
          title: 'Dashboard',
          description: 'Global overview'
        }
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/Login'),
        meta: {
          title: 'Login',
          noHeader: true,
          noDrawer: true
        }
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('pages/Settings'),
        meta: {
          title: 'Settings'
        }
      },
      {
        path: 'maps',
        name: 'maps',
        components: {
          default: () => import('pages/Maps'),
          toolbar: () => import('pages/MapsToolbar')
        },
        meta: {
          title: 'Maps'
        }
      },
      {
        path: 'calendar',
        name: 'calendar',
        components: {
          default: () => import('pages/CalendarPage'),
          toolbar: () => import('pages/CalendarToolbar')
        },
        meta: {
          title: 'Calendar'
        }
      }
    ]
  }
]

const _models = models()
_models.routes.forEach(r => {
  let newRoute = r.route
  newRoute.meta.store = r.model.name + 's'
  newRoute.meta.model = r.model.name
  routes[1].children.push(newRoute)
})

routes.push({
  path: '*',
  component: () => import('layouts/Base'),
  children: [
    {
      path: '*',
      name: '404',
      component: () => import('pages/Error404')
    }
  ]
})

export default routes
