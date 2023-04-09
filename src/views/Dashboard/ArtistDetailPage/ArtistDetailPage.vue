<template>
    <div class="absolute top-0 left-0 bottom-0 right-0 m-auto w-full h-full flex justify-center items-center">
        <BackgroundOverlay @click="closeWindow" />

        <div v-if="artist" class="bg-gradient-to-b from-[#1E1E1E] to-[#232323] relative artist-detail-page box-border rounded-xl text-white base-scrollbar overflow-y-scroll overflow-x-hidden xl:overflow-hidden">
            <CloseButton class="absolute top-0 right-0 m-3 z-20" @click="closeWindow" />

            <ArtistsBioSection class="relative w-full" :artist="artist" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import BackgroundOverlay from "@/components/BackgroundOverlay"
import {CloseButton} from "@/components/@buttons"
import {getArtist} from "@/services/artistService"
import {useRoute} from "vue-router"
import router from "@/router"
import ArtistsBioSection from "@/views/Dashboard/AlbumDetailPage/ArtistsBioSection"

const route = useRoute()

const artist = await getArtist(Number(route.params.id))

function closeWindow() {
    router.push({name: 'Dashboard'})
}
</script>

<style>
.artist-detail-page {
    width: 95vw;
    height: 90vh;
}
</style>
