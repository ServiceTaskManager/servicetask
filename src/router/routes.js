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
        path: '',
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
        component: () => import('pages/Calendar'),
        meta: {
          title: 'Calendar'
        }
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('pages/Users'),
        meta: { store: 'users' }
      },
      {
        path: 'user/:id',
        name: 'user',
        component: () => import('pages/User'),
        meta: { store: 'users' }
      },
      {
        path: 'calls',
        name: 'calls',
        component: () => import('pages/Calls'),
        meta: { store: 'calls' }
      },
      {
        path: 'call/:id',
        name: 'call',
        component: () => import('pages/Call'),
        meta: { store: 'calls' }
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: () => import('pages/Tasks'),
        meta: { store: 'tasks' }
      },
      {
        path: 'task/:id',
        name: 'task',
        component: () => import('pages/Task'),
        meta: { store: 'tasks' }
      },
      {
        path: 'engines',
        name: 'engines',
        component: () => import('pages/Engines'),
        meta: { store: 'engines' }
      },
      {
        path: 'engine/:id',
        name: 'engine',
        component: () => import('pages/Engine'),
        meta: { store: 'engines' }
      },
      {
        path: 'customers',
        name: 'customers',
        component: () => import('pages/Customers'),
        meta: { store: 'customers' }
      },
      {
        path: 'customer/:id',
        name: 'customer',
        component: () => import('pages/Customer'),
        meta: { store: 'customers' }
      }
    ]
  }
]

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
