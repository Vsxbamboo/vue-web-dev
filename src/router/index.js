import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
    },
    {
      path: '/update-password',
      name: 'update-password',
      component: () => import('@/views/UpdatePassword.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      children: [
        {
          path: 'front',
          name: 'front',
          component: () => import('@/views/Front.vue'),
        },
        {
          path: 'selfinfo',
          name: 'selfinfo',
          component: () => import('@/views/SelfInfo.vue'),
        },
        {
          path: 'contact',
          name: 'contact',
          component: () => import('@/views/Contact.vue'),
        },
        {
          path: 'article',
          name: 'article',
          component: () => import('@/views/Article.vue'),
        },
        {
          path: 'articleinfo',
          name: 'articleinfo',
          component: () => import('@/views/ArticleInfo.vue'),
        },
      ],
      meta: { requireAuth: true },
    },
  ],
})

function isLoggedIn() {
  return !!localStorage.getItem('token')
}

router.beforeEach((to, from, next) => {
  if (
    to.path !== '/login' &&
    to.path !== '/register' &&
    to.path !== '/update-password' &&
    !isLoggedIn()
  ) {
    next('/login')
  } else {
    next()
  }
})

export default router
