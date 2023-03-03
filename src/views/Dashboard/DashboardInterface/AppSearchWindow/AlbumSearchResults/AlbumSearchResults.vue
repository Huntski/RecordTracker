<template>
    <div class="grid grid-cols-4 gap-3">
        <div v-for="album in albums" :key="album.id" @click="openAlbum">
            <img :src="album.cover_url" :alt="album.title" class="album-cover rounded">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        albums: {
            type: Object,
            required: false,
        }
    },

    methods: {
        openAlbum() {
            this.$root.$refs.appDetailPage.openWindow()


        }
    }
}
</script>

<style>
.album-cover {
    aspect-ratio: 1 / 1;
}
</style>
