<template>
    <div class="rounded-lg p-3 border border-black" :class="{ 'artist-search-results' : filter === ''}">
        <div class="grid grid-cols-5 gap-3" v-if="artists.length > 1">
            <router-link :to="{name: 'ArtistDetailPage', params: {id: artist.id}}" tag="div" v-for="artist in artists" :key="artist.id">
                <div class="artist-card artist-card-overlay relative rounded bg-gray-500 overflow-hidden flex flex-col justify-end">
                    <img v-if="artist.image_url" :src="artist.image_url" :alt="artist.title" class="absolute top-0 left-0 z-0 w-full h-full object-cover">

                    <div class="relative z-10 p-2">
                        <h2 class="font-bold text-xs">{{ artist.name }}</h2>
                    </div>
                </div>
            </router-link>
        </div>

        <router-link :to="{name: 'ArtistDetailPage', params: {id: artist.id}}" tag="div" v-for="artist in artists" :key="artist.id" v-else class="flex items-center">
            <div class="artist-card rounded-full bg-gray-500 overflow-hidden w-40">
                <img v-if="artist.image_url" :src="artist.image_url" :alt="artist.title" class="object-cover w-full h-full">
            </div>

            <div class="px-5">
                <div class="flex items-center gap-3 font-major mb-3">
                    <h2 class="font-bold text-lg">{{ artist.name }}</h2>
                    <h3 class="text-gray-300 italic">{{ artist.real_name }}</h3>
                </div>

                <p class="text-sm italic text-ellipsis text-gray-200 font-light" v-show="artist.bio">{{ artist.bio.substring(0,130) }}...</p>
            </div>
        </router-link>

        <div class="grid grid-cols-5 gap-3" v-if="filter === 'artists'">
            <router-link :to="{name: 'ArtistDetailPage', params: {id: artist.id}}" tag="div" v-for="artist in artists" :key="artist.id">
                <div class="artist-card artist-card-overlay relative rounded bg-gray-500 overflow-hidden flex flex-col justify-end">
                    <img v-if="artist.image_url" :src="artist.image_url" :alt="artist.title" class="absolute top-0 left-0 z-0 w-full h-full object-cover">

                    <div class="relative z-10 p-2">
                        <h2 class="font-bold text-xs">{{ artist.name }}</h2>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        artists: {
            type: Object,
            required: false,
        },

        filter: {
            type: String,
            required: false
        }
    },
}
</script>

<style>
.artist-card {
    aspect-ratio: 1 / 1;
}

.artist-card-overlay:after {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #00000000, #000);
}

.artist-search-results {
    background: #1F1F1F;
    cursor: pointer;
}

.artist-search-results:hover {
    background: #1a1a1a;
}
</style>
