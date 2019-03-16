import base from 'layouts/Base.vue'

const routes = [
  {
    path: '/',
    component: base,
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
        path: 'model/:model',
        name: 'model',
        component: () => import('pages/Dashboard.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/Login.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/Login.vue'),
        meta: {
          title: 'Login'
        }
      }
    ]
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
