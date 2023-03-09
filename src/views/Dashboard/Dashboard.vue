<template>
    <div>
        <AlbumScrollableGallery />

        <DashboardInterface />

        <router-view />
    </div>
</template>

<script>
import DashboardInterface from "@/views/Dashboard/DashboardInterface"
import AlbumScrollableGallery from "@/views/Dashboard/AlbumScrollableGallery"

export default {
    components: {AlbumScrollableGallery, DashboardInterface},
}
</script>
