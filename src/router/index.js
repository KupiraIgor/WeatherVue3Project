import { createRouter, createWebHistory, RouterView } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FavoritesView from '@/views/FavoritesView.vue'
import { Trans } from '@/i18n/index.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:locale?',
      redirect: `/${Trans.currentLocale}`,
      beforeEnter: Trans.routeMiddleware,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: 'favorites',
          name: 'favorites',
          component: FavoritesView
        }
      ]
    }
  ]
})

export default router
