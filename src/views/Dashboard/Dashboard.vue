<template>
    <div>
        <AlbumScrollableGallery />

        <DashboardInterface />

        <AlbumDetailPage v-if="this.$store.getters['album/getRequestedAlbumId']" />
    </div>
</template>

<script>
import DashboardInterface from "@/views/Dashboard/DashboardInterface"
import AlbumScrollableGallery from "@/views/Dashboard/AlbumScrollableGallery"
import AlbumDetailPage from "@/views/Dashboard/AlbumDetailPage"

export default {
    components: {AlbumScrollableGallery, DashboardInterface, AlbumDetailPage},
}
</script>
