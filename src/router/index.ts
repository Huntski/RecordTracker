import {createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw} from 'vue-router'
import Dashboard from '../views/Dashboard'
import AlbumDetailPage from "@/views/Dashboard/AlbumDetailPage"
import ArtistDetailPage from "@/views/Dashboard/ArtistDetailPage"
import AppSearchWindow from "@/views/Dashboard/AppSearchWindow"
import EditArtistPage from "@/views/Dashboard/EditArtistPage"

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

      {
        path: '/artist/:id/edit',
        name: 'EditArtistPage',
        component: EditArtistPage,
      },
    ]
  },
]

const router = createRouter({
  history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
  routes
})

export default router
