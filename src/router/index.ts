import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from '../views/Dashboard'
import AlbumDetailPage from "@/views/Dashboard/AlbumDetailPage"
import ArtistDetailPage from "@/views/Dashboard/ArtistDetailPage"
import AppSearchWindow from "@/views/Dashboard/AppSearchWindow"

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
        path: '/artist/:id',
        name: 'ArtistDetailPage',
        component: ArtistDetailPage,
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
