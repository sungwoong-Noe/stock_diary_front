import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  {
    path: '/planning',
    name: 'planning',
    component: () => import('../views/PlanningView.vue'),
    children: [
      {
        path: 'create',
        name: 'planning-create',
        component: () => import('../views/planning/CreatePlan.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
