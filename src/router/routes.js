import users from '../store/firestore/users'
import tasks from '../store/firestore/tasks'
import calls from '../store/firestore/calls'
import customers from '../store/firestore/customers'
import { engines } from '../store/firestore/engines'

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
          title: 'Login',
          noHeader: true,
          noDrawer: true
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
        meta: users.state.meta
      },
      {
        path: 'user/:id',
        name: 'user',
        component: () => import('pages/User.vue'),
        meta: Object.assign(users.state.meta, { customTitle: true, editButton: true })
      },
      {
        path: 'calls',
        name: 'calls',
        component: () => import('pages/Calls.vue'),
        meta: calls.state.meta
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: () => import('pages/Tasks.vue'),
        meta: tasks.state.meta
      },
      {
        path: 'engines',
        name: 'engines',
        component: () => import('pages/Engines.vue'),
        meta: engines.state.meta
      },
      {
        path: 'engine/:id',
        name: 'engine',
        component: () => import('pages/Engine.vue'),
        meta: Object.assign(engines.state.meta, { customTitle: true, editButton: true })
      },
      {
        path: 'customers',
        name: 'customers',
        component: () => import('pages/Customers.vue'),
        meta: customers.state.meta
      },
      {
        path: 'customer/:id',
        name: 'customer',
        component: () => import('pages/Customer.vue'),
        meta: Object.assign(customers.state.meta, { customTitle: true, editButton: true })
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
