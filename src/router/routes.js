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
        path: '',
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
        component: () => import('pages/MapPage'),
        meta: {
          title: 'menu.maps'
        }
      },
      {
        path: 'calendar',
        name: 'calendar',
        component: () => import('pages/CalendarPage'),
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
