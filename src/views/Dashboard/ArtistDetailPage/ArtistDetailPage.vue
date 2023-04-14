<template>
    <DashboardPageModal class="absolute top-0 left-0 bottom-0 right-0 m-auto w-full h-full flex justify-center items-center">
        <BackgroundOverlay @click="closeWindow" />

        <div id="artist-detail-page" class="animate--reveal bg-gradient-to-br from-section-start to-section-end overflow-y-scroll relative box-border rounded-xl text-white base-scrollbar">
            <ArtistDetailHeader />

            <main class="max-w-6xl justify-center items-center w-full mx-auto h-full scrollbar-hidden">
                <ArtistBio :artist="artist" />

                <OwnedAlbums class="ml-20" />
            </main>
        </div>
    </DashboardPageModal>
</template>

<script lang="ts" setup>
import BackgroundOverlay from "@/components/BackgroundOverlay"
import {getArtist} from "@/services/artistService"
import {useRoute} from "vue-router"
import router from "@/router"
import ArtistDetailHeader from './ArtistDetailHeader'
import OwnedAlbums from "@/views/Dashboard/ArtistDetailPage/OwnedAlbums"
import ArtistBio from "@/views/Dashboard/ArtistDetailPage/ArtistBio"
import DashboardPageModal from "@/views/Dashboard/@components/DashboardPageModal.vue"

const artist = await getArtist(Number(useRoute().params.id))

function closeWindow() {
    router.push({name: 'Dashboard'})
}

function handleKeyPressEvent(e: KeyboardEvent) {
    if (e.key === 'Escape') {
        closeWindow()

        document.onkeydown = null
    }
}

document.addEventListener('keydown', handleKeyPressEvent)
</script>
