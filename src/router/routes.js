const routes = [
  {
    path: '/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'wait', component: () => import('pages/Wait.vue') },
      { path: 'read', component: () => import('pages/Read.vue') },
      { path: 'memorize', component: () => import('pages/Memorize.vue') },
      { path: 'write', component: () => import('pages/Write.vue') },
      { path: 'evaluate', component: () => import('pages/Evaluate.vue') },
      { path: 'statistics', component: () => import('pages/Statistics.vue') }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
