import firestore from '../store/firestore'

// Generate pages routes based on stores.
const pages = [
  {
    path: 'dashboard',
    name: 'dashboard',
    component: () => import('pages/Dashboard.vue'),
    meta: {
      title: 'Dashboard',
      description: 'Global overview',
      requireAuth: true,
      requireRoles: ['user']
    }
  },
  {
    path: '',
    name: 'login',
    component: () => import('pages/Login.vue'),
    meta: {
      requireAuth: false,
      title: 'Login'
    }
  },
  {
    path: 'settings',
    name: 'settings',
    component: () => import('pages/Settings.vue'),
    meta: {
      requireAuth: true,
      title: 'Settings'
    }
  },
  {
    path: 'maps',
    name: 'maps',
    component: () => import('pages/Maps.vue'),
    meta: {
      requireAuth: true,
      title: 'Maps'
    }
  },
  {
    path: 'calendar',
    name: 'calendar',
    component: () => import('pages/Calendar.vue'),
    meta: {
      requireAuth: true,
      title: 'Calendar'
    }
  }]

// Create routes for stores with vue.
firestore.stores.forEach(store => {
  if (store.vue) {
    let name = store.moduleName.charAt(0).toUpperCase() + store.moduleName.slice(1)
    pages.push(
      {
        path: store.moduleName,
        name: store.moduleName,
        component: () => import('pages/' + name + '.vue'),
        meta: {
          title: name,
          requireAuth: true,
          requireRoles: store.readRoles
        }
      })
    pages.push(
      {
        path: store.moduleName + '/view',
        name: store.moduleName + 'View',
        component: () => import('pages/' + name + 'View.vue'),
        meta: {
          title: 'View ' + store.moduleName,
          requireAuth: true,
          requireRoles: store.writeRoles
        }
      })
  }
})

// Set other routes
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
          requireAuth: false,
          title: 'Error 403'
        }
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/Base.vue'),
    children: pages
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
