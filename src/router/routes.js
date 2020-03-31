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
          title: 'menu.403'
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
          title: 'menu.dashboard',
          description: 'Global overview'
        }
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/Login'),
        meta: {
          title: 'menu.login',
          noHeader: true,
          noDrawer: true
        }
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('pages/Settings'),
        meta: {
          title: 'menu.settings'
        }
      },
      {
        path: 'map',
        name: 'map',
        components: {
          default: () => import('pages/MapPage'),
          toolbar: () => import('pages/MapToolbar')
        },
        meta: {
          title: 'menu.maps'
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
          title: 'menu.calendar'
        }
      }
    ]
  }
]

routes.push({
  path: '*',
  redirect: '/dashboard'
})

export default routes
