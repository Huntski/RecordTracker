<template>
    <div>
        <AlbumScrollableGallery />

        <DashboardInterface />
    </div>
</template>

<script lang="ts">
import DashboardInterface from "@/views/Dashboard/DashboardInterface"
import AlbumScrollableGallery from "@/views/Dashboard/AlbumScrollableGallery"

export default {
    components: {AlbumScrollableGallery, DashboardInterface},
}
</script>
