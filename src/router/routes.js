import firestore from '../store/firestore'

// Generate pages routes based on stores.
let pages = [
  {
    path: '',
    name: 'dashboard',
    component: () => import('pages/Dashboard.vue'),
    meta: {
      title: 'Dashboard',
      description: 'Global overview',
      requireAuth: true,
      requireRoles: ['admin']
    }
  }]

firestore.stores.forEach(store => {
  let page = {
    path: store.moduleName,
    name: store.moduleName,
    component: () => import('pages/' + store.vue),
    meta: {
      title: store.moduleName,
      requireAuth: true,
      requireRoles: store.readRoles
    }
  }
  pages.push(page)
})

// Set other routes
const routes = [
  {
    path: '/login',
    component: () => import('layouts/Single.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/Login.vue'),
        meta: {
          requireAuth: false,
          title: 'Login'
        }
      }
    ]
  },
  {
    path: '/error',
    component: () => import('layouts/Single.vue'),
    children: [
      {
        path: '/403',
        name: '403',
        component: () => import('pages/Error403.vue'),
        meta: {
          requireAuth: false,
          title: 'Error 403'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('pages/Error404.vue'),
        meta: {
          requireAuth: false,
          title: 'Error 404'
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

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
