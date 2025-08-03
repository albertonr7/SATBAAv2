const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'Proyecto/:slug',
        name: 'proyecto',
        component: () => import('pages/ProyectoPage.vue')  // ← Verificar que este archivo existe
      },
    ]
  },
]
export default routes
