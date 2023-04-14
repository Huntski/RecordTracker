<template>
    <DashboardPageModal>
        <div class="animate--reveal relative album-overview bg-gradient-to-br to-gray-900 from-gray-800 box-border rounded-xl text-white overflow-hidden">
            <AlbumDetailHeader />

            <div class="grid grid-cols-3 gap-10 justify-center h-full relative pb-1">
                <div class="h-full pl-14 py-14">
                    <div class="album-cover aspect-square bg-gray-800 rounded-lg rounded overflow-hidden">
                        <img :src="album.cover_url" :alt="album.title" class="w-full h-full object-cover">
                    </div>
                </div>

                <div class="relative max-h-full col-span-2 max-h-full base-scrollbar overflow-y-scroll p-14">
                    <h1 class="font-bold font-major text-5xl span text-dominant-secondary pb-10">{{ album.title }}</h1>

                    <div class="absolute right-0 w-[90%] ml-auto h-0.5 bg-gray-200 opacity-40"></div>

                    <div class="flex gap-5x mb-5 grid grid-cols-5 pt-10">
                        <MetaData class="col-span-3" :album="album" />

                        <ArtistLinks class="mb-3 h-full col-span-2" :artists="artists" />
                    </div>

                    <TrackList class="mb-32 mt-10" :tracks="tracks" />
                </div>
            </div>

            <AlbumDetailFooter />
        </div>
    </DashboardPageModal>
</template>

<script lang="ts" setup>
import {getAlbum, getAlbumArtists, getAlbumTracks} from "@/services/albumService"
import TrackList from "@/views/Dashboard/AlbumDetailPage/TrackList"
import ArtistLinks from "@/views/Dashboard/AlbumDetailPage/ArtistLinks"
import MetaData from "@/views/Dashboard/AlbumDetailPage/MetaData"
import AlbumDetailHeader from "@/views/Dashboard/AlbumDetailPage/AlbumDetailHeader"
import AlbumDetailFooter from "@/views/Dashboard/AlbumDetailPage/AlbumDetailFooter"
import {useRoute} from "vue-router"
import {DashboardPageModal} from "@/views/Dashboard/@components"

const id = String(useRoute().params.id)

const album = await getAlbum(id)
const artists = await getAlbumArtists(id)
const tracks = await getAlbumTracks(id)
</script>

<style>
.album-overview {
    animation: fadeIn 200ms ease-out;
    width: 95vw;
    height: 90vh;
}
</style>
