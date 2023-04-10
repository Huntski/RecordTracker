<template>
    <div class="relative pt-10 pb-20 hide-mobile">
        <h1 class="text-3xl font-major mb-5 opacity-90"><strong>OWNED ALBUMS</strong> &#x2022; {{ albums.length }}</h1>

        <TransitionGroup tag="div" name="list" class="grid grid-cols-4 gap-4 w-full">
            <div v-for="album in albums" :key="album.id" @click="openAlbum(album.id)" class="relative rounded overflow-hidden cursor-pointer aspect-square">
                <div class="bg-overlay absolute w-full h-full opacity-50 transition-opacity hover:opacity-0"></div>
                <img :src="album.cover_url" :alt="album.title" class="w-full h-full object-cover">
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import router from "@/router"
import {getArtistAlbums} from "@/services/artistService"
import {useRoute} from "vue-router"
import {AlbumId} from "@/store/modules/album.types"

const albums = await getArtistAlbums(Number(useRoute().params.id))

function openAlbum(id: AlbumId): void {
    router.push({name: 'AlbumDetailPage', params: {id: id}})
}
</script>
