<template>
    <div class="grid grid-cols-4 gap-3">
        <div v-for="album in albums" :key="album.id" @click="openAlbum(album.id)" class="relative rounded overflow-hidden cursor-pointer">
            <div>
                <div class="bg-overlay absolute w-full h-full opacity-10 hover:opacity-0"></div>
                <img :src="album.cover_url" :alt="album.title" class="album-cover">
            </div>

<!--            <p class="text-xs mt-1 mb-3 text-gray-300">{{album.title}}</p>-->
        </div>
    </div>
</template>

<script lang="ts">
import {AlbumId, Album} from "@/store/modules/album.types"
import {defineComponent, PropType} from "vue"

export default defineComponent({
    props: {
        albums: {
            type: Object as PropType<Album[]>,
            required: false,
        },

        filter: {
            type: String,
            required: false
        }
    },

    methods: {
        openAlbum(id: AlbumId): void {
            this.$router.push({name: 'AlbumDetailPage', params: {id: id}})
        }
    }
})
</script>

<style>
.album-cover {
    aspect-ratio: 1 / 1;
}
</style>
