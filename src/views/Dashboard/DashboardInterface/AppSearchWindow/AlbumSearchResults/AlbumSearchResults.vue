<template>
    <div class="grid grid-cols-4 gap-3">
        <div v-for="album in albums" :key="album.id">
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
}
</script>

<style>
.album-cover {
    aspect-ratio: 1 / 1;
}
</style>
