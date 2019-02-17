const routes = [
  {
    path: '/',
    component: () => import('layouts/Base.vue'),
    children: [
      {
        path: 'calls',
        name: 'calls',
        component: () => import('pages/Calls.vue'),
        meta: {
          title: 'Calls',
          description: 'List of last calls'
        }
      },
      {
        path: 'calls/edit',
        name: 'call_create',
        component: () => import('pages/Calls_edit.vue'),
        meta: {
          title: 'Edit call',
          description: 'Edit or create a new call'
        }
      },
      {
        path: 'calls/edit/:callId',
        name: 'call_edit',
        component: () => import('pages/Calls_edit.vue'),
        meta: {
          title: 'Edit call',
          description: 'Edit or create a new call'
        }
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
