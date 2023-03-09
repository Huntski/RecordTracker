<template>
    <div class="absolute top-0 left-0 bottom-0 right-0 m-auto w-full h-full flex justify-center items-center">
        <BackgroundOverlay @click="closeWindow" />

        <loadingSpinner v-if="!album" class="w-10 opacity-0" />

        <div v-else class="relative album-overview bg-green-500 box-border rounded-xl grid grid-cols-1 lg:grid-cols-5 text-white base-scrollbar overflow-y-scroll overflow-x-hidden lg:overflow-hidden">
            <CloseButton class="absolute top-0 right-0 m-3 z-20" @click="closeWindow" />

            <div class="background-album-cover absolute top-0 bottom-0 my-auto bg-gray-900 overflow-hidden rounded-full aspect-square">
                <img :src="album.cover_url" :alt="album.title" class="w-full h-full object-cover">
            </div>

            <div class="relative p-14 col-span-3">
                <div class="flex gap-5 mb-10">
                    <div class="album-cover w-40 2xl:w-52 bg-gray-800 rounded-lg rounded overflow-hidden">
                        <img :src="album.cover_url" :alt="album.title" class="w-full h-full object-cover aspect-square">
                    </div>

                    <div class="py-1 flex flex-col items-start">
                        <h1 class="font-bold font-major text-2xl mb-4">{{ album.title }}</h1>

                        <ArtistLinks class="mb-3" :artists="artists" />

                        <div class="album-meta-data bg-close-button-bg-hover rounded-xl text-xs flex">
                            <ul class="p-4 grid gap-3">
                                <li>Origin</li>
                                <li>Released</li>
                                <li>Genre</li>
                            </ul>

                            <ul class="album-meta-data__values p-4 pr-20 bg-close-button-bg text-dominant grid gap-3 rounded-r-xl">
                                <li>{{album.origin}}</li>
                                <li>{{album.year}}</li>
                                <ul class="flex gap-2">
                                    <li class="underline cursor-pointer" v-for="genre in album.genres" :key="genre.name">{{genre.name}}</li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                </div>

                <TrackList class="mb-10" :tracks="tracks" />
            </div>

            <ArtistsBioSection class="relative col-span-5 lg:col-span-2" :artists="artists" />

            <footer class="lg:absolute z-0 left-0 bottom-0 text-gray-300 right-0 text-xs p-5 box-border flex justify-between items-center w-full">
                <button class="flex items-center gap-3 hover:text-white">
                    <ShopIcon class="w-5" />
                    <span>No.1 Hotwax Records</span>
                </button>

                <button class="flex items-center gap-3 hover:text-white">
                    <span>BOUGHT BY <strong>Bamspeem</strong></span>
                </button>
            </footer>
        </div>
    </div>
</template>
<script lang="ts">
import BackgroundOverlay from "@/components/BackgroundOverlay"
import {CloseButton} from "@/components/@buttons"
import {defineComponent} from "vue"
import {Album, AlbumId} from "@/store/modules/album.types"
import {getAlbum, getAlbumArtists, getAlbumTracks} from "@/services/albumService"
import {Track} from "@/store/modules/track.types"
import {Artist} from "@/store/modules/artist.types"
import loadingSpinner from "@/components/LoadingSpinner"
import TrackList from "@/views/Dashboard/AlbumDetailPage/TrackList"
import ArtistLinks from "@/views/Dashboard/AlbumDetailPage/ArtistLinks"
import ArtistsBioSection from "@/views/Dashboard/AlbumDetailPage/ArtistsBioSection"
import {ShopIcon} from "@/components/@icons"

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
        async getAlbumData(newId: AlbumId): Promise<void> {
            this.album = await getAlbum(newId)
            this.artists = await getAlbumArtists(newId)
            this.tracks = await getAlbumTracks(newId)
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
    },

    created() {
        document.onkeydown = this.handleKeyPressEvent
    },

    components: {ShopIcon, BackgroundOverlay, CloseButton, loadingSpinner, TrackList, ArtistLinks, ArtistsBioSection}
})
</script>

<style>
.album-overview {
    background: linear-gradient(to bottom right, #161616, #1D1D1D);
    animation: fadeIn 200ms ease-out;
    width: 95vw;
    height: 90vh;
}

.background-album-cover {
    left: -20%;
    height: 120%;
    opacity: .8;
}

.background-album-cover:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 110%;
    height: 110%;
    background-image: linear-gradient(to right, #26262635, #262626);
    box-shadow: 0 0 1000px black inset;
}

.album-meta-data {
    background-color: #202020;
}

.album-meta-data__values {
    background-image: linear-gradient(to bottom, #303030, #333333);
}

@keyframes fadeIn {
    from {
        transform: translateY(50px);
        opacity: 0;
    }

    to {
        transform: translateY(0px);
        opacity: 1;
    }
}
</style>
