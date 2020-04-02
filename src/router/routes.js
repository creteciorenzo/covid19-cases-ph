const routes = [{
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
        path: '',
        component: () => import('pages/covid19Cases')
      },
      {
        path: 'facility',
        component: () => import('pages/Facility.vue')
      },
      {
        path: 'checkpoints',
        component: () => import('pages/mmCheckpoints.vue')
      }
    ]
  },

]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
