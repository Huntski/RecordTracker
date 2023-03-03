<template>
    <div class="absolute top-0 left-0 bottom-0 right-0 m-auto w-full h-full flex justify-center items-center">
        <BackgroundOverlay @click="closeWindow" />

        <loadingSpinner v-if="!album" class="w-10 opacity-0" />

        <div v-else class="relative album-overview bg-green-500 box-border rounded-xl grid grid-cols-1 lg:grid-cols-2 p-14 text-white base-scrollbar overflow-y-scroll 2xl:overflow-hidden">
            <CloseButton class="absolute top-0 left-0 m-3 z-20" @click="closeWindow" />

            <div class="background-album-cover absolute top-0 bottom-0 my-auto bg-gray-900 overflow-hidden rounded-full">
                <img :src="album.cover_url" :alt="album.title" class="w-full h-full object-cover">
            </div>

            <div class="relative">
                <div class="flex gap-5 mb-10">
                    <div class="album-cover w-40 2xl:w-52 bg-gray-800 rounded-lg rounded overflow-hidden">
                        <img :src="album.cover_url" :alt="album.title" class="w-full h-full object-cover">
                    </div>

                    <div class="py-1 flex flex-col items-start">
                        <h1 class="font-bold font-major text-2xl mb-4">{{ album.title }}</h1>

                        <ArtistLinks :artists="artists" />

                        <div>
                            <span></span>
                        </div>
                    </div>
                </div>

                <TrackList class="mb-10" :tracks="tracks" />
            </div>

            <div class="relative"></div>

<!--            <span class="absolute z-0 bottom-0 right-0 text-xs m-5 text-gray-300">BOUGHT BY <strong>Bamspeem</strong></span>-->
        </div>
    </div>
</template>
<script lang="ts">
import BackgroundOverlay from "@/components/BackgroundOverlay"
import {CloseButton} from "@/components/@buttons"
import {defineComponent} from "vue"
import {Album, AlbumId} from "@/store/modules/album.types"
import store from "@/store"
import {getAlbum, getAlbumArtists, getAlbumTracks} from "@/services/albumService"
import {Track} from "@/store/modules/track.types"
import {Artist} from "@/store/modules/artist.types"
import loadingSpinner from "@/components/LoadingSpinner"
import TrackList from "@/views/Dashboard/AlbumDetailPage/TrackList"
import ArtistLinks from "@/views/Dashboard/AlbumDetailPage/ArtistLinks"

export class AlbumDetailPageData {
    open = false
    album?: Album = undefined
    artists: Array<Artist> = []
    tracks: Array<Track> = []
}

export default defineComponent( {
    data() {
        return new AlbumDetailPageData()
    },

    methods: {
        async getAlbumData(newId: AlbumId): Promise<void> {
            this.album = await getAlbum(newId)
            this.artists = await getAlbumArtists(newId)
            this.tracks = await getAlbumTracks(newId)
        },

        openWindow() {
            console.log('open window overview')

            this.open = true
        },

        closeWindow() {
            store.commit('album/SET_REQUESTED_ALBUM_OVERVIEW', null)
            this.open = false
        },
    },

    mounted() {
        this.getAlbumData(store.getters['album/getRequestedAlbumId'])
    },

    components: {BackgroundOverlay, CloseButton, loadingSpinner, TrackList, ArtistLinks}
})
</script>

<style>
.album-overview {
    background: linear-gradient(to bottom right, #161616, #1D1D1D);
    animation: fadeIn 100ms ease-in;
    width: 90vw;
    height: 90vh;
}

.background-album-cover {
    left: -20%;
    aspect-ratio: 1 / 1;
    height: 120%;
    opacity: .8;
}
.background-album-cover:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right, #26262635, #262626);
}

.album-cover {
    aspect-ratio: 1 / 1;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>
