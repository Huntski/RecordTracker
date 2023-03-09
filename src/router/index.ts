import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from '../views/Dashboard'
import AlbumDetailPage from "@/views/Dashboard/AlbumDetailPage"
import AppSearchWindow from "@/views/Dashboard/DashboardInterface/AppSearchWindow"

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: '/album/:id',
        name: 'AlbumDetailPage',
        component: AlbumDetailPage,
      },
      {
        path: '/search',
        name: 'AppSearchWindow',
        component: AppSearchWindow,
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
