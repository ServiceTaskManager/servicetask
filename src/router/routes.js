
const routes = [
  {
    path: '/',
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
        name: 'call_create',
        component: () => import('pages/Calls_edit.vue'),
        meta: {
          title: 'Edit call',
          description: 'Edit or create a new call'
        }
      },
      {
        path: 'edit/:callId',
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
