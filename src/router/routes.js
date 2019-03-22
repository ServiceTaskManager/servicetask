const routes = [
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
  },
  {
    path: '/',
    component: () => import('layouts/Base.vue'),
    children: [
      {
        path: '',
        redirect: '/dashboard'
      },
      {
        path: 'dashboard',
        name: 'component',
        component: () => import('pages/Dashboard.vue'),
        meta: {
          title: 'Dashboard',
          description: 'Global overview'
        }
      },
      {
        path: ':model',
        name: 'model',
        component: (route) => import('pages/Model.vue')
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
