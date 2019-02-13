
const routes = [
  {
    path: '/',
    component: () => import('layouts/Base.vue'),
    children: [
      { path: '/', name: 'dashboard', component: () => import('pages/Dashboard.vue') }
    ]
  },
  {
    path: '/calls',
    component: () => import('layouts/Base.vue'),
    children: [
      { path: '/', name: 'calls', component: () => import('pages/Calls.vue') }
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
