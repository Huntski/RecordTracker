<template>
    <div class="absolute top-0 left-0 bottom-0 right-0 m-auto w-full h-full flex justify-center items-center">
        <BackgroundOverlay @click="closeWindow" />

        <loadingSpinner v-if="!album" class="w-10 opacity-0" />

        <div v-else class="animate--reveal relative album-overview bg-gray-500 box-border rounded-xl text-white overflow-hidden">
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

                    <div class="flex gap-5 mb-5 grid grid-cols-5 pt-10">
                        <MetaData class="col-span-3" :album="album" />

                        <ArtistLinks class="mb-3 h-full col-span-2" :artists="artists" />
                    </div>

                    <TrackList class="mb-10 mt-10" :tracks="tracks" />
                </div>
            </div>

            <AlbumDetailFooter />
        </div>
    </div>
</template>

<script lang="ts">
import BackgroundOverlay from "@/components/BackgroundOverlay"
import {defineComponent} from "vue"
import {Album, AlbumId} from "@/store/modules/album.types"
import {getAlbum, getAlbumArtists, getAlbumTracks} from "@/services/albumService"
import {Track} from "@/store/modules/track.types"
import {Artist} from "@/store/modules/artist.types"
import loadingSpinner from "@/components/LoadingSpinner"
import TrackList from "@/views/Dashboard/AlbumDetailPage/TrackList"
import ArtistLinks from "@/views/Dashboard/AlbumDetailPage/ArtistLinks"
import MetaData from "@/views/Dashboard/AlbumDetailPage/MetaData"
import AlbumDetailHeader from "@/views/Dashboard/AlbumDetailPage/AlbumDetailHeader"
import AlbumDetailFooter from "@/views/Dashboard/AlbumDetailPage/AlbumDetailFooter"

export class AlbumDetailPageData {
    album?: Album = undefined
    artists: Artist[] = []
    tracks: Track[] = []
}

export default defineComponent( {
    data() {
        return new AlbumDetailPageData()
    },

    methods: {
        async getAlbumData(albumId: AlbumId): Promise<void> {
            this.album = await getAlbum(albumId)
            this.artists = await getAlbumArtists(albumId)
            this.tracks = await getAlbumTracks(albumId)
        },

        closeWindow() {
            this.$router.push({name: 'Dashboard'})
        },

        handleKeyPressEvent(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                this.closeWindow()

                document.onkeydown = null
            }
        }
    },

    mounted() {
        this.getAlbumData(this.$route.params.id as string)
        document.addEventListener('keydown', this.handleKeyPressEvent)
    },

    components: {AlbumDetailFooter, BackgroundOverlay, loadingSpinner, TrackList, ArtistLinks, AlbumDetailHeader, MetaData}
})
</script>

<style>
.album-overview {
    background: linear-gradient(to bottom right, #242424, #252525);
    animation: fadeIn 200ms ease-out;
    width: 95vw;
    height: 90vh;
}
</style>
