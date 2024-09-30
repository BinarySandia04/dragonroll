import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', name: 'home', component: HomeView},
    {path: '/setup/:setupCode', redirect: to => {
      return {path: '/', query: {setupCode: to.params.setupCode}}
    }},
    {path: '/:pathMatch(.*)*', redirect: {name: 'home'} },
  ]
})

export default router
