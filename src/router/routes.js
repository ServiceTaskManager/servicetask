const routes = [
  {
    path: '/error',
    component: () => import('layouts/Base.vue'),
    children: [
      {
        path: '/403',
        name: '403',
        component: () => import('pages/Error403.vue'),
        meta: {
          title: 'Error 403'
        }
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/Base.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('pages/Dashboard.vue'),
        meta: {
          title: 'Dashboard',
          description: 'Global overview'
        }
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/Login.vue'),
        meta: {
          title: 'Login'
        }
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('pages/Settings.vue'),
        meta: {
          title: 'Settings'
        }
      },
      {
        path: 'maps',
        name: 'maps',
        component: () => import('pages/Maps.vue'),
        meta: {
          title: 'Maps'
        }
      },
      {
        path: 'calendar',
        name: 'calendar',
        component: () => import('pages/Calendar.vue'),
        meta: {
          title: 'Calendar'
        }
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('pages/Users.vue'),
        meta: {
          title: 'Users'
        }
      },
      {
        path: 'calls',
        name: 'calls',
        component: () => import('pages/Calls.vue'),
        meta: {
          title: 'Calls'
        }
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: () => import('pages/Tasks.vue'),
        meta: {
          title: 'Tasks'
        }
      },
      {
        path: 'engines',
        name: 'engines',
        component: () => import('pages/Engines.vue'),
        meta: {
          title: 'Engines'
        }
      },
      {
        path: 'engine',
        name: 'engine',
        component: () => import('pages/Engine.vue'),
        meta: {
          title: 'Engine details'
        }
      },
      {
        path: 'customers',
        name: 'customers',
        component: () => import('pages/Customers.vue'),
        meta: {
          title: 'Customers'
        }
      },
      {
        path: 'customer',
        name: 'customer',
        component: () => import('pages/Customer.vue'),
        meta: {
          title: 'Customer details'
        }
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
      component: () => import('pages/Error404.vue')
    }
  ]
})

export default routes
