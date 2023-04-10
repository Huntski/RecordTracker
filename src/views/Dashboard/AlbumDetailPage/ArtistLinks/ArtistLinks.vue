<template>
    <div class="border border-gray-700 rounded-lg p-5">
        <h2 class="font-regular text-2xl mb-4">ARTISTS</h2>

        <div class="grid gap-3">
            <router-link
                v-for="artist in artists"
                :key="artist.id"
                :to="{name: 'ArtistDetailPage', params: {id: artist.id}}"
                class="flex items-center cursor-pointer gap-2 hover:text-dominant hover:bg-gray-600 transition rounded-lg bg-gray-700"
            >
                <div class="w-14 mr-4 aspect-square overflow-hidden bg-green-50 rounded-l-lg">
                    <img v-if="artist.image_url" :src="artist.image_url" :alt="artist.name" class="w-full h-full object-cover">
                </div>

                <h3 class="font-light pr-3 text-ellipsis ">{{artist.name}}</h3>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed, defineProps} from "vue"
import {Artist} from "@/store/modules/artist.types"

const props = defineProps<{artists: Artist[]}>()

const artists = computed(() => {
    return removeDuplicates(props.artists)
})

function removeDuplicates(artists: Artist[]) {
    const filteredGenres = []
    const existingGenres: string[] = []

    for (let i = 0; i < artists.length; i++) {
        const name = artists[i].name
        if (!existingGenres.includes(name)) {
            existingGenres.push(name)
            filteredGenres.push(artists[i])
        }
    }

    return filteredGenres
}

</script>
