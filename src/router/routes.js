
const routes = [
  {
    path: '/',
    component: () => import('layouts/Base.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('pages/Dashboard.vue'),
        meta: {
          title: 'Customer support',
          description: 'Tools for customer support'
        }
      }
    ]
  },
  {
    path: '/calls',
    component: () => import('layouts/Base.vue'),
    children: [
      {
        path: '',
        name: 'calls',
        component: () => import('pages/Calls.vue'),
        meta: {
          title: 'Calls',
          description: 'List of last calls'
        }
      },
      {
        path: 'edit',
        name: 'call_edit',
        component: () => import('pages/Calls_edit.vue'),
        meta: {
          title: 'Edit call',
          description: 'Edit or create a new call'
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
