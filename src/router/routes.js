import firestore from '../store/firestore'

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
        component: () => import('pages/Maps'),
        meta: {
          title: 'Maps'
        }
      },
      {
        path: 'calendar',
        name: 'calendar',
        component: () => import('pages/CalendarPage'),
        meta: {
          title: 'Calendar'
        }
      }
    ]
  }
]

firestore.stores.forEach(s => {
  if (s.state.routes) {
    s.state.routes.forEach(r => {
      let newRoute = r
      newRoute.meta.actions = s.state.actions
      newRoute.meta.store = s.moduleName
      routes[1].children.push(newRoute)
    })
  }
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
